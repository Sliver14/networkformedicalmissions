import PageHeader from "@/components/PageHeader";
import { CheckCircle, XCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

const CriteriaPage = () => {
  return (
    <div className="flex flex-col w-full">
      <PageHeader 
        title="Selection Criteria" 
        breadcrumb={[{ label: "About Us", href: "/about" }, { label: "Selection Criteria" }]} 
      />

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8 mb-20">
            <span className="text-cyan-500 font-black uppercase tracking-widest text-sm">Partner With Us</span>
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight">Criteria for Beneficiary & Partner Selection</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              The Network for Medical Missions operates through its partner organizations, institutes, and hospitals to help those who cannot afford to pay for their treatments including surgical procedures. We look forward to more strategic partnerships to bring quality health care to an increasing number of indigent, impoverished and vulnerable communities.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* What We Do */}
            <div className="bg-white rounded-3xl p-10 lg:p-16 shadow-xl border-t-8 border-cyan-500">
              <h3 className="text-3xl font-black text-gray-900 mb-10 flex items-center">
                <CheckCircle className="text-cyan-500 mr-4" size={32} /> What We Do
              </h3>
              <ul className="space-y-6">
                {[
                  "We support free treatment programmes for families that cannot afford it.",
                  "Share costs with partners to maximise support.",
                  "Encourage self-sufficiency among our partners.",
                  "Regularly monitor and manage all programmes and partners.",
                  "Ensure our partners meet the highest safety and quality standards."
                ].map((item, i) => (
                  <li key={i} className="flex items-start space-x-4">
                    <div className="bg-green-100 p-1 rounded-full text-green-500 mt-1">
                      <CheckCircle size={18} />
                    </div>
                    <span className="text-lg text-gray-700 font-bold">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What We Do NOT Support */}
            <div className="bg-white rounded-3xl p-10 lg:p-16 shadow-xl border-t-8 border-pink-500">
              <h3 className="text-3xl font-black text-gray-900 mb-10 flex items-center">
                <XCircle className="text-pink-500 mr-4" size={32} /> What We Do Not Do
              </h3>
              <ul className="space-y-6">
                {[
                  "Pay for treatments and services for those who can pay them.",
                  "Pay for procedures that are covered by other organisations (e.g., government, insurance, charities).",
                  "Support organisations that do not offer safe and high-quality care."
                ].map((item, i) => (
                  <li key={i} className="flex items-start space-x-4">
                    <div className="bg-pink-100 p-1 rounded-full text-pink-500 mt-1">
                      <XCircle size={18} />
                    </div>
                    <span className="text-lg text-gray-700 font-bold">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-24 text-center space-y-8 bg-gray-50 rounded-3xl p-12 lg:p-20">
            <h4 className="text-2xl lg:text-3xl font-black text-gray-400 uppercase tracking-widest leading-relaxed">
              Join hands with us in improving the health and well-being of people by networking the world for good.
            </h4>
            <Link href="/support" className="inline-flex items-center bg-cyan-500 text-white px-10 py-5 rounded-full font-black hover:bg-cyan-600 transition-all transform hover:scale-105 shadow-xl">
              <ArrowRight className="mr-2" size={24} /> Become a Partner Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CriteriaPage;
