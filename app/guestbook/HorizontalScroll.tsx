"use client";

import { useRef, ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HorizontalScroll({ children }: { children: ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });
  const hasDragged = useRef(false);

  const scrollByAmount = (amount: number) => {
    scrollRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  };

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el) return;
    isDragging.current = true;
    hasDragged.current = false;
    dragStart.current = { x: e.pageX, scrollLeft: el.scrollLeft };
    el.style.cursor = "grabbing";
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current || !scrollRef.current) return;
    const dx = e.pageX - dragStart.current.x;
    if (Math.abs(dx) > 4) hasDragged.current = true;
    scrollRef.current.scrollLeft = dragStart.current.scrollLeft - dx;
  };

  const stopDrag = () => {
    isDragging.current = false;
    if (scrollRef.current) scrollRef.current.style.cursor = "grab";
  };

  return (
    <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
      {/* Arrow buttons — desktop only */}
      <button
        onClick={() => scrollByAmount(-360)}
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -ml-5 z-20 bg-zinc-950 border border-white/10 p-2 rounded-full text-white/50 hover:text-amber-500 hover:bg-black hover:border-amber-500/50 transition-colors shadow-xl"
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => scrollByAmount(360)}
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 -mr-5 z-20 bg-zinc-950 border border-white/10 p-2 rounded-full text-white/50 hover:text-amber-500 hover:bg-black hover:border-amber-500/50 transition-colors shadow-xl"
        aria-label="Scroll right"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-amber-500/30 scrollbar-track-transparent cursor-grab select-none"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        onClickCapture={(e) => {
          // suppress accidental link clicks that were actually drags
          if (hasDragged.current) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      >
        {children}
      </div>
    </div>
  );
}
