import {
  Brain,
  Users,
  ShieldCheck,
  Eye,
  HeartPulse,
  Palette,
  Zap,
  Watch,
  Clock,
  Shield,
  Target,
  LayoutGrid,
  LucideIcon,
} from "lucide-react";


type SkillNode = {
  id: string;
  name: string;
  icon: LucideIcon;
  level: number;
  position: { x: number; y: number };
  connections: string[];
  description?: string;
};

export const skills: SkillNode[] = [
  // 🔵 Center Node
  {
    id: "me",
    name: "ME",
    icon: Brain,
    level: 10,
    position: { x: 50, y: 50 },
    connections: [
      "cognitive-root",
      "social-root",
      "resilience-root",
      "focus-root",
    ],
    description: "The central core from which all skills grow.",
  },

  // 🧠 Cognitive Branch
  {
    id: "cognitive-root",
    name: "Cognitive Skills",
    icon: Brain,
    level: 1,
    position: { x: 50, y: 25 },
    connections: ["problem-solving", "strategic-planning", "critical-thinking"],
    description: "Your ability to think, analyze, and plan.",
  },
  {
    id: "problem-solving",
    name: "Problem Solving",
    icon: Brain,
    level: 9,
    position: { x: 50, y: 5 },
    connections: ["creativity", "adaptability"],
    description: "Solve problems using logical, adaptive strategies.",
  },
  {
    id: "critical-thinking",
    name: "Critical Thinking",
    icon: Watch,
    level: 8,
    position: { x: 40, y: 18 },
    connections: [],
    description: "Assess, evaluate and make rational decisions.",
  },
  {
    id: "strategic-planning",
    name: "Strategic Planning",
    icon: Target,
    level: 8,
    position: { x: 60, y: 18 },
    connections: [],
    description: "Plan ahead, manage time and goals effectively.",
  },
  {
    id: "creativity",
    name: "Creativity",
    icon: Palette,
    level: 8,
    position: { x: 30, y: 5 },
    connections: ["spatial-awareness"],
    description: "Think outside the box, innovate new approaches.",
  },
  {
    id: "adaptability",
    name: "Adaptability",
    icon: Zap,
    level: 8,
    position: { x: 70, y: 5 },
    connections: ["risk-assessment"],
    description: "Quickly shift strategies in changing environments.",
  },
  {
    id: "spatial-awareness",
    name: "Spatial Awareness",
    icon: Eye,
    level: 7,
    position: { x: 20, y: 0 },
    connections: [],
    description: "Understand and visualize space and structure.",
  },
  {
    id: "risk-assessment",
    name: "Risk Assessment",
    icon: ShieldCheck,
    level: 8,
    position: { x: 80, y: 0 },
    connections: [],
    description: "Judge options and predict potential outcomes.",
  },

  // 🤝 Social Skills Branch
  {
    id: "social-root",
    name: "Social Skills",
    icon: Users,
    level: 1,
    position: { x: 30, y: 50 },
    connections: ["teamwork", "communication", "leadership"],
    description: "Interact and cooperate with others.",
  },
  {
    id: "teamwork",
    name: "Teamwork",
    icon: Users,
    level: 8,
    position: { x: 15, y: 30 },
    connections: [],
    description: "Collaborate and sync with teammates effectively.",
  },
  {
    id: "communication",
    name: "Communication",
    icon: Users,
    level: 8,
    position: { x: 15, y: 50 },
    connections: [],
    description: "Convey thoughts clearly and receive feedback.",
  },
  {
    id: "leadership",
    name: "Leadership",
    icon: Users,
    level: 7,
    position: { x: 15, y: 70 },
    connections: [],
    description: "Direct, organize, and inspire teams.",
  },

  // ⚔️ Resilience Branch
  {
    id: "resilience-root",
    name: "Resilience & Growth",
    icon: Shield,
    level: 1,
    position: { x: 70, y: 50 },
    connections: [
      "resilience",
      "emotional-regulation",
      "learning-from-failure",
      "patience-persistence",
    ],
    description: "Mental toughness and personal growth.",
  },
  {
    id: "resilience",
    name: "Resilience",
    icon: Shield,
    level: 9,
    position: { x: 85, y: 20 },
    connections: [],
    description: "Recover from setbacks with a growth mindset.",
  },
  {
    id: "emotional-regulation",
    name: "Emotional Regulation",
    icon: HeartPulse,
    level: 8,
    position: { x: 85, y: 40 },
    connections: [],
    description: "Stay composed under pressure.",
  },
  {
    id: "learning-from-failure",
    name: "Learning from Failure",
    icon: Shield,
    level: 9,
    position: { x: 85, y: 65 },
    connections: [],
    description: "Reflect on mistakes to improve.",
  },
  {
    id: "patience-persistence",
    name: "Patience & Persistence",
    icon: Shield,
    level: 8,
    position: { x: 85, y: 85 },
    connections: [],
    description: "Stay committed through difficult challenges.",
  },

  // 🔴 Focus Branch
  {
    id: "focus-root",
    name: "Focus & Execution",
    icon: Eye,
    level: 1,
    position: { x: 50, y: 75 },
    connections: ["focus", "multitasking"],
    description: "Attention control and task handling.",
  },
  {
    id: "focus",
    name: "Focus & Concentration",
    icon: Eye,
    level: 8,
    position: { x: 40, y: 90 },
    connections: [],
    description: "Maintain attention on tasks over time.",
  },
  {
    id: "multitasking",
    name: "Multitasking",
    icon: Clock,
    level: 7,
    position: { x: 60, y: 90 },
    connections: [],
    description: "Handle multiple demands simultaneously.",
  },
];

