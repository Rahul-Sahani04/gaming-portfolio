"use client";

import { Music, Minus, Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface SpotifyData {
    isPlaying: boolean;
    title?: string;
    artist?: string;
    album?: string;
    albumImageUrl?: string;
    songUrl?: string;
}

export default function Spotify() {
    const [data, setData] = useState<SpotifyData | null>(null);
    const [loading, setLoading] = useState(true);
    const [isMinimized, setIsMinimized] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/api/spotify");
                const json = await res.json();
                setData(json);
            } catch (error) {
                console.error("Error fetching Spotify data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 30000);
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <div className="w-[300px] h-[72px] bg-black border border-zinc-800 animate-pulse" />
        );
    }

    if (!data || !data.isPlaying) {
        return null;
    }

    return (
        <>
            <style>{`
                @keyframes equalize {
                    0%, 100% { height: 4px; }
                    50% { height: 12px; }
                }
                .animate-equalize {
                    animation: equalize 1s ease-in-out infinite;
                }
                .group:hover .animate-equalize {
                    animation-duration: 0.6s;
                }
                .scanline {
                    background: linear-gradient(
                        to bottom,
                        rgba(255,255,255,0),
                        rgba(255,255,255,0) 50%,
                        rgba(0,0,0,0.2) 50%,
                        rgba(0,0,0,0.2)
                    );
                    background-size: 100% 4px;
                }
            `}</style>

            <div className={cn(
                "group relative overflow-hidden transition-all duration-300 bg-black font-mono border border-zinc-800",
                isMinimized ? "w-auto h-10 cursor-pointer hover:border-[#1DB954]" : "w-[320px]"
            )}>
                <div className="absolute inset-0 scanline pointer-events-none opacity-50 mix-blend-overlay z-10" />

                {/* Minimized State (Click to expand) */}
                {isMinimized && (
                    <div
                        className="h-full px-4 flex items-center gap-3 z-20 relative text-zinc-400 group-hover:text-[#1DB954] transition-colors"
                        onClick={() => setIsMinimized(false)}
                    >
                        <span className="text-xs uppercase tracking-widest">{"> RAHUL_IS_LISTENING"}</span>
                        <div className="flex items-end gap-[2px] h-3">
                            <span className="w-[2px] bg-current animate-equalize" style={{ animationDelay: "0ms" }} />
                            <span className="w-[2px] bg-current animate-equalize" style={{ animationDelay: "150ms" }} />
                            <span className="w-[2px] bg-current animate-equalize" style={{ animationDelay: "300ms" }} />
                        </div>
                        <span className="text-xs ml-2">[+]</span>
                    </div>
                )}

                {/* Expanded State */}
                <div className={cn(
                    "flex flex-col w-full transition-opacity duration-300 relative z-20",
                    isMinimized ? "opacity-0 hidden" : "opacity-100 block"
                )}

                >
                    {/* Header bar */}
                    <div className="flex justify-between items-center px-3 pt-2 pb-1 border-b border-zinc-900 bg-zinc-950/50 cursor-pointer hover:border-[#1DB954] transition-colors"
                        onClick={() => setIsMinimized(true)}
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-[#1DB954] animate-pulse rounded-full" />
                            <span className="text-[10px] uppercase tracking-widest text-zinc-500">
                                RAHULS.Listening
                            </span>
                        </div>
                        <span
                            className="text-[10px] text-zinc-500 cursor-pointer hover:text-[#1DB954] transition-colors"
                            aria-label="Minimize player"
                        >
                            [-]
                        </span>
                    </div>

                    <Link
                        href={data.songUrl || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 hover:bg-zinc-900/50 transition-colors group/link"
                    >
                        {/* Album Art with harsh shadow */}
                        <div className="relative w-12 h-12 flex-shrink-0 border border-zinc-700 overflow-hidden grayscale group-hover/link:grayscale-0 transition-all duration-500">
                            {data.albumImageUrl ? (
                                <Image
                                    src={data.albumImageUrl}
                                    alt={data.album || "Album Art"}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
                                    <Music className="w-4 h-4 text-zinc-600" />
                                </div>
                            )}
                        </div>

                        {/* Track Info */}
                        <div className="flex flex-col min-w-0 flex-1 justify-center">
                            <h3 className="text-xs font-bold text-zinc-200 truncate uppercase tracking-wide group-hover/link:text-[#1DB954] transition-colors">
                                {data.title}
                            </h3>
                            <p className="text-[10px] text-zinc-500 truncate uppercase mt-0.5">
                                {data.artist}
                            </p>
                        </div>

                        {/* Active Equalizer */}
                        <div className="flex items-end gap-[2px] h-3 ml-1">
                            <span className="w-0.5 bg-[#1DB954] animate-equalize" style={{ animationDelay: "0ms" }} />
                            <span className="w-0.5 bg-[#1DB954] animate-equalize" style={{ animationDelay: "150ms" }} />
                            <span className="w-0.5 bg-[#1DB954] animate-equalize" style={{ animationDelay: "300ms" }} />
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
}