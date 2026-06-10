"use client";

import { useRef, ReactNode, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HorizontalScroll({ children }: { children: ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      // If there's horizontal scrolling happening (e.g. trackpad), don't interfere
      if (e.deltaX !== 0) return;
      if (e.deltaY === 0) return;

      // Only intercept if there's horizontal scroll available
      if (el.scrollWidth > el.clientWidth) {
        // Allow page scroll if we're at the very edges of the container
        const isAtLeftEdge = el.scrollLeft <= 0;
        const isAtRightEdge = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;

        if (e.deltaY < 0 && isAtLeftEdge) return; // scrolling up at start
        if (e.deltaY > 0 && isAtRightEdge) return; // scrolling down at end

        e.preventDefault();
        el.scrollBy({ left: e.deltaY * 1.5, behavior: "auto" });
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -360, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 360, behavior: "smooth" });
    }
  };

  return (
    <div className="relative group/scroll -mx-4 px-4 sm:mx-0 sm:px-0">
      {/* Scroll Buttons */}
      <button
        onClick={scrollLeft}
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -ml-5 z-20 bg-zinc-950 border border-white/10 p-2 rounded-full text-white/50 hover:text-amber-500 hover:bg-black hover:border-amber-500/50 transition-all  shadow-xl"
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={scrollRight}
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 -mr-5 z-20 bg-zinc-950 border border-white/10 p-2 rounded-full text-white/50 hover:text-amber-500 hover:bg-black hover:border-amber-500/50 transition-all shadow-xl"
        aria-label="Scroll right"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-amber-500/30 scrollbar-track-transparent scroll-smooth hide-scrollbar-mobile"
      >
        {children}
      </div>
    </div>
  );
}
