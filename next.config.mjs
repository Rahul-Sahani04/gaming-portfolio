import { withContentlayer } from "next-contentlayer";
// const { withContentlayer } = require("next-contentlayer");
import withMDX from "@next/mdx";
import remarkGfm from "remark-gfm";

const withMDXConfig = withMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
});


/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx", "glb", "gltf"],
  experimental: {
    mdxRs: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
      {
        protocol: "https",
        hostname: "i.scdn.co",
      },
    ],
  },
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
};

export default withContentlayer(withMDXConfig(nextConfig));
