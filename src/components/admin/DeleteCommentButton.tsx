"use client";

import { Trash2 } from "lucide-react";
import { deleteComment } from "@/app/actions/admin-comments";
import { useTransition } from "react";

export default function DeleteCommentButton({ id }: { id: number }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this comment?")) {
      startTransition(async () => {
        try {
          await deleteComment(id);
        } catch (error) {
          alert("Failed to delete comment");
        }
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
