import { withContentlayer } from "next-contentlayer";
// const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx", "glb", "gltf"],
	experimental: {
		mdxRs: true,
	},
};


export default withContentlayer({
  ...nextConfig,
  async rewrites() {
    return [
      {
        source: '/mini-space-shooter/:path*',
        destination: '/public/MiniSpaceShooter/:path*',
      },
    ];
  },
});

// Adding a custom route for the MiniSpaceShooter build folder
const customRewrites = {
  async rewrites() {
    return [
      {
        source: '/mini-space-shooter/:path*',
        destination: '/public/MiniSpaceShooter/:path*',
      },
    ];
  },
};
