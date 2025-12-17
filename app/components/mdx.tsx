"use client";
// @ts-nocheck
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useMDXComponent } from "next-contentlayer/hooks";

function clsx(...args: any) {
	return args.filter(Boolean).join(" ");
}
const components = {
	h1: ({ className, ...props }: React.ComponentProps<"h1">) => (
		<h1
			className={clsx(
				"mt-2 scroll-m-20 text-4xl font-bold tracking-tight",
				className,
			)}
			{...props}
		/>
	),
	h2: ({ className, ...props }: React.ComponentProps<"h2">) => (
		<h2
			className={clsx(
				"mt-10 scroll-m-20 border-b border-b-zinc-800 pb-1 text-3xl font-semibold tracking-tight first:mt-0",
				className,
			)}
			{...props}
		/>
	),
	h3: ({ className, ...props }: React.ComponentProps<"h3">) => (
		<h3
			className={clsx(
				"mt-8 scroll-m-20 text-2xl font-semibold tracking-tight",
				className,
			)}
			{...props}
		/>
	),
	h4: ({ className, ...props }: React.ComponentProps<"h4">) => (
		<h4
			className={clsx(
				"mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
				className,
			)}
			{...props}
		/>
	),
	h5: ({ className, ...props }: React.ComponentProps<"h5">) => (
		<h5
			className={clsx(
				"mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
				className,
			)}
			{...props}
		/>
	),
	h6: ({ className, ...props }: React.ComponentProps<"h6">) => (
		<h6
			className={clsx(
				"mt-8 scroll-m-20 text-base font-semibold tracking-tight",
				className,
			)}
			{...props}
		/>
	),
	a: ({ className, href, ...props }: React.ComponentProps<"a">) => {
		const classes = clsx(
			"font-medium text-zinc-900 underline underline-offset-4",
			className,
		);
		if (!href) {
			return <a href={href} className={classes} {...props} />;
		}
		return <Link href={href} className={classes} {...props} />;
	},
	p: ({ className, ...props }: React.ComponentProps<"p">) => (
		<p
			className={clsx("leading-7 [&:not(:first-child)]:mt-6", className)}
			{...props}
		/>
	),
	ul: ({ className, ...props }: React.ComponentProps<"ul">) => (
		<ul className={clsx("my-6 ml-6 list-disc", className)} {...props} />
	),
	ol: ({ className, ...props }: React.ComponentProps<"ol">) => (
		<ol className={clsx("my-6 ml-6 list-decimal", className)} {...props} />
	),
	li: ({ className, ...props }: React.ComponentProps<"li">) => (
		<li className={clsx("mt-2", className)} {...props} />
	),
	blockquote: ({ className, ...props }: React.ComponentProps<"blockquote">) => (
		<blockquote
			className={clsx(
				"mt-6 border-l-2 border-zinc-300 pl-6 italic text-zinc-800 [&>*]:text-zinc-600",
				className,
			)}
			{...props}
		/>
	),
	img: ({
		className,
		alt,
		...props
	}: React.ImgHTMLAttributes<HTMLImageElement>) => (
		// eslint-disable-next-line @next/next/no-img-element
		<img
			className={clsx("rounded-md border border-zinc-200", className)}
			alt={alt}
			{...props}
		/>
	),
	hr: ({ ...props }: React.ComponentProps<"hr">) => (
		<hr className="my-4 border-zinc-200 md:my-8" {...props} />
	),
	table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
		<div className="w-full my-6 overflow-y-auto">
			<table className={clsx("w-full", className)} {...props} />
		</div>
	),
	tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
		<tr
			className={clsx(
				"m-0 border-t border-zinc-300 p-0 even:bg-zinc-100",
				className,
			)}
			{...props}
		/>
	),
	th: ({ className, ...props }: React.ComponentProps<"th">) => (
		<th
			className={clsx(
				"border border-zinc-200 px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
				className,
			)}
			{...props}
		/>
	),
	td: ({ className, ...props }: React.ComponentProps<"td">) => (
		<td
			className={clsx(
				"border border-zinc-200 px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
				className,
			)}
			{...props}
		/>
	),
	pre: ({ className, ...props }: React.ComponentProps<"pre">) => (
		<pre
			className={clsx(
				"mt-6 mb-4 overflow-x-auto rounded-lg bg-zinc-900 py-4",
				className,
			)}
			{...props}
		/>
	),
	code: ({ className, ...props }: React.ComponentProps<"code">) => (
		<code
			className={clsx(
				"relative rounded border bg-zinc-300 bg-opacity-25 py-[0.2rem] px-[0.3rem] font-mono text-sm text-zinc-600",
				className,
			)}
			{...props}
		/>
	),
	Image,
};

interface MdxProps {
	code: string;
}

export function Mdx({ code }: MdxProps) {
	const MDXContent = useMDXComponent(code);

	return (
		<div className="mdx">
			<MDXContent components={components} />
		</div>
	);
}
