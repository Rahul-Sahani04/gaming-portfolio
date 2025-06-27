// components/CustomCursor.tsx
"use client";
import { useEffect } from "react";
import styles from "./CustomCursor.module.css";
import Image from "next/image";

const CustomCursor = () => {
  useEffect(() => {
    const cursor = document.querySelector(`.${styles.cursor}`);
    const cursorinner = document.querySelector(`.${styles.cursor2}`);
    const crosshair = document.querySelector(`#cursorImg`);
    const links = document.querySelectorAll("a");

    let interval: NodeJS.Timeout;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      if (cursor && cursorinner) {
        (
          cursor as HTMLElement
        ).style.transform = `translate3d(calc(${clientX}px - 50%), calc(${clientY}px - 50%), 0)`;
        (cursorinner as HTMLElement).style.left = `${clientX}px`;
        (cursorinner as HTMLElement).style.top = `${clientY}px`;
      }
    };

    const handleMouseDown = () => {
      if (cursor && cursorinner) {
        cursor.classList.add(styles.click);
        cursorinner.classList.add(styles.cursorinnerhover);
      }
    };

    const handleMouseUp = () => {
      if (cursor && cursorinner) {
        cursor.classList.remove(styles.click);
        cursorinner.classList.remove(styles.cursorinnerhover);

      }
    };

    const handleLinkMouseOver = (e: MouseEvent) => {
      clearInterval(interval);
      if (cursor) {
        (crosshair as HTMLElement).style.transition = ` all 250ms ease-out`;
        (crosshair as HTMLElement).style.transform = ` rotate(0deg) scale(1)`;

        // Keep Randomly Jiggle the cursor until the user is hovering over the link element 
        interval = setInterval(() => {

          // Generate Random Number between -5 and 10 
          const x = Math.floor(Math.random() * 15) - 5;
          
          // Rotate the crosshair by the random number
          (crosshair as HTMLElement).style.transform = `rotate(${x}deg)`;
        }, 100);
      }
    };

    const handleLinkMouseLeave = (e: MouseEvent) => {
      if (cursor) {
        (crosshair as HTMLElement).style.transform = `rotate(45deg) scale(0.6)`;

        
      }
      // Clear the interval when the user is not hovering over the link element
      clearInterval(interval);
    };



    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    links.forEach((item) => {
      item.addEventListener("mouseover", handleLinkMouseOver);
      item.addEventListener("mouseleave", handleLinkMouseLeave);
    });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);

      links.forEach((item) => {
        item.removeEventListener("mouseover", handleLinkMouseOver);
        item.removeEventListener("mouseleave", handleLinkMouseLeave);
      });
    };
  }, []);

  return (
    <div className={styles.cursorContainer}>
      <div className={styles.cursor}>
        <Image
          src="/custom_cursor.png"
          alt="cursorImg"
          id="cursorImg"
          width={100}
          height={100}
          className={styles.cursorImg}
        />
      </div>
      <div className={styles.cursor2}></div>
    </div>
  );
};

export default CustomCursor;
