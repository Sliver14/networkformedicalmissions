"use server";

export async function submitContactForm(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    // Typically you would send an email here using Resend/Nodemailer
    // Or save to a Messages table if you add one
    console.log("Contact form submission:", { name, email, phone, subject, message });

    return { success: true, message: "Thank you for reaching out. We will get back to you shortly." };
  } catch (error) {
    console.error("Contact form error:", error);
    return { success: false, message: "Something went wrong. Please try again." };
  }
}
