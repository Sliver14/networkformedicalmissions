import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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
        let user = await prisma.user.findUnique({ where: { email } });

        // If user doesn't exist, create a temporal account
        if (!user) {
          const providedPassword = metadata.password;
          const temporalPassword = providedPassword || Math.random().toString(36).slice(-8);
          const hashedPassword = await bcrypt.hash(temporalPassword, 10);
          
          user = await prisma.user.create({
            data: {
              email,
              name: metadata.name || 'Guest Donor',
              password: hashedPassword,
              role: 'USER',
            }
          });

          // Send email with temporalPassword to the user if it was system generated
          if (!providedPassword) {
            try {
              await resend.emails.send({
                from: 'NMM Support <noreply@networkformedicalmissions.org>',
                to: email,
                subject: 'Your Temporal Account Details',
                html: `
                  <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <h1 style="color: #06b6d4;">Welcome to Network for Medical Missions!</h1>
                    <p>Thank you for your generous donation.</p>
                    <p>A temporal account has been created for you to keep track of your contributions and participate in our community.</p>
                    <div style="background: #f9fafb; padding: 15px; border-radius: 8px; margin: 20px 0;">
                      <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
                      <p style="margin: 5px 0;"><strong>Temporal Password:</strong> <span style="color: #06b6d4; font-weight: bold;">${temporalPassword}</span></p>
                    </div>
                    <p>You can use these details to login and view your donation history or comment on news items.</p>
                    <p>We recommend changing your password after your first login in your profile settings.</p>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                    <p style="font-size: 12px; color: #6b7280; text-align: center;">Network for Medical Missions &copy; 2024</p>
                  </div>
                `
              });
            } catch (emailError) {
              console.error("Failed to send temporal password email:", emailError);
            }
          }
          
          console.log(`Account created for ${email}`);
        }

        await prisma.transaction.create({
          data: {
            userId: user.id,
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
