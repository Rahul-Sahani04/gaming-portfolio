
import React from "react";
import { motion } from "framer-motion";

// Geometric Background Component
const GeometricBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Layer 1 - Base shapes */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Layer 2 - Middle shapes */}
      <motion.div
        className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-br from-purple-500/15 to-teal-500/15 rounded-2xl blur-2xl"
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
          rotate: [0, -3, 0],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Layer 3 - Top shapes */}
      <motion.div
        className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-br from-teal-500/25 to-blue-500/25 rounded-xl blur-xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          rotate: [0, 8, 0],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Layer 4 - Additional accent shapes */}
      <motion.div
        className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl blur-2xl"
        animate={{
          x: [0, -25, 0],
          y: [0, 25, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
    </div>
  )
}


export default GeometricBackground;