import prisma from "@/lib/prisma";
import PageHeader from "@/components/PageHeader";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, Eye } from "lucide-react";
import NewsDetailClient from "@/components/NewsDetailClient";
import { incrementViews } from "@/app/actions/news";

interface Props {
  params: { slug: string };
}

export default async function NewsDetail({ params }: Props) {
  const newsItem = await prisma.news.findUnique({
    where: { slug: params.slug },
    include: {
      comments: {
        where: { isApproved: true },
        orderBy: { createdAt: "asc" }
      }
    }
  });

  if (!newsItem) {
    notFound();
  }

  // Background increment views
  incrementViews(newsItem.id);

  return (
    <div className="flex flex-col w-full">
      <PageHeader 
        title={newsItem.title} 
        breadcrumb={[{ label: "News", href: "/news" }, { label: "Details" }]} 
      />

      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8 md:space-y-12">
            {/* Featured Image */}
            <div className="relative h-[300px] md:h-[450px] rounded-3xl overflow-hidden shadow-2xl">
              <Image 
                src={newsItem.image || "/31.jpeg"} 
                alt={newsItem.title} 
                fill 
                className="object-cover" 
              />
            </div>

            {/* Content Section */}
            <div className="bg-white rounded-3xl p-6 md:p-8 lg:p-12 shadow-sm border border-gray-100 space-y-6 md:space-y-8">
              <div className="flex flex-wrap gap-4 md:gap-6 text-xs md:text-sm font-bold text-gray-400 border-b border-gray-100 pb-6 md:pb-8">
                <span className="flex items-center gap-2">
                  <Calendar size={18} className="text-cyan-500" />
                  {newsItem.publishedAt ? new Date(newsItem.publishedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : "Recently"}
                </span>
                <span className="flex items-center gap-2">
                  <Eye size={18} className="text-cyan-500" />
                  {Number(newsItem.views)} Views
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
                {newsItem.title}
              </h1>

              <div className="prose prose-base md:prose-lg max-w-none text-gray-600 leading-relaxed space-y-4 md:space-y-6">
                {newsItem.content.split('\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {/* Client Interactions (Likes & Comments) */}
              <NewsDetailClient 
                newsId={newsItem.id} 
                initialLikes={Number(newsItem.likes)} 
                comments={newsItem.comments} 
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
