"use client";

import { useState } from "react";
import { Upload, X, ImageIcon } from "lucide-react";
import Image from "next/image";

interface MultiImageUploadProps {
  value: string; // comma-separated URLs
  onChange: (urls: string) => void;
}

export default function MultiImageUpload({ value, onChange }: MultiImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  const images = value ? value.split(',').filter(url => url.trim() !== '') : [];

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    const newUrls: string[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append("file", files[i]);

      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (data.url) {
          newUrls.push(data.url);
        }
      } catch (error) {
        console.error("Upload error:", error);
      }
    }

    if (newUrls.length > 0) {
      const updatedImages = [...images, ...newUrls];
      onChange(updatedImages.join(','));
    } else {
      alert("Upload failed for all selected images.");
    }
    
    setUploading(false);
  };

  const handleRemove = (indexToRemove: number) => {
    const updatedImages = images.filter((_, index) => index !== indexToRemove);
    onChange(updatedImages.join(','));
  };

  return (
    <div className="space-y-4 w-full">
      <div className="flex flex-wrap gap-4">
        {images.map((imgUrl, index) => (
          <div key={index} className="relative w-40 h-40 rounded-lg overflow-hidden border border-gray-200">
            <Image
              src={imgUrl}
              alt={`Upload ${index + 1}`}
              fill
              className="object-cover"
            />
            <button
              onClick={() => handleRemove(index)}
              className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors z-10"
              type="button"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}

        <div className="w-40 h-40 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center bg-gray-50 relative hover:bg-gray-100 transition-colors cursor-pointer">
          <Upload className="w-8 h-8 text-gray-400 mb-2" />
          <span className="text-xs font-medium text-gray-600">
            {uploading ? "Uploading..." : "Add Images"}
          </span>
          <input
            type="file"
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            accept="image/*"
            multiple
            onChange={handleUpload}
            disabled={uploading}
          />
        </div>
      </div>
      
      <p className="text-xs text-gray-500">
        You can upload multiple images. Recommended: 800x600px or larger. Max 5MB per image.
      </p>
      <input type="hidden" name="image" value={value} />
    </div>
  );
}
