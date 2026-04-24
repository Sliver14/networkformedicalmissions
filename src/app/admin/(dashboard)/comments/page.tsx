import prisma from "@/lib/prisma";
import { MessageSquare } from "lucide-react";
import DeleteCommentButton from "@/components/admin/DeleteCommentButton";
import ToggleCommentApprovalButton from "@/components/admin/ToggleCommentApprovalButton";

export const dynamic = 'force-dynamic';

export default async function AdminCommentsPage() {
  const comments = await prisma.comment.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      news: {
        select: {
          title: true,
          slug: true
        }
      }
    }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
          <MessageSquare className="w-6 h-6 text-cyan-600" />
          <span>Comments</span>
        </h2>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">User</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Comment</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">On Post</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {comments.map((comment) => (
                <tr key={comment.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6 text-sm">
                    <div className="font-medium text-gray-900">{comment.name}</div>
                    <div className="text-gray-500 text-xs">{comment.email}</div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600 max-w-xs truncate" title={comment.content}>
                    {comment.content}
                  </td>
                  <td className="py-4 px-6 text-sm text-cyan-600">
                    {comment.news?.title || "Deleted Post"}
                  </td>
                  <td className="py-4 px-6 text-sm">
                    <ToggleCommentApprovalButton id={comment.id} isApproved={comment.isApproved} />
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6 text-sm text-right flex justify-end space-x-3">
                    <DeleteCommentButton id={comment.id} />
                  </td>
                </tr>
              ))}
              {comments.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500">
                    No comments found.
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
