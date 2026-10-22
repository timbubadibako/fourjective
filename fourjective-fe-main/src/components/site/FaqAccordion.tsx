"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { FAQ_ITEMS } from "@/data/faq";

interface FaqAccordionProps {
  defaultOpen?: number | null;
}

export default function FaqAccordion({ defaultOpen = 0 }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="w-full divide-y divide-dark/15 border-t border-b border-dark/20">
      {FAQ_ITEMS.map((faq, index) => {
        const isOpen = openIndex === index;
        const num = String(index + 1).padStart(2, "0");

        return (
          <div key={faq.id} className="py-5 sm:py-6 transition-colors">
            <button
              type="button"
              onClick={() => toggleFaq(index)}
              className="w-full text-left flex items-start justify-between gap-4 sm:gap-6 cursor-pointer group select-none"
              aria-expanded={isOpen}
            >
              <div className="flex items-baseline gap-3 sm:gap-4">
                <span className="font-mono text-xs sm:text-sm font-bold text-orange shrink-0">
                  {num}
                </span>
                <span className="font-sans font-semibold text-base sm:text-lg text-dark group-hover:text-orange transition-colors leading-snug">
                  {faq.question}
                </span>
              </div>

              <span className="shrink-0 w-7 h-7 rounded-full border border-dark/20 flex items-center justify-center text-dark/70 group-hover:border-orange group-hover:text-orange transition-all mt-0.5">
                {isOpen ? (
                  <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                ) : (
                  <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                )}
              </span>
            </button>

            {isOpen && (
              <div className="pt-4 pb-1 pl-7 sm:pl-9 pr-4 sm:pr-8 animate-fadeIn">
                {faq.answerContent}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
