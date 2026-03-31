"use client";

import PageHeader from "@/components/PageHeader";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { useState } from "react";
import { submitContactForm } from "@/app/actions/contact";

const ContactPage = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    
    const formData = new FormData(e.currentTarget);
    const result = await submitContactForm(formData);

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
        title="Contact Us" 
        breadcrumb={[{ label: "Contact" }]} 
      />

      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            {/* Left Info */}
            <div className="lg:w-1/2 space-y-8 md:space-y-10">
              <div className="space-y-4">
                <span className="text-cyan-500 font-black uppercase tracking-widest text-sm">Contact with us</span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight">Get in Touch with NMM</h2>
              </div>
              
              <div className="space-y-6 md:space-y-8">
                {[
                  { icon: <Phone size={24} />, label: "Call Anytime", value: "+234 912 710 0302", href: "tel:+2349127100302" },
                  { icon: <Mail size={24} />, label: "Send Email", value: "contact@networkformedicalmissions.org", href: "mailto:contact@networkformedicalmissions.org" },
                  { icon: <MapPin size={24} />, label: "Visit Office", value: "Lagos, Nigeria" }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 bg-gray-50 p-6 rounded-2xl hover:bg-cyan-50 transition-colors group">
                    <div className="bg-cyan-500 text-white p-4 rounded-xl shadow-lg shadow-cyan-200 group-hover:scale-110 transition-transform self-start sm:self-auto">
                      {item.icon}
                    </div>
                    <div className="break-all sm:break-normal w-full">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-base sm:text-lg md:text-xl font-black text-gray-900 hover:text-cyan-500 transition-colors block w-full truncate">
                          {item.value}
                        </a>
                      ) : (
                        <span className="text-base sm:text-lg md:text-xl font-black text-gray-900">{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Form */}
            <div className="lg:w-1/2 mt-8 lg:mt-0">
              <div className="bg-white rounded-3xl p-6 md:p-8 lg:p-12 shadow-2xl shadow-gray-200 border border-gray-100">
                {status === "success" ? (
                  <div className="text-center space-y-6 py-10">
                    <div className="bg-green-100 text-green-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                      <ArrowRight size={40} className="rotate-[-45deg]" />
                    </div>
                    <h3 className="text-3xl font-black text-gray-900">Message Sent!</h3>
                    <p className="text-gray-600">{message}</p>
                    <button 
                      onClick={() => setStatus("idle")}
                      className="text-cyan-500 font-bold hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                      <input 
                        name="name"
                        type="text" 
                        placeholder="Your Name" 
                        required 
                        className="w-full bg-gray-50 border border-gray-200 py-4 px-6 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                      />
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
                      <input 
                        name="subject"
                        type="text" 
                        placeholder="Subject" 
                        required 
                        className="w-full bg-gray-50 border border-gray-200 py-4 px-6 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                      />
                      <textarea 
                        name="message"
                        placeholder="Write a Message" 
                        required 
                        rows={5}
                        className="w-full bg-gray-50 border border-gray-200 py-4 px-6 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition-all resize-none"
                      ></textarea>
                    </div>
                    {status === "error" && <p className="text-red-500 font-bold text-sm">{message}</p>}
                    <button 
                      type="submit" 
                      disabled={status === "loading"}
                      className="w-full bg-cyan-500 text-white py-5 rounded-xl font-black hover:bg-cyan-600 transition-all flex items-center justify-center shadow-xl shadow-cyan-100"
                    >
                      {status === "loading" ? "Sending..." : (
                        <><ArrowRight className="mr-2" size={20} /> Send Message</>
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

export default ContactPage;
