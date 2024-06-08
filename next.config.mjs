import { withContentlayer } from "next-contentlayer";
// const { withContentlayer } = require("next-contentlayer");

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  assetPrefix: isProd ? '/gaming-portfolio/' : '',
  basePath: isProd ? '/gaming-portfolio' : '',
  trailingSlash: true,
};


/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx", "glb", "gltf"],
	experimental: {
	  mdxRs: true,
	},
	output: 'export',
  };


export default withContentlayer(nextConfig);
