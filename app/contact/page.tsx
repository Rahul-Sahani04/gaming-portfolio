"use client";
// import { Github, Mail, Twitter } from "lucide-react";
import { useState } from "react";

import Link from "next/link";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";

import LottieAnimation from "../components/LottieAnimation";

import animatedGithub from "../components/AnimatedIcons/icons8-github.json";
import animatedTwitter from "../components/AnimatedIcons/icons8-twitter.json";
import animatedMail from "../components/AnimatedIcons/icons8-gmail-logo.json";
import NextTopLoader from "nextjs-toploader";

export default function Contact() {
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
    <div className=" bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
      <Navigation />
      <NextTopLoader />
      <div className="container flex items-center justify-center min-h-screen px-4 mx-auto">
        <div className="grid w-full grid-rows-1  gap-8 mx-auto mt-32 sm:mt-0 sm:grid-cols-3 lg:gap-16">
          {socials.map((s) => (
            <Card key={s.label}>
              <Link
                onMouseEnter={() =>
                  setIsHovered({ ...isHovered, [s.label.toLowerCase()]: true })

                }
                onMouseLeave={() =>
                  setIsHovered({ ...isHovered, [s.label.toLowerCase()]: false })
                }
                href={s.href}
                target="_blank"
                className="p-4 relative flex flex-col items-center gap-4 duration-700 group md:gap-8 md:py-24  lg:pb-48  md:p-16"
              >
                <span
                  className="absolute w-px h-2/3 bg-gradient-to-b from-zinc-500 via-zinc-500/50 to-transparent"
                  aria-hidden="true"
                />
                <span className="relative z-10 flex items-center justify-center w-12 h-12 text-sm duration-1000 border rounded-full text-zinc-200 group-hover:text-white group-hover:bg-zinc-900 border-zinc-500 bg-zinc-900 group-hover:border-zinc-200 drop-shadow-orange">
                  {s.icon}
                </span>{" "}
                <div className="z-10 flex flex-col items-center">
                  <span className="lg:text-xl font-medium duration-150 xl:text-3xl text-zinc-200 group-hover:text-white font-display">
                    {s.handle}
                  </span>
                  <span className="mt-4 text-sm text-center duration-1000 text-zinc-400 group-hover:text-zinc-200">
                    {s.label}
                  </span>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
