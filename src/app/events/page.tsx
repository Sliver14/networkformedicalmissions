import prisma from "@/lib/prisma";
import PageHeader from "@/components/PageHeader";
import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function EventsIndex() {
  const events = await prisma.event.findMany({
    where: { isActive: true },
    orderBy: { startDate: "asc" }
  });

  return (
    <div className="flex flex-col w-full">
      <PageHeader 
        title="Upcoming Events" 
        breadcrumb={[{ label: "Events" }]} 
      />

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.length > 0 ? (
              events.map((event) => (
                <div key={event.id} className="group relative rounded-3xl overflow-hidden shadow-xl h-[450px] transition-all hover:scale-[1.02] duration-300">
                  <Image 
                    src={event.image || "/assets/images/resources/events-one-img-1.jpg"} 
                    alt={event.title} 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent opacity-90"></div>
                  
                  {/* Date Badge */}
                  <div className="absolute top-6 left-6 bg-cyan-500 text-white p-3 rounded-2xl text-center font-black leading-tight min-w-[70px] shadow-lg">
                    <span className="block text-2xl">
                      {event.startDate ? new Date(event.startDate).getDate() : "00"}
                    </span>
                    <span className="block text-sm uppercase">
                      {event.startDate ? new Date(event.startDate).toLocaleString('default', { month: 'short' }) : "Mon"}
                    </span>
                  </div>
                  
                  {/* Content Overlay */}
                  <div className="absolute bottom-8 left-8 right-8 text-white space-y-4">
                    <div className="flex items-center text-sm font-bold opacity-80 gap-6">
                      <span className="flex items-center">
                        <Clock className="mr-2 text-cyan-400" size={16} /> 
                        {event.startDate ? new Date(event.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "10:00 am"}
                      </span>
                      {event.location && (
                        <span className="flex items-center">
                          <MapPin className="mr-2 text-cyan-400" size={16} /> 
                          {event.location}
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-black leading-tight">
                      <Link href={`/events/${event.slug}`} className="hover:text-cyan-400 transition-colors">{event.title}</Link>
                    </h3>
                    <Link href={`/events/${event.slug}`} className="inline-flex items-center bg-white text-gray-900 px-6 py-3 rounded-xl font-black hover:bg-cyan-500 hover:text-white transition-all">
                      <ArrowRight size={18} className="mr-2" /> View Details
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <p className="text-gray-500 text-xl font-bold">No upcoming events available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
