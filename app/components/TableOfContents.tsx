"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type TocHeading = { level: number; text: string; id: string };

export default function TableOfContents({ headings }: { headings: TocHeading[] }) {
    const [activeId, setActiveId] = useState<string>('');
    const tocRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (headings.length === 0) return;

        const triggers = headings.map(({ id }) => {
            const el = document.getElementById(id);
            if (!el) return null;
            return ScrollTrigger.create({
                trigger: el,
                start: 'top 28%',
                end: 'bottom 28%',
                onEnter: () => setActiveId(id),
                onEnterBack: () => setActiveId(id),
            });
        }).filter(Boolean);

        return () => triggers.forEach(t => t?.kill());
    }, [headings]);

    useEffect(() => {
        if (!tocRef.current || headings.length === 0) return;
        const items = tocRef.current.querySelectorAll('.toc-item');
        if (items.length === 0) return;
        gsap.from(items, {
            x: 10,
            opacity: 0,
            stagger: 0.05,
            duration: 0.45,
            ease: 'power2.out',
            delay: 0.8,
        });
    }, [headings]);

    if (headings.length === 0) return null;

    return (
        <nav ref={tocRef} aria-label="Table of contents" className="select-none">
            <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-700 mb-5 flex items-center gap-2">
                <span className="h-px w-4 bg-white/20" />
                Contents
            </p>
            <ul className="space-y-px">
                {headings.map(({ id, text, level }) => (
                    <li key={id} className="toc-item">
                        <a
                            href={`#${id}`}
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }}
                            className={[
                                'block text-[12px] leading-[1.6] py-1 pr-2 transition-all duration-200',
                                'border-l-2 pl-3',
                                level === 3 ? 'ml-3 text-[11px]' : '',
                                activeId === id
                                    ? 'text-zinc-100 border-zinc-300'
                                    : 'text-zinc-600 border-zinc-800 hover:text-zinc-400 hover:border-zinc-600',
                            ].join(' ')}
                        >
                            {text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
