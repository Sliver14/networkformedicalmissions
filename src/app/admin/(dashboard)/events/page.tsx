import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit } from "lucide-react";
import DeleteEventButton from "@/components/admin/DeleteEventButton";

export const dynamic = 'force-dynamic';

export default async function AdminEventsPage() {
  const events = await prisma.event.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Events</h2>
        <Link
          href="/admin/events/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Create New Event</span>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Title</th>
              <th className="py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
              <th className="py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
              <th className="py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Location</th>
              <th className="py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {events.map((event) => (
              <tr key={event.id} className="hover:bg-gray-50">
                <td className="py-4 px-6 text-sm text-gray-900 font-medium">
                  {event.title}
                </td>
                <td className="py-4 px-6 text-sm">
                  {event.isActive ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Inactive
                    </span>
                  )}
                </td>
                <td className="py-4 px-6 text-sm text-gray-500">
                  {event.startDate ? new Date(event.startDate).toLocaleDateString() : "TBA"}
                </td>
                <td className="py-4 px-6 text-sm text-gray-500">
                  {event.location || "N/A"}
                </td>
                <td className="py-4 px-6 text-sm text-right flex justify-end space-x-3">
                  <Link
                    href={`/admin/events/${event.id}`}
                    className="text-blue-600 hover:text-blue-900 flex items-center space-x-1"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </Link>
                  <DeleteEventButton id={event.id} />
                </td>
              </tr>
            ))}
            {events.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-500">
                  No events found. Create one to get started!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
