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

export async function createNews(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const isPublished = formData.get("isPublished") === "on";
  const image = formData.get("image") as string; 

  if (!title || !content) {
    throw new Error("Title and content are required");
  }

  let slug = generateSlug(title);
  
  // Basic collision handling
  const existing = await prisma.news.findUnique({ where: { slug } });
  if (existing) {
    slug = `${slug}-${Date.now()}`;
  }

  await prisma.news.create({
    data: {
      title,
      slug,
      content,
      isPublished,
      image: image || null,
      publishedAt: isPublished ? new Date() : null,
    },
  });

  revalidatePath("/admin/news");
  revalidatePath("/news");
  redirect("/admin/news");
}

export async function updateNews(id: number, formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const isPublished = formData.get("isPublished") === "on";
  const image = formData.get("image") as string;

  if (!title || !content) {
    throw new Error("Title and content are required");
  }

  const existingNews = await prisma.news.findUnique({ where: { id } });
  if (!existingNews) {
    throw new Error("News not found");
  }

  let slug = generateSlug(title);
  if (slug !== existingNews.slug) {
    const existingSlug = await prisma.news.findUnique({ where: { slug } });
    if (existingSlug) {
      slug = `${slug}-${Date.now()}`;
    }
  }

  const dataToUpdate: any = {
    title,
    slug,
    content,
    isPublished,
    image: image || null,
  };

  if (isPublished && !existingNews.isPublished) {
    dataToUpdate.publishedAt = new Date();
  }

  await prisma.news.update({
    where: { id },
    data: dataToUpdate,
  });

  revalidatePath("/admin/news");
  revalidatePath("/news");
  revalidatePath(`/news/${slug}`);
  redirect("/admin/news");
}

export async function deleteNews(id: number) {
  await prisma.news.delete({ where: { id } });
  revalidatePath("/admin/news");
  revalidatePath("/news");
}
