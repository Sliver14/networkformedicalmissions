"use client";

import PageHeader from "@/components/PageHeader";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useState } from "react";

import LocationSelector from "@/components/LocationSelector";

const IndividualMembershipPage = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    gender: "",
    email: "",
    phone: "",
    message: "",
    country: "",
    state: "",
    city: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/paystack/initialize", {
        method: "POST",
        body: JSON.stringify({
          email: formData.email,
          amount: 20,
          metadata: {
            title: formData.title,
            name: formData.name,
            gender: formData.gender,
            phone: formData.phone,
            type: "membership_individual",
            country: formData.country,
            state: formData.state,
            city: formData.city
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
      <PageHeader title="Individual Membership" breadcrumb={[{ label: "Membership" }]} />

      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            <div className="lg:w-5/12 space-y-8 md:space-y-10">
              <div className="space-y-4">
                <span className="text-cyan-500 font-black uppercase tracking-widest text-sm">Join NMM</span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight">Become an Individual Member</h2>
              </div>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                Individual Membership is open to all who wish to support our mission and stay updated with our impact globally.
              </p>
              
              <div className="bg-gray-50 p-6 md:p-10 rounded-3xl space-y-6 md:space-y-8 border border-gray-100">
                <h3 className="text-xl md:text-2xl font-black text-gray-900">Benefits Include:</h3>
                <ul className="space-y-4 md:space-y-6">
                  {[
                    "Regular Newsletter Updates",
                    "Invitations to Special Events",
                    "Networking with a Purpose"
                  ].map((text, i) => (
                    <li key={i} className="flex items-start space-x-4">
                      <div className="text-cyan-500 mt-1 flex-shrink-0">
                        <CheckCircle size={20} />
                      </div>
                      <span className="font-bold text-gray-700 text-sm md:text-base">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:w-7/12 mt-8 lg:mt-0">
              <div className="bg-white rounded-3xl p-6 md:p-8 lg:p-12 shadow-2xl shadow-gray-200 border border-gray-100">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <select 
                      required 
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-200 py-4 px-6 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition-all appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Title</option>
                      <option value="Mr">Mr.</option>
                      <option value="Mrs">Mrs.</option>
                      <option value="Ms">Ms.</option>
                      <option value="Dr">Dr.</option>
                      <option value="Prof">Prof.</option>
                      <option value="Rev">Rev.</option>
                    </select>
                    <input 
                      type="text" 
                      placeholder="Full Name" 
                      required 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-200 py-4 px-6 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition-all md:col-span-2"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <select 
                      required 
                      value={formData.gender}
                      onChange={(e) => setFormData({...formData, gender: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-200 py-4 px-6 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition-all appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                    <input 
                      type="email" 
                      placeholder="Email Address" 
                      required 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-200 py-4 px-6 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                    />
                  </div>

                  <input 
                    type="text" 
                    placeholder="Phone Number" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 py-4 px-6 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                  />

                  <div className="space-y-4">
                    <label className="text-sm font-bold text-gray-700 ml-1">Location Details</label>
                    <LocationSelector 
                      onLocationChange={(loc) => setFormData({...formData, ...loc})} 
                      required 
                    />
                    <input 
                      type="text" 
                      placeholder="Enter City" 
                      required 
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-200 py-4 px-6 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                    />
                  </div>

                  <textarea 
                    placeholder="Briefly tell us why you want to join" 
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 py-4 px-6 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition-all resize-none"
                  ></textarea>
                  
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-gray-500 mb-6 font-bold">Amount Due: <span className="text-cyan-500 text-2xl ml-2">USD 20.00</span> <span className="text-xs uppercase ml-1">(Annual)</span></p>
                    <button 
                      type="submit" 
                      disabled={loading}
                      className="w-full bg-cyan-500 text-white py-5 rounded-xl font-black hover:bg-cyan-600 transition-all flex items-center justify-center shadow-xl shadow-cyan-100"
                    >
                      {loading ? "Processing..." : (
                        <><ArrowRight className="mr-2" size={20} /> Pay & Register via Paystack</>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IndividualMembershipPage;
