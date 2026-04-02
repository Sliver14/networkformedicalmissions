"use server";

import prisma from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendNewsletter(subject: string, htmlContent: string) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not configured in the environment.");
  }

  const subscribers = await prisma.newsletter.findMany({
    where: { isSubscribed: true },
    select: { email: true },
  });

  if (subscribers.length === 0) {
    throw new Error("No active subscribers found.");
  }

  const emails = subscribers.map((sub) => sub.email);

  try {
    // Resend allows sending up to 50 emails per batch request.
    // For large lists, this would need to be chunked.
    // For this prototype, we'll send it via BCC to save API calls, 
    // or you can loop. Let's loop and send individually for better deliverability
    // or use the Audience feature in Resend.
    
    // Quick implementation: Send to first 50 via BCC (BCC is limited in some tiers)
    // Best practice for Resend is sending an array of objects for batch sending.
    
    const batchData = emails.map((email) => ({
      from: "Network for Medical Missions <newsletter@networkformedicalmissions.org>",
      to: email,
      subject: subject,
      html: htmlContent,
    }));

    // Chunking into arrays of 50 (Resend limit per batch)
    const chunkSize = 50;
    for (let i = 0; i < batchData.length; i += chunkSize) {
      const chunk = batchData.slice(i, i + chunkSize);
      await resend.batch.send(chunk);
    }

    return { success: true, count: emails.length };
  } catch (error: any) {
    console.error("Newsletter send error:", error);
    throw new Error(error.message || "Failed to send newsletter.");
  }
}
