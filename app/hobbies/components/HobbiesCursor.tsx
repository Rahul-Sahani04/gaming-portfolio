"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import Image from "next/image";
import { createPortal } from "react-dom";

export default function HobbiesCursor() {
  const [showCursor, setShowCursor] = useState(false);
  const [mounted, setMounted] = useState(false);
  const rafRef = useRef<number | null>(null);
  const latestRef = useRef({ x: 0, y: 0 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    setMounted(true);
    const hasPointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    setShowCursor(hasPointer);
    if (!hasPointer) return;

    const updateMousePosition = (e: PointerEvent) => {
      latestRef.current.x = e.clientX;
      latestRef.current.y = e.clientY;

      if (rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        mouseX.set(latestRef.current.x);
        mouseY.set(latestRef.current.y);
        rafRef.current = null;
      });
    };

    window.addEventListener("pointermove", updateMousePosition, { passive: true });

    return () => {
      window.removeEventListener("pointermove", updateMousePosition);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [mouseX, mouseY]);

  if (!mounted || !showCursor) return null;

  return createPortal(
    <motion.div
      style={{
        x: mouseX,
        y: mouseY,
        left: 0,
        top: 0,
        position: "fixed",
        pointerEvents: "none",
        zIndex: 9999,
        willChange: "transform",
        // The hotspot for a standard mouse is the top-left, 
        // so we don't center-translate it.
      }}
    >
      <Image
        src="/pixel_mouse.png"
        alt="Custom Cursor"
        width={32}
        height={32}
        className="scale-150"
      />
    </motion.div>,
    document.body
  );
}