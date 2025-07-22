import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Brain, Palette, Users, Zap, Shield } from "lucide-react";

const skills = [
  {
    id: "problem-solving",
    name: "Problem Solving",
    icon: Brain,
    level: 9,
    position: { x: 50, y: 20 },
    connections: ["creativity", "adaptability"],
    description:
      "You learn to approach complex scenarios and puzzles with logic and creative strategy.",
  },
  {
    id: "creativity",
    name: "Creativity",
    icon: Palette,
    level: 8,
    position: { x: 25, y: 45 },
    connections: ["teamwork", "communication"],
    description:
      "You build, design, or improvise solutions—games foster invention.",
  },
  {
    id: "teamwork",
    name: "Teamwork",
    icon: Users,
    level: 7,
    position: { x: 15, y: 70 },
    connections: [],
    description:
      "Cooperative titles develop collaboration, communication, and shared objectives.",
  },
  {
    id: "communication",
    name: "Communication",
    icon: Users,
    level: 7,
    position: { x: 40, y: 70 },
    connections: [],
    description:
      "You gain experience in sharing ideas, calling plays, and clarity under pressure.",
  },
  {
    id: "adaptability",
    name: "Adaptability",
    icon: Zap,
    level: 8,
    position: { x: 75, y: 45 },
    connections: ["resilience"],
    description:
      "Games force you to change tactics and adjust to opponents and surprises.",
  },
  {
    id: "resilience",
    name: "Resilience",
    icon: Shield,
    level: 9,
    position: { x: 85, y: 70 },
    connections: [],
    description:
      "Frequent failure and retry builds thick skin and a growth mindset.",
  },
];

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
    <div
      ref={(el) => {
        (treeRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
        inViewRef(el);
      }}
      className="relative min-h-[480px] p-6 sm:p-10"
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
                setSelectedSkill(selectedSkill === skill.id ? null : skill.id);
            }}
            onLayoutAnimationComplete={measure}
          >
            <div className="relative">
              {/* No Blurs/Glows */}
              <div className="relative w-16 h-16 bg-neutral-900 border border-neutral-700 group-hover:border-neutral-500 rounded-full flex items-center justify-center shadow-none transition-all">
                <skill.icon className="w-7 h-7 text-neutral-400 group-hover:text-white transition-all" />
              </div>
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 px-2 py-0.5 rounded-full text-xs bg-neutral-900 text-neutral-400 border border-neutral-700 font-mono shadow-sm">
                {skill.level}/10
              </div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap select-none">
                <span className="text-white text-sm font-medium tracking-wide">
                  {skill.name}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Skill Detail Panel */}
      <AnimatePresence>
        {selectedSkill && (() => {
          const s = skills.find((sk) => sk.id === selectedSkill);
          if (!s) return null;
          return (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 max-w-md w-full p-5 rounded-xl bg-neutral-900/90 border border-neutral-700 flex gap-4 items-start shadow-lg backdrop-blur"
            >
              <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-neutral-900 border border-neutral-700">
                <s.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold mb-1 text-lg">
                  {s.name}
                </h3>
                <p className="text-neutral-400 text-[15px]">{s.description}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs text-neutral-500">Skill Level:</span>
                  <div className="flex gap-1">
                    {[...Array(10)].map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-2 h-2 rounded-full ${
                          idx < s.level
                            ? "bg-neutral-300"
                            : "bg-neutral-800"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
};
export default SkillTree;
