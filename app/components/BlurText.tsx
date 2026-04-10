"use client";
import { motion } from "framer-motion";
import React from "react";

type BlurTextProps = {
  text: string;
  className?: string;
  delay?: number;
};

export const BlurText: React.FC<BlurTextProps> = ({ text, className, delay = 0 }) => {
  // Split text into words for staggered effect
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: delay * 0.1 },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      filter: "blur(10px)",
      y: 20,
    },
  };

  return (
    <motion.h1
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block mr-[0.25em] last:mr-0 drop-shadow-sm"
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
};
