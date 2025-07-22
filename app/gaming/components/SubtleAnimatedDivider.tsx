import { motion } from "framer-motion";
const SubtleAnimatedDivider = () => (
  <div className="relative w-full h-px my-20 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
      animate={{ x: ["-100%", "100%"] }}
      transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

export default SubtleAnimatedDivider;





// Animated Divider Component
// const AnimatedDivider = () => (
//   <div className="relative w-full h-px my-20 overflow-hidden">
//     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
//     <motion.div
//       className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"
//       animate={{
//         x: ["-100%", "100%"],
//       }}
//       transition={{
//         duration: 4,
//         repeat: Number.POSITIVE_INFINITY,
//         ease: "linear",
//       }}
//     />
//     <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
//       <motion.div
//         className="w-2 h-2 bg-blue-400 rounded-full"
//         animate={{
//           scale: [1, 1.5, 1],
//           opacity: [0.5, 1, 0.5],
//         }}
//         transition={{
//           duration: 2,
//           repeat: Number.POSITIVE_INFINITY,
//         }}
//       />
//     </div>
//   </div>
// )

