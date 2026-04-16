// components/CustomCursor.tsx
"use client";
import { useEffect, useState, useRef } from "react";
import styles from "./CustomCursor.module.css";
import Image from "next/image";

const CustomCursor = () => {
  // SSR-safe: start hidden, detect pointer capability after mount
  const [showCursor, setShowCursor] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorInnerRef = useRef<HTMLDivElement>(null);
  const crosshairRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Only show cursor on devices with fine pointer (mouse/trackpad)
    const hasPointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    setShowCursor(hasPointer);
  }, []);

  useEffect(() => {
    // Don't initialize cursor on touch devices
    if (!showCursor) return;

    let interval: NodeJS.Timeout;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      if (cursorRef.current && cursorInnerRef.current) {
        cursorRef.current.style.transform = `translate3d(calc(${clientX}px - 50% + 15px), calc(${clientY}px - 50%), 0)`;
        cursorInnerRef.current.style.transform = `translate3d(calc(${clientX}px - 50%), calc(${clientY}px - 50%), 0)`;
      }
    };

    const handleMouseDown = () => {
      if (cursorRef.current && cursorInnerRef.current) {
        cursorRef.current.classList.add(styles.click);
        cursorInnerRef.current.classList.add(styles.cursorinnerhover);
      }
    };

    const handleMouseUp = () => {
      if (cursorRef.current && cursorInnerRef.current) {
        cursorRef.current.classList.remove(styles.click);
        cursorInnerRef.current.classList.remove(styles.cursorinnerhover);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a') !== null || target.closest('button') !== null) {
        clearInterval(interval);
        if (crosshairRef.current) {
          crosshairRef.current.style.transition = `all 250ms ease-out`;
          crosshairRef.current.style.transform = `rotate(0deg) scale(1)`;

          // Keep Randomly Jiggle the cursor until the user is hovering over the link element
          interval = setInterval(() => {
            // Generate Random Number between -5 and 10
            const x = Math.floor(Math.random() * 15) - 5;
            if (crosshairRef.current) {
              crosshairRef.current.style.transform = `rotate(${x}deg)`;
            }
          }, 100);
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a') !== null || target.closest('button') !== null) {
        if (crosshairRef.current) {
          crosshairRef.current.style.transform = `rotate(45deg) scale(0.6)`;
        }
        clearInterval(interval);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      clearInterval(interval);
    };
  }, [showCursor]);

  // Don't render on SSR or touch devices
  if (!showCursor) return null;

  return (
    <div className={styles.cursorContainer}>
      <div className={styles.cursor} ref={cursorRef}>
        <Image
          src="/custom_cursor.png"
          alt="cursorImg"
          id="cursorImg"
          width={100}
          height={100}
          className={styles.cursorImg}
          ref={crosshairRef}
        />
      </div>
      <div className={styles.cursor2} ref={cursorInnerRef}></div>
    </div>
  );
};

export default CustomCursor;

