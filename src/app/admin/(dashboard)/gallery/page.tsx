import prisma from "@/lib/prisma";
import { Plus, Trash2, Image as ImageIcon, Film } from "lucide-react";
import Link from "next/link";
import { deleteMedia } from "@/app/actions/admin-gallery";

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  const mediaItems = await prisma.gallery.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Media Gallery</h2>
        <Link
          href="/admin/gallery/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Media</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mediaItems.map((item) => (
          <div key={item.id} className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm flex flex-col group">
            <div className="relative aspect-video bg-gray-100 flex items-center justify-center overflow-hidden">
              {item.type === "image" ? (
                <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
              ) : (
                <div className="relative w-full h-full">
                  <video src={item.url} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <Film className="w-12 h-12 text-white opacity-80" />
                  </div>
                </div>
              )}
              
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <form action={async () => {
                  "use server";
                  await deleteMedia(item.id);
                }}>
                  <button className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 shadow-lg">
                    <Trash2 size={18} />
                  </button>
                </form>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center gap-2 mb-1">
                {item.type === "image" ? <ImageIcon size={14} className="text-blue-500" /> : <Film size={14} className="text-purple-500" />}
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{item.type}</span>
              </div>
              <h3 className="font-bold text-gray-800 truncate">{item.title}</h3>
              <p className="text-xs text-gray-500 mt-1 line-clamp-1">{item.caption || "No caption"}</p>
            </div>
          </div>
        ))}

        {mediaItems.length === 0 && (
          <div className="col-span-full py-20 text-center bg-white rounded-2xl border-2 border-dashed border-gray-200">
            <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">No media found in the gallery.</p>
            <Link href="/admin/gallery/new" className="text-blue-600 font-bold hover:underline mt-2 inline-block">
              Upload your first image or video
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
