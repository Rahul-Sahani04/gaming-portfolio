'use client';

import Link from "next/link";
import React, { useState } from "react";
import CustomCursor from "./CustomCursor";
import NextTopLoader from 'nextjs-toploader';
import HomeLoader from "./HomeLoader";
import VideoLoader from "./VideoLoader";
import ASCIIText from "./react-bits/ASCIIText";
import Dither from "./react-bits/Dither";
import GlitchText from "./GlitchText";
import { useTerminal } from "./terminal/TerminalProvider";

const menuItems = [
    { id: '01', label: 'ABOUT ME', href: '/about' },
    { id: '02', label: 'PROJECTS', href: '/projects' },
    { id: '03', label: 'GAMING', href: '/gaming' },
    { id: '04', label: 'CONTACT ME', href: '/contact' }
];

const THEMES = [
    { name: 'MONOCHROME', waveColor: [0.15, 0.15, 0.15] as [number, number, number], textColor: '#DBDBDB', highlightClass: 'text-white', bgClass: 'bg-white' },
    { name: 'AMBER_RETRO', waveColor: [0.6, 0.3, 0.0] as [number, number, number], textColor: '#ffb000', highlightClass: 'text-amber-500', bgClass: 'bg-amber-500' },
    { name: 'MATRIX_GREEN', waveColor: [0.0, 0.5, 0.1] as [number, number, number], textColor: '#00ff41', highlightClass: 'text-green-500', bgClass: 'bg-green-500' },
];

export default function HeroSection() {
    const [videoFinished, setVideoFinished] = useState(false);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const [themeIndex, setThemeIndex] = useState(0);
    const [enableGlitch, setEnableGlitch] = useState(true);
    const { openTerminal } = useTerminal();

    const activeTheme = THEMES[themeIndex];

    const playHoverSound = () => {
        const audio = new Audio("/plasmablaster-37114.mp3");
        audio.volume = 0.1;
        audio.playbackRate = 1.5;
        audio.currentTime = 0;
        void audio.play().catch(() => { });
    };

    const cycleTheme = () => {
        setThemeIndex((prev) => (prev + 1) % THEMES.length);
    };

    return (
        <div className="relative flex h-screen w-full flex-col justify-center md:justify-end p-4 sm:p-8 md:p-16 lg:p-24 overflow-hidden bg-black text-white font-mono selection:bg-white selection:text-black">
            <VideoLoader onComplete={() => setVideoFinished(true)} />
            <HomeLoader />
            <CustomCursor />
            <NextTopLoader />

            {/* Background Dither Effect */}
            <div className="absolute inset-0 z-0">
                {videoFinished && (
                    <Dither
                        waveColor={activeTheme.waveColor}
                        disableAnimation={false}
                        waveSpeed={0.05}
                        waveAmplitude={0.4}
                        waveFrequency={120}
                    />
                )}
            </div>

            {/* Scanline overlay */}
            <div className="pointer-events-none absolute inset-0 z-0 bg-cyber-scanline opacity-30 mix-blend-overlay"></div>

            {/* Content Container */}
            <div className={`relative z-10 w-full max-w-6xl flex flex-col items-start ${videoFinished ? "animate-fade-in" : "opacity-0"}`}>

                {/* System Output Header */}
                <div className="hidden sm:flex flex-col mb-4 md:mb-8 text-[10px] md:text-xs text-zinc-500 uppercase tracking-widest space-y-1">
                    <p>{">"} ESTABLISHING SECURE CONNECTION... <span className={activeTheme.highlightClass}>OK</span></p>
                    <p>{">"} LOADING FULL_STACK_ENVIRONMENT... <span className={activeTheme.highlightClass}>OK</span></p>
                    <p>{">"} MOUNTING CREATIVE_ENGINEER PROTOCOLS... <span className={activeTheme.highlightClass}>DONE</span></p>
                    <p>{">"} IDENTIFYING USER:</p>
                </div>

                {/* ReactBits ASCII Art Title */}
                <div className="w-full h-32 sm:h-40 md:h-56 lg:h-72 mb-8 md:mb-12 relative -ml-4 md:-ml-8 cursor-none overflow-hidden">
                    {videoFinished && (
                        <ASCIIText
                            text="RAHUL SAHANI"
                            enableWaves={false}
                            enableMouseInteraction={false}
                            asciiFontSize={window.innerWidth < 768 ? 6 : 8}
                            textColor={activeTheme.textColor}
                        />
                    )}
                </div>

                {/* Navigation (CLI Style) */}
                <nav className="flex flex-col space-y-2 md:space-y-4">
                    {menuItems.map((item) => (
                        <Link
                            key={item.id}
                            href={item.href}
                            onMouseEnter={() => {
                                setHoveredItem(item.id);
                                playHoverSound();
                            }}
                            onMouseLeave={() => setHoveredItem(null)}
                            className="group flex items-center cursor-none w-fit"
                        >
                            <span className={`text-sm md:text-xl lg:text-2xl font-bold tracking-widest uppercase transition-none flex items-center h-8 ${hoveredItem === item.id ? activeTheme.highlightClass : 'text-zinc-500'}`}>
                                <span className="w-6 inline-block">{hoveredItem === item.id ? '> ' : ''}</span>
                                [{item.id}] &nbsp; <GlitchText text={item.label} isHovered={hoveredItem === item.id} enableGlitch={enableGlitch} />
                                {hoveredItem === item.id && <span className={`animate-pulse ml-3 inline-block w-3 md:w-4 h-5 md:h-6 align-middle ${activeTheme.bgClass}`}></span>}
                            </span>
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Corner UI - Theme & Glitch Toggles */}
            <div className={`absolute top-8 right-8 text-[9px] md:text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-600 text-right flex flex-col items-end gap-2 z-20 ${videoFinished ? "animate-fade-in" : "opacity-0"}`}>
                <p>SYS.RDY</p>
                <div className="flex items-center justify-end">
                    <span className={`h-1.5 w-1.5 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-pulse mr-2 ${activeTheme.bgClass}`}></span>
                    <span className={activeTheme.highlightClass}>ONLINE</span>
                </div>

                <div className="w-full h-[1px] bg-zinc-800 my-2"></div>

                <button
                    onClick={cycleTheme}
                    className="hover:text-white transition-colors cursor-none text-right"
                >
                    [ THEME: {activeTheme.name} ]
                </button>
                <button
                    onClick={() => setEnableGlitch(!enableGlitch)}
                    className="hover:text-white transition-colors cursor-none text-right"
                >
                    [ GLITCH_FX: {enableGlitch ? 'ON' : 'OFF'} ]
                </button>
            </div>

            {/* Terminal Hint Button */}
            <button
                onClick={openTerminal}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 text-[10px] md:text-xs font-mono tracking-widest text-zinc-500 hover:text-green-500 border border-zinc-800 hover:border-green-500/50 bg-black/50 backdrop-blur-sm transition-all duration-300 rounded cursor-pointer z-20"
            >
                [ OPEN_TERMINAL: Ctrl + ` ]
            </button>
        </div>
    );
}
