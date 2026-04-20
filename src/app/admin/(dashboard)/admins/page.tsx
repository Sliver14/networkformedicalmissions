import prisma from "@/lib/prisma";
import { Shield } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import CreateAdminForm from "@/components/admin/CreateAdminForm";
import DeleteAdminButton from "@/components/admin/DeleteAdminButton";

export const dynamic = 'force-dynamic';

export default async function AdminsPage() {
  const session = await getServerSession(authOptions);
  const admins = await prisma.user.findMany({
    where: { role: "ADMIN" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Admin Management</h2>
          <p className="text-gray-500">Manage platform administrators</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Create Admin Form Section */}
        <div className="lg:col-span-1">
          <CreateAdminForm />
        </div>

        {/* Admins List Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-50">
              <h3 className="text-lg font-bold text-gray-800">Current Administrators</h3>
            </div>
            <div className="divide-y divide-gray-50">
              {admins.map((admin) => (
                <div key={admin.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600 font-bold text-xl uppercase">
                      {admin.name?.[0] || admin.email?.[0] || "?"}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{admin.name || "Unnamed Admin"}</p>
                      <p className="text-sm text-gray-500">{admin.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1 px-3 py-1 bg-cyan-50 text-cyan-700 rounded-full text-xs font-bold">
                      <Shield size={12} />
                      <span>Admin</span>
                    </div>
                    {session?.user?.email !== admin.email && (
                      <DeleteAdminButton adminId={admin.id} adminEmail={admin.email || ""} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
