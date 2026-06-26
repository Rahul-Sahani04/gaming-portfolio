"use client";
import { ArrowLeft, Eye } from "lucide-react";
import { Github, Twitter } from "@/components/Icons";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type Props = {
	project: {
		url?: string;
		title: string;
		description: string;
		repository?: string;
		date?: string;
		heroImage?: string;
	};
	views: number;
};

export const Header: React.FC<Props> = ({ project, views }) => {
	const ref = useRef<HTMLElement>(null);
	const [isIntersecting, setIntersecting] = useState(true);

	const links: { label: string; href: string }[] = [];
	if (project.repository) {
		links.push({ label: "GitHub", href: `https://github.com/${project.repository}` });
	}
	if (project.url) {
		links.push({ label: "Live Site", href: project.url });
	}

	useEffect(() => {
		if (!ref.current) return;
		const observer = new IntersectionObserver(([entry]) =>
			setIntersecting(entry.isIntersecting),
		);
		observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);

	return (
		<header
			ref={ref}
			className="relative isolate overflow-hidden bg-black min-h-[92vh] flex flex-col"
		>
			{/* Full-bleed background image */}
			{project.heroImage && (
				<motion.div
					initial={{ opacity: 0, scale: 1.06 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
					className="absolute inset-0 -z-10"
					style={{
						backgroundImage: `url(${project.heroImage})`,
						backgroundSize: "cover",
						backgroundPosition: "center top",
						filter: "blur(3px) saturate(0.6)",
						transform: "scale(1.04)",
					}}
				/>
			)}

			{/* Cinematic overlay — heavy vignette + bottom fade to black */}
			<div className="absolute inset-0 -z-10 bg-black/75" />
			<div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_100%_100%_at_50%_50%,transparent_30%,rgba(0,0,0,0.7)_100%)]" />
			<div className="absolute bottom-0 inset-x-0 h-56 -z-10 bg-gradient-to-b from-transparent to-black" />
			{/* Top fade */}
			<div className="absolute top-0 inset-x-0 h-40 -z-10 bg-gradient-to-b from-black/60 to-transparent" />

			{/* Navbar */}
			<div
				className={`fixed inset-x-0 top-0 z-50 backdrop-blur lg:backdrop-blur-none duration-200 border-b lg:bg-transparent ${
					isIntersecting
						? "bg-zinc-900/0 border-transparent"
						: "bg-white/10 border-zinc-200 lg:border-transparent"
				}`}
			>
				<div className="container flex flex-row-reverse items-center justify-between p-6 mx-auto">
					<div className="flex justify-between gap-8">
						<span
							title="View counter for this page"
							className={`duration-200 hover:font-medium flex items-center gap-1 ${
								isIntersecting
									? "text-zinc-400 hover:text-zinc-100"
									: "text-zinc-600 hover:text-zinc-900"
							}`}
						>
							<Eye className="w-5 h-5" />{" "}
							{Intl.NumberFormat("en-US", { notation: "compact" }).format(views)}
						</span>
						<Link target="_blank" href="https://twitter.com/me_rsahani">
							<Twitter
								className={`w-6 h-6 duration-200 hover:font-medium ${
									isIntersecting
										? "text-zinc-400 hover:text-zinc-100"
										: "text-zinc-600 hover:text-zinc-900"
								}`}
							/>
						</Link>
						<Link target="_blank" href="https://github.com/rahul-sahani04">
							<Github
								className={`w-6 h-6 duration-200 hover:font-medium ${
									isIntersecting
										? "text-zinc-400 hover:text-zinc-100"
										: "text-zinc-600 hover:text-zinc-900"
								}`}
							/>
						</Link>
					</div>
					<Link
						href="/projects"
						className={`duration-200 hover:font-medium ${
							isIntersecting
								? "text-zinc-400 hover:text-zinc-100"
								: "text-zinc-600 hover:text-zinc-900"
						}`}
					>
						<ArrowLeft className="w-6 h-6" />
					</Link>
				</div>
			</div>

			{/* Centered cinematic content */}
			<div className="flex-1 flex flex-col items-center justify-center text-center px-6 pb-16 pt-28">

				{/* Title — letter-spaced, focused in */}
				<motion.h1
					initial={{ opacity: 0, letterSpacing: "0.4em", filter: "blur(8px)" }}
					animate={{ opacity: 1, letterSpacing: "0.12em", filter: "blur(0px)" }}
					transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
					className="font-display font-bold text-white uppercase"
					style={{ fontSize: "clamp(2.8rem, 7vw, 7.5rem)", lineHeight: 1 }}
				>
					{project.title}
				</motion.h1>

				{/* Thin rule */}
				<motion.div
					initial={{ scaleX: 0 }}
					animate={{ scaleX: 1 }}
					transition={{ duration: 0.7, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
					style={{ transformOrigin: "center" }}
					className="w-24 h-px bg-white/40 mt-8 mb-8"
				/>

				{/* Description */}
				<motion.p
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 1.05, ease: "easeOut" }}
					className="text-zinc-300 font-light max-w-xl leading-relaxed"
					style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.15rem)" }}
				>
					{project.description}
				</motion.p>

				{/* Links */}
				{links.length > 0 && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.6, delay: 1.3 }}
						className="flex gap-6 mt-8"
					>
						{links.map((link) => (
							<Link
								key={link.label}
								href={link.href}
								target="_blank"
								className="text-sm tracking-widest uppercase font-mono text-zinc-400 hover:text-white transition-colors duration-200 border-b border-zinc-700 hover:border-white pb-0.5"
							>
								{link.label} ↗
							</Link>
						))}
					</motion.div>
				)}
			</div>
		</header>
	);
};
