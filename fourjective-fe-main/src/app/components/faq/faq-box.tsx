"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BoxProps {
  title: string;
  message: string;
}

const dropdownVariants = {
  open: {
    opacity: 1,
    scaleY: 1, // Expands smoothly
    y: -5, // Moves up slightly
    clipPath: "inset(0% 0% 0% 0%)", // Unhides content smoothly
    transition: { duration: 0.4, ease: "easeInOut" },
  },
  closed: {
    opacity: 0,
    scaleY: 0, // Shrinks smoothly
    y: -10,
    clipPath: "inset(0% 0% 100% 0%)", // Hides content
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

export default function Box({ title, message }: BoxProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col">
      {/* Clickable Box */}
      <div
        className="z-20 flex min-h-16 cursor-pointer items-center rounded-xl border-4 border-black bg-white py-4 font-[family-name:var(--font-poppins-bold)] text-base text-black md:text-xl lg:min-h-24 lg:text-3xl"
        onClick={toggleDropdown}
      >
        <h1 className="px-4 md:px-10 text-[#F07021] font-bold">{title}</h1>
      </div>

      {/* Dropdown Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={dropdownVariants}
            initial="closed"
            animate="open"
            exit="closed"
            style={{ transformOrigin: "top", overflow: "hidden" }} 
            className="w-[98%] mx-auto -translate-y-1 z-10 px-4 md:px-10 py-4 border-4 border-black rounded-b-xl text-white text-xs md:text-sm lg:text-xl font-poppins font-semibold shadow-lg bg-[#444444]"
          >
            <p className="whitespace-pre-line">{message}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
