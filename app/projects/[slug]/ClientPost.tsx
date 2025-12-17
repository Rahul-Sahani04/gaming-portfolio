"use client";

import NextTopLoader from "nextjs-toploader";
import { Header } from "./header";
import { ReportView } from "./view";
import { Mdx } from "@/app/components/mdx";

type ClientPostProps = {
    project: any;
    views: number;
};

export default function ClientPost({ project, views }: ClientPostProps) {
    return (
        <div className="bg-zinc-50 min-h-screen">
            <NextTopLoader />
            <Header project={project} views={views} />
            <ReportView slug={project.slug} />

            <article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless">
                <Mdx code={project.body.code} />
            </article>
        </div>
    );
}
