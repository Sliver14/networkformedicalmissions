"use server";

import prisma from "@/lib/prisma";

export async function subscribeNewsletter(formData: FormData) {
  try {
    const email = formData.get("email") as string;

    if (!email) {
      return { success: false, message: "Email is required." };
    }

    // Check if already subscribed
    const existing = await prisma.newsletter.findUnique({
      where: { email },
    });

    if (existing) {
      return { success: true, message: "You are already subscribed!" };
    }

    await prisma.newsletter.create({
      data: { email },
    });

    return { success: true, message: "Successfully subscribed to our newsletter!" };
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return { success: false, message: "Something went wrong. Please try again." };
  }
}
