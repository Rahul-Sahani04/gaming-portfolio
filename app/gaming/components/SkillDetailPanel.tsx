import { useRef } from "react"
import { useInView, AnimatePresence, motion } from "framer-motion"
import { skills } from "../utils/Skills";

type SkillDetailPanelProps = {
  selectedSkill: string | null;
  setSelectedSkill: React.Dispatch<React.SetStateAction<string | null>>;
  inView?: boolean; 
  treeRef?: React.RefObject<HTMLDivElement>;
};

const SkillDetailPanel = ({
  selectedSkill,
  setSelectedSkill,
}: SkillDetailPanelProps) => {
  const treeRef = useRef(null);
  const inView = useInView(treeRef, { margin: "-30% 0px -30% 0px" }) // tweak if needed

  const s = skills.find((sk) => sk.id === selectedSkill)
  if (!s) return null

  return (
    <>
      <div ref={treeRef} className="absolute top-[40%] left-0 h-0 w-full" />
      <AnimatePresence>
        <motion.div
          key={s.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          className={`${
            !inView
              ? "absolute -bottom-48"
              : "fixed bottom-4 px-6mx-auto space-y-8 max-w-7xl lg:px-24 md:space-y-16"
          } w-full z-50 px-4 sm:px-8`}
          transition={{
            duration: 0.4,
            type: "spring",
            stiffness: 80,
            damping: 20,
          }}
        >
          <div className="p-4 sm:p-5 rounded-xl bg-neutral-900/95 border border-neutral-700 shadow-2xl backdrop-blur-sm">
            <div className="flex gap-3 sm:gap-4 items-start">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center bg-neutral-800 border border-neutral-600 flex-shrink-0">
                <s.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-white font-semibold text-base sm:text-lg leading-tight">
                    {s.name}
                  </h3>
                  <button
                    onClick={() => setSelectedSkill(null)}
                    className="text-neutral-400 hover:text-white transition-colors p-1 -m-1 flex-shrink-0"
                    aria-label="Close"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <p className="text-neutral-300 text-sm sm:text-[15px] leading-relaxed mb-3">
                  {s.description}
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="text-xs text-neutral-500 flex-shrink-0">
                    Skill Level:
                  </span>
                  <div className="flex gap-1">
                    {[...Array(10)].map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          idx < s.level ? "bg-neutral-300" : "bg-neutral-700"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-neutral-400 ml-2">
                    {s.level}/10
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default SkillDetailPanel;