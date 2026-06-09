"use client";
import React, { useState, useEffect, useRef } from 'react';

interface PlayerStatsPanelProps {
    themeColor: string;
    bgClass: string;
}

// Animated counter hook
function useCountUp(target: number, duration: number = 1200) {
    const [count, setCount] = useState(0);
    const frameRef = useRef<number>(0);
    useEffect(() => {
        const start = performance.now();
        const animate = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) frameRef.current = requestAnimationFrame(animate);
        };
        frameRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frameRef.current);
    }, [target, duration]);
    return count;
}

// Scanline bar component - styled differently for each section
function StatBar({ label, value, maxValue, unit, color, delay, variant }: {
    label: string;
    value: number;
    maxValue: number;
    unit: string;
    color: string;
    delay: number;
    variant: 'github' | 'steam';
}) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        const t = setTimeout(() => setMounted(true), delay);
        return () => clearTimeout(t);
    }, [delay]);

    const pct = Math.min((value / maxValue) * 100, 100);
    const segments = 20;

    return (
        <div className="group/bar relative">
            <div className="flex justify-between items-baseline mb-1.5">
                <span className="text-[10px] tracking-[0.18em] uppercase truncate pr-3"
                    style={{ color: variant === 'github' ? '#a0a0a0' : '#9a8a78' }}>
                    {label}
                </span>
                <span className="text-[11px] font-bold tracking-widest shrink-0 tabular-nums"
                    style={{ color }}>
                    {value}{unit}
                </span>
            </div>

            {/* Segmented progress bar */}
            <div className="flex gap-[2px] h-[5px]">
                {Array.from({ length: segments }).map((_, i) => {
                    const filled = mounted && (i / segments) < (pct / 100);
                    const isEdge = filled && ((i + 1) / segments) >= (pct / 100);
                    return (
                        <div
                            key={i}
                            className="flex-1 transition-all duration-300"
                            style={{
                                backgroundColor: filled ? color : (variant === 'github' ? '#1a1a1a' : '#1c1812'),
                                transitionDelay: `${delay + i * 25}ms`,
                                boxShadow: isEdge ? `0 0 6px ${color}, 0 0 2px ${color}` : 'none',
                                opacity: filled ? (isEdge ? 1 : 0.7) : 0.3,
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export function PlayerStatsPanel({ themeColor, bgClass }: PlayerStatsPanelProps) {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch('/api/stats');
                const data = await res.json();
                setStats(data);
            } catch (err) {
                console.error("Failed to fetch player stats", err);
            } finally {
                setLoading(false);
                setTimeout(() => setVisible(true), 100);
            }
        };
        fetchStats();
    }, []);

    const skills = stats?.github?.topLanguages || [
        { name: "JAVASCRIPT", level: 50 },
        { name: "PYTHON", level: 18 },
        { name: "TYPESCRIPT", level: 13 },
    ];

    const steamGames = stats?.steam?.topRecentGames || [
        { name: "DYING LIGHT", playtimeHours: 82, maxPlaytime: 82 },
        { name: "SLEEPING DOGS", playtimeHours: 38, maxPlaytime: 82 },
        { name: "LEFT 4 DEAD 2", playtimeHours: 32, maxPlaytime: 82 },
    ];

    const level = stats?.github?.repos || 96;
    const followers = stats?.github?.followers || 40;
    const gamesOwned = stats?.steam?.gamesOwned || 39;
    const recentGame = stats?.steam?.recentGame || "RESIDENT EVIL 2";
    const playtime = stats?.steam?.playtime2Weeks || 2;

    const countedLevel = useCountUp(level, 1000);
    const countedFollowers = useCountUp(followers, 1200);
    const countedGames = useCountUp(gamesOwned, 1400);

    // Derive theme-reactive colors
    const githubAccent = themeColor;
    // Steam always gets a warm amber tone for contrast
    const steamAccent = '#e07b39';

    return (
        <div
            className="w-full max-w-sm xl:max-w-md font-mono relative"
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(12px)',
                transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}
        >
            {/* Outer border frame */}
            <div
                className="relative border overflow-hidden"
                style={{
                    borderColor: `${themeColor}30`,
                    backgroundColor: 'rgba(4,4,4,0.92)',
                    backdropFilter: 'blur(16px)',
                    boxShadow: `0 0 40px ${themeColor}10, inset 0 0 60px rgba(0,0,0,0.5)`,
                }}
            >
                {/* Scanline texture overlay */}
                <div
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{
                        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)',
                    }}
                />

                {/* Top status bar */}
                <div
                    className="flex items-center justify-between px-4 py-2 border-b text-[9px] tracking-[0.25em] uppercase"
                    style={{
                        borderColor: `${themeColor}20`,
                        backgroundColor: `${themeColor}08`,
                    }}
                >
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: themeColor }} />
                        <span style={{ color: `${themeColor}99` }}>PLAYER_STATUS</span>
                    </div>
                    <div className="flex items-center gap-3" style={{ color: '#444' }}>
                        <span>SYS.ONLINE</span>
                        <span style={{ color: `${themeColor}60` }}>v2.1.10</span>
                    </div>
                </div>

                {/* Hero stat row */}
                <div
                    className="grid grid-cols-3 divide-x border-b"
                    style={{ borderColor: `${themeColor}15` }}
                >
                    {[
                        { label: 'LEVEL', value: countedLevel, suffix: '' },
                        { label: 'ALLIES', value: countedFollowers, suffix: '' },
                        { label: 'GAMES', value: countedGames, suffix: '' },
                    ].map(({ label, value, suffix }, i) => (
                        <div
                            key={label}
                            className="flex flex-col items-center py-4 px-2"
                            style={{ borderColor: `${themeColor}15` }}
                        >
                            <span className="text-[8px] tracking-[0.3em] mb-1" style={{ color: '#666' }}>{label}</span>
                            <span
                                className="text-2xl font-bold tabular-nums leading-none"
                                style={{ color: themeColor, textShadow: `0 0 16px ${themeColor}60` }}
                            >
                                {value}{suffix}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Main content — two columns */}
                <div className="grid grid-cols-2 divide-x" style={{ borderColor: `${themeColor}15` }}>

                    {/* LEFT — GitHub Protocols */}
                    <div className="p-4 space-y-3" style={{ borderRight: `1px solid ${themeColor}15` }}>
                        {/* Section header */}
                        <div className="flex items-center gap-1.5 mb-3 pb-2 border-b" style={{ borderColor: '#1f1f1f' }}>
                            <svg width="10" height="10" viewBox="0 0 16 16" fill={githubAccent} opacity="0.7">
                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                            </svg>
                            <span className="text-[9px] tracking-[0.25em] uppercase" style={{ color: `${githubAccent}80` }}>Skills</span>
                        </div>

                        {skills.slice(0, 3).map((skill: any, idx: number) => (
                            <StatBar
                                key={skill.name}
                                label={skill.name}
                                value={skill.level}
                                maxValue={100}
                                unit="%"
                                color={githubAccent}
                                delay={400 + idx * 120}
                                variant="github"
                            />
                        ))}

                        {/* EXP footer */}
                        <div className="pt-3 mt-2 border-t text-[9px] tracking-[0.2em]" style={{ borderColor: '#1a1a1a', color: '#444' }}>
                            <span>EXP_W2 </span>
                            <span style={{ color: githubAccent }}>{playtime === "MAX" ? "MAX" : `${playtime}H`}</span>
                        </div>
                    </div>

                    {/* RIGHT — Steam Activity */}
                    <div className="p-4 space-y-3" style={{ backgroundColor: 'rgba(20,12,4,0.5)' }}>
                        {/* Section header */}
                        <div className="flex items-center gap-1.5 mb-3 pb-2 border-b" style={{ borderColor: '#2a1f12' }}>
                            <svg width="10" height="10" viewBox="0 0 256 256" fill={steamAccent} opacity="0.7">
                                <path d="M128 0C57.3 0 0 57.3 0 128c0 56.3 36.3 104.2 87 121.1l33.9-140.3c-2-.7-3.9-1.7-5.7-2.8L82 128c0 25.4-20.6 46-46 46S-10 153.4-10 128 10.6 82 36 82c7.2 0 14 1.7 20 4.7L181.3 58C158.8 22.9 117.6 0 71.5 0H128z" />
                                <path d="M128 0c70.7 0 128 57.3 128 128 0 56.3-36.3 104.2-87 121.1l-33.9-140.3c2-.7 3.9-1.7 5.7-2.8L174 128c0 25.4 20.6 46 46 46s46-20.6 46-46-20.6-46-46-46c-7.2 0-14 1.7-20 4.7L74.7 58C97.2 22.9 138.4 0 184.5 0H128z" />
                            </svg>
                            <span className="text-[9px] tracking-[0.25em] uppercase" style={{ color: `${steamAccent}90` }}>MOST_PLAYED</span>
                        </div>

                        {steamGames.length > 0 ? steamGames.map((game: any, idx: number) => (
                            <StatBar
                                key={game.name}
                                label={game.name}
                                value={game.playtimeHours}
                                maxValue={game.maxPlaytime}
                                unit="H"
                                color={steamAccent}
                                delay={500 + idx * 120}
                                variant="steam"
                            />
                        )) : (
                            <div className="text-[9px] tracking-widest py-4 text-center" style={{ color: '#444' }}>
                                NO_SIGNAL
                            </div>
                        )}

                        {/* Class footer */}
                        <div className="pt-3 mt-2 border-t text-[9px] tracking-[0.2em] truncate" style={{ borderColor: '#2a1f12', color: '#5a4a38' }}>
                            <span>Currently: </span>
                            <span style={{ color: steamAccent }}>{recentGame !== "NONE" ? recentGame.split(' ').slice(0, 2).join(' ') : "NOMAD"}</span>
                        </div>
                    </div>
                </div>

                {/* Bottom status ticker */}
                <div
                    className="px-4 py-2 border-t flex justify-between text-[8px] tracking-[0.25em] uppercase overflow-hidden"
                    style={{ borderColor: `${themeColor}15`, color: '#555' }}
                >
                    <span>GUILD: WORKING_PROFESSIONAL</span>
                    <div className="flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full animate-ping" style={{ backgroundColor: themeColor, opacity: 0.5 }} />
                        <span style={{ color: `${themeColor}40` }}>LIVE</span>
                    </div>
                </div>

                {/* Corner bracket accents */}
                {[
                    'top-0 left-0 border-t border-l',
                    'top-0 right-0 border-t border-r',
                    'bottom-0 left-0 border-b border-l',
                    'bottom-0 right-0 border-b border-r',
                ].map((cls, i) => (
                    <div
                        key={i}
                        className={`absolute w-4 h-4 pointer-events-none ${cls}`}
                        style={{ borderColor: themeColor }}
                    />
                ))}
            </div>
        </div>
    );
}
