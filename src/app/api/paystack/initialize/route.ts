import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, amount, metadata } = body;

    // Check if password exists in metadata
    if (!metadata.password) {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(metadata.password, 10);

    // Create or update user
    const user = await prisma.user.upsert({
      where: { email },
      update: {
        name: metadata.name,
        title: metadata.title,
        gender: metadata.gender,
        phone: metadata.phone,
        password: hashedPassword,
        profession: metadata.profession,
        qualification: metadata.qualification,
        country: metadata.country,
        state: metadata.state,
        city: metadata.city,
      },
      create: {
        email,
        name: metadata.name,
        title: metadata.title,
        gender: metadata.gender,
        phone: metadata.phone,
        password: hashedPassword,
        role: 'USER',
        profession: metadata.profession,
        qualification: metadata.qualification,
        country: metadata.country,
        state: metadata.state,
        city: metadata.city,
      },
    });

    // Create a pending membership
    const membership = await prisma.membership.create({
      data: {
        userId: user.id,
        type: metadata.type,
        status: 'Pending',
      },
    });

    // Clean up metadata to avoid sending sensitive info to Paystack
    const { password, ...safeMetadata } = metadata;
    const finalMetadata = {
      ...safeMetadata,
      userId: user.id,
      membershipId: membership.id,
    };

    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        amount: amount * 100, // Paystack expects amount in cents for USD
        currency: 'USD',
        metadata: finalMetadata,
        callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/paystack/verify`,
      }),
    });

    const data = await response.json();

    if (!data.status) {
      return NextResponse.json({ error: data.message }, { status: 400 });
    }

    return NextResponse.json(data.data);
  } catch (error) {
    console.error('Paystack init error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
