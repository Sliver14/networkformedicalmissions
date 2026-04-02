"use client";

import { Trash2 } from "lucide-react";
import { deleteNews } from "@/app/actions/admin-news";
import { useTransition } from "react";

export default function DeleteNewsButton({ id }: { id: number }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this post?")) {
      startTransition(async () => {
        await deleteNews(id);
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="text-red-600 hover:text-red-900 flex items-center space-x-1 disabled:opacity-50"
    >
      <Trash2 className="w-4 h-4" />
      <span>{isPending ? "Deleting..." : "Delete"}</span>
    </button>
  );
}
