import { useRef } from "react";
import { motion } from "framer-motion";
import GameIcon from "../utils/GameIcons";
import { Brain, Palette, Shield, Heart, Zap, Target } from "lucide-react";

const EnhancedTable = () => {
  const tableData = [
    { game: "Call of Duty", lessons: "Teamwork, communication, adaptability, fast decision-making", icon: Target },
    { game: "Minecraft", lessons: "Creativity, persistence, project management, planning", icon: Palette },
    { game: "Sekiro", lessons: "Precision, resilience, learning from failure, patience", icon: Shield },
    { game: "Elden Ring", lessons: "Exploration, resourcefulness, overcoming adversity", icon: Brain },
    { game: "Marvel's Spider-Man", lessons: "Empathy, flow, responsibility, moral choices", icon: Heart },
    { game: "Dying Light", lessons: "Adaptation, risk assessment, resourcefulness", icon: Zap },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <motion.h2
        className="text-3xl font-bold text-white mb-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Skills Summary by Game
      </motion.h2>
      <div className="backdrop-blur-xl bg-white/[0.04] border border-neutral-700 rounded-2xl overflow-hidden shadow">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[400px]">
            <thead>
              <tr className="border-b border-neutral-700">
                <th className="px-6 py-4 text-left text-white font-semibold">Game</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Key Skills Developed</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, idx) => (
                <tr key={item.game} className="group border-b border-neutral-800 transition-all hover:bg-white/5">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-neutral-400" />
                      <GameIcon game={item.game} />
                      <span className="text-white font-medium">{item.game}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-neutral-400">{item.lessons}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default EnhancedTable;



// Enhanced Table Component
// const EnhancedTable = () => {
//   const tableRef = useRef<HTMLDivElement>(null)
//   const isInView = useInView(tableRef, { once: true })

//   const tableData = [
//     {
//       game: "Call of Duty",
//       lessons: "Teamwork, communication, adaptability, fast decision-making",
//       accent: "border-l-blue-500 hover:bg-blue-500/5",
//       icon: Target,
//     },
//     {
//       game: "Minecraft",
//       lessons: "Creativity, persistence, project management, planning",
//       accent: "border-l-teal-500 hover:bg-teal-500/5",
//       icon: Palette,
//     },
//     {
//       game: "Sekiro & Lies of P",
//       lessons: "Precision, resilience, learning from failure, patience",
//       accent: "border-l-purple-500 hover:bg-purple-500/5",
//       icon: Shield,
//     },
//     {
//       game: "Elden Ring",
//       lessons: "Exploration, resourcefulness, overcoming adversity",
//       accent: "border-l-blue-500 hover:bg-blue-500/5",
//       icon: Brain,
//     },
//     {
//       game: "Marvel's Spider-Man",
//       lessons: "Empathy, flow, responsibility, moral choices",
//       accent: "border-l-purple-500 hover:bg-purple-500/5",
//       icon: Heart,
//     },
//     {
//       game: "Dying Light",
//       lessons: "Adaptation, risk assessment, resourcefulness",
//       accent: "border-l-teal-500 hover:bg-teal-500/5",
//       icon: Zap,
//     },
//   ]

//   return (
//     <div ref={tableRef} className="max-w-6xl mx-auto">
//       <motion.h2
//         initial={{ opacity: 0, y: 20 }}
//         animate={isInView ? { opacity: 1, y: 0 } : {}}
//         className="text-3xl font-bold text-white mb-8 text-center"
//       >
//         Skills Summary by Game
//       </motion.h2>

//       {/* Desktop Table */}
//       <div className="hidden md:block">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ delay: 0.2 }}
//           className="backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden"
//         >
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b border-white/10">
//                   <th className="px-6 py-4 text-left text-white font-semibold">Game</th>
//                   <th className="px-6 py-4 text-left text-white font-semibold">Key Skills Developed</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {tableData.map((item, index) => (
//                   <motion.tr
//                     key={item.game}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={isInView ? { opacity: 1, x: 0 } : {}}
//                     transition={{ delay: index * 0.1 + 0.3 }}
//                     className={`
//                       border-b border-white/5 border-l-4 ${item.accent}
//                       transition-all duration-300 cursor-pointer
//                       hover:backdrop-blur-xl
//                     `}
//                   >
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-3">
//                         <item.icon className="w-5 h-5 text-blue-400" />
//                         <GameIcon game={item.game} />
//                         <span className="text-white font-medium">{item.game}</span>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 text-zinc-400">{item.lessons}</td>
//                   </motion.tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </motion.div>
//       </div>

//       {/* Mobile Cards */}
//       <div className="md:hidden space-y-4">
//         {tableData.map((item, index) => (
//           <motion.div
//             key={item.game}
//             initial={{ opacity: 0, y: 20 }}
//             animate={isInView ? { opacity: 1, y: 0 } : {}}
//             transition={{ delay: index * 0.1 }}
//             className={`
//               p-4 rounded-xl border-l-4 ${item.accent}
//               backdrop-blur-xl bg-white/[0.02] border border-white/10
//             `}
//           >
//             <div className="flex items-center gap-3 mb-3">
//               <item.icon className="w-5 h-5 text-blue-400" />
//               <GameIcon game={item.game} />
//               <h3 className="text-white font-semibold">{item.game}</h3>
//             </div>
//             <p className="text-zinc-400 text-sm">{item.lessons}</p>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   )
// }