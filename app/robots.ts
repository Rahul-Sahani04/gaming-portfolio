import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/test-error/"],
      },
      {
        userAgent: ["GPTBot", "ClaudeBot", "PerplexityBot", "Amazonbot"],
        allow: ["/", "/llms.txt"],
      },
    ],
    sitemap: "https://www.rsahani.space/sitemap.xml",
  };
}
