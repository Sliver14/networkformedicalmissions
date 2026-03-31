import prisma from "@/lib/prisma";
import PageHeader from "@/components/PageHeader";
import Image from "next/image";
import Link from "next/link";
import { Eye, Heart, MessageSquare, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function NewsIndex() {
  const news = await prisma.news.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: "desc" },
    include: {
      _count: {
        select: { comments: { where: { isApproved: true } } }
      }
    }
  });

  return (
    <div className="flex flex-col w-full">
      <PageHeader 
        title="Latest News & Articles" 
        breadcrumb={[{ label: "News" }]} 
      />

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.length > 0 ? (
              news.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 flex flex-col group transition-all hover:shadow-2xl">
                  <div className="relative h-64 overflow-hidden">
                    <Image 
                      src={item.image || "/31.jpeg"} 
                      alt={item.title} 
                      fill 
                      className="object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                    <div className="absolute top-4 left-4 bg-cyan-500 text-white px-3 py-1 rounded font-bold text-xs">
                      {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : "Recently"}
                    </div>
                  </div>
                  
                  <div className="p-8 space-y-4 flex-grow flex flex-col">
                    <div className="flex items-center gap-6 text-sm font-bold text-gray-400">
                      <span className="flex items-center"><Eye size={16} className="mr-1 text-cyan-500" /> {Number(item.views)}</span>
                      <span className="flex items-center"><Heart size={16} className="mr-1 text-cyan-500" /> {Number(item.likes)}</span>
                      <span className="flex items-center"><MessageSquare size={16} className="mr-1 text-cyan-500" /> {item._count.comments}</span>
                    </div>
                    
                    <h3 className="text-2xl font-black leading-tight text-gray-900 group-hover:text-cyan-500 transition-colors">
                      <Link href={`/news/${item.slug}`} className="line-clamp-2">{item.title}</Link>
                    </h3>
                    
                    <p className="text-gray-600 line-clamp-3 flex-grow">
                      {item.content.replace(/<[^>]*>?/gm, '').substring(0, 120)}...
                    </p>
                    
                    <Link href={`/news/${item.slug}`} className="inline-flex items-center bg-cyan-500 text-white px-6 py-3 rounded-xl font-black hover:bg-cyan-600 transition-all self-start">
                      <ArrowRight size={18} className="mr-2" /> Read More
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <p className="text-gray-500 text-xl font-bold">No news articles available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
