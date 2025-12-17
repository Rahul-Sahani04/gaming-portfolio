import "../global.css";
import { Inter } from "next/font/google";
import LocalFont from "next/font/local";
import { Metadata } from "next";
import { Analytics } from "./components/analytics";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.rsahani.space"),
  title: {
    default: "Rahul Sahani | Full-Stack Developer",
    template: "%s | Rahul Sahani",
  },
  description: "Full-stack developer and designer crafting interactive web experiences with Next.js, React, TypeScript, Three.js, and Tailwind CSS. Explore projects and experiments.",

  authors: [
    {
      name: "Rahul Sahani",
      url: "https://www.rsahani.space",
    },
  ],
  alternates: {
    canonical: "https://www.rsahani.space",
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
    title: "Rahul Sahani",
    description:
      "Hey, I'm Rahul Sahani, a full-stack developer and designer building interactive web experiences with Next.js, React, TypeScript, and Three.js.",
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
      "Full-stack developer and designer building interactive web experiences with Next.js, React, TypeScript, and Three.js.",
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

import { CommandMenu } from "./components/CommandMenu";
import { Toaster } from "sonner";
import { CmdKToast } from "./components/CmdKToast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={[inter.variable, calSans.variable].join(" ")}
    >
      <body
        className={`bg-black overflow-x-hidden ${process.env.NODE_ENV === "development" ? "debug-screens" : ""
          }`}
      >
        <Analytics />
        <CommandMenu />
        <CmdKToast />
        <Toaster theme="dark" />
        {children}
      </body>
    </html>
  );
}
