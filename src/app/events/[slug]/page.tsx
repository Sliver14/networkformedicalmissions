import prisma from "@/lib/prisma";
import PageHeader from "@/components/PageHeader";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, MapPin, Calendar, ArrowRight } from "lucide-react";

interface Props {
  params: { slug: string };
}

export default async function EventDetail({ params }: Props) {
  const event = await prisma.event.findUnique({
    where: { slug: params.slug }
  });

  if (!event) {
    notFound();
  }

  return (
    <div className="flex flex-col w-full">
      <PageHeader 
        title={event.title} 
        breadcrumb={[{ label: "Events", href: "/events" }, { label: "Details" }]} 
      />

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Featured Image */}
            <div className="relative h-[450px] rounded-3xl overflow-hidden shadow-2xl">
              <Image 
                src={event.image || "/assets/images/resources/events-one-img-1.jpg"} 
                alt={event.title} 
                fill 
                className="object-cover" 
              />
            </div>

            {/* Content Section */}
            <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-gray-100 space-y-8">
              <div className="flex flex-wrap gap-8 text-sm font-bold border-b border-gray-100 pb-8 text-gray-500">
                <span className="flex items-center gap-2">
                  <Calendar size={18} className="text-cyan-500" />
                  {event.startDate ? new Date(event.startDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : "TBA"}
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={18} className="text-cyan-500" />
                  {event.startDate ? new Date(event.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}
                  {event.endDate ? ` - ${new Date(event.endDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : ""}
                </span>
                {event.location && (
                  <span className="flex items-center gap-2">
                    <MapPin size={18} className="text-pink-500" />
                    {event.location}
                  </span>
                )}
              </div>

              <h1 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
                {event.title}
              </h1>

              <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-6">
                {event.description.split('\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {/* Action Area */}
              <div className="mt-12 pt-12 border-t border-gray-100 space-y-6">
                <h4 className="text-2xl font-black text-gray-900">Join This Event</h4>
                <p className="text-gray-600 leading-relaxed">
                  Interested in participating or volunteering for this event? Reach out to us for more details and registration information.
                </p>
                <Link href="/contact" className="inline-flex items-center bg-cyan-500 text-white px-8 py-4 rounded-xl font-black hover:bg-cyan-600 transition-all shadow-xl shadow-cyan-100">
                  <ArrowRight size={20} className="mr-2" /> Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
