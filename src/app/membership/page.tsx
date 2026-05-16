import PageHeader from "@/components/PageHeader";
import { CheckCircle, ArrowRight, User, Users, Award } from "lucide-react";
import Link from "next/link";

const MembershipPage = () => {
  const tiers = [
    {
      title: "Individual Membership",
      price: "$20",
      period: "Annual",
      description: "Open to all who wish to support our mission and stay updated with our impact globally.",
      icon: <User className="w-8 h-8" />,
      benefits: [
        "Regular Newsletter Updates",
        "Invitations to Special Events",
        "Networking with a Purpose"
      ],
      link: "/membership/individual",
      buttonText: "Join as Individual",
      color: "cyan"
    },
    {
      title: "Associate Membership",
      price: "$50",
      period: "Annual",
      description: "Open to physicians and health care/development specialists. Join a global network of professionals.",
      icon: <Users className="w-8 h-8" />,
      benefits: [
        "Governance Opportunities",
        "Conference and Seminars Discounts",
        "World-wide Networking",
        "Official Certification"
      ],
      link: "/membership/associate",
      buttonText: "Join as Associate",
      color: "cyan"
    },
    {
      title: "Honorary Membership",
      price: "By Invitation",
      period: "Special",
      description: "Awarded to individuals who have shown exceptional commitment to medical missions.",
      icon: <Award className="w-8 h-8" />,
      benefits: [
        "Special Recognition",
        "Lifetime Association",
        "Advisory Roles",
        "VIP Event Access"
      ],
      link: "/contact",
      buttonText: "Contact Us",
      color: "gray"
    }
  ];

  return (
    <div className="flex flex-col w-full">
      <PageHeader title="Membership Options" breadcrumb={[{ label: "Membership" }]} />

      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-cyan-500 font-black uppercase tracking-widest text-sm">Join the Network</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight">Choose Your Membership Tier</h2>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              Select the membership level that best fits your commitment to networking the world for good through medical missions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tiers.map((tier, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 lg:p-10 shadow-xl shadow-gray-200 border border-gray-100 flex flex-col relative overflow-hidden group">
                {tier.period === "Special" && (
                  <div className="absolute top-0 right-0 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest py-2 px-6 rounded-bl-2xl">
                    Exclusive
                  </div>
                )}
                
                <div className="bg-cyan-50 text-cyan-500 p-4 rounded-2xl w-fit mb-8 group-hover:scale-110 transition-transform duration-500">
                  {tier.icon}
                </div>

                <h3 className="text-2xl font-black text-gray-900 mb-2">{tier.title}</h3>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl font-black text-gray-900">{tier.price}</span>
                  <span className="text-gray-400 font-bold text-sm uppercase">/ {tier.period}</span>
                </div>

                <p className="text-gray-600 mb-8 leading-relaxed">
                  {tier.description}
                </p>

                <div className="space-y-4 mb-10 flex-grow">
                  {tier.benefits.map((benefit, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <CheckCircle className="text-cyan-500 w-5 h-5 flex-shrink-0" />
                      <span className="text-gray-700 font-bold text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>

                <Link 
                  href={tier.link}
                  className={`w-full py-5 rounded-2xl font-black text-center transition-all flex items-center justify-center gap-2 ${
                    tier.color === "cyan" 
                    ? "bg-cyan-500 text-white hover:bg-cyan-600 shadow-lg shadow-cyan-100" 
                    : "bg-gray-900 text-white hover:bg-gray-800 shadow-lg shadow-gray-100"
                  }`}
                >
                  {tier.buttonText} <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MembershipPage;
