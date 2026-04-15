import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import PageHeader from "@/components/PageHeader";
import { User, Mail, MapPin, Briefcase, GraduationCap, Calendar, CreditCard, CheckCircle, Clock } from "lucide-react";
import { format } from "date-fns";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: (session.user as any).id },
    include: {
      memberships: {
        orderBy: { createdAt: "desc" }
      },
      transactions: {
        orderBy: { createdAt: "desc" }
      }
    }
  });

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50">
      <PageHeader title="My Profile" breadcrumb={[{ label: "Profile" }]} />

      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* User Info Card */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-200 border border-gray-100">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 bg-cyan-100 text-cyan-500 rounded-full flex items-center justify-center mb-4">
                    <User size={48} />
                  </div>
                  <h2 className="text-2xl font-black text-gray-900">{user.title} {user.name}</h2>
                  <p className="text-cyan-500 font-bold uppercase tracking-wider text-xs mt-1">{user.role}</p>
                </div>

                <div className="mt-8 space-y-4">
                  <div className="flex items-center space-x-4 text-gray-600">
                    <div className="bg-gray-50 p-2 rounded-lg text-cyan-500">
                      <Mail size={18} />
                    </div>
                    <span className="text-sm font-medium">{user.email}</span>
                  </div>
                  {user.profession && (
                    <div className="flex items-center space-x-4 text-gray-600">
                      <div className="bg-gray-50 p-2 rounded-lg text-cyan-500">
                        <Briefcase size={18} />
                      </div>
                      <span className="text-sm font-medium">{user.profession}</span>
                    </div>
                  )}
                  {user.qualification && (
                    <div className="flex items-center space-x-4 text-gray-600">
                      <div className="bg-gray-50 p-2 rounded-lg text-cyan-500">
                        <GraduationCap size={18} />
                      </div>
                      <span className="text-sm font-medium">{user.qualification}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-4 text-gray-600">
                    <div className="bg-gray-50 p-2 rounded-lg text-cyan-500">
                      <MapPin size={18} />
                    </div>
                    <span className="text-sm font-medium">{user.city}, {user.state}, {user.country}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-gray-600">
                    <div className="bg-gray-50 p-2 rounded-lg text-cyan-500">
                      <Calendar size={18} />
                    </div>
                    <span className="text-sm font-medium">Joined {format(new Date(user.createdAt), "MMMM yyyy")}</span>
                  </div>
                </div>
              </div>

              {/* Membership Status Card */}
              <div className="bg-gray-900 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl"></div>
                <h3 className="text-xl font-black mb-6">Membership Status</h3>
                {user.memberships.length > 0 ? (
                  <div className="space-y-6">
                    <div>
                      <p className="text-gray-400 text-xs uppercase tracking-widest font-bold mb-1">Type</p>
                      <p className="text-lg font-bold">{user.memberships[0].type} Membership</p>
                    </div>
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-gray-400 text-xs uppercase tracking-widest font-bold mb-1">Status</p>
                        <div className="flex items-center">
                          {user.memberships[0].status === "Active" ? (
                            <span className="flex items-center text-green-400 font-bold">
                              <CheckCircle size={16} className="mr-2" /> Active
                            </span>
                          ) : (
                            <span className="flex items-center text-yellow-400 font-bold">
                              <Clock size={16} className="mr-2" /> {user.memberships[0].status}
                            </span>
                          )}
                        </div>
                      </div>
                      {user.memberships[0].expiryDate && (
                        <div className="text-right">
                          <p className="text-gray-400 text-xs uppercase tracking-widest font-bold mb-1">Expires</p>
                          <p className="text-sm font-bold">{format(new Date(user.memberships[0].expiryDate), "MMM dd, yyyy")}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-400 italic">No active membership found.</p>
                )}
              </div>
            </div>

            {/* Donation/Transaction History */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-xl shadow-gray-200 border border-gray-100 overflow-hidden">
                <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-black text-gray-900">Transaction History</h3>
                    <p className="text-gray-500 font-medium">View your recent donations and membership payments</p>
                  </div>
                  <div className="bg-cyan-50 p-3 rounded-2xl text-cyan-500">
                    <CreditCard size={24} />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Date</th>
                        <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Reference</th>
                        <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Amount</th>
                        <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {user.transactions.length > 0 ? (
                        user.transactions.map((tx) => (
                          <tr key={tx.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-8 py-6">
                              <p className="text-sm font-bold text-gray-900">{format(new Date(tx.createdAt), "MMM dd, yyyy")}</p>
                              <p className="text-xs text-gray-400">{format(new Date(tx.createdAt), "hh:mm a")}</p>
                            </td>
                            <td className="px-8 py-6 font-mono text-xs text-gray-500">
                              {tx.reference}
                            </td>
                            <td className="px-8 py-6 font-black text-gray-900">
                              USD {tx.amount.toFixed(2)}
                            </td>
                            <td className="px-8 py-6">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest ${
                                tx.status === "Success" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"
                              }`}>
                                {tx.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="px-8 py-12 text-center text-gray-500 italic">
                            No transactions found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}