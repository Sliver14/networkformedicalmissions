"use client";

import { useState } from "react";
import { createNews } from "@/app/actions/admin-news";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

import ImageUpload from "@/components/admin/ImageUpload";

export default function NewPostPage() {
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    formData.set("content", content);
    formData.set("image", image);
    
    try {
      await createNews(formData);
    } catch (error) {
      console.error(error);
      alert("Failed to create post. Make sure title and content are provided.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <Link href="/admin/news" className="text-gray-500 hover:text-gray-700">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h2 className="text-2xl font-bold text-gray-800">Create New Post</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Post Title
          </label>
          <input
            type="text"
            name="title"
            required
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border p-2"
            placeholder="Enter post title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cover Image
          </label>
          <ImageUpload value={image} onChange={setImage} />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="isPublished"
            id="isPublished"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-900">
            Publish immediately
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Post Content
          </label>
          <RichTextEditor value={content} onChange={setContent} />
        </div>

        <div className="pt-4 border-t border-gray-200 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            <span>{loading ? "Saving..." : "Save Post"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
