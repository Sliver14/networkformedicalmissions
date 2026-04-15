"use server";

import prisma from "@/lib/prisma";

export async function applyVolunteer(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const gender = formData.get("gender") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const country = (formData.get("countryName") || formData.get("country")) as string;
    const state = (formData.get("stateName") || formData.get("state")) as string;
    const city = formData.get("city") as string;
    const qualification = formData.get("qualification") as string;
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
        title,
        firstName,
        lastName,
        gender,
        email,
        phone,
        country,
        state,
        city,
        qualification,
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
