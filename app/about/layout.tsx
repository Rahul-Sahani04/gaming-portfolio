import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Rahul Sahani",
  description:
    "Learn about Rahul Sahani — full-stack developer, creative engineer, and builder of interactive web experiences with Next.js, React, and Three.js.",
  alternates: { canonical: "https://www.rsahani.space/about" },
  openGraph: {
    title: "About | Rahul Sahani",
    description:
      "Learn about Rahul Sahani — full-stack developer, creative engineer, and builder of interactive web experiences with Next.js, React, and Three.js.",
    url: "https://www.rsahani.space/about",
    images: [{ url: "/og.png", width: 1920, height: 1080, alt: "About Rahul Sahani" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Rahul Sahani",
    description:
      "Learn about Rahul Sahani — full-stack developer, creative engineer, and builder of interactive web experiences.",
    images: ["/og.png"],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
