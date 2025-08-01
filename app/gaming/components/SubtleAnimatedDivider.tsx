"use client"

import { motion, useReducedMotion } from "framer-motion"

const SubtleAnimatedDivider = () => {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="relative flex items-center justify-center py-8 sm:py-12 lg:py-16">
      <motion.div
        initial={shouldReduceMotion ? {} : { scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        viewport={{ once: true, margin: "-100px" }}
        className="w-full max-w-xs sm:max-w-sm lg:max-w-md h-px bg-gradient-to-r from-transparent via-neutral-600 to-transparent"
      />

      {/* Center dot */}
      <motion.div
        initial={shouldReduceMotion ? {} : { scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        viewport={{ once: true }}
        className="absolute w-2 h-2 bg-neutral-500 rounded-full"
      />
    </div>
  )
}

export default SubtleAnimatedDivider
