import PageHeader from "@/components/PageHeader";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function VideoGalleryPage() {
  let videoItems: any[] = [];

  try {
    videoItems = await prisma.gallery.findMany({
      where: { 
        isActive: true,
        type: "video"
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.warn("Database connection failed, using fallback empty data:", error);
  }

  const displayItems = videoItems;

  return (
    <div className="flex flex-col w-full">
      <PageHeader 
        title="Video Gallery" 
        breadcrumb={[{ label: "Media" }, { label: "Video Gallery" }]} 
      />

      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {displayItems.map((item, index) => (
              <div key={index} className="flex flex-col gap-4">
                <div className="relative overflow-hidden rounded-3xl shadow-xl aspect-video bg-black">
                  <video 
                    src={item.url} 
                    controls 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="px-2">
                    <h3 className="text-xl font-black text-gray-900">{item.title}</h3>
                    {item.caption && <p className="text-gray-500 mt-1">{item.caption}</p>}
                </div>
              </div>
            ))}
          </div>

          {displayItems.length === 0 && (
            <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
              <p className="text-gray-500 font-black text-xl">Our video gallery is coming soon!</p>
              <p className="text-gray-400 mt-2">We are currently preparing impactful videos to share with you.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
