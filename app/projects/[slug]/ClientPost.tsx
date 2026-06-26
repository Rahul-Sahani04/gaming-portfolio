"use client";

import { Header } from "./header";
import { ReportView } from "./view";
import { Mdx } from "@/app/components/mdx";

type ClientPostProps = {
    project: any;
    views: number;
};

export default function ClientPost({ project, views }: ClientPostProps) {
    return (
        <div className="bg-zinc-950 min-h-screen">
            <Header project={project} views={views} />
            <ReportView slug={project.slug} />

            <article className="px-4 py-12 mx-auto prose prose-invert prose-quoteless">
                <Mdx code={project.body.code} />
            </article>
        </div>
    );
}
