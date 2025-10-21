import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import {
  crisisHistoryQuerySchema,
  crisisLogSchema,
} from '@/lib/validations/profile';
import type { CrisisDuration, CrisisType } from '@prisma/client';

const intensityLabels: Record<number, string> = {
  1: 'Muito leve',
  2: 'Leve',
  3: 'Moderada',
  4: 'Intensa',
  5: 'Muito grave',
};

const durationWeights: Record<CrisisDuration, number> = {
  LESS_5MIN: 5,
  MIN_5_30: 20,
  MIN_30_60: 45,
  MORE_60MIN: 75,
};

const durationLabels: Record<CrisisDuration, string> = {
  LESS_5MIN: 'Menos de 5 min',
  MIN_5_30: '5 a 30 min',
  MIN_30_60: '30 a 60 min',
  MORE_60MIN: 'Mais de 60 min',
};

function getStartDate(period: '7days' | '30days' | '90days' | 'all') {
  const now = new Date();
  switch (period) {
    case '7days':
      return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    case '30days':
      return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    case '90days':
      return new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
    default:
      return undefined;
  }
}

function closestDurationLabel(value: number): CrisisDuration {
  let closest: CrisisDuration = 'LESS_5MIN';
  let smallestDiff = Number.POSITIVE_INFINITY;
  (Object.keys(durationWeights) as CrisisDuration[]).forEach((key) => {
    const diff = Math.abs(durationWeights[key] - value);
    if (diff < smallestDiff) {
      smallestDiff = diff;
      closest = key;
    }
  });
  return closest;
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const result = crisisLogSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Dados invalidos', details: result.error.flatten() },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Usuario nao encontrado' },
        { status: 404 }
      );
    }

    const payload = result.data;
    const whatHelped = payload.otherSupport
      ? [...payload.whatHelped, payload.otherSupport]
      : payload.whatHelped;

    const triggers = payload.triggers?.filter(Boolean) ?? undefined;

    const created = await prisma.crisisLog.create({
      data: {
        userId: user.id,
        intensity: payload.intensity,
        crisisTypes: payload.crisisTypes as CrisisType[],
        duration: payload.duration as CrisisDuration,
        whatHelped,
        additionalNotes: payload.additionalNotes ?? null,
        location: payload.location ?? null,
        triggers: triggers && triggers.length > 0 ? triggers : [],
      },
      select: {
        id: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      { success: true, crisis: created },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving crisis log:', error);
    return NextResponse.json(
      { error: 'Erro interno ao salvar crise' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = req.nextUrl.searchParams;
    const query = crisisHistoryQuerySchema.parse({
      period: searchParams.get('period') ?? undefined,
      page: searchParams.get('page') ?? undefined,
      limit: searchParams.get('limit') ?? undefined,
    });

    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Usuario nao encontrado' },
        { status: 404 }
      );
    }

    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const skip = (page - 1) * limit;

    const startDate = getStartDate(query.period);
    const whereClause = {
      userId: user.id,
      ...(startDate
        ? {
            createdAt: {
              gte: startDate,
            },
          }
        : {}),
    };

    const [summaryLogs, crises] = await Promise.all([
      prisma.crisisLog.findMany({
        where: whereClause,
        select: {
          intensity: true,
          crisisTypes: true,
          duration: true,
        },
      }),
      prisma.crisisLog.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
    ]);

    const total = summaryLogs.length;
    const totalPages = Math.ceil(total / limit) || 1;

    let averageIntensity = 0;
    let mostCommonType: CrisisType | null = null;
    let averageDurationLabel: CrisisDuration | null = null;

    if (total > 0) {
      const intensitySum = summaryLogs.reduce(
        (acc, item) => acc + item.intensity,
        0
      );
      averageIntensity = Number((intensitySum / total).toFixed(1));

      const typeFrequency = new Map<CrisisType, number>();
      summaryLogs.forEach((log) => {
        log.crisisTypes.forEach((type) => {
          typeFrequency.set(type, (typeFrequency.get(type) ?? 0) + 1);
        });
      });

      let maxFrequency = 0;
      typeFrequency.forEach((count, type) => {
        if (count > maxFrequency) {
          maxFrequency = count;
          mostCommonType = type;
        }
      });

      const durationSum = summaryLogs.reduce((acc, item) => {
        return acc + durationWeights[item.duration];
      }, 0);
      const durationAverage = durationSum / total;
      averageDurationLabel = closestDurationLabel(durationAverage);
    }

    return NextResponse.json({
      crises,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasMore: page < totalPages,
      },
      stats: {
        total,
        averageIntensity,
        averageIntensityLabel:
          intensityLabels[Math.round(averageIntensity)] ?? null,
        mostCommonType,
        averageDuration: averageDurationLabel,
        averageDurationLabel: averageDurationLabel
          ? durationLabels[averageDurationLabel]
          : null,
      },
    });
  } catch (error) {
    console.error('Error fetching crisis history:', error);
    return NextResponse.json(
      { error: 'Erro interno ao buscar historico de crises' },
      { status: 500 }
    );
  }
}
