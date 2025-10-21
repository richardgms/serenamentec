import { NextRequest, NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { accountDeletionSchema } from '@/lib/validations/profile';

export async function DELETE(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const result = accountDeletionSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Confirmacao invalida', details: result.error.flatten() },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
      select: { id: true, clerkUserId: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Usuario nao encontrado' },
        { status: 404 }
      );
    }

    await prisma.$transaction(async (tx) => {
      await tx.crisisLog.deleteMany({ where: { userId: user.id } });
      await tx.dailyReflection.deleteMany({ where: { userId: user.id } });
      await tx.journeyProgress.deleteMany({ where: { userId: user.id } });
      await tx.videoFavorite.deleteMany({ where: { userId: user.id } });
      await tx.videoHistory.deleteMany({ where: { userId: user.id } });
      await tx.breathingSession.deleteMany({ where: { userId: user.id } });
      await tx.topicExploration.deleteMany({ where: { userId: user.id } });
      await tx.moodCheckIn.deleteMany({ where: { userId: user.id } });
      await tx.achievement.deleteMany({ where: { userId: user.id } });
      await tx.userStreak.deleteMany({ where: { userId: user.id } });
      await tx.userPreferences.deleteMany({ where: { userId: user.id } });
      await tx.customBreathing.deleteMany({ where: { userId: user.id } });

      await tx.user.delete({ where: { id: user.id } });
    });

    try {
      await clerkClient.users.deleteUser(user.clerkUserId);
    } catch (clerkError) {
      console.error('Error deleting Clerk user:', clerkError);
      return NextResponse.json(
        {
          error: 'Conta removida parcialmente',
          details:
            'Dados locais excluidos, mas houve falha ao remover conta do Clerk. Contate o suporte.',
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Usuario excluido com sucesso',
    });
  } catch (error) {
    console.error('Error deleting user account:', error);
    return NextResponse.json(
      { error: 'Erro interno ao excluir conta' },
      { status: 500 }
    );
  }
}
