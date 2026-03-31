"use client";

import PageHeader from "@/components/PageHeader";
import { Heart, Activity, Pill, HeartPulse, ArrowRight } from "lucide-react";
import { useState } from "react";

const SupportPage = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    project: "",
    amount: "",
    name: "",
    email: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/paystack/initialize", {
        method: "POST",
        body: JSON.stringify({
          email: formData.email,
          amount: parseFloat(formData.amount),
          metadata: {
            name: formData.name,
            project: formData.project,
            type: "donation"
          }
        })
      });

      const data = await res.json();
      if (data.authorization_url) {
        window.location.href = data.authorization_url;
      } else {
        alert("Payment initialization failed: " + data.error);
      }
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <PageHeader title="Support Our Projects" breadcrumb={[{ label: "Support" }]} />

      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 text-center max-w-4xl mb-12 md:mb-20 space-y-4 md:space-y-6">
          <span className="text-cyan-500 font-black uppercase tracking-widest text-sm">Partner with NMM</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight">Support Our Missions</h2>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
            Join hands with us in improving the health and well-being of people by networking the world for good. Your contributions directly support free surgeries, health fairs, and medical outreaches.
          </p>
        </div>

        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            {/* Funding Needs */}
            <div className="lg:w-1/2 space-y-8 md:space-y-12 bg-gray-50 p-6 md:p-10 lg:p-16 rounded-3xl">
              <h3 className="text-2xl md:text-3xl font-black text-gray-900">Project Funding Needs</h3>
              <ul className="space-y-6 md:space-y-10">
                {[
                  { icon: <Activity size={28} />, title: "Free Surgeries Fund", text: "Covers the cost of surgical supplies and hospital theater fees for indigent patients." },
                  { icon: <Pill size={28} />, title: "Medical Supply Fund", text: "Provides essential medicines and clinical supplies for community health fairs." },
                  { icon: <HeartPulse size={28} />, title: "Widows Health Campaign", text: "Ensures vulnerable widows receive regular medical checkups and treatments." }
                ].map((item, i) => (
                  <li key={i} className="flex flex-col sm:flex-row items-start sm:space-x-6 space-y-4 sm:space-y-0">
                    <div className="bg-cyan-500 text-white p-4 rounded-2xl shadow-lg shadow-cyan-100 flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-lg md:text-xl font-black text-gray-900 mb-2">{item.title}</h4>
                      <p className="text-sm md:text-base text-gray-600 leading-relaxed">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Donation Form */}
            <div className="lg:w-1/2 mt-8 lg:mt-0">
              <div className="bg-white rounded-3xl p-6 md:p-8 lg:p-12 shadow-2xl shadow-gray-200 border border-gray-100">
                <h4 className="text-xl md:text-2xl font-black text-gray-900 mb-6 md:mb-8">Donation / Support Form</h4>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <select 
                    required 
                    value={formData.project}
                    onChange={(e) => setFormData({...formData, project: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 py-4 px-6 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Choose Project to Support</option>
                    <option value="General Mission Fund">General Mission Fund</option>
                    <option value="Free Surgeries Program">Free Surgeries Program</option>
                    <option value="Wound Care Outreaches">Wound Care Outreaches</option>
                    <option value="Health For Widows">Health For Widows</option>
                    <option value="Community Health Fairs">Community Health Fairs</option>
                  </select>
                  
                  <input 
                    type="number" 
                    placeholder="Amount (NGN)" 
                    required 
                    min="100"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 py-4 px-6 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                  />
                  
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 py-4 px-6 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                  />
                  
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 py-4 px-6 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                  />

                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-cyan-500 text-white py-5 rounded-xl font-black hover:bg-cyan-600 transition-all flex items-center justify-center shadow-xl shadow-cyan-100"
                  >
                    {loading ? "Processing..." : (
                      <><Heart className="mr-2" size={20} /> Proceed to Paystack</>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SupportPage;
