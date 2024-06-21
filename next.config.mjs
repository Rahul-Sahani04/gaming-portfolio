import { withContentlayer } from "next-contentlayer";
// const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "export",
	pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx", "glb", "gltf"],
	experimental: {
		mdxRs: true,
	},
};


export default withContentlayer(nextConfig);
