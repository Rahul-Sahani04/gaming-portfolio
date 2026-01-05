"use client";

import { useEffect } from "react";
import Particles from "./components/particles";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-black text-white relative border-[20px] border-red-900/10">
            <Particles
                className="absolute inset-0 -z-10 animate-fade-in"
                quantity={300}
                staticity={10}
                ease={10}
            />

            <div className="absolute inset-0 bg-red-500/5 z-0 pointer-events-none mix-blend-overlay" />

            <div className="z-10 flex flex-col items-center space-y-8 animate-fade-in text-center px-4 max-w-2xl">
                <div className="relative">
                    <AlertTriangle className="w-24 h-24 text-red-500 animate-pulse" />
                    <div className="absolute inset-0 bg-red-500 blur-3xl opacity-20 animate-pulse" />
                </div>

                <h1 className="text-4xl md:text-6xl font-bold text-red-500 press-start tracking-tighter">
                    SYSTEM MALFUNCTION
                </h1>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-red-900 to-transparent my-4" />

                <p className="text-red-400/80 font-mono text-sm md:text-base bg-red-950/30 p-4 border border-red-900/50 rounded max-w-full overflow-hidden text-ellipsis">
                    Error Code: <span className="text-white">{error.message || "Unknown Error"}</span>
                    {error.digest && <span className="block mt-1 text-xs text-zinc-500">Digest: {error.digest}</span>}
                </p>

                <button
                    onClick={
                        // Attempt to recover by trying to re-render the segment
                        () => reset()
                    }
                    className="group relative px-8 py-3 bg-red-600 hover:bg-red-500 text-white rounded transition-all duration-300 hover:shadow-[0_0_20px_rgba(220,38,38,0.5)] active:scale-95 flex items-center gap-3"
                >
                    <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-700" />
                    <span className="press-start text-sm">REBOOT SYSTEM</span>
                </button>
            </div>

            <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-red-600 via-transparent to-red-600 opacity-50" />
            <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-red-600 via-transparent to-red-600 opacity-50" />
        </div>
    );
}
