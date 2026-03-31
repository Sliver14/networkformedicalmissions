import PageHeader from "@/components/PageHeader";
import Image from "next/image";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const galleryItems = await prisma.gallery.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" }
  });

  const displayItems = galleryItems.length > 0 ? galleryItems : [
    { title: "Medical Outreach 1", imagePath: "/1.jpeg" },
    { title: "Surgical Team", imagePath: "/2.jpeg" },
    { title: "Community Health Fair", imagePath: "/4.jpeg" },
    { title: "Patient Care", imagePath: "/5.jpeg" },
    { title: "Mission Trip", imagePath: "/6.jpeg" },
    { title: "Medical Supplies", imagePath: "/7.jpeg" },
  ];

  return (
    <div className="flex flex-col w-full">
      <PageHeader 
        title="Our Gallery" 
        breadcrumb={[{ label: "Gallery" }]} 
      />

      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {displayItems.map((item, index) => (
              <div key={index} className="group relative overflow-hidden rounded-3xl shadow-xl h-[250px] md:h-[350px]">
                <Image 
                  src={item.imagePath} 
                  alt={item.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-cyan-500/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-6 md:p-8 text-center">
                  <div className="transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-white text-xl md:text-2xl font-black">{item.title}</h3>
                    <div className="w-8 md:w-12 h-1 bg-white mx-auto mt-4 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
