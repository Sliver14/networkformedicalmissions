"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { subscribeNewsletter } from "@/app/actions/newsletter";
import { ArrowRight, Phone, Mail, Twitter, Facebook, Instagram } from "lucide-react";

const Footer = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error", text: string } | null>(null);

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const result = await subscribeNewsletter(formData);

    if (result.success) {
      setMessage({ type: "success", text: result.message! });
      (e.target as HTMLFormElement).reset();
    } else {
      setMessage({ type: "error", text: result.message! });
    }
    setLoading(false);
  };

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 md:pt-20 pb-10 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-50"></div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12 md:mb-16">
          {/* About Widget */}
          <div className="space-y-4 md:space-y-6">
            <h3 className="text-white text-lg md:text-xl font-black border-b-2 border-cyan-500 pb-2 inline-block">About</h3>
            <p className="leading-relaxed text-sm md:text-base">
              We welcome Christian medical missionaries, health care professionals, partners as well as all those with a passion for providing medical, relief and community support services.
            </p>
            <Link href="/support" className="inline-flex items-center bg-cyan-500 text-white px-5 md:px-6 py-3 rounded-xl font-black hover:bg-cyan-600 transition-all transform hover:scale-105 shadow-xl shadow-cyan-900/20 text-sm md:text-base">
              <ArrowRight className="mr-2" size={18} /> Donate Now
            </Link>
          </div>

          {/* Explore Widget */}
          <div className="space-y-4 md:space-y-6">
            <h3 className="text-white text-lg md:text-xl font-black border-b-2 border-cyan-500 pb-2 inline-block">Explore</h3>
            <ul className="space-y-3 md:space-y-4 font-bold text-sm md:text-base">
              <li><Link href="/about" className="hover:text-cyan-500 transition-colors">About Us</Link></li>
              <li><Link href="/gallery" className="hover:text-cyan-500 transition-colors">Our Gallery</Link></li>
              <li><Link href="/programs/free-surgeries" className="hover:text-cyan-500 transition-colors">Free Surgeries</Link></li>
              <li><Link href="/volunteers" className="hover:text-cyan-500 transition-colors">Volunteers</Link></li>
              <li><Link href="/contact" className="hover:text-cyan-500 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Widget */}
          <div className="space-y-4 md:space-y-6">
            <h3 className="text-white text-lg md:text-xl font-black border-b-2 border-cyan-500 pb-2 inline-block">Contact</h3>
            <ul className="space-y-4 md:space-y-6">
              <li className="flex items-center space-x-4">
                <div className="bg-gray-800 p-3 rounded-xl text-cyan-500">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase font-black text-cyan-500 mb-1">Call Anytime</p>
                  <a href="tel:+2349127100302" className="text-white font-black text-sm md:text-lg hover:text-cyan-500 transition-colors">+234 912 710 0302</a>
                </div>
              </li>
              <li className="flex items-center space-x-4">
                <div className="bg-gray-800 p-3 rounded-xl text-cyan-500">
                  <Mail size={20} />
                </div>
                <div className="w-full truncate">
                  <p className="text-xs uppercase font-black text-cyan-500 mb-1">Send Email</p>
                  <a href="mailto:contact@networkformedicalmissions.org" className="text-white font-black hover:text-cyan-500 transition-colors truncate block max-w-[200px] text-sm md:text-base">contact@networkformedicalmissions.org</a>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter Widget */}
          <div className="space-y-4 md:space-y-6">
            <h3 className="text-white text-lg md:text-xl font-black border-b-2 border-cyan-500 pb-2 inline-block">Newsletter</h3>
            <p className="text-sm font-medium opacity-80 leading-relaxed">Stay updated with our latest missions and events.</p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <input 
                  type="email" 
                  name="email"
                  placeholder="Email address" 
                  required
                  className="w-full bg-gray-800 border-none py-3 md:py-4 px-4 md:px-6 rounded-xl focus:ring-2 focus:ring-cyan-500 text-white outline-none transition-all placeholder:text-gray-500 text-sm md:text-base"
                />
                <button 
                  disabled={loading}
                  className="absolute right-2 top-1 md:top-2 bg-cyan-500 text-white p-2 rounded-lg hover:bg-cyan-600 transition-all h-8 w-8 md:h-10 md:w-10 flex items-center justify-center shadow-lg"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
              {message && (
                <p className={`text-xs font-bold px-2 ${message.type === "success" ? "text-green-500" : "text-red-500"}`}>
                  {message.text}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 text-center md:text-left">
          <div className="flex items-center space-x-8">
            <Link href="/">
              <Image src="/logo.png" alt="NMM Logo" width={100} height={40} className="brightness-110" />
            </Link>
            <div className="flex space-x-4">
              {[
                { icon: <Twitter size={18} />, href: "#" },
                { icon: <Facebook size={18} />, href: "#" },
                { icon: <Instagram size={18} />, href: "#" }
              ].map((social, i) => (
                <a key={i} href={social.href} className="bg-gray-800 w-10 h-10 flex items-center justify-center rounded-xl text-gray-400 hover:bg-cyan-500 hover:text-white transition-all transform hover:scale-110">
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          <p className="text-sm font-bold opacity-60">
            © {new Date().getFullYear()} by <span className="text-white">Network for Medical Missions</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
