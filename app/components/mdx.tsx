"use client";
// @ts-nocheck
import * as React from "react";
import * as ReactDOM from "react-dom";
import Image from "next/image";
import Link from "next/link";
import * as jsxRuntime from "react/jsx-runtime";

function getMDXComponent(code: string) {
	const scope = {
		React,
		ReactDOM,
		_jsx_runtime: jsxRuntime,
	};
	const fn = new Function(...Object.keys(scope), code);
	return fn(...Object.values(scope)).default;
}

function clsx(...args: any) {
	return args.filter(Boolean).join(" ");
}

const components = {
	h1: ({ className, ...props }: React.ComponentProps<"h1">) => (
		<h1
			className={clsx(
				"mt-2 scroll-m-20 text-3xl sm:text-4xl font-bold tracking-tight text-white font-display uppercase",
				className,
			)}
			{...props}
		/>
	),
	h2: ({ className, ...props }: React.ComponentProps<"h2">) => (
		<h2
			className={clsx(
				"mt-12 scroll-m-20 pb-3 text-xl sm:text-2xl font-bold tracking-tight text-zinc-100 font-display uppercase first:mt-0 border-b border-white/[0.08]",
				className,
			)}
			{...props}
		/>
	),
	h3: ({ className, ...props }: React.ComponentProps<"h3">) => (
		<h3
			className={clsx(
				"mt-8 scroll-m-20 text-lg sm:text-xl font-semibold tracking-tight text-zinc-200",
				className,
			)}
			{...props}
		/>
	),
	h4: ({ className, ...props }: React.ComponentProps<"h4">) => (
		<h4
			className={clsx(
				"mt-6 scroll-m-20 text-base font-semibold tracking-tight text-zinc-200",
				className,
			)}
			{...props}
		/>
	),
	h5: ({ className, ...props }: React.ComponentProps<"h5">) => (
		<h5 className={clsx("mt-6 scroll-m-20 text-sm font-semibold tracking-tight text-zinc-300", className)} {...props} />
	),
	h6: ({ className, ...props }: React.ComponentProps<"h6">) => (
		<h6 className={clsx("mt-6 scroll-m-20 text-sm font-semibold tracking-tight text-zinc-400", className)} {...props} />
	),
	a: ({ className, href, ...props }: React.ComponentProps<"a">) => {
		const classes = clsx(
			"font-medium text-zinc-200 underline underline-offset-4 decoration-white/20 hover:text-white hover:decoration-white/60 transition-colors",
			className,
		);
		if (!href) return <a href={href} className={classes} {...props} />;
		return <Link href={href} className={classes} {...props} />;
	},
	p: ({ className, ...props }: React.ComponentProps<"p">) => (
		<p
			className={clsx("leading-7 text-zinc-400 [&:not(:first-child)]:mt-6", className)}
			{...props}
		/>
	),
	ul: ({ className, ...props }: React.ComponentProps<"ul">) => (
		<ul className={clsx("my-6 ml-6 list-disc space-y-2 text-zinc-400", className)} {...props} />
	),
	ol: ({ className, ...props }: React.ComponentProps<"ol">) => (
		<ol className={clsx("my-6 ml-6 list-decimal space-y-2 text-zinc-400", className)} {...props} />
	),
	li: ({ className, ...props }: React.ComponentProps<"li">) => (
		<li className={clsx("text-zinc-400 leading-7", className)} {...props} />
	),
	blockquote: ({ className, ...props }: React.ComponentProps<"blockquote">) => (
		<blockquote
			className={clsx(
				"mt-6 border-l-2 border-zinc-600 pl-6 italic text-zinc-400 bg-white/[0.02] py-3 pr-4 rounded-r",
				className,
			)}
			{...props}
		/>
	),
	img: ({ className, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
		// eslint-disable-next-line @next/next/no-img-element
		<img
			className={clsx("rounded-lg border border-white/[0.08] my-6", className)}
			alt={alt}
			{...props}
		/>
	),
	hr: ({ ...props }: React.ComponentProps<"hr">) => (
		<hr className="my-8 border-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" {...props} />
	),
	table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
		<div className="w-full my-8 overflow-x-auto rounded-xl border border-white/[0.08]">
			<table className={clsx("w-full border-collapse text-sm", className)} {...props} />
		</div>
	),
	tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
		<tr
			className={clsx(
				"border-b border-white/[0.06] even:bg-white/[0.02] hover:bg-white/[0.03] transition-colors",
				className,
			)}
			{...props}
		/>
	),
	th: ({ className, ...props }: React.ComponentProps<"th">) => (
		<th
			className={clsx(
				"px-4 py-3 text-left text-[11px] font-mono font-semibold text-zinc-300 uppercase tracking-wider bg-white/[0.04] border-b border-white/[0.08] [&[align=center]]:text-center [&[align=right]]:text-right",
				className,
			)}
			{...props}
		/>
	),
	td: ({ className, ...props }: React.ComponentProps<"td">) => (
		<td
			className={clsx(
				"px-4 py-3 text-zinc-400 align-top [&[align=center]]:text-center [&[align=right]]:text-right",
				className,
			)}
			{...props}
		/>
	),
	pre: ({ className, ...props }: React.ComponentProps<"pre">) => (
		<pre
			className={clsx(
				"mt-6 mb-4 overflow-x-auto rounded-xl bg-zinc-950 border border-white/[0.07] py-4 px-1",
				className,
			)}
			{...props}
		/>
	),
	code: ({ className, ...props }: React.ComponentProps<"code">) => (
		<code
			className={clsx(
				"relative rounded-md bg-white/[0.07] border border-white/[0.08] py-[0.15rem] px-[0.4rem] font-mono text-[0.85em] text-zinc-200",
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
	const MDXContent = React.useMemo(() => getMDXComponent(code), [code]);

	return (
		<div className="mdx">
			<MDXContent components={components} />
		</div>
	);
}
