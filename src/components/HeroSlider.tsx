"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      video: "https://www.shutterstock.com/shutterstock/videos/1016892217/preview/stock-footage-dolly-shot-of-doctor-examining-girl-s-leg-sitting-with-woman-and-checking-reports-in-digital-tablet.webm",
      tagline: "Christ for the Hurting Medical Mission Trips",
      title: "Networking the World for Good",
      btnText: "Learn More",
      btnLink: "/about"
    },
    {
      video: "https://www.shutterstock.com/shutterstock/videos/4006999457/preview/stock-footage-female-dentist-performing-dental-procedure-on-male-patient.webm",
      tagline: "Providing Free Surgeries & Medical Services",
      title: "Help the Poor in Need",
      btnText: "Our Programs",
      btnLink: "/programs/free-surgeries"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="main-slider">
      <div className="relative h-[600px] lg:h-[calc(100vh-120px)] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"}`}
          >
            <div 
              className="image-layer absolute inset-0 grayscale transition-transform duration-[8000ms] ease-out" 
              style={{ 
                transform: index === currentSlide ? 'scale(1.1)' : 'scale(1.2)',
                transitionTimingFunction: 'cubic-bezier(0.1, 0, 0.3, 1)' 
              }}
            >
              <video 
                className="absolute inset-0 w-full h-full object-cover" 
                autoPlay muted loop playsInline
              >
                <source src={slide.video} type="video/mp4" />
              </video>
            </div>
            <div className="image-layer-overlay absolute inset-0 bg-[#1f2230]/70 z-[2]"></div>
            
            <div className="container relative h-full flex items-center z-[30] pb-[100px] pt-[120px] md:pb-[190px] md:pt-[219px]">
              <div className="max-w-[800px]">
                <p 
                  className={`text-[24px] md:text-[40px] text-white font-['reeyregular'] leading-[34px] md:leading-[50px] mb-[15px] md:mb-[19px] transition-all duration-[1000ms] ease-[cubic-bezier(0.21,0.6,0.35,1)] ${
                    index === currentSlide ? "translate-y-0 opacity-100 delay-[500ms]" : "translate-y-[40px] opacity-0 delay-0"
                  }`}
                >
                  {slide.tagline}
                </p>
                <h2 
                  className={`m-0 mb-[25px] md:mb-[37px] text-white font-black text-[48px] md:text-[110px] leading-[58px] md:leading-[120px] transition-all duration-[1200ms] ease-[cubic-bezier(0.21,0.6,0.35,1)] ${
                    index === currentSlide ? "translate-y-0 opacity-100 delay-[200ms]" : "translate-y-[60px] opacity-0 delay-0"
                  }`}
                >
                  {slide.title}
                </h2>
                <Link 
                  href={slide.btnLink} 
                  className={`thm-btn transition-all duration-[1000ms] ease-[cubic-bezier(0.21,0.6,0.35,1)] ${
                    index === currentSlide ? "translate-y-0 opacity-100 delay-[800ms]" : "translate-y-[30px] opacity-0 delay-0"
                  }`}
                >
                  <i className="fas fa-arrow-circle-right"></i> {slide.btnText}
                </Link>
              </div>
            </div>
          </div>
        ))}
        
        {/* Simple Pagination */}
        <div className="absolute bottom-[51px] left-1/2 -translate-x-1/2 z-[40] flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-[12px] h-[12px] rounded-full transition-all ${index === currentSlide ? "bg-white opacity-100" : "bg-white opacity-50"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
