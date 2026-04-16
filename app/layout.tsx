import "../global.css";
import { Inter } from "next/font/google";
import LocalFont from "next/font/local";


import { Metadata } from "next";
import { Analytics } from "./components/analytics";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.rsahani.space"),
  title: {
    default: "Rahul Sahani — Full-Stack Developer & Creative Engineer",
    template: "%s | Rahul Sahani",
  },
  description: "Full-stack developer crafting interactive web experiences with Next.js, React, Three.js, and TypeScript. Explore projects & experiments.",

  authors: [
    {
      name: "Rahul Sahani",
      url: "https://www.rsahani.space",
    },
  ],
  alternates: {
    canonical: "./",
  },
  keywords: [
    "Rahul Sahani",
    "Rahul Sahani developer",
    "full stack developer",
    "Next.js developer",
    "React developer",
    "TypeScript developer",
    "creative portfolio",
    "frontend engineer",
    "fullstack engineer",
    "web developer portfolio",
    "Game Developer",
    "JavaScript expert",
    "Tailwind CSS developer",
    "Three.js portfolio",
    "3D web experience",
    "interactive portfolio",
    "India web developer",
    "Next.js portfolio",
  ],
  publisher: "Rahul Sahani",
  openGraph: {
    title: "Rahul Sahani — Full-Stack Developer & Creative Engineer",
    description:
      "Full-stack developer crafting interactive web experiences with Next.js, React, Three.js, and TypeScript. Explore projects & experiments.",
    url: "https://www.rsahani.space",
    siteName: "Rahul Sahani",
    images: [
      {
        url: "/og.png",
        width: 1920,
        height: 1080,
        alt: "Portfolio of Rahul Sahani - Full-Stack Developer",
      },
    ],
    locale: "en-US",
    type: "website",
  },
  verification: {
    google: "q-ccq6IeqoIYHzCtShRUeYUkVN3aIehlMun5oGsKQjY",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // twitter: {
  //   title: "R Sahani",
  //   card: "summary_large_image",
  // },
  twitter: {
    card: "summary_large_image",
    title: "Rahul Sahani",
    description:
      "Full-stack developer crafting interactive web experiences with Next.js, React, Three.js, and TypeScript. Explore projects & experiments.",
    images: ["/og.png"],
    creator: "@me_rsahani",
  },

  icons: {
    shortcut: "/favicon.png",
    apple: "/favicon.png",
    icon: "/favicon.png",
  },
};
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const calSans = LocalFont({
  src: "../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
});

import { cn } from "@/lib/utils";
import LayoutClientShell from "./components/LayoutClientShell";
import RouteTransition from "./components/RouteTransition";

import { GeistSans } from "geist/font/sans";

const geist = GeistSans;


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn([inter.variable, calSans.variable].join(" "), "font-sans", geist.variable)}
      data-scroll-behavior="smooth"
    >
      <body
        className={`bg-black overflow-x-hidden ${process.env.NODE_ENV === "development" ? "debug-screens" : ""
          }`}
      >
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-GCJ9N0FQ3X" />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GCJ9N0FQ3X');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": "https://www.rsahani.space/#person",
                  name: "Rahul Sahani",
                  url: "https://www.rsahani.space",
                  jobTitle: "Full-Stack Developer",
                  description:
                    "Full-stack developer and creative engineer building interactive web experiences with Next.js, React, TypeScript, Three.js, and Tailwind CSS.",
                  sameAs: [
                    "https://github.com/Rahul-Sahani04",
                    "https://linkedin.com/in/rahulsahani04",
                    "https://x.com/me_rsahani",
                  ],
                  knowsAbout: [
                    "Next.js",
                    "React",
                    "TypeScript",
                    "Three.js",
                    "Tailwind CSS",
                    "Full-Stack Development",
                    "3D Web Development",
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://www.rsahani.space/#website",
                  url: "https://www.rsahani.space",
                  name: "Rahul Sahani — Portfolio",
                  publisher: {
                    "@id": "https://www.rsahani.space/#person",
                  },
                },
              ],
            }),
          }}
        />
        <Analytics />
        <LayoutClientShell />
        <RouteTransition>{children}</RouteTransition>
      </body>
    </html>
  );
}
