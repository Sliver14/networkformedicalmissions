import PageHeader from "@/components/PageHeader";
import Accordion from "@/components/Accordion";
import Image from "next/image";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

const AboutPage = async () => {
  const values = await prisma.value.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "asc" }
  });

  const faqs = await prisma.faq.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "asc" }
  });

  // Fallback data if DB is empty
  const displayValues = values.length > 0 ? values : [
    { title: "Christian Faith" },
    { title: "Collaboration and Strategic Partnership" },
    { title: "Community Service" }
  ];

  const displayFaqs = faqs.length > 0 ? faqs.map(f => ({ title: f.question, content: f.answer })) : [
    {
      title: "How does the Network for Medical Missions operate?",
      content: "We operate as an international membership organization which houses national team supports and is coordinated through a global secretariat. Our structure allows for localized impact while maintaining a global standard of care and accountability."
    },
    {
      title: "What are the Network for Medical Missions’ areas of focus?",
      content: "We provide free surgeries, healthcare medicines, services, and as well as supplies to the communities of sick, frail, and poor people who are at a major risk of illness, poor health, and different diseases with an aim to foster community development and Christian missionary impact."
    }
  ];

  return (
    <div className="flex flex-col w-full">
      <PageHeader 
        title="Our Mission & Values" 
        breadcrumb={[{ label: "About Us" }]} 
      />

      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
            <div className="lg:w-1/2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image 
                  src="/assets/images/resources/about-page-img-1.jpg" 
                  alt="About NMM" 
                  width={600} 
                  height={500} 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 bg-cyan-500 p-6 md:p-8 rounded-xl text-white font-black shadow-xl">
                  <p className="text-lg md:text-xl">"Sharing and promoting the knowledge of God’s love."</p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 space-y-6 md:space-y-8 mt-8 lg:mt-0">
              <div className="space-y-4">
                <span className="text-cyan-500 font-black uppercase tracking-widest text-sm">About NMM</span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight">Our Mission Statement</h2>
              </div>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                We welcome Christian medical missionaries, health care professionals, partners as well as all those with a passion for providing medical, relief and community support services to hurting people around the world with the purpose of sharing and promoting the knowledge of God’s love through His Son, Jesus Christ.
              </p>
              
              <div className="pt-4 space-y-4 md:space-y-6">
                <h3 className="text-xl md:text-2xl font-black text-gray-900">Our Values</h3>
                <ul className="space-y-4">
                  {displayValues.map((value, i) => (
                    <li key={i} className="flex items-center space-x-4">
                      <div className="bg-cyan-100 p-2 rounded-full text-cyan-500 flex-shrink-0">
                        <Check size={20} />
                      </div>
                      <span className="font-bold text-gray-800 text-sm md:text-base">{value.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <Link href="/programs/free-surgeries" className="inline-flex items-center bg-cyan-500 text-white px-6 py-3 md:px-8 md:py-4 rounded font-black hover:bg-cyan-600 transition-colors mt-4 text-sm md:text-base">
                <ArrowRight className="mr-2" size={20} /> Discover Our Programs
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-10 md:mb-16">
            <span className="text-cyan-500 font-black uppercase tracking-widest text-sm">Have questions?</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900">Frequently Asked Questions</h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <Accordion items={displayFaqs} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
