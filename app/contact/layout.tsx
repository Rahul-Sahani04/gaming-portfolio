import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Rahul Sahani",
  description:
    "Get in touch with Rahul Sahani — open to freelance projects, collaborations, and full-time opportunities.",
  alternates: { canonical: "https://www.rsahani.space/contact" },
  openGraph: {
    title: "Contact | Rahul Sahani",
    description:
      "Get in touch with Rahul Sahani — open to freelance projects, collaborations, and full-time opportunities.",
    url: "https://www.rsahani.space/contact",
    images: [{ url: "/og.png", width: 1920, height: 1080, alt: "Contact Rahul Sahani" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Rahul Sahani",
    description:
      "Get in touch with Rahul Sahani — open to freelance projects, collaborations, and full-time opportunities.",
    images: ["/og.png"],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
