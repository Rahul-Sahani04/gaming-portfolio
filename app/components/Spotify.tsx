"use client";

import { Music } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Spotify() {
    const [data, setData] = useState<any>(null);
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
        // Poll every 30 seconds
        const interval = setInterval(fetchData, 30000);
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return null; // Or a skeleton
    }

    if (!data || !data.isPlaying) {
        return (
            <div className="flex items-center gap-2 text-zinc-500 text-sm">
                <Music className="w-4 h-4" />
                <span>Not Playing</span>
            </div>
        );
    }

    return (
        <Link
            href={data.songUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:bg-zinc-900 transition-colors group max-w-sm"
        >
            <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                <img
                    src={data.albumImageUrl}
                    alt={data.album}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="flex items-end gap-0.5 h-4">
                        <span className="w-1 bg-green-500 animate-[music-bar_1s_ease-in-out_infinite]" style={{ animationDelay: "0ms" }} />
                        <span className="w-1 bg-green-500 animate-[music-bar_1s_ease-in-out_infinite]" style={{ animationDelay: "200ms" }} />
                        <span className="w-1 bg-green-500 animate-[music-bar_1s_ease-in-out_infinite]" style={{ animationDelay: "400ms" }} />
                    </div>
                </div>
            </div>

            <div className="flex flex-col min-w-0">
                <h3 className="font-medium text-zinc-200 truncate group-hover:text-green-400 transition-colors">
                    {data.title}
                </h3>
                <p className="text-sm text-zinc-500 truncate">
                    {data.artist}
                </p>
            </div>
        </Link>
    );
}
