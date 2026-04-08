"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Newspaper, Mail, LogOut, Calendar } from "lucide-react";
import { signOut } from "next-auth/react";
import clsx from "clsx";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "News", href: "/admin/news", icon: Newspaper },
  { name: "Events", href: "/admin/events", icon: Calendar },
  { name: "Newsletter", href: "/admin/newsletter", icon: Mail },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 h-full bg-slate-900 text-white flex flex-col shadow-xl lg:shadow-none">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-white">NMM Admin</h2>
      </div>
      
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.href === '/admin' 
            ? pathname === '/admin' 
            : pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
                isActive 
                  ? "bg-blue-600 text-white" 
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button
          onClick={() => signOut({ callbackUrl: `${window.location.origin}/admin/login` })}
          className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg text-slate-300 hover:bg-slate-800 hover:text-red-400 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}
