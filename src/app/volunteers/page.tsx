"use client";

import PageHeader from "@/components/PageHeader";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useState } from "react";
import { applyVolunteer } from "@/app/actions/volunteer";

const VolunteerPage = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    
    const formData = new FormData(e.currentTarget);
    const result = await applyVolunteer(formData);

    if (result.success) {
      setStatus("success");
      setMessage(result.message!);
    } else {
      setStatus("error");
      setMessage(result.message!);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <PageHeader 
        title="Become a Volunteer" 
        breadcrumb={[{ label: "Volunteers" }]} 
      />

      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            {/* Left Content */}
            <div className="lg:w-5/12 space-y-8 md:space-y-10">
              <div className="space-y-4">
                <span className="text-cyan-500 font-black uppercase tracking-widest text-sm">Volunteer With Us</span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight">Join the Network for Medical Missions</h2>
              </div>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                We welcome Christian medical missionaries, health care professionals, partners as well as all those with a passion for providing medical, relief and community support services.
              </p>
              
              <div className="bg-gray-900 text-white p-6 md:p-10 rounded-3xl space-y-6 md:space-y-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl"></div>
                <h3 className="text-xl md:text-2xl font-black">Why Volunteer with NMM?</h3>
                <ul className="space-y-4 md:space-y-6">
                  {[
                    "Make a direct impact in vulnerable communities.",
                    "Share the knowledge of God's love through your skills.",
                    "Be part of a global team of Christian professionals."
                  ].map((text, i) => (
                    <li key={i} className="flex items-start space-x-4">
                      <div className="text-cyan-500 mt-1 flex-shrink-0">
                        <CheckCircle size={20} />
                      </div>
                      <span className="font-bold opacity-90 text-sm md:text-base">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Form */}
            <div className="lg:w-7/12 mt-8 lg:mt-0">
              <div className="bg-white rounded-3xl p-6 md:p-8 lg:p-12 shadow-2xl shadow-gray-200 border border-gray-100">
                {status === "success" ? (
                  <div className="text-center space-y-6 py-10">
                    <div className="bg-green-100 text-green-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                      <ArrowRight size={40} className="rotate-[-45deg]" />
                    </div>
                    <h3 className="text-3xl font-black text-gray-900">Application Received!</h3>
                    <p className="text-gray-600">{message}</p>
                    <button 
                      onClick={() => setStatus("idle")}
                      className="text-cyan-500 font-bold hover:underline"
                    >
                      Submit another application
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <input 
                        name="firstName"
                        type="text" 
                        placeholder="First Name" 
                        required 
                        className="w-full bg-gray-50 border border-gray-200 py-4 px-6 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                      />
                      <input 
                        name="lastName"
                        type="text" 
                        placeholder="Last Name" 
                        required 
                        className="w-full bg-gray-50 border border-gray-200 py-4 px-6 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <input 
                        name="email"
                        type="email" 
                        placeholder="Email Address" 
                        required 
                        className="w-full bg-gray-50 border border-gray-200 py-4 px-6 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                      />
                      <input 
                        name="phone"
                        type="text" 
                        placeholder="Phone Number" 
                        className="w-full bg-gray-50 border border-gray-200 py-4 px-6 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <input 
                        name="country"
                        type="text" 
                        placeholder="Country" 
                        required 
                        className="w-full bg-gray-50 border border-gray-200 py-4 px-6 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                      />
                      <select 
                        name="profession"
                        required 
                        className="w-full bg-gray-50 border border-gray-200 py-4 px-6 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition-all appearance-none cursor-pointer"
                      >
                        <option value="" disabled selected>Select Profession</option>
                        <option value="Physician">Physician</option>
                        <option value="Nurse">Nurse</option>
                        <option value="Specialist">Specialist</option>
                        <option value="Non-Medical">Non-Medical Volunteer</option>
                        <option value="Partner">Partner Organization</option>
                      </select>
                    </div>
                    <textarea 
                      name="availabilityMessage"
                      placeholder="Message / Availability" 
                      rows={5}
                      className="w-full bg-gray-50 border border-gray-200 py-4 px-6 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition-all resize-none"
                    ></textarea>
                    
                    {status === "error" && <p className="text-red-500 font-bold text-sm">{message}</p>}
                    <button 
                      type="submit" 
                      disabled={status === "loading"}
                      className="w-full bg-cyan-500 text-white py-5 rounded-xl font-black hover:bg-cyan-600 transition-all flex items-center justify-center shadow-xl shadow-cyan-100"
                    >
                      {status === "loading" ? "Submitting..." : (
                        <><ArrowRight className="mr-2" size={20} /> Submit Application</>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VolunteerPage;
