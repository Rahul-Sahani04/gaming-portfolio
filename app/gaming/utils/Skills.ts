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
  type LucideIcon,
} from "lucide-react"

type SkillNode = {
  id: string
  name: string
  icon: LucideIcon
  level: number
  position: { x: number; y: number }
  mobilePosition?: { x: number; y: number }
  connections: string[]
  description?: string
  parent?: string // Add parent relationship for mobile tree structure
  isBranchRoot?: boolean // Mark branch root nodes
}

export const skills: SkillNode[] = [
  // 🔵 Center Node
  {
    id: "me",
    name: "ME",
    icon: Brain,
    level: 10,
    position: { x: 50, y: 50 },
    mobilePosition: { x: 40, y: 15 }, // Move higher to make room for branches
    connections: [
      "cognitive-root",
      "social-root",
      "resilience-root",
      "focus-root",
    ],
    description: "The central core from which all skills grow.",
  },

  // 🧠 Cognitive Branch - Root node
  {
    id: "cognitive-root",
    name: "Cognitive Skills",
    icon: Brain,
    level: 1,
    position: { x: 50, y: 25 },
    mobilePosition: { x: 40, y: 30 },
    connections: ["problem-solving", "strategic-planning", "critical-thinking"],
    description: "Your ability to think, analyze, and plan.",
    isBranchRoot: true,
  },
  {
    id: "problem-solving",
    name: "Problem Solving",
    icon: Brain,
    level: 9,
    position: { x: 50, y: 5 },
    mobilePosition: { x: 40, y: 65 },
    connections: ["creativity", "adaptability"],
    description: "Solve problems using logical, adaptive strategies.",
    parent: "cognitive-root",
  },
  {
    id: "critical-thinking",
    name: "Critical Thinking",
    icon: Watch,
    level: 8,
    position: { x: 40, y: 18 },
    mobilePosition: { x: 15, y: 35 },
    connections: [],
    description: "Assess, evaluate and make rational decisions.",
    parent: "cognitive-root",
  },
  {
    id: "strategic-planning",
    name: "Strategic Planning",
    icon: Target,
    level: 8,
    position: { x: 60, y: 18 },
    mobilePosition: { x: 65, y: 35 },
    connections: [],
    description: "Plan ahead, manage time and goals effectively.",
    parent: "cognitive-root",
  },
  {
    id: "creativity",
    name: "Creativity",
    icon: Palette,
    level: 8,
    position: { x: 30, y: 5 },
    mobilePosition: { x: 15, y: 72 },
    connections: ["spatial-awareness"],
    description: "Think outside the box, innovate new approaches.",
    parent: "problem-solving",
  },
  {
    id: "adaptability",
    name: "Adaptability",
    icon: Zap,
    level: 8,
    position: { x: 70, y: 5 },
    mobilePosition: { x: 65, y: 72 },
    connections: ["risk-assessment"],
    description: "Quickly shift strategies in changing environments.",
    parent: "problem-solving",
  },
  {
    id: "spatial-awareness",
    name: "3D Thinking",
    icon: Eye,
    level: 7,
    position: { x: 20, y: 0 },
    mobilePosition: { x: 5, y: 85 },
    connections: [],
    description: "Understand and visualize space and structure.",
    parent: "creativity",
  },
  {
    id: "risk-assessment",
    name: "Risk Sense",
    icon: ShieldCheck,
    level: 8,
    position: { x: 80, y: 0 },
    mobilePosition: { x: 75, y: 85 },
    connections: [],
    description: "Judge options and predict potential outcomes.",
    parent: "adaptability",
  },

  // 🤝 Social Skills Branch
  {
    id: "social-root",
    name: "Social Skills",
    icon: Users,
    level: 1,
    position: { x: 30, y: 50 },
    mobilePosition: { x: 15, y: 50 },
    connections: ["teamwork", "communication", "leadership"],
    description: "Interact and cooperate with others.",
    isBranchRoot: true,
  },
  {
    id: "teamwork",
    name: "Teamwork",
    icon: Users,
    level: 8,
    position: { x: 15, y: 30 },
    mobilePosition: { x: 0, y: 65 },
    connections: [],
    description: "Collaborate and sync with teammates effectively.",
    parent: "social-root",
  },
  {
    id: "communication",
    name: "Communication",
    icon: Users,
    level: 8,
    position: { x: 15, y: 50 },
    mobilePosition: { x: 15, y: 80 },
    connections: [],
    description: "Convey thoughts clearly and receive feedback.",
    parent: "social-root",
  },
  {
    id: "leadership",
    name: "Leadership",
    icon: Users,
    level: 7,
    position: { x: 15, y: 70 },
    mobilePosition: { x: 30, y: 65 },
    connections: [],
    description: "Direct, organize, and inspire teams.",
    parent: "social-root",
  },

  // ⚔️ Resilience Branch
  {
    id: "resilience-root",
    name: "Resilience",
    icon: Shield,
    level: 1,
    position: { x: 70, y: 50 },
    mobilePosition: { x: 65, y: 50 },
    connections: [
      "resilience",
      "emotional-regulation",
      "learning-from-failure",
      "patience-persistence",
    ],
    description: "Mental toughness and personal growth.",
    isBranchRoot: true,
  },
  {
    id: "resilience",
    name: "Resilience",
    icon: Shield,
    level: 9,
    position: { x: 85, y: 20 },
    mobilePosition: { x: 85, y: 65 },
    connections: [],
    description: "Recover from setbacks with a growth mindset.",
    parent: "resilience-root",
  },
  {
    id: "emotional-regulation",
    name: "Self-Control",
    icon: HeartPulse,
    level: 8,
    position: { x: 85, y: 40 },
    mobilePosition: { x: 80, y: 80 },
    connections: [],
    description: "Stay composed under pressure.",
    parent: "resilience-root",
  },
  {
    id: "learning-from-failure",
    name: "Bounce Back",
    icon: Shield,
    level: 9,
    position: { x: 85, y: 65 },
    mobilePosition: { x: 55, y: 80 },
    connections: [],
    description: "Reflect on mistakes to improve.",
    parent: "resilience-root",
  },
  {
    id: "patience-persistence",
    name: "Grit",
    icon: Shield,
    level: 8,
    position: { x: 85, y: 85 },
    mobilePosition: { x: 50, y: 65 },
    connections: [],
    description: "Stay committed through difficult challenges.",
    parent: "resilience-root",
  },

  // 🔴 Focus Branch
  {
    id: "focus-root",
    name: "Focus & Execution",
    icon: Eye,
    level: 1,
    position: { x: 50, y: 75 },
    mobilePosition: { x: 40, y: 95 },
    connections: ["concentration", "multitasking"],
    description: "Attention control and task handling.",
    isBranchRoot: true,
  },
  {
    id: "concentration",
    name: "Concentration",
    icon: Eye,
    level: 8,
    position: { x: 40, y: 90 },
    mobilePosition: { x: 15, y: 108 },
    connections: [],
    description: "Maintain attention on tasks over time.",
    parent: "focus-root",
  },
  {
    id: "multitasking",
    name: "Multitasking",
    icon: Clock,
    level: 7,
    position: { x: 60, y: 90 },
    mobilePosition: { x: 65, y: 108 },
    connections: [],
    description: "Handle multiple demands simultaneously.",
    parent: "focus-root",
  },
];

// Helper functions for mobile tree structure
export const getBranchRoots = () => skills.filter((skill) => skill.isBranchRoot)

export const getChildrenOfBranch = (branchId: string) =>
  skills.filter(
    (skill) =>
      skill.parent === branchId || skills.some((parent) => parent.id === skill.parent && parent.parent === branchId),
  )

export const getAllDescendants = (branchId: string): string[] => {
  const directChildren = skills.filter((skill) => skill.parent === branchId)
  const allDescendants = [...directChildren.map((child) => child.id)]

  directChildren.forEach((child) => {
    allDescendants.push(...getAllDescendants(child.id))
  })

  return allDescendants
}

