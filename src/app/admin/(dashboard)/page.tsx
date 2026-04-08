import prisma from "@/lib/prisma";
import { Newspaper, Mail, Users, Calendar, DollarSign, BadgeCheck } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const [
    newsCount, 
    subscribersCount, 
    volunteersCount, 
    eventsCount,
    totalDonationsResult,
    membershipsResult
  ] = await Promise.all([
    prisma.news.count(),
    prisma.newsletter.count({ where: { isSubscribed: true } }),
    prisma.volunteer.count(),
    prisma.event.count(),
    prisma.transaction.aggregate({
      _sum: { amount: true },
      where: { status: "Success" }
    }),
    prisma.membership.groupBy({
      by: ['type'],
      _count: { id: true },
      where: { status: "Active" }
    })
  ]);

  const totalDonations = totalDonationsResult._sum.amount || 0;

  // Convert membership groups into a map for easy access
  const membershipCounts = membershipsResult.reduce((acc, curr) => {
    acc[curr.type] = curr._count.id;
    return acc;
  }, {} as Record<string, number>);

  const stats = [
    { title: "Total News Posts", value: newsCount, icon: Newspaper, color: "text-blue-600", bg: "bg-blue-100" },
    { title: "Upcoming Events", value: eventsCount, icon: Calendar, color: "text-orange-600", bg: "bg-orange-100" },
    { title: "Active Subscribers", value: subscribersCount, icon: Mail, color: "text-green-600", bg: "bg-green-100" },
    { title: "Total Volunteers", value: volunteersCount, icon: Users, color: "text-purple-600", bg: "bg-purple-100" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.title} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center space-x-4">
                <div className={`p-4 rounded-full ${stat.bg} ${stat.color}`}>
                  <Icon className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Donations Overview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">Total Donations</h3>
            <div className="p-3 rounded-full bg-emerald-100 text-emerald-600">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>
          <p className="text-4xl font-black text-gray-900 mb-2">
            ₦{totalDonations.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className="text-sm text-gray-500">Successfully processed payments via Paystack</p>
        </div>

        {/* Memberships Overview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-800">Active Memberships</h3>
            <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
              <BadgeCheck className="w-6 h-6" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-gray-50 pb-2">
              <span className="text-gray-600 font-medium">Individual Members</span>
              <span className="font-bold text-gray-900">{membershipCounts["Individual"] || 0}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-50 pb-2">
              <span className="text-gray-600 font-medium">Associate Members</span>
              <span className="font-bold text-gray-900">{membershipCounts["Associate"] || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Honorary Members</span>
              <span className="font-bold text-gray-900">{membershipCounts["Honorary"] || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
