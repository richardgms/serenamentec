import { NextRequest, NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { onboardingSchema } from '@/lib/validations/onboarding';
import { DiagnosisType } from '@prisma/client';

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get current user from Clerk
    const clerkUser = await currentUser();
    if (!clerkUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Parse and validate request body
    const body = await req.json();
    console.log('📦 Received body:', JSON.stringify(body, null, 2));

    const validatedData = onboardingSchema.parse(body);
    console.log('✅ Validated data:', JSON.stringify(validatedData, null, 2));

    // Check if user already exists
    let user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
    });

    console.log('👤 User found in DB:', user ? 'Yes' : 'No', user?.id);

    // Convert diagnosisType to proper type (undefined/null -> null)
    const diagnosisType = validatedData.diagnosisType
      ? (validatedData.diagnosisType as DiagnosisType)
      : null;

    console.log('🏥 Diagnosis type to save:', diagnosisType);

    if (user) {
      // Update existing user
      console.log('🔄 Updating existing user...');
      user = await prisma.user.update({
        where: { clerkUserId: userId },
        data: {
          firstName: validatedData.firstName,
          lastName: validatedData.lastName,
          age: validatedData.age,
          diagnosisType: diagnosisType,
          profilePicture: validatedData.profilePicture || null,
          onboardingCompleted: true,
          updatedAt: new Date(),
        },
      });
      console.log('✅ User updated successfully');
    } else {
      // Create new user
      console.log('➕ Creating new user...');
      user = await prisma.user.create({
        data: {
          clerkUserId: userId,
          email: clerkUser.emailAddresses[0]?.emailAddress || '',
          firstName: validatedData.firstName,
          lastName: validatedData.lastName,
          age: validatedData.age,
          diagnosisType: diagnosisType,
          profilePicture: validatedData.profilePicture || null,
          onboardingCompleted: true,
        },
      });
      console.log('✅ User created successfully');

      // Create default user preferences
      console.log('⚙️ Creating user preferences...');
      await prisma.userPreferences.create({
        data: {
          userId: user.id,
        },
      });
      console.log('✅ User preferences created');
    }

    console.log('🎉 Onboarding completed successfully for user:', user.id);

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        onboardingCompleted: user.onboardingCompleted,
      },
    });
  } catch (error: any) {
    console.error('❌ Error in onboarding API:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);

    if (error.name === 'ZodError') {
      console.error('Zod validation errors:', error.errors);
      return NextResponse.json(
        { error: 'Invalid data', details: error.errors },
        { status: 400 }
      );
    }

    // Prisma errors
    if (error.code) {
      console.error('Prisma error code:', error.code);
      console.error('Prisma error meta:', error.meta);
    }

    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error.message || 'Unknown error',
        details: process.env.NODE_ENV === 'development' ? error.toString() : undefined
      },
      { status: 500 }
    );
  }
}
