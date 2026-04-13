'use client';

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Particles from "./particles";
import useIsMobile from "../hooks/useIsMobile";
import StarBackground from "./StarBackground";

import CustomCursor from "./CustomCursor";

import NextTopLoader from 'nextjs-toploader';

import LoadingScreen from "./LoadingScreen";

import dynamic from 'next/dynamic';

const ThreeScene = dynamic(() => import('./ThreeScene'), { ssr: false });

const navigation = [
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
];

function PlayGame() {
    window.open("https://mini-space-shooter.vercel.app/", "_blank");
}

export default function HeroSection() {
    const isMobile = useIsMobile();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // On mouse click anywhere on the page, play sound effect
        const handleClick = () => {
            const audio = new Audio("/plasmablaster-37114.mp3");
            audio.volume = 0.2;
            audio.playbackRate = 0.9;
            audio.play();
        };

        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, []);

    return (
        <div className="!overflow-hidden flex flex-col items-center justify-center w-full h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
            <CustomCursor />
            <NextTopLoader />
            {
                loading && (
                    <div className="flex items-center justify-center w-full h-screen bg-black">
                        <LoadingScreen loading={loading} setLoading={setLoading} />
                    </div>
                )
            }
            {
                !isMobile ? <ThreeScene loading={loading} /> : <StarBackground />
            }
            <div className="hidden w-full h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
            <Particles
                className="absolute inset-0 -z-10 animate-fade-in"
                quantity={100}
            />
            <h3 className="z-10 text-sm text-center text-zinc-500 sm:text-base md:text-lg animate-fade-in">
                Hey, Ready to be impressed? Explore my portfolio. 🚀
            </h3>
            <h1 className="z-10 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-extrabold sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text ">
                Rahul Sahani
            </h1>

            <div className="hidden w-full h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />

            <div className="my-16 text-center animate-fade-in ">
                <h2 className="text-sm text-zinc-500 ">
                    <Link
                        href="/about"
                        className="duration-500 hover:text-zinc-300 no-underline press-start text-base sm:text-xl md:text-3xl z-20"
                    >
                        Press Start
                    </Link>
                </h2>
            </div>

            <div
                className="absolute -bottom-0 -right-2"
                onClick={PlayGame}
                style={{ cursor: "pointer" }}
                id="cat-peeking-container"
            >
                {/* Message Bubble */}
                <p className="absolute -top-10 right-4 w-18 lg:w-22 !text-[12px] md:!text-[16px] text-zinc-500 animate-fade-in ">
                    Wanna play a game? 🐾
                </p>
                <Image
                    id="cat-peeking-image"
                    alt="Playful cat peeking from corner — click to play Space Shooter game"
                    src="/CatPeeking.png"
                    width={64}
                    height={64}
                    className=" w-12 md:w-16 hover:!opacity-70 !opacity-50 invisible Animate-FadeInRight backdrop:blur-sm rounded-full shadow-lg transition-transform duration-300 cursor-pointer z-20 "
                />
            </div>
        </div>
    );
}
