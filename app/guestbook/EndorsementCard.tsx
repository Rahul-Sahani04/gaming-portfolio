"use client";

import { playHoverSquelch } from "./audio";
import { Github, Linkedin, Youtube, Instagram, Pinterest, Twitter } from "@/components/Icons";
import Image from "next/image";
interface EndorsementProps {
  endorsement: {
    id: string;
    name: string;
    role: string;
    avatar: string;
    message: string;
    github?: string;
    linkedin?: string;
    youtube?: string;
    instagram?: string;
    pinterest?: string;
    twitter?: string;
  };
  idx: number;
}

export default function EndorsementCard({ endorsement, idx }: EndorsementProps) {
  return (
    <div
      className="flex gap-4 items-start group w-[75vw] sm:w-[320px] md:w-[420px] max-w-full shrink-0 snap-center cursor-crosshair"
      onMouseEnter={playHoverSquelch}
    >
      <div className="flex flex-col items-center shrink-0 ">
        <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border border-amber-500/30 group-hover:border-white/[0.1] shadow-xl transition-colors duration-500">
          <Image
            src={endorsement.avatar}
            alt={endorsement.name}
            width={200}
            height={300}
            loading="lazy"
            className="w-full h-full object-cover sepia-[.8] contrast-125 saturate-150 hue-rotate-[-15deg] brightness-90 opacity-80 group-hover:sepia-0 group-hover:contrast-100 group-hover:saturate-100 group-hover:hue-rotate-0 group-hover:brightness-100 group-hover:opacity-100 transition-all duration-500"
          />
          <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-full" />
        </div>
      </div>

      {/* Dialogue Bubble */}
      <div className="relative flex-1 mt-1 h-full">
        <div className="h-full flex flex-col bg-gradient-to-br from-white/[0.05] to-white/[0.01] border border-white/[0.08] rounded-2xl rounded-tl-none p-5 transition-all duration-500 group-hover:border-white/[0.15] group-hover:from-white/[0.08]">
          <div className="mb-3">
            <h4 className="text-sm font-medium text-zinc-100 tracking-tight flex items-center justify-between">
              {endorsement.name}
              <span className="px-1.5 py-0.5 bg-amber-500 text-black text-[9px] font-black uppercase tracking-widest rounded-sm shrink-0 ml-2">
                BLACKLIST #0{idx + 1}
              </span>
            </h4>
            <p className="text-xs text-zinc-500 font-mono tracking-wide mt-1">{endorsement.role}</p>
          </div>
          <div className="text-sm text-zinc-400 leading-relaxed font-light max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-amber-500/20 hover:scrollbar-thumb-amber-500/40 scrollbar-track-transparent pr-2 whitespace-pre-wrap">
            "{endorsement.message}"
          </div>

          {/* Social Links Bar */}
          <div className="mt-auto pt-3 border-t border-white/5 flex flex-wrap gap-4 items-center">
            {endorsement.youtube && (
              <a href={endorsement.youtube} target="_blank" rel="noopener noreferrer" className="relative text-zinc-500 hover:text-red-500 transition-colors flex items-center gap-1.5 group/link" title={`${endorsement.name}'s YouTube`}>
                <Youtube className="w-6 h-6" />
                <span className="text-[10px] uppercase font-bold tracking-wider opacity-0 group-hover/link:opacity-100 transition-opacity absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap">YouTube</span>
              </a>
            )}
            {endorsement.instagram && (
              <a href={endorsement.instagram} target="_blank" rel="noopener noreferrer" className="relative text-zinc-500 hover:text-pink-500 transition-colors flex items-center gap-1.5 group/link" title={`${endorsement.name}'s Instagram`}>
                <Instagram className="w-6 h-6" />
                <span className="text-[10px] uppercase font-bold tracking-wider opacity-0 group-hover/link:opacity-100 transition-opacity absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap">Instagram</span>
              </a>
            )}
            {endorsement.pinterest && (
              <a href={endorsement.pinterest} target="_blank" rel="noopener noreferrer" className="relative text-zinc-500 hover:text-red-600 transition-colors flex items-center gap-1.5 group/link" title={`${endorsement.name}'s Pinterest`}>
                <Pinterest className="w-6 h-6" />
                <span className="text-[10px] uppercase font-bold tracking-wider opacity-0 group-hover/link:opacity-100 transition-opacity absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap">Pinterest</span>
              </a>
            )}
            {endorsement.github && (
              <a href={endorsement.github} target="_blank" rel="noopener noreferrer" className="relative text-zinc-500 hover:text-white transition-colors flex items-center gap-1.5 group/link" title={`${endorsement.name}'s GitHub`}>
                <Github className="w-6 h-6" />
                <span className="text-[10px] uppercase font-bold tracking-wider opacity-0 group-hover/link:opacity-100 transition-opacity absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap">Github</span>
              </a>
            )}
            {endorsement.linkedin && (
              <a href={endorsement.linkedin} target="_blank" rel="noopener noreferrer" className="relative text-zinc-500 hover:text-blue-500 transition-colors flex items-center gap-1.5 group/link" title={`${endorsement.name}'s LinkedIn`}>
                <Linkedin className="w-6 h-6" />
                <span className="text-[10px] uppercase font-bold tracking-wider opacity-0 group-hover/link:opacity-100 transition-opacity absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap">Linkedin</span>
              </a>
            )}
            {endorsement.twitter && (
              <a href={endorsement.twitter} target="_blank" rel="noopener noreferrer" className="relative text-zinc-500 hover:text-blue-400 transition-colors flex items-center gap-1.5 group/link" title={`${endorsement.name}'s Twitter`}>
                <Twitter className="w-6 h-6" />
                <span className="text-[10px] uppercase font-bold tracking-wider opacity-0 group-hover/link:opacity-100 transition-opacity absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap">Twitter</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
