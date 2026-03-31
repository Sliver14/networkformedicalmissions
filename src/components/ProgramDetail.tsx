import PageHeader from "@/components/PageHeader";
import Image from "next/image";
import Link from "next/link";
import { Check, MapPin, Mail, Heart } from "lucide-react";

interface ProgramDetailProps {
  title: string;
  breadcrumbLabel: string;
  image: string;
  subtitle: string;
  description: string;
  points?: { title?: string; text: string }[];
  additionalContent?: { title: string; text: string };
}

const ProgramDetail = ({
  title,
  breadcrumbLabel,
  image,
  subtitle,
  description,
  points,
  additionalContent
}: ProgramDetailProps) => {
  return (
    <div className="flex flex-col w-full">
      <PageHeader 
        title={title} 
        breadcrumb={[{ label: "Programs" }, { label: breadcrumbLabel }]} 
      />

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left Content */}
            <div className="lg:w-2/3 space-y-10">
              <div className="rounded-3xl overflow-hidden shadow-xl">
                <Image 
                  src={image} 
                  alt={title} 
                  width={800} 
                  height={500} 
                  className="w-full h-auto object-cover"
                />
              </div>
              
              <div className="space-y-6">
                <h3 className="text-3xl font-black text-gray-900">{subtitle}</h3>
                <p className="text-lg text-gray-600 leading-relaxed">{description}</p>
                
                {additionalContent && (
                  <div className="bg-gray-50 p-8 rounded-2xl border-l-4 border-cyan-500 space-y-4">
                    <h4 className="text-xl font-black text-gray-900">{additionalContent.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{additionalContent.text}</p>
                  </div>
                )}

                {points && (
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                    {points.map((point, i) => (
                      <li key={i} className="flex items-start space-x-4">
                        <div className="bg-cyan-100 p-2 rounded-full text-cyan-500 mt-1">
                          <Check size={18} />
                        </div>
                        <div>
                          {point.title && <strong className="block text-gray-900 mb-1">{point.title}</strong>}
                          <p className="text-gray-600">{point.text}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:w-1/3 space-y-8">
              {/* Organizer Info */}
              <div className="bg-gray-50 rounded-3xl p-8 space-y-6 border border-gray-100">
                <div className="flex items-center space-x-4 pb-6 border-b border-gray-200">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-cyan-500">
                    <Image src="/assets/images/resources/causes-details-organizar-img-1.jpg" alt="Organizer" fill className="object-cover" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Program Directed By</p>
                    <h5 className="text-lg font-black text-gray-900">Network for Medical Missions</h5>
                  </div>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-center space-x-3 text-gray-600">
                    <MapPin className="text-cyan-500" size={20} />
                    <span>Global Secretariat</span>
                  </li>
                  <li className="flex items-center space-x-3 text-gray-600">
                    <Mail className="text-cyan-500" size={20} />
                    <span className="truncate">contact@networkformedicalmissions.org</span>
                  </li>
                </ul>
              </div>

              {/* Donation Widget */}
              <div className="bg-cyan-500 rounded-3xl p-8 text-white text-center space-y-6 shadow-xl shadow-cyan-200">
                <h3 className="text-2xl font-black">Support This Program</h3>
                <p className="opacity-90">Your donation helps us provide essential medical services to those in need.</p>
                <Link href="/support" className="flex items-center justify-center bg-white text-cyan-500 py-4 rounded-xl font-black hover:bg-gray-50 transition-colors w-full">
                  <Heart className="mr-2" size={20} /> Donate Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProgramDetail;
