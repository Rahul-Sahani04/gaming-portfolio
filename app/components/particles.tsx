"use client";

import React, { useRef, useEffect } from "react";
import { useMousePosition } from "@/util/mouse";

interface ParticlesProps {
	className?: string;
	quantity?: number;
	staticity?: number;
	ease?: number;
	refresh?: boolean;
}

type Circle = {
	x: number;
	y: number;
	translateX: number;
	translateY: number;
	size: number;
	alpha: number;
	targetAlpha: number;
	dx: number;
	dy: number;
	magnetism: number;
};

export default function Particles({
	className = "",
	quantity = 80,
	staticity = 50,
	ease = 50,
	refresh = false,
}: ParticlesProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const ctx = useRef<CanvasRenderingContext2D | null>(null);
	const circles = useRef<Circle[]>([]);
	const rafId = useRef<number | null>(null);

	const mousePos = useMousePosition();
	const mouse = useRef({ x: 0, y: 0 });
	const size = useRef({ w: 0, h: 0 });

	const dpr =
		typeof window !== "undefined"
			? Math.min(window.devicePixelRatio || 1, 1.5)
			: 1;

	/* ---------------- init ---------------- */

	useEffect(() => {
		if (!canvasRef.current) return;

		ctx.current = canvasRef.current.getContext("2d");
		initCanvas();

		const id = requestAnimationFrame(() => animate());
		rafId.current = id;

		window.addEventListener("resize", initCanvas);

		return () => {
			if (rafId.current) cancelAnimationFrame(rafId.current);
			window.removeEventListener("resize", initCanvas);
		};
	}, []);

	useEffect(() => {
		initCanvas();
	}, [refresh]);

	useEffect(() => {
		updateMouse();
	}, [mousePos.x, mousePos.y]);

	/* ---------------- helpers ---------------- */

	const initCanvas = () => {
		if (!containerRef.current || !canvasRef.current || !ctx.current) return;

		circles.current = [];

		size.current.w = containerRef.current.offsetWidth;
		size.current.h = containerRef.current.offsetHeight;

		canvasRef.current.width = size.current.w * dpr;
		canvasRef.current.height = size.current.h * dpr;
		canvasRef.current.style.width = `${size.current.w}px`;
		canvasRef.current.style.height = `${size.current.h}px`;

		ctx.current.setTransform(dpr, 0, 0, dpr, 0, 0);

		for (let i = 0; i < quantity; i++) {
			circles.current.push(createCircle());
		}
	};

	const updateMouse = () => {
		if (!canvasRef.current) return;

		const rect = canvasRef.current.getBoundingClientRect();
		const x = mousePos.x - rect.left - size.current.w / 2;
		const y = mousePos.y - rect.top - size.current.h / 2;

		const inside =
			x > -size.current.w / 2 &&
			x < size.current.w / 2 &&
			y > -size.current.h / 2 &&
			y < size.current.h / 2;

		if (inside) {
			mouse.current.x = x;
			mouse.current.y = y;
		}
	};

	const createCircle = (): Circle => ({
		x: Math.random() * size.current.w,
		y: Math.random() * size.current.h,
		translateX: 0,
		translateY: 0,
		size: Math.random() * 1.5 + 0.2,
		alpha: 0,
		targetAlpha: Math.random() * 0.5 + 0.1,
		dx: (Math.random() - 0.5) * 0.2,
		dy: (Math.random() - 0.5) * 0.2,
		magnetism: 0.1 + Math.random() * 4,
	});

	const clear = () => {
		ctx.current?.clearRect(0, 0, size.current.w, size.current.h);
	};

	/* ---------------- animation ---------------- */

	const animate = () => {
		if (!ctx.current) return;

		clear();

		const mouseActive =
			mouse.current.x !== 0 || mouse.current.y !== 0;

		for (let i = circles.current.length - 1; i >= 0; i--) {
			const c = circles.current[i];

			// fade in
			c.alpha += 0.02;
			if (c.alpha > c.targetAlpha) c.alpha = c.targetAlpha;

			// movement
			c.x += c.dx;
			c.y += c.dy;

			if (mouseActive) {
				c.translateX +=
					(mouse.current.x / (staticity / c.magnetism) - c.translateX) / ease;
				c.translateY +=
					(mouse.current.y / (staticity / c.magnetism) - c.translateY) / ease;
			}

			// out of bounds → recycle
			if (
				c.x < -c.size ||
				c.x > size.current.w + c.size ||
				c.y < -c.size ||
				c.y > size.current.h + c.size
			) {
				circles.current[i] = createCircle();
				continue;
			}

			ctx.current.setTransform(dpr, 0, 0, dpr, c.translateX, c.translateY);
			ctx.current.beginPath();
			ctx.current.arc(c.x, c.y, c.size, 0, Math.PI * 2);
			ctx.current.fillStyle = `rgba(255,255,255,${c.alpha})`;
			ctx.current.fill();
		}

		ctx.current.setTransform(dpr, 0, 0, dpr, 0, 0);
		rafId.current = requestAnimationFrame(animate);
	};

	return (
		<div ref={containerRef} className={className} aria-hidden>
			<canvas ref={canvasRef} />
		</div>
	);
}
