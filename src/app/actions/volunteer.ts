"use server";

import prisma from "@/lib/prisma";

export async function applyVolunteer(formData: FormData) {
  try {
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const country = formData.get("country") as string;
    const profession = formData.get("profession") as string;
    const availabilityMessage = formData.get("availabilityMessage") as string;

    // Check if already applied
    const existing = await prisma.volunteer.findUnique({
      where: { email },
    });

    if (existing) {
      return { success: false, message: "An application with this email already exists." };
    }

    await prisma.volunteer.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        country,
        profession,
        availabilityMessage,
        status: "Pending",
      },
    });

    return { success: true, message: "Your application has been submitted successfully!" };
  } catch (error) {
    console.error("Volunteer application error:", error);
    return { success: false, message: "Something went wrong. Please try again." };
  }
}
