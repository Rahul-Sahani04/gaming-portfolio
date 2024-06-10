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
      if (cursor) {
        (
          crosshair as HTMLElement
        ).style.transition = ` all 250ms ease-out`;
        (
          crosshair as HTMLElement
        ).style.transform = ` rotate(0deg) scale(1)`;
      }
    };

    const handleLinkMouseLeave = (e: MouseEvent) => {
      if (cursor) {
        (crosshair as HTMLElement).style.transform = `rotate(45deg) scale(0.6)`;
      }
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
