import prisma from "@/lib/prisma";
import { BadgeCheck, Clock, AlertCircle } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function AdminMembershipsPage() {
  const memberships = await prisma.membership.findMany({
    include: {
      user: {
        select: {
          name: true,
          email: true,
          title: true,
          gender: true,
          qualification: true,
          country: true,
          state: true,
          city: true,
        }
      },
      transactions: {
        where: { status: "Success" },
        select: { amount: true }
      }
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Memberships</h2>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Member</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Gender</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Qualification</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Location</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount Paid</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Joined At</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider text-right">Expiry</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {memberships.map((membership) => {
                const totalPaid = membership.transactions.reduce((acc, curr) => acc + curr.amount, 0);
                return (
                  <tr key={membership.id} className="hover:bg-gray-50">
                    <td className="py-4 px-6 text-sm">
                      <div className="font-medium text-gray-900">
                        {membership.user.title ? `${membership.user.title}. ` : ''}
                        {membership.user.name || "N/A"}
                      </div>
                      <div className="text-gray-500 text-xs">{membership.user.email}</div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500">
                      {membership.user.gender || "N/A"}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500">
                      {membership.user.qualification || "N/A"}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500">
                      {membership.user.city ? `${membership.user.city}, ` : ''}
                      {membership.user.state ? `${membership.user.state}, ` : ''}
                      {membership.user.country || 'N/A'}
                    </td>
                    <td className="py-4 px-6 text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        membership.type === 'Honorary' ? 'bg-purple-100 text-purple-800' :
                        membership.type === 'Associate' ? 'bg-blue-100 text-blue-800' :
                        'bg-indigo-100 text-indigo-800'
                      }`}>
                        {membership.type}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm">
                      {membership.status === 'Active' ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <BadgeCheck className="w-3 h-3 mr-1" />
                          Active
                        </span>
                      ) : membership.status === 'Pending' ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          <Clock className="w-3 h-3 mr-1" />
                          Pending
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {membership.status}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-900 font-medium">
                      ₦{totalPaid.toLocaleString()}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500">
                      {new Date(membership.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 text-sm text-right text-gray-500">
                      {membership.expiryDate ? new Date(membership.expiryDate).toLocaleDateString() : "Lifetime"}
                    </td>
                  </tr>
                );
              })}
              {memberships.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-500">
                    No memberships found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
