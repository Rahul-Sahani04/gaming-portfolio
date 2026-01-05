"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Particles from "./components/particles";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
    const [booted, setBooted] = useState(false);

    useEffect(() => {
        const id = requestAnimationFrame(() => setBooted(true));
        return () => cancelAnimationFrame(id);
    }, []);

    return (
        <div className="relative w-screen h-screen bg-black text-white overflow-hidden flex items-center justify-center">
            {/* Background */}
            {booted && (
                <Particles className="absolute inset-0 z-0" quantity={100} />
            )}

            {/* Foreground */}
            <div
                className={`z-10 text-center px-6 ${booted ? "animate-[crt-in_700ms_ease-out]" : "opacity-0"
                    }`}
            >
                {/* 404 */}
                <h1
                    className="text-6xl md:text-9xl font-bold press-start
          bg-clip-text text-transparent bg-gradient-to-b from-red-500 to-red-900
          animate-[drop-impact_600ms_cubic-bezier(.2,.8,.2,1)]"
                >
                    404
                </h1>

                {/* GAME OVER */}
                <div className="mt-4">
                    <span
                        className="inline-block press-start text-2xl md:text-4xl
    overflow-hidden whitespace-nowrap border-zinc-400
    animate-typewriter"
                    >
                        GAME OVER<span className="animate-pulse">?</span>
                    </span>
                </div>


                {/* Description */}
                <p
                    className="mt-6 text-zinc-500 max-w-sm mx-auto font-display
          animate-[drop-impact_600ms_ease-out_1.2s_forwards] transition-opacity opacity-0 "
                >
                    Weird, right?
                    The level you are looking for does not exist or has been removed.
                </p>

                {/* Button */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 mt-10 px-8 py-4
          bg-zinc-900 border border-zinc-800 rounded-lg
          transition-transform duration-200
          hover:scale-105 active:scale-95
          animate-[power-pulse_2.5s_ease-in-out_infinite]"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span className="font-display">Respawn at Home</span>
                </Link>
            </div>

            {/* Footer text */}
            <div className="absolute bottom-10 text-sm text-zinc-600 press-start animate-pulse">
                INSERT COIN TO CONTINUE...
            </div>
        </div>
    );
}
