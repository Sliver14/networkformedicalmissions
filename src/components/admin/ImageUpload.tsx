"use client";

import { useState } from "react";
import { Upload, X, ImageIcon } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
}

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.url) {
        onChange(data.url);
      } else {
        alert("Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center gap-4">
        {value ? (
          <div className="relative w-40 h-40 rounded-lg overflow-hidden border border-gray-200">
            <Image
              src={value}
              alt="Upload"
              fill
              className="object-cover"
            />
            <button
              onClick={() => onChange("")}
              className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
              type="button"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="w-40 h-40 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center bg-gray-50">
            <ImageIcon className="w-10 h-10 text-gray-400 mb-2" />
            <span className="text-xs text-gray-500 text-center px-2">No image selected</span>
          </div>
        )}

        <div className="flex-1">
          <label className="relative cursor-pointer bg-white border border-gray-300 rounded-md py-2 px-4 inline-flex items-center space-x-2 hover:bg-gray-50 transition-colors">
            <Upload className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">
              {uploading ? "Uploading..." : "Select Image"}
            </span>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleUpload}
              disabled={uploading}
            />
          </label>
          <p className="text-xs text-gray-500 mt-2">
            Recommended: 800x600px or larger. Max 5MB.
          </p>
        </div>
      </div>
      <input type="hidden" name="image" value={value} />
    </div>
  );
}
