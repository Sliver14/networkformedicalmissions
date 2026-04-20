"use client";

import { useState } from "react";
import { UserPlus, User as UserIcon, Mail, Loader2 } from "lucide-react";
import { createAdmin } from "@/app/actions/admin-users";

export default function CreateAdminForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const result = await createAdmin(formData);

    if (result.error) {
      setError(result.error);
    } else {
      setSuccess(true);
      // Reset form if it were a controlled form, but since it's a native form, we can reset it manually
      const form = document.getElementById("create-admin-form") as HTMLFormElement;
      form?.reset();
    }
    setLoading(false);
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <div className="p-2 bg-cyan-100 text-cyan-600 rounded-lg">
          <UserPlus size={20} />
        </div>
        <h3 className="text-lg font-bold text-gray-800">Add New Admin</h3>
      </div>

      <form id="create-admin-form" action={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 text-sm text-red-700 rounded-r-lg">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 border-l-4 border-green-400 p-4 text-sm text-green-700 rounded-r-lg">
            Admin account created successfully!
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Full Name
          </label>
          <div className="relative">
            <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              name="name"
              type="text"
              required
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
              placeholder="John Doe"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              name="email"
              type="email"
              required
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
              placeholder="admin@example.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Password
          </label>
          <input
            name="password"
            type="password"
            required
            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-cyan-500 text-white py-2 rounded-lg font-bold hover:bg-cyan-600 transition-colors shadow-lg shadow-cyan-100 mt-2 flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              <span>Creating...</span>
            </>
          ) : (
            <span>Create Admin Account</span>
          )}
        </button>
      </form>
    </div>
  );
}
