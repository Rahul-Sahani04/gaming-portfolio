import type { Project } from "@/.contentlayer/generated";
import Link from "next/link";
import { Eye, View } from "lucide-react";
import { Card } from "../components/card";

type Props = {
	project: Project;
	views: number;
};

export const Article: React.FC<Props> = ({ project, views }) => {
	return (
		<Link href={`/projects/${project.slug}`}>
			<Card>
				<article className="p-6 md:p-8 relative w-full h-full flex flex-col justify-between text-left">
					<div>
						<div className="flex justify-between gap-2 items-center mb-6 z-20 relative">
							<span className="text-xs text-zinc-400 font-mono tracking-widest uppercase">
								{project.date ? (
									<time dateTime={new Date(project.date).toISOString()}>
										{new Date(project.date).getFullYear()}/{String(new Date(project.date).getMonth() + 1).padStart(2, '0')}
									</time>
								) : (
									<span>UNDEF</span>
								)}
							</span>
							<span className="text-zinc-500 text-xs font-mono tracking-widest flex items-center gap-2">
								<Eye className="w-4 h-4" />{" "}
								{Intl.NumberFormat("en-US", { notation: "compact" }).format(views)}
							</span>
						</div>
						<h2 className="z-20 text-2xl font-bold duration-500 lg:text-3xl text-zinc-100 group-hover:text-zinc-300 font-display tracking-tight relative">
							{project.title}
						</h2>
						<p className="z-20 mt-4 text-sm duration-500 text-zinc-400 group-hover:text-zinc-200 font-light line-clamp-3 leading-relaxed relative">
							{project.description}
						</p>
					</div>
					<div className="mt-8 pt-4 border-t border-white/10 flex justify-end z-20 relative">
						<span className="text-xs font-light text-zinc-500 group-hover:text-zinc-300 transition-colors tracking-widest flex items-center gap-1">
							View Project <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform">&rarr;</span>
						</span>
					</div>
				</article>
			</Card>
		</Link>
	);
};
