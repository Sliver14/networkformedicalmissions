"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { deleteAdmin } from "@/app/actions/admin-users";

export default function DeleteAdminButton({ adminId, adminEmail }: { adminId: string, adminEmail: string }) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm(`Are you sure you want to delete admin ${adminEmail}?`)) return;
    
    setLoading(true);
    await deleteAdmin(adminId);
    setLoading(false);
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50 disabled:opacity-50"
      title="Delete Admin"
    >
      {loading ? <Loader2 size={20} className="animate-spin" /> : <Trash2 size={20} />}
    </button>
  );
}
