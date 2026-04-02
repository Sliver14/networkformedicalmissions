import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditPostForm from "@/components/admin/EditPostForm";

export default async function EditPostPage({
  params,
}: {
  params: { id: string };
}) {
  const post = await prisma.news.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!post) {
    notFound();
  }

  return <EditPostForm post={post} />;
}
