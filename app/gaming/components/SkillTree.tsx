import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

import { skills } from "../utils/Skills";
import SkillDetailPanel from "./SkillDetailPanel";



const SkillTree = () => {
  const treeRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [lines, setLines] = useState<
    { from: string; to: string; x1: number; y1: number; x2: number; y2: number }[]
  >([]);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [inViewRef, inView] = useInView({ triggerOnce: true, rootMargin: "-100px" });

  // Recalculate lines on layout
  const measure = () => {
    const newLines: any[] = [];
    skills.forEach((s) => {
      s.connections.forEach((toId) => {
        const a = nodeRefs.current[s.id];
        const b = nodeRefs.current[toId];
        if (a && b) {
          const ra = a.getBoundingClientRect();
          const rb = b.getBoundingClientRect();
          const parentRect = treeRef.current!.getBoundingClientRect();
          newLines.push({
            from: s.id,
            to: toId,
            x1: ra.left + ra.width / 2 - parentRect.left,
            y1: ra.top + ra.height / 2 - parentRect.top,
            x2: rb.left + rb.width / 2 - parentRect.left,
            y2: rb.top + rb.height / 2 - parentRect.top,
          });
        }
      });
    });
    setLines(newLines);
  };

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <div className="relative">
      {/* Title */}
      <h2 className="text-2xl font-bold mb-4 z-50 text-center w-[88vw]">Skill Tree</h2>
      {/* Main Skill Tree Container */}
      <div
        ref={(el) => {
          (treeRef as React.MutableRefObject<HTMLDivElement | null>).current =
          el;
          inViewRef(el);
        }}
        className="relative min-h-[560px] p-6 sm:p-10 mb-52 mt-28"
      >
        {/* SVG for connection lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {lines.map((l, i) => (
            <motion.line
              key={i}
              x1={l.x1}
              y1={l.y1}
              x2={l.x2}
              y2={l.y2}
              stroke="#27272a" // zinc-800
              strokeWidth={2}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.3 + i * 0.08 }}
            />
          ))}
        </svg>

        {/* Skill Nodes */}
        <div className="absolute inset-0">
          {skills.map((skill, idx) => (
            <motion.div
              key={skill.id}
              ref={(el) => {
                nodeRefs.current[skill.id] = el;
              }}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.55, delay: idx * 0.095 + 0.24 }}
              style={{
                position: "absolute",
                left: `${skill.position.x}%`,
                top: `${skill.position.y}%`,
                transform: "translate(-50%, -50%)",
                zIndex: 2,
              }}
              className="group cursor-pointer focus:outline-none"
              onClick={() =>
                setSelectedSkill(selectedSkill === skill.id ? null : skill.id)
              }
              tabIndex={0}
              aria-label={skill.name}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ")
                  setSelectedSkill(
                    selectedSkill === skill.id ? null : skill.id
                  );
              }}
              onLayoutAnimationComplete={measure}
            >
              <div className="relative">
                <div className="relative w-12 h-12 sm:w-16 sm:h-16 bg-neutral-900 border border-neutral-700 group-hover:border-neutral-500 rounded-full flex items-center justify-center shadow-none transition-all">
                  <skill.icon className="w-5 h-5 sm:w-7 sm:h-7 text-neutral-400 group-hover:text-white transition-all" />
                </div>
                <div className="absolute -bottom-2 sm:-bottom-3 left-1/2 transform -translate-x-1/2 px-1.5 sm:px-2 py-0.5 rounded-full text-xs bg-neutral-900 text-neutral-400 border border-neutral-700 font-mono shadow-sm">
                  {skill.level}/10
                </div>
                <div className="absolute -bottom-6 sm:-bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap select-none">
                  <span className="text-white text-xs sm:text-sm font-medium tracking-wide">
                    {skill.name}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detail Panel */}
      <AnimatePresence>
        {selectedSkill && (
          <SkillDetailPanel
            selectedSkill={selectedSkill}
            setSelectedSkill={setSelectedSkill}
            inView={inView}
            treeRef={treeRef}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default SkillTree;
