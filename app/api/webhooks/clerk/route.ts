import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { Webhook } from 'svix';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  // TODO: Implement Clerk webhook handler
  // This will sync user creation/updates with Supabase via Prisma

  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET to .env.local');
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new NextResponse('Error: Missing svix headers', { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: any;

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as any;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new NextResponse('Error: Verification failed', { status: 400 });
  }

  // Handle the webhook
  const eventType = evt.type;
  const { id, email_addresses, first_name, last_name, image_url } = evt.data;

  try {
    if (eventType === 'user.created') {
      // Create user in database
      const primaryEmail = email_addresses?.[0]?.email_address;

      if (!primaryEmail) {
        console.error('No email found for user:', id);
        return new NextResponse('Error: No email found', { status: 400 });
      }

      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { clerkUserId: id },
      });

      if (!existingUser) {
        await prisma.user.create({
          data: {
            clerkUserId: id,
            email: primaryEmail,
            firstName: first_name || '',
            lastName: last_name || '',
            age: 0, // Will be updated during onboarding
            profilePicture: image_url,
            onboardingCompleted: false,
          },
        });

        console.log('User created in database:', id);
      }
    }

    if (eventType === 'user.updated') {
      // Update user in database
      const existingUser = await prisma.user.findUnique({
        where: { clerkUserId: id },
      });

      if (existingUser) {
        await prisma.user.update({
          where: { clerkUserId: id },
          data: {
            firstName: first_name || existingUser.firstName,
            lastName: last_name || existingUser.lastName,
            profilePicture: image_url || existingUser.profilePicture,
            updatedAt: new Date(),
          },
        });

        console.log('User updated in database:', id);
      }
    }

    if (eventType === 'user.deleted') {
      // Delete user from database
      await prisma.user.delete({
        where: { clerkUserId: id },
      });

      console.log('User deleted from database:', id);
    }

    return new NextResponse('Webhook processed successfully', { status: 200 });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new NextResponse('Error processing webhook', { status: 500 });
  }
}
