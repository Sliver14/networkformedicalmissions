import prisma from "@/lib/prisma";
import { Newspaper, Mail, Users } from "lucide-react";

export default async function AdminDashboard() {
  const [newsCount, subscribersCount, volunteersCount] = await Promise.all([
    prisma.news.count(),
    prisma.newsletter.count({ where: { isSubscribed: true } }),
    prisma.volunteer.count(),
  ]);

  const stats = [
    { title: "Total News Posts", value: newsCount, icon: Newspaper, color: "text-blue-600", bg: "bg-blue-100" },
    { title: "Active Subscribers", value: subscribersCount, icon: Mail, color: "text-green-600", bg: "bg-green-100" },
    { title: "Total Volunteers", value: volunteersCount, icon: Users, color: "text-purple-600", bg: "bg-purple-100" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
  );
}
