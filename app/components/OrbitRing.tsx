"use client";
import { motion } from "framer-motion";

interface OrbitRingProps {
  size?: number;
  duration?: number;
  reverse?: boolean;
  color?: string;
  dashArray?: string;
  className?: string;
}

export const OrbitRing = ({
  size = 120,
  duration = 8,
  reverse = false,
  color = "rgba(255,255,255,0.12)",
  dashArray = "4 8",
  className = "",
}: OrbitRingProps) => {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={`absolute pointer-events-none ${className}`}
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={size / 2 - 2}
        fill="none"
        stroke={color}
        strokeWidth="1"
        strokeDasharray={dashArray}
      />
      {/* Bright node */}
      <circle
        cx={size / 2}
        cy={2}
        r={2.5}
        fill="white"
        opacity={0.7}
      />
    </motion.svg>
  );
};
