import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gaming | Rahul Sahani",
  description:
    "Explore Rahul Sahani's gaming profile — skill trees, game stats, and the titles that inspire his work as a developer.",
  alternates: { canonical: "https://www.rsahani.space/gaming" },
  openGraph: {
    title: "Gaming | Rahul Sahani",
    description:
      "Explore Rahul Sahani's gaming profile — skill trees, game stats, and the titles that inspire his work as a developer.",
    url: "https://www.rsahani.space/gaming",
    images: [{ url: "/og.png", width: 1920, height: 1080, alt: "Rahul Sahani — Gaming" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gaming | Rahul Sahani",
    description:
      "Explore Rahul Sahani's gaming profile — skill trees, game stats, and the titles that inspire his work.",
    images: ["/og.png"],
  },
};

export default function GamingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
