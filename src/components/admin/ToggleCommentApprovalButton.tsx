"use client";

import { CheckCircle, XCircle } from "lucide-react";
import { toggleCommentApproval } from "@/app/actions/admin-comments";
import { useTransition } from "react";

export default function ToggleCommentApprovalButton({ 
  id, 
  isApproved 
}: { 
  id: number; 
  isApproved: boolean 
}) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      try {
        await toggleCommentApproval(id);
      } catch (error) {
        alert("Failed to update comment status");
      }
    });
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className={`${
        isApproved 
          ? "text-green-600 hover:text-green-900" 
          : "text-yellow-600 hover:text-yellow-900"
      } flex items-center space-x-1 disabled:opacity-50`}
      title={isApproved ? "Unapprove" : "Approve"}
    >
      {isApproved ? (
        <>
          <CheckCircle className="w-4 h-4" />
          <span>Approved</span>
        </>
      ) : (
        <>
          <XCircle className="w-4 h-4" />
          <span>Pending</span>
        </>
      )}
    </button>
  );
}
