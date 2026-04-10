"use client";
// import { Github, Mail, Twitter } from "lucide-react";
import { useState, useEffect } from "react";

import Link from "next/link";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";

import dynamic from "next/dynamic";
const LottieAnimation = dynamic(() => import("../components/LottieAnimation"), { ssr: false });

import animatedGithub from "../components/AnimatedIcons/icons8-github.json";
import animatedTwitter from "../components/AnimatedIcons/icons8-twitter.json";
import animatedMail from "../components/AnimatedIcons/icons8-gmail-logo.json";
import NextTopLoader from "nextjs-toploader";
import Particles from "../components/particles";
import { Meteors } from "../components/magicui/meteors";
import { BlurText } from "../components/BlurText";
import { MagneticWrapper } from "../components/MagneticWrapper";
import LoadingScreen from "../components/LoadingScreen";
import ContactForm from "./form";
import { ArrowDown } from "lucide-react";

export default function Contact() {
  const [loading, setLoading] = useState(true);
  // Create a state to keep track of the hover state of the Cards and pass it to the LottieAnimation component as a prop
  const [isHovered, setIsHovered] = useState({
    linkedin: false,
    email: false,
    github: false,
  });

  const socials = [
    {
      // icon: <Twitter size={20} />,
      icon: (
        <LottieAnimation
          animationData={animatedTwitter}
          width="70%"
          //   height="120%"
          color="FFFFFF"
          isHovered={isHovered.linkedin}
          //   setIsHovered={(hovered) =>
          //     setIsHovered({ ...isHovered, twitter: hovered })
          //   }
          initialFrame={isHovered.linkedin ? 0 : 75}
        />
      ),
      //   href: "https://x.com/PoetOfHerAlgos",
      //   label: "Twitter",
      //   handle: "@PoetOfHerAlgos",
      href: "https://linkedin.in/in/rahul1sahani",
      label: "LinkedIn",
      handle: "Rahul1Sahani",
    },
    {
      icon: (
        <LottieAnimation
          animationData={animatedMail}
          width="60%"
          height="60%"
          color="FFFFFF"
          isHovered={isHovered.email}
        //   setIsHovered={(hovered) =>
        //     setIsHovered({ ...isHovered, email: hovered })
        //   }
        />
      ),
      href: "mailto:me.rsahani@gmail.com",
      label: "Email",
      handle: "me.rsahani@gmail.com",
    },
    {
      // icon: <Github size={20} />,
      icon: (
        <LottieAnimation
          animationData={animatedGithub}
          width="100%"
          height="100%"
          color="FFFFFF"
          isHovered={isHovered.github}
        //   setIsHovered={(hovered) =>
        //     setIsHovered({ ...isHovered, github: hovered })
        //   }
        />
      ),
      href: "https://github.com/rahul-sahani04",
      label: "Github",
      handle: "Rahul-Sahani04",
    },
  ];

  return (
    <div className="bg-black bg-gradient-to-t from-black via-zinc-950 to-black min-h-screen relative overflow-hidden">
      <Particles className="absolute inset-0 -z-10 animate-fade-in" quantity={150} />
      <Meteors number={20} />
      <Navigation />
      <NextTopLoader />
      {
        loading && (
          <div className="flex items-center justify-center w-full h-screen bg-black">
            <LoadingScreen loading={loading} setLoading={setLoading} />
          </div>
        )
      }
      <div className="container flex flex-col items-center justify-center min-h-screen px-4 mx-auto pt-24 md:pt-32">

        <div className="text-center space-y-4 mb-16 hidden sm:block">
          <BlurText text="Connect" className="text-5xl md:text-6xl font-bold tracking-tight text-zinc-100 font-display" delay={2} />
          <p className="text-zinc-400 text-lg font-light">
            Reach out through any of these secure channels.
          </p>
        </div>

        <div className="grid w-full grid-rows-1 gap-6 mx-auto sm:grid-cols-3 lg:gap-8 max-w-5xl">
          {socials.map((s) => (
            <Link
              key={s.label}
              href={s.href}
              target="_blank"
              onMouseEnter={() =>
                setIsHovered({ ...isHovered, [s.label.toLowerCase()]: true })
              }
              onMouseLeave={() =>
                setIsHovered({ ...isHovered, [s.label.toLowerCase()]: false })
              }
              className="group relative flex flex-col items-center justify-center gap-6 p-8 md:p-12 h-full rounded-3xl bg-white/[0.02] border border-white/[0.1] hover:bg-white/[0.04] transition-all duration-500 shadow-xl hover:shadow-2xl hover:-translate-y-2 backdrop-blur-md"
            >
              <div
                className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"
                aria-hidden="true"
              />
              <MagneticWrapper strength={0.3}>
                <span className="relative z-10 flex items-center justify-center w-16 h-16 text-sm duration-500 border rounded-full text-zinc-200 group-hover:text-white group-hover:bg-white/10 border-white/10 bg-black/50 group-hover:border-white/20 shadow-lg">
                  {s.icon}
                </span>
              </MagneticWrapper>
              <div className="z-10 flex flex-col items-center gap-1">
                <span className="lg:text-xl font-medium duration-300 xl:text-2xl text-zinc-200 group-hover:text-white font-display tracking-tight">
                  {s.handle}
                </span>
                <span className="text-sm text-center duration-300 text-zinc-500 group-hover:text-zinc-300 font-light">
                  {s.label}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Arrow Down Icon Animated */}
        <div className="mt-24 mb-12 w-full flex items-center justify-center" aria-hidden="true">
          <ArrowDown className="w-10 h-10 text-zinc-500 animate-bounce" />
        </div>
      </div>
      <div className="py-16 w-full max-w-2xl mx-auto px-4">
        <ContactForm />
      </div>
    </div>
  );
}
