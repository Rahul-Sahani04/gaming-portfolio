import type { Project } from "@/.contentlayer/generated";
import Link from "next/link";
import { Eye, View } from "lucide-react";

type Props = {
	project: Project;
	views: number;
};

export const Article: React.FC<Props> = ({ project, views }) => {
	return (
		<Link href={`/projects/${project.slug}`}>
			<article className="p-6 md:p-8 relative w-full h-full flex flex-col justify-between group-hover:bg-cyber-dark/30 transition duration-500">
				{/* Neon accent left border */}
				<div className="absolute left-0 top-0 bottom-0 w-[2px] bg-cyber-cyan/0 group-hover:bg-cyber-cyan transition-all duration-300 shadow-[0_0_10px_rgba(0,240,255,0)] group-hover:shadow-[0_0_10px_rgba(0,240,255,0.8)]"></div>

				<div>
					<div className="flex justify-between gap-2 items-center mb-6">
						<span className="text-xs text-cyber-cyan font-mono tracking-widest bg-cyber-cyan/10 px-2 py-1 chamfered-sm border border-cyber-cyan/30">
							{project.date ? (
								<time dateTime={new Date(project.date).toISOString()}>
									ID:{new Date(project.date).getFullYear()}/{String(new Date(project.date).getMonth() + 1).padStart(2, '0')}
								</time>
							) : (
								<span>ID:UNDEF</span>
							)}
						</span>
						<span className="text-cyber-pink text-xs font-mono tracking-widest flex items-center gap-2">
							<Eye className="w-4 h-4" />{" "}
							{Intl.NumberFormat("en-US", { notation: "compact" }).format(views)}
						</span>
					</div>
					<h2 className="z-20 text-2xl font-bold duration-500 lg:text-3xl text-zinc-100 group-hover:text-cyber-cyan font-display uppercase tracking-tight">
						{project.title}
					</h2>
					<p className="z-20 mt-4 text-sm duration-500 text-zinc-300 group-hover:text-white font-light line-clamp-3 leading-relaxed">
						{project.description}
					</p>
				</div>
				<div className="mt-8 pt-4 border-t border-cyber-gray/50 flex justify-end">
					<span className="text-xs font-mono text-zinc-500 group-hover:text-cyber-cyan transition-colors uppercase tracking-widest flex items-center gap-1">
						[READ DATA] <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform">&rarr;</span>
					</span>
				</div>
			</article>
		</Link>
	);
};
