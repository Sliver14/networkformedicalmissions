import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const reference = searchParams.get('reference');

  if (!reference) {
    return NextResponse.redirect(new URL('/?error=no_reference', request.url));
  }

  try {
    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    });

    const data = await response.json();

    if (data.status && data.data.status === 'success') {
      const metadata = data.data.metadata;
      const amount = data.data.amount / 100; // Convert kobo to NGN
      const email = data.data.customer.email;

      // Handle Database Storage
      if (metadata.type?.startsWith('membership')) {
        const userId = metadata.userId;
        const membershipId = metadata.membershipId;

        if (userId && membershipId) {
          // Update membership
          await prisma.membership.update({
            where: { id: Number(membershipId) },
            data: {
              status: 'Active',
              expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), // 1 year
            },
          });

          // Record transaction
          await prisma.transaction.create({
            data: {
              userId: userId,
              membershipId: Number(membershipId),
              reference,
              amount,
              status: 'Success',
              metadata: JSON.stringify(metadata),
            },
          });
        }

        return NextResponse.redirect(new URL('/membership/success', request.url));
      } else if (metadata.type === 'donation') {
        // Check if user exists
        const user = await prisma.user.findUnique({ where: { email } });

        await prisma.transaction.create({
          data: {
            userId: user?.id ?? undefined,
            guestEmail: email,
            reference,
            amount,
            status: 'Success',
            metadata: JSON.stringify(metadata),
          },
        });

        return NextResponse.redirect(new URL('/membership/success?type=donation', request.url));
      }
    }

    return NextResponse.redirect(new URL('/?error=verification_failed', request.url));
  } catch (error) {
    console.error('Paystack verification error:', error);
    return NextResponse.redirect(new URL('/?error=internal_server_error', request.url));
  }
}
