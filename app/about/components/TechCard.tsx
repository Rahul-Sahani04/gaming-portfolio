"use client"

import Image from "next/image"
import { useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"

interface TechCardProps {
  tech: {
    name: string
    description: string
    icon: string
  }
}

export default function TechCard({ tech }: TechCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const card = cardRef.current;
    if (!card) return;

    const xTo = gsap.quickTo(card, "x", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(card, "y", { duration: 0.4, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.15;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.15;
      xTo(x);
      yTo(y);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, { scope: cardRef });

  return (
    <div
      ref={cardRef}
      className="relative py-4 px-2 rounded-lg border border-zinc-800 bg-zinc-900/40 overflow-hidden group hover:bg-zinc-900/60 transition-colors duration-500 will-change-transform"
    >
      <div className="absolute inset-0 bg-zinc-800/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="w-8 h-8 mb-4 relative">
          <Image
            src={tech.icon || "/placeholder.svg"}
            alt={tech.name}
            width={48}
            height={48}
            className="object-contain transition-all duration-500 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110"
          />
        </div>
        <h3 className="text-sm font-medium mb-1 text-zinc-300 group-hover:text-white transition-colors">{tech.name}</h3>
        <p className="text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors">{tech.description}</p>
      </div>
    </div>
  );
}
