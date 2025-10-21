import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import {
  profileUpdateSchema,
  type ProfileUpdateInput,
} from '@/lib/validations/profile';
import type { DiagnosisType } from '@prisma/client';

function normalizeProfilePicture(value: ProfileUpdateInput['profilePicture']) {
  if (!value || value === '') {
    return null;
  }
  return value;
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
        email: true,
        firstName: true,
        lastName: true,
        age: true,
        diagnosisType: true,
        profilePicture: true,
        onboardingCompleted: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Usuario nao encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json(
      { error: 'Erro interno ao buscar perfil' },
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
    const result = profileUpdateSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Dados invalidos', details: result.error.flatten() },
        { status: 400 }
      );
    }

    const payload = result.data;

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

    const updated = await prisma.user.update({
      where: { id: user.id },
      data: {
        firstName: payload.firstName,
        lastName: payload.lastName,
        age: payload.age,
        diagnosisType: (payload.diagnosisType || null) as DiagnosisType | null,
        profilePicture: normalizeProfilePicture(payload.profilePicture),
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        age: true,
        diagnosisType: true,
        profilePicture: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      user: updated,
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { error: 'Erro interno ao atualizar perfil' },
      { status: 500 }
    );
  }
}
