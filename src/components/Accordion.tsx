"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface AccordionItem {
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

const Accordion = ({ items }: AccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div 
          key={index} 
          className={`border rounded-xl overflow-hidden transition-all ${openIndex === index ? "border-cyan-500 shadow-lg" : "border-gray-200"}`}
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-gray-50 transition-colors"
          >
            <h4 className={`text-lg font-black ${openIndex === index ? "text-cyan-500" : "text-gray-900"}`}>
              {item.title}
            </h4>
            {openIndex === index ? (
              <ChevronUp className="text-cyan-500 flex-shrink-0" size={24} />
            ) : (
              <ChevronDown className="text-gray-400 flex-shrink-0" size={24} />
            )}
          </button>
          <div 
            className={`transition-all duration-300 ease-in-out ${openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}
          >
            <div className="p-6 bg-gray-50 border-t border-gray-100 text-gray-600 leading-relaxed">
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
