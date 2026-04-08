"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden relative">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <AdminSidebar onNavClick={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center px-4 lg:px-6 justify-between lg:justify-start shrink-0">
          <div className="flex items-center">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="mr-4 text-gray-500 hover:text-gray-900 lg:hidden p-2 -ml-2 rounded-md hover:bg-gray-100"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-semibold text-gray-800 hidden sm:block">Admin Dashboard</h1>
            <h1 className="text-lg font-bold text-gray-800 sm:hidden">NMM Admin</h1>
          </div>
        </header>

        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
