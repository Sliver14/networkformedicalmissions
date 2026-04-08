import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const existingAdmin = await prisma.user.findFirst({
      where: { email: "admin@networkformedicalmissions.org" },
    });

    if (existingAdmin) {
      return NextResponse.json({ message: "Admin already exists." });
    }

    const hashedPassword = await bcrypt.hash("AdminPassword123!", 10);

    const admin = await prisma.user.create({
      data: {
        name: "Super Admin",
        email: "admin@networkformedicalmissions.org",
        password: hashedPassword,
        role: "ADMIN",
      },
    });

    return NextResponse.json({ message: "Admin created successfully.", email: admin.email });
  } catch (error) {
    console.error("Error creating admin:", error);
    return NextResponse.json({ error: "Failed to create admin." }, { status: 500 });
  }
}
