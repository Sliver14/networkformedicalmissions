"use client";

import { useState } from "react";
import { createMedia } from "@/app/actions/admin-gallery";
import MediaUpload from "@/components/admin/MediaUpload";
import { Save, ArrowLeft, Image as ImageIcon, Film } from "lucide-react";
import Link from "next/link";

export default function NewGalleryItemPage() {
  const [url, setUrl] = useState("");
  const [type, setType] = useState<"image" | "video">("image");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!url) {
      alert("Please upload a file first");
      return;
    }

    setLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.set("url", url);
    formData.set("type", type);
    
    try {
      await createMedia(formData);
      window.location.href = "/admin/gallery";
    } catch (error) {
      console.error(error);
      alert("Failed to save gallery item.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <Link href="/admin/gallery" className="text-gray-500 hover:text-gray-700">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h2 className="text-2xl font-bold text-gray-800">Add New Gallery Item</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Media Type
          </label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => { setType("image"); setUrl(""); }}
              className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl border-2 transition-all ${
                type === "image" ? "border-cyan-600 bg-cyan-50 text-cyan-600" : "border-gray-100 hover:border-gray-200"
              }`}
            >
              <ImageIcon size={20} />
              <span className="font-bold">Image</span>
            </button>
            <button
              type="button"
              onClick={() => { setType("video"); setUrl(""); }}
              className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl border-2 transition-all ${
                type === "video" ? "border-cyan-600 bg-cyan-50 text-cyan-600" : "border-gray-100 hover:border-gray-200"
              }`}
            >
              <Film size={20} />
              <span className="font-bold">Video</span>
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            required
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 border p-2"
            placeholder="Enter a descriptive title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Caption (Optional)
          </label>
          <textarea
            name="caption"
            rows={3}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 border p-2"
            placeholder="Enter a caption for the media"
          ></textarea>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="isActive"
            id="isActive"
            defaultChecked
            className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
          />
          <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
            Item is visible in gallery
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-widest text-xs font-bold">
            Upload {type}
          </label>
          <MediaUpload type={type} value={url} onChange={setUrl} />
        </div>

        <div className="pt-4 border-t border-gray-200 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 rounded-lg flex items-center space-x-2 disabled:opacity-50 font-bold"
          >
            <Save className="w-5 h-5" />
            <span>{loading ? "Saving..." : "Save to Gallery"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
