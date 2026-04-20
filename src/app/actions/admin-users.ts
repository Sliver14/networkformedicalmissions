"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function createAdmin(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "User with this email already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "ADMIN",
      },
    });

    revalidatePath("/admin/admins");
    return { success: true };
  } catch (error) {
    console.error("Failed to create admin:", error);
    return { error: "Failed to create admin account" };
  }
}

export async function deleteAdmin(id: string) {
  try {
    // Prevent deleting the last admin or yourself could be added here
    await prisma.user.delete({
      where: { id },
    });
    revalidatePath("/admin/admins");
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete admin" };
  }
}
