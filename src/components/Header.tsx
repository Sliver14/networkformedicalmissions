"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Mail, Facebook, Twitter, Instagram, Heart } from "lucide-react";

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = (menuName: string) => {
    setExpandedMenu(expandedMenu === menuName ? null : menuName);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { 
      name: "About Us", 
      href: "#",
      subLinks: [
        { name: "Our Mission & Values", href: "/about" },
        { name: "Selection Criteria", href: "/criteria" },
        { name: "Our Gallery", href: "/gallery" },
      ]
    },
    { 
      name: "Programs", 
      href: "#",
      subLinks: [
        { name: "Free Surgeries", href: "/programs/free-surgeries" },
        { name: "Wound Care Outreaches", href: "/programs/wound-care" },
        { name: "Health For Widows", href: "/programs/widows-campaign" },
        { name: "Community Health Fairs", href: "/programs/health-fairs" },
      ]
    },
    { name: "Events", href: "/events" },
    { name: "News", href: "/news" },
    { 
      name: "Membership", 
      href: "#",
      subLinks: [
        { name: "Associate Membership", href: "/membership/associate" },
        { name: "Individual Membership", href: "/membership/individual" },
      ]
    },
    { name: "Volunteering", href: "/volunteers" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className={`w-full z-[100] transition-all duration-300 ${isSticky ? "fixed top-0 bg-white shadow-xl" : "relative bg-white"}`}>
      {/* Top Bar */}
      {!isSticky && (
        <div className="hidden lg:block border-b border-gray-100 py-3 bg-gray-50">
          <div className="container mx-auto px-4 flex justify-between items-center text-sm font-bold">
            <div className="flex items-center space-x-8">
              <span className="text-gray-500 uppercase tracking-widest text-xs">Network for Medical Missions</span>
              <div className="flex items-center text-cyan-500 group">
                <Mail size={16} className="mr-2 group-hover:scale-110 transition-transform" />
                <a href="mailto:contact@networkformedicalmissions.org" className="hover:underline">contact@networkformedicalmissions.org</a>
              </div>
            </div>
            <div className="flex items-center space-x-6 text-gray-400">
              <a href="#" className="hover:text-cyan-500 transition-colors"><Twitter size={16} /></a>
              <a href="#" className="hover:text-cyan-500 transition-colors"><Facebook size={16} /></a>
              <a href="#" className="hover:text-cyan-500 transition-colors"><Instagram size={16} /></a>
            </div>
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <div className="container mx-auto px-4 flex items-center justify-between h-20 lg:h-24">
        {/* Logo */}
        <div className="flex-shrink-0 bg-cyan-500 p-4 h-full flex items-center shadow-lg shadow-cyan-500/20">
          <Link href="/">
            <Image src="/logo.png" alt="NMM Logo" width={120} height={50} priority className="brightness-110" />
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
          {navLinks.map((link) => (
            <div key={link.name} className="group relative">
              {link.subLinks ? (
                <>
                  <button className="font-semibold text-gray-800 hover:text-cyan-500 transition-colors flex items-center py-8 text-base tracking-wide">
                    {link.name} <ChevronDown size={14} className="ml-1 group-hover:rotate-180 transition-transform" />
                  </button>
                  <div className="absolute top-full left-0 bg-white shadow-2xl border-t-4 border-cyan-500 py-4 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 rounded-b-2xl">
                    {link.subLinks.map((sub) => (
                      <Link 
                        key={sub.name} 
                        href={sub.href} 
                        className="block px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-cyan-500 transition-colors"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link href={link.href} className="font-semibold text-gray-800 hover:text-cyan-500 transition-colors py-8 inline-block text-base tracking-wide">
                  {link.name}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center space-x-4">
          <Link href="/support" className="hidden sm:flex items-center bg-cyan-500 text-white px-6 py-3 rounded-xl font-black hover:bg-cyan-600 transition-all transform hover:scale-105 shadow-xl shadow-cyan-500/20">
            <Heart size={18} className="mr-2 fill-current" /> Donate
          </Link>
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden text-cyan-500 p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <Menu size={32} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Sidebar */}
      <div className={`fixed inset-0 z-[200] lg:hidden transition-all duration-500 ${mobileMenuOpen ? "visible" : "invisible"}`}>
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity duration-500 ${mobileMenuOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setMobileMenuOpen(false)}
        ></div>
        
        {/* Menu Content */}
        <div className={`absolute right-0 top-0 bottom-0 w-80 bg-white shadow-2xl transition-transform duration-500 ease-out flex flex-col ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="p-6 flex items-center justify-between border-b border-gray-100">
            <Image src="/logo.png" alt="NMM Logo" width={80} height={35} className="brightness-0" />
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-400 hover:text-cyan-500 transition-colors"
            >
              <X size={32} />
            </button>
          </div>
          
          <div className="flex-grow overflow-y-auto py-6 px-4">
            <nav className="space-y-1">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.subLinks ? (
                    <div className="flex flex-col">
                      <button 
                        onClick={() => toggleMobileMenu(link.name)}
                        className="w-full flex items-center justify-between px-4 py-3 font-semibold text-gray-800 text-lg hover:bg-cyan-50 hover:text-cyan-500 rounded-xl transition-colors"
                      >
                        <span>{link.name}</span>
                        <ChevronDown 
                          size={20} 
                          className={`transition-transform duration-300 ${expandedMenu === link.name ? 'rotate-180 text-cyan-500' : 'text-gray-400'}`} 
                        />
                      </button>
                      
                      {/* Collapsible Sub-menu */}
                      <div 
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          expandedMenu === link.name ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="px-4 pb-2 space-y-1 border-l-2 border-gray-100 ml-6">
                          {link.subLinks.map((sub) => (
                            <Link 
                              key={sub.name} 
                              href={sub.href} 
                              onClick={() => setMobileMenuOpen(false)}
                              className="block px-4 py-2 font-medium text-gray-600 text-base hover:bg-cyan-50 hover:text-cyan-500 rounded-lg transition-colors"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link 
                      href={link.href} 
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-3 font-semibold text-gray-800 text-lg hover:bg-cyan-50 hover:text-cyan-500 rounded-xl transition-colors"
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>
          
          <div className="p-6 border-t border-gray-100 space-y-6 bg-gray-50">
            <Link 
              href="/support" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center bg-cyan-500 text-white py-4 rounded-2xl font-black shadow-xl shadow-cyan-500/20 text-lg"
            >
              <Heart size={20} className="mr-2 fill-current" /> Donate Now
            </Link>
            <div className="flex justify-center space-x-6 text-gray-400">
              <Twitter size={24} />
              <Facebook size={24} />
              <Instagram size={24} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
