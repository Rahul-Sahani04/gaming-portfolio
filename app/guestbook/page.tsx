import { Redis } from "@upstash/redis";
import GuestbookForm from "./form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guestbook | Rahul Sahani",
  description: "Leave a message for me and future visitors.",
};
import { Navigation } from "../components/nav";
import { formatDistanceToNow } from "date-fns";
import CustomCursor from "../components/CustomCursor";
import NextTopLoader from "nextjs-toploader";
import Particles from "../components/particles";
import { Card } from "../components/card";
import BlurText from "../components/BlurText";
import { MessageSquare, Star } from "lucide-react";
import AnimatedBeams from "@/components/AnimatedBeam";
import { endorsements } from "./endorsements";
import EndorsementCard from "./EndorsementCard";
import HorizontalScroll from "./HorizontalScroll";

import { Github, Linkedin } from "@/components/Icons";

const redis = Redis.fromEnv();

export const revalidate = 0;

// Get initials from name
function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? "")
    .join("");
}

// Deterministic "hue" from name for the glowing avatar ring
function nameToHue(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return 20 + (Math.abs(hash) % 30);
}

export default async function GuestbookPage() {
  const entries = (await redis.lrange("guestbook:entries", 0, -1))
    .map((entry: any) => {
      if (typeof entry === "string") {
        try { return JSON.parse(entry); } catch { return null; }
      }
      return entry;
    })
    .filter(Boolean);

  return (
    <div className="bg-black min-h-screen relative overflow-hidden">
      {/* Cosmic atmosphere layers */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(255,160,0,0.05),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_10%_80%,rgba(200,100,0,0.06),transparent)]" />
      <Particles className="absolute inset-0 -z-10 animate-fade-in" quantity={180} staticity={40} />

      <Navigation />
      <CustomCursor />
      <NextTopLoader />
      <AnimatedBeams />

      <div className="container flex flex-col items-center min-h-screen px-4 mx-auto pt-24 md:pt-32 pb-20">
        <div className="max-w-[80%] w-full mx-auto">

          {/* Header */}
          <div className="max-w-2xl mx-auto">
            <div className=" text-center mb-3 flex items-center justify-center gap-3 flex-col">
              <div className="inline-flex items-center gap-2 text-[10px] font-mono text-amber-500/70 tracking-[0.25em] uppercase mb-5">
                <span className="w-1 h-1 rounded-sm bg-amber-500/50" />
                BLACKLIST DATABASE
                <span className="w-1 h-1 rounded-sm bg-amber-500/50" />
              </div>

              <BlurText
                text="Guestbook"
                className="!text-center text-5xl md:text-6xl font-black tracking-tighter text-zinc-200 !bg-clip-text !bg-gradient-to-b !from-yellow-400 !via-amber-500 !to-orange-600 font-display uppercase"
                delay={100}
                animateBy="letters"
                direction="top"

              />
              <p className="mt-4 text-zinc-300 font-light text-sm leading-relaxed">
                Leave a message — it'll float here in the void forever.
              </p>
            </div>




            {/* Entry count badge */}
            {entries.length > 0 && (
              <div className="flex justify-center mt-6 mb-12 max-w-2xl">
                <span className="inline-flex items-center gap-2 text-xs font-mono text-amber-400 border border-amber-500/20 bg-amber-500/10 px-4 py-1.5 rounded-sm">
                  <MessageSquare className="w-3 h-3" />
                  {entries.length} message{entries.length !== 1 ? "s" : ""} received
                </span>
              </div>
            )}

            <GuestbookForm />

          </div>
          {/* Priority Transmissions (Endorsements) */}
          {endorsements.length > 0 && (
            <div className="mt-12 mb-16 relative">
              <div className="flex items-center gap-4 mb-8">
                <div className="flex-1 h-px bg-white/[0.04]" />
                <span className="text-[10px] font-mono text-zinc-200 tracking-widest uppercase flex items-center gap-2">
                  Signals From My Peers
                </span>
                <div className="flex-1 h-px bg-white/[0.04]" />
              </div>
              <HorizontalScroll>
                {endorsements.map((endorsement, idx) => (
                  <EndorsementCard key={endorsement.id} endorsement={endorsement} idx={idx} />
                ))}
              </HorizontalScroll>
            </div>
          )}

          <div className="max-w-2xl mx-auto">



            {/* Entries */}
            {entries.length > 0 && (
              <div className="mt-2">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1 h-px bg-white/[0.04]" />
                  <span className="text-[10px] font-mono text-amber-500/90 tracking-widest uppercase">LOGS FROM THE INTERNET</span>
                  <div className="flex-1 h-px bg-white/[0.04]" />
                </div>

                <div className="max-h-[500px] overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                  {entries.map((entry: any) => {
                    const hue = nameToHue(entry.name ?? "Anonymous");
                    const initials = getInitials(entry.name ?? "?");
                    return (
                      <div key={entry.id} className="relative w-full">
                        <div className="bg-zinc-950 border-l-2 border-l-amber-300/60 border-y border-r border-white/5 shadow-2xl relative overflow-hidden group">
                          {/* Hazard stripes top corner */}
                          <div className="absolute -top-6 -right-6 w-16 h-16 bg-amber-500/5 rotate-45 border-b border-amber-500/20" />

                          <div className="p-5 md:p-6 flex gap-4 w-full h-full relative z-10">
                            {/* Avatar */}
                            <div className="relative shrink-0 mt-0.5">
                              <div
                                className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white font-display"
                                style={{
                                  background: `radial-gradient(circle, hsl(${hue},40%,8%) 0%, hsl(${hue},30%,4%) 100%)`,
                                  boxShadow: `0 0 0 1px hsl(${hue},40%,15%), 0 0 10px hsl(${hue},50%,8%)`,
                                }}
                              >
                                {initials}
                              </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-baseline justify-between gap-2 mb-2">
                                <span className="text-sm font-medium text-zinc-100 tracking-tight">
                                  {entry.name}
                                </span>
                                <span className="text-[10px] text-zinc-700 font-mono shrink-0">
                                  {formatDistanceToNow(entry.created_at, { addSuffix: true })}
                                </span>
                              </div>
                              <p className="text-sm text-zinc-400 leading-relaxed font-light whitespace-pre-wrap">
                                {entry.message}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {entries.length === 0 && (
            <p className="text-center text-zinc-700 text-sm font-light mt-8">
              No transmissions yet. Yours could be the first.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
