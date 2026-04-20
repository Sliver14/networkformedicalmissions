"use client";

import { useState } from "react";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { Download, Send } from "lucide-react";
import { sendNewsletter } from "@/app/actions/admin-newsletter";

export default function NewsletterManager({ subscribers }: { subscribers: any[] }) {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"list" | "compose">("list");

  const handleExportCSV = () => {
    const csvContent = [
      ["Email", "Subscribed At", "Status"],
      ...subscribers.map((s) => [
        s.email,
        new Date(s.createdAt).toLocaleDateString(),
        s.isSubscribed ? "Active" : "Unsubscribed",
      ]),
    ]
      .map((e) => e.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "nmm_subscribers.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !content) return alert("Subject and content are required.");
    
    if (!confirm("Are you sure you want to send this email to ALL active subscribers?")) return;

    setLoading(true);
    try {
      const res = await sendNewsletter(subject, content);
      alert(`Successfully sent to ${res.count} subscribers!`);
      setSubject("");
      setContent("");
      setActiveTab("list");
    } catch (error: any) {
      alert(error.message || "Failed to send emails.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Newsletter Management</h2>
        <div className="flex space-x-2 border border-gray-200 rounded-lg p-1 bg-white">
          <button
            onClick={() => setActiveTab("list")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "list" ? "bg-cyan-50 text-cyan-700" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Subscribers List
          </button>
          <button
            onClick={() => setActiveTab("compose")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "compose" ? "bg-cyan-50 text-cyan-700" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Compose Email
          </button>
        </div>
      </div>

      {activeTab === "list" ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <span className="text-sm text-gray-600 font-medium">Total: {subscribers.length} subscribers</span>
            <button
              onClick={handleExportCSV}
              className="flex items-center space-x-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-md transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="py-3 px-6 text-xs font-semibold text-gray-600 uppercase">Email</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-600 uppercase">Subscribed At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {subscribers.map((sub) => (
                <tr key={sub.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6 text-sm text-gray-900 font-medium">{sub.email}</td>
                  <td className="py-4 px-6 text-sm">
                    {sub.isSubscribed ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Unsubscribed
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500">
                    {new Date(sub.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {subscribers.length === 0 && (
                <tr>
                  <td colSpan={3} className="py-8 text-center text-gray-500">
                    No subscribers found yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <form onSubmit={handleSendEmail} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 border p-2"
              placeholder="Newsletter Subject"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Content</label>
            <RichTextEditor value={content} onChange={setContent} />
          </div>

          <div className="pt-4 border-t border-gray-200 flex justify-end">
            <button
              type="submit"
              disabled={loading || !subscribers.some(s => s.isSubscribed)}
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
              <span>{loading ? "Sending..." : "Send to All Active"}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
