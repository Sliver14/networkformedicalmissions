"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createMedia(formData: FormData) {
  const title = formData.get("title") as string;
  const url = formData.get("url") as string;
  const type = formData.get("type") as string;
  const caption = formData.get("caption") as string;
  const isActive = formData.get("isActive") === "on";

  if (!title || !url || !type) {
    throw new Error("Title, URL and Type are required");
  }

  await prisma.gallery.create({
    data: {
      title,
      url,
      type,
      caption: caption || null,
      isActive,
    },
  });

  revalidatePath("/gallery");
  revalidatePath("/gallery/videos");
  revalidatePath("/");
}

export async function deleteMedia(id: number) {
  await prisma.gallery.delete({ where: { id } });
  revalidatePath("/gallery");
  revalidatePath("/gallery/videos");
  revalidatePath("/");
}

export async function getMedia(type?: string) {
  return await prisma.gallery.findMany({
    where: {
      isActive: true,
      ...(type ? { type } : {}),
    },
    orderBy: { createdAt: "desc" },
  });
}
