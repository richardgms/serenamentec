import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import {
  preferencesUpdateSchema,
  type PreferencesUpdateInput,
} from '@/lib/validations/profile';

function normalizePreferences(
  payload: PreferencesUpdateInput,
  defaults?: PreferencesUpdateInput
) {
  return {
    vibrationEnabled:
      payload.vibrationEnabled ?? defaults?.vibrationEnabled ?? true,
    soundEnabled: payload.soundEnabled ?? defaults?.soundEnabled ?? true,
  };
}

export async function GET(_req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
      select: {
        id: true,
        preferences: {
          select: {
            id: true,
            vibrationEnabled: true,
            soundEnabled: true,
            updatedAt: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Usuario nao encontrado' },
        { status: 404 }
      );
    }

    if (!user.preferences) {
      const created = await prisma.userPreferences.create({
        data: {
          userId: user.id,
        },
        select: {
          id: true,
          vibrationEnabled: true,
          soundEnabled: true,
          updatedAt: true,
        },
      });

      return NextResponse.json({ preferences: created });
    }

    return NextResponse.json({ preferences: user.preferences });
  } catch (error) {
    console.error('Error fetching preferences:', error);
    return NextResponse.json(
      { error: 'Erro interno ao buscar preferencias' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const result = preferencesUpdateSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Dados invalidos', details: result.error.flatten() },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
      select: {
        id: true,
        preferences: {
          select: {
            vibrationEnabled: true,
            soundEnabled: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Usuario nao encontrado' },
        { status: 404 }
      );
    }

    const normalized = normalizePreferences(
      result.data,
      user.preferences ?? undefined
    );

    const updated = await prisma.userPreferences.upsert({
      where: { userId: user.id },
      update: {
        vibrationEnabled: normalized.vibrationEnabled,
        soundEnabled: normalized.soundEnabled,
      },
      create: {
        userId: user.id,
        vibrationEnabled: normalized.vibrationEnabled,
        soundEnabled: normalized.soundEnabled,
      },
      select: {
        id: true,
        vibrationEnabled: true,
        soundEnabled: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      preferences: updated,
    });
  } catch (error) {
    console.error('Error updating preferences:', error);
    return NextResponse.json(
      { error: 'Erro interno ao atualizar preferencias' },
      { status: 500 }
    );
  }
}
