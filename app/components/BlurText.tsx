"use client";
import { motion, Variants } from "framer-motion";
import React from "react";

type BlurTextProps = {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
};

export const BlurText: React.FC<BlurTextProps> = ({
  text,
  className,
  delay = 0,
  as = "h1",
}) => {
  const words = text.split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: delay * 0.08,
      },
    },
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring",
        damping: 14,
        stiffness: 90,
      },
    },
    hidden: {
      opacity: 0,
      filter: "blur(8px)",
      y: 16,
    },
  };

  const MotionTag = motion[as] as typeof motion.h1;

  return (
    <MotionTag
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block mr-[0.22em] last:mr-0"
        >
          {word}
        </motion.span>
      ))}
    </MotionTag>
  );
};
