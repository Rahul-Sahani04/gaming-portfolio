"use client";
import { useState } from "react";
import Link from "next/link";
import { Navigation } from "../components/nav";
import dynamic from "next/dynamic";
const LottieAnimation = dynamic(() => import("../components/LottieAnimation"), { ssr: false });

import animatedGithub from "../components/AnimatedIcons/icons8-github.json";
import animatedTwitter from "../components/AnimatedIcons/icons8-twitter.json";
import animatedMail from "../components/AnimatedIcons/icons8-gmail-logo.json";
import NextTopLoader from "nextjs-toploader";
import Particles from "../components/particles";
import { Meteors } from "../components/magicui/meteors";
import BlurText from "../components/BlurText";
import { MagneticWrapper } from "../components/MagneticWrapper";
import { OrbitRing } from "../components/OrbitRing";
import LoadingScreen from "../components/LoadingScreen";
import ContactForm from "./form";
import { motion } from "framer-motion";
import { ArrowDown, Radio } from "lucide-react";
import AnimatedBeams from "@/components/AnimatedBeam";

export default function Contact() {
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState({
    linkedin: false,
    email: false,
    github: false,
  });

  const socials = [
    {
      icon: (
        <LottieAnimation
          animationData={animatedTwitter}
          width="70%"
          color="FFFFFF"
          isHovered={isHovered.linkedin}
          initialFrame={isHovered.linkedin ? 0 : 75}
        />
      ),
      href: "https://linkedin.in/in/rahul1sahani",
      label: "LinkedIn",
      handle: "Rahul1Sahani",
      desc: "Connect professionally",
      orbitDuration: 9,
      orbitReverse: false,
    },
    {
      icon: (
        <LottieAnimation
          animationData={animatedMail}
          width="60%"
          height="60%"
          color="FFFFFF"
          isHovered={isHovered.email}
        />
      ),
      href: "mailto:me.rsahani@gmail.com",
      label: "Email",
      handle: "me.rsahani@gmail.com",
      desc: "Fastest response",
      orbitDuration: 7,
      orbitReverse: true,
    },
    {
      icon: (
        <LottieAnimation
          animationData={animatedGithub}
          width="100%"
          height="100%"
          color="FFFFFF"
          isHovered={isHovered.github}
        />
      ),
      href: "https://github.com/rahul-sahani04",
      label: "Github",
      handle: "Rahul-Sahani04",
      desc: "See the source",
      orbitDuration: 11,
      orbitReverse: false,
    },
  ];

  return (
    <div className="bg-black min-h-screen relative overflow-hidden">
      {/* Layered atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_-15%,rgba(255,255,255,0.025),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_90%_70%,rgba(80,60,180,0.04),transparent)]" />
      <Particles className="absolute inset-0 -z-10 animate-fade-in" quantity={150} staticity={35} />
      <Meteors number={15} minDuration={6} maxDuration={14} />

      <AnimatedBeams />
      <Navigation />
      <NextTopLoader />
      {loading && (
        <div className="flex items-center justify-center w-full h-screen bg-black">
          <LoadingScreen loading={loading} setLoading={setLoading} />
        </div>
      )}

      <div className="container flex flex-col items-center min-h-screen px-4 mx-auto pt-28 md:pt-36 pb-24">

        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 text-[10px] font-mono text-zinc-500 border border-white/[0.07] bg-white/[0.02] px-4 py-1.5 rounded-full mb-8 backdrop-blur-sm"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
          </span>
          Available for new projects
          <Radio className="w-3 h-3 ml-1 text-zinc-600" />
        </motion.div>

        {/* Title */}
        <div className="text-center mb-16">
          <BlurText
            text="Connect"
            className="text-6xl md:text-7xl font-bold tracking-tight text-white font-display mb-4"
            delay={100}
            animateBy="letters"
            direction="top"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-zinc-500 font-light text-base max-w-sm mx-auto leading-relaxed"
          >
            Reach out through any of these channels.
            <br />I usually respond within 24 hours.
          </motion.p>
        </div>

        {/* Social cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid w-full grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl"
        >
          {socials.map((s, i) => (
            <Link
              key={s.label}
              href={s.href}
              target="_blank"
              onMouseEnter={() => setIsHovered({ ...isHovered, [s.label.toLowerCase()]: true })}
              onMouseLeave={() => setIsHovered({ ...isHovered, [s.label.toLowerCase()]: false })}
            >
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative flex flex-col items-center gap-5 p-7 rounded-2xl bg-white/[0.025] border border-white/[0.07] hover:border-white/[0.14] hover:bg-white/[0.04] transition-colors duration-300 backdrop-blur-sm group cursor-pointer"
              >
                {/* Shimmer top border */}
                <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />

                {/* Icon with orbit ring */}
                <div className="relative flex items-center justify-center w-16 h-16">
                  <OrbitRing
                    size={84}
                    duration={s.orbitDuration}
                    reverse={s.orbitReverse}
                    color="rgba(255,255,255,0.08)"
                    dashArray="3 10"
                    className="-inset-[10px]"
                  />
                  <MagneticWrapper strength={0.35}>
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/[0.04] border border-white/10 group-hover:border-white/20 group-hover:bg-white/[0.07] transition-all duration-300 shadow-lg">
                      {s.icon}
                    </div>
                  </MagneticWrapper>
                </div>

                {/* Labels */}
                <div className="flex flex-col items-center gap-1 text-center">
                  <span className="text-sm font-medium text-zinc-200 group-hover:text-white font-display tracking-tight transition-colors duration-200">
                    {s.handle}
                  </span>
                  <span className="text-[10px] text-zinc-600 font-light">{s.desc}</span>
                </div>

                {/* Platform label */}
                <span className="text-[9px] font-mono text-zinc-700 tracking-[0.2em] uppercase border border-white/[0.04] px-2.5 py-0.5 rounded-full">
                  {s.label}
                </span>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* Arrow */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="mt-16 mb-8 text-zinc-700"
          aria-hidden="true"
        >
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </div>

      {/* Contact form */}
      <div className="py-4 pb-24 w-full max-w-xl mx-auto px-4">
        <ContactForm />
      </div>
    </div>
  );
}
