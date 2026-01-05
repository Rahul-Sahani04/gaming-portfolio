"use client";

import Link from "next/link";
import Particles from "./components/particles";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-black text-white relative">
            <Particles
                className="absolute inset-0 -z-10 animate-fade-in"
                quantity={200}
            />

            <div className="z-10 flex flex-col items-center space-y-8 animate-fade-in text-center px-4">
                <h1 className="text-6xl md:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-red-500 to-red-900 press-start animate-pulse">
                    404
                </h1>

                <h2 className="text-2xl md:text-4xl text-zinc-300 press-start">
                    GAME OVER
                </h2>

                <p className="text-zinc-500 max-w-md font-display text-lg">
                    The level you are looking for does not exist or has been unlocked yet.
                </p>

                <Link
                    href="/"
                    className="group relative px-8 py-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-display">Respawn at Home</span>
                </Link>
            </div>

            <div className="absolute bottom-10 text-xs text-zinc-700 press-start animate-bounce">
                INSERT COIN TO CONTINUE...
            </div>
        </div>
    );
}
