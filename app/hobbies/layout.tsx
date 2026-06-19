import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hobbies | Rahul Sahani",
  description:
    "A peek into the life outside the terminal — photography, gaming, travel, and everything else that fuels Rahul Sahani's creativity.",
  alternates: { canonical: "https://www.rsahani.space/hobbies" },
  openGraph: {
    title: "Hobbies | Rahul Sahani",
    description:
      "A peek into the life outside the terminal — photography, gaming, travel, and everything else that fuels Rahul Sahani's creativity.",
    url: "https://www.rsahani.space/hobbies",
    images: [{ url: "/og.png", width: 1920, height: 1080, alt: "Rahul Sahani — Hobbies" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hobbies | Rahul Sahani",
    description:
      "A peek into the life outside the terminal — photography, gaming, travel, and everything else that fuels creativity.",
    images: ["/og.png"],
  },
};

export default function HobbiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
