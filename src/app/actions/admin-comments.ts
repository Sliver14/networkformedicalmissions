"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteComment(id: number) {
  const comment = await prisma.comment.findUnique({
    where: { id },
    include: { news: true }
  });

  if (!comment) {
    throw new Error("Comment not found");
  }

  await prisma.comment.delete({ where: { id } });

  revalidatePath("/admin/comments");
  if (comment.news) {
    revalidatePath(`/news/${comment.news.slug}`);
  }
}

export async function toggleCommentApproval(id: number) {
  const comment = await prisma.comment.findUnique({
    where: { id },
    include: { news: true }
  });

  if (!comment) {
    throw new Error("Comment not found");
  }

  await prisma.comment.update({
    where: { id },
    data: { isApproved: !comment.isApproved }
  });

  revalidatePath("/admin/comments");
  if (comment.news) {
    revalidatePath(`/news/${comment.news.slug}`);
  }
}
