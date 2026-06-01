"use client";

import { Music } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

// Added a quick interface for cleaner type handling
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
            <div className="w-full max-w-sm h-[88px] rounded-2xl bg-zinc-900/50 border border-zinc-800/50 animate-pulse" />
        );
    }

    if (!data || !data.isPlaying) {
        return (
            <div className="flex items-center gap-3 p-3 w-full max-w-sm rounded-2xl bg-zinc-900/30 border border-dashed border-zinc-800 text-zinc-500">
                <div className="w-10 h-10 rounded-xl bg-zinc-800/50 flex items-center justify-center">
                    <Music className="w-4 h-4 opacity-50" />
                </div>
                <span className="text-sm font-medium">Not playing right now</span>
            </div>
        );
    }

    return (
        <>
            {/* Inline styles for the equalizer animation so it works out-of-the-box */}
            <style>{`
                @keyframes equalize {
                    0%, 100% { height: 4px; }
                    50% { height: 16px; }
                }
                .animate-equalize {
                    animation: equalize 1s ease-in-out infinite;
                }
            `}</style>

            <Link
                href={data.songUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Listen to ${data.title} by ${data.artist} on Spotify`}
                className="group relative flex items-center gap-4 p-3 w-full max-w-sm rounded-2xl bg-zinc-950 border border-zinc-800/50 hover:border-zinc-700/50 transition-all duration-500 overflow-hidden"
            >
                {/* Ambient Blurred Background */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    {data.albumImageUrl && (
                        <Image
                            src={data.albumImageUrl}
                            alt="Background blur"
                            fill
                            className="object-cover opacity-20 blur-2xl group-hover:opacity-30 group-hover:scale-110 transition-all duration-700"
                        />
                    )}
                    {/* Gradient overlay to ensure text remains readable */}
                    <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/60 to-transparent" />
                </div>

                {/* Main Content */}
                <div className="relative z-10 flex items-center gap-4 w-full">
                    {/* Album Art */}
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                        {data.albumImageUrl && (
                            <Image
                                src={data.albumImageUrl}
                                alt={data.album || "Album Art"}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        )}
                    </div>

                    {/* Track Info */}
                    <div className="flex flex-col min-w-0 flex-1 py-1">
                        <h3 className="font-semibold text-zinc-100 text-sm truncate group-hover:text-[#1DB954] transition-colors duration-300">
                            {data.title}
                        </h3>
                        <p className="text-xs text-zinc-400 truncate mt-0.5">
                            {data.artist}
                        </p>
                    </div>

                    {/* Standalone Equalizer */}
                    <div className="flex items-end gap-[3px] h-4 mr-2 opacity-80 group-hover:opacity-100 transition-opacity">
                        <span 
                            className="w-[3px] bg-[#1DB954] rounded-full animate-equalize" 
                            style={{ animationDelay: "0ms" }} 
                        />
                        <span 
                            className="w-[3px] bg-[#1DB954] rounded-full animate-equalize" 
                            style={{ animationDelay: "200ms" }} 
                        />
                        <span 
                            className="w-[3px] bg-[#1DB954] rounded-full animate-equalize" 
                            style={{ animationDelay: "400ms" }} 
                        />
                    </div>
                </div>
            </Link>
        </>
    );
}