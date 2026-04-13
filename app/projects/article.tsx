import type { Project } from "@/.contentlayer/generated";
import Link from "next/link";
import { Eye, ArrowUpRight } from "lucide-react";
import { Card } from "../components/card";
import { CountUp } from "../components/CountUp";

type Props = {
	project: Project;
	views: number;
};

export const Article: React.FC<Props> = ({ project, views }) => {
	return (
		<Link href={`/projects/${project.slug}`} className="block group">
			<Card>
				<article className="p-6 md:p-7 relative w-full h-full flex flex-col justify-between text-left min-h-[200px]">
					{/* Top row */}
					<div className="flex justify-between items-start gap-2 mb-5">
						<span className="text-[10px] text-zinc-600 font-mono tracking-[0.18em] uppercase">
							{project.date ? (
								<time dateTime={new Date(project.date).toISOString()}>
									{new Date(project.date).toLocaleDateString("en-US", { year: "numeric", month: "short" })}
								</time>
							) : (
								<span>—</span>
							)}
						</span>
						<span className="flex items-center gap-1.5 text-zinc-600 text-[10px] font-mono tracking-widest shrink-0">
							<Eye className="w-3 h-3" />
							<CountUp value={views} />
						</span>
					</div>

					{/* Content */}
					<div className="flex-1">
						<h2 className="text-lg font-semibold text-zinc-100 group-hover:text-white font-display tracking-tight leading-snug transition-colors duration-200">
							{project.title}
						</h2>
						<p className="mt-2.5 text-sm text-zinc-500 group-hover:text-zinc-400 font-light line-clamp-2 leading-relaxed transition-colors duration-200">
							{project.description}
						</p>
					</div>

					{/* Footer */}
					<div className="mt-5 flex justify-end">
						<span className="flex items-center gap-1 text-[10px] font-mono text-zinc-600 group-hover:text-zinc-300 transition-colors tracking-widest uppercase">
							View
							<ArrowUpRight className="w-3 h-3 group-hover:translate-x-px group-hover:-translate-y-px transition-transform" />
						</span>
					</div>
				</article>
			</Card>
		</Link>
	);
};
