"use client";
import {
	motion,
	useMotionTemplate,
	useSpring,
} from "framer-motion";

import { PropsWithChildren } from "react";

export const Card: React.FC<PropsWithChildren> = ({ children }) => {
	const mouseX = useSpring(0, { stiffness: 500, damping: 100 });
	const mouseY = useSpring(0, { stiffness: 500, damping: 100 });

	function onMouseMove({ currentTarget, clientX, clientY }: any) {
		const { left, top } = currentTarget.getBoundingClientRect();
		mouseX.set(clientX - left);
		mouseY.set(clientY - top);
	}
	const maskImage = useMotionTemplate`radial-gradient(350px at ${mouseX}px ${mouseY}px, white, transparent)`;
	const style = { maskImage, WebkitMaskImage: maskImage };

	return (
		<div
			onMouseMove={onMouseMove}
			className="overflow-hidden relative duration-700 bg-white/[0.02] border border-white/5 rounded-2xl group transition-all hover:border-white/20 hover:bg-white/[0.04] backdrop-blur-md hover:shadow-2xl hover:shadow-white/5"
		>
			<div className="pointer-events-none">
				<div className="absolute inset-0 z-0 bg-zinc-950/20 transition-colors duration-1000" />
				
				{/* Inner Glowing Core */}
				<motion.div
					className="absolute inset-0 z-10 bg-gradient-to-br from-zinc-300/[0.15] via-white/[0.1] to-transparent opacity-0 transition duration-1000 group-hover:opacity-100 mix-blend-overlay rounded-2xl"
					style={style}
				/>
				
				{/* Intense Spotlight Edge Follower */}
				<motion.div
					className="absolute inset-0 z-10 opacity-0 mix-blend-plus-lighter transition duration-1000 group-hover:opacity-60 bg-gradient-to-tr from-transparent via-zinc-400/[0.3] to-transparent rounded-2xl"
					style={style}
				/>
			</div>

			<div className="relative z-20 h-full w-full">
				{children}
			</div>
		</div>
	);
};
