"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function likeNews(newsId: number) {
  try {
    const cookieStore = cookies();
    const cookieName = `liked_news_${newsId}`;

    // If the user has already liked this post (cookie exists), reject the action
    if (cookieStore.has(cookieName)) {
       const newsItem = await prisma.news.findUnique({ where: { id: newsId } });
       return { success: false, message: "Already liked", likes: Number(newsItem?.likes || 0) };
    }

    const newsItem = await prisma.news.update({
      where: { id: newsId },
      data: {
        likes: { increment: 1 },
      },
    });

    // Set a permanent cookie (e.g., lasts for 10 years) to remember they liked it
    cookieStore.set(cookieName, 'true', { maxAge: 60 * 60 * 24 * 365 * 10 });

    revalidatePath(`/news/${newsItem.slug}`);
    revalidatePath("/news");
    revalidatePath("/");

    return { success: true, likes: Number(newsItem.likes) };
  } catch (error) {
    console.error("Error liking news:", error);
    return { success: false, message: "Could not like this news." };
  }
}

export async function postComment(newsId: number, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const content = formData.get("content") as string;

    const newsItem = await prisma.news.findUnique({
      where: { id: newsId },
    });

    if (!newsItem) {
      return { success: false, message: "News not found." };
    }

    await prisma.comment.create({
      data: {
        newsId,
        name,
        email,
        content,
        isApproved: true, // Auto-approve for now like in Laravel
      },
    });

    revalidatePath(`/news/${newsItem.slug}`);

    return { success: true, message: "Comment posted successfully!" };
  } catch (error) {
    console.error("Error posting comment:", error);
    return { success: false, message: "Could not post comment." };
  }
}

export async function incrementViews(newsId: number) {
  try {
    const cookieStore = cookies();
    const cookieName = `viewed_news_${newsId}`;

    if (!cookieStore.has(cookieName)) {
      await prisma.news.update({
        where: { id: newsId },
        data: {
          views: { increment: 1 },
        },
      });
      // Set cookie to prevent multiple view counts from same session for 24 hours
      cookieStore.set(cookieName, 'true', { maxAge: 60 * 60 * 24 });
    }
  } catch (error) {
    console.error("Error incrementing views:", error);
  }
}
