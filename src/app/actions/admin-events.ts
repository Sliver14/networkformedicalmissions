"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export async function createEvent(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const location = formData.get("location") as string;
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;
  const image = formData.get("image") as string;
  const isActive = formData.get("isActive") === "on";

  if (!title || !description) {
    throw new Error("Title and description are required");
  }

  let slug = generateSlug(title);
  const existing = await prisma.event.findUnique({ where: { slug } });
  if (existing) {
    slug = `${slug}-${Date.now()}`;
  }

  await prisma.event.create({
    data: {
      title,
      slug,
      description,
      location: location || null,
      startDate: startDate ? new Date(startDate) : null,
      endDate: endDate ? new Date(endDate) : null,
      image: image || null,
      isActive,
    },
  });

  revalidatePath("/admin/events");
  revalidatePath("/events");
  redirect("/admin/events");
}

export async function updateEvent(id: number, formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const location = formData.get("location") as string;
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;
  const image = formData.get("image") as string;
  const isActive = formData.get("isActive") === "on";

  if (!title || !description) {
    throw new Error("Title and description are required");
  }

  const existingEvent = await prisma.event.findUnique({ where: { id } });
  if (!existingEvent) {
    throw new Error("Event not found");
  }

  let slug = generateSlug(title);
  if (slug !== existingEvent.slug) {
    const existingSlug = await prisma.event.findUnique({ where: { slug } });
    if (existingSlug) {
      slug = `${slug}-${Date.now()}`;
    }
  }

  await prisma.event.update({
    where: { id },
    data: {
      title,
      slug,
      description,
      location: location || null,
      startDate: startDate ? new Date(startDate) : null,
      endDate: endDate ? new Date(endDate) : null,
      image: image || null,
      isActive,
    },
  });

  revalidatePath("/admin/events");
  revalidatePath("/events");
  revalidatePath(`/events/${slug}`);
  redirect("/admin/events");
}

export async function deleteEvent(id: number) {
  await prisma.event.delete({ where: { id } });
  revalidatePath("/admin/events");
  revalidatePath("/events");
}
