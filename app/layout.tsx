import "../global.css";
import { Inter } from "next/font/google";
import LocalFont from "next/font/local";
import { Metadata } from "next";
import { Analytics } from "./components/analytics";

export const metadata: Metadata = {
  title: {
    default: "R Sahani",
    template: "%s | R Sahani",
  },
  description:
    "Hey, Im Rahul Sahani. I'm a full-stack developer and a designer.",

  authors: [
    {
      name: "Rahul Sahani",
      url: "https://rsahani.vercel.app",
    },
  ],
  keywords: [
    "Rahul Sahani",
    "Rahul Sahani developer",
    "rsahani.tech",
    "rsahani.vercel.app",
    "full stack developer",
    "Next.js developer",
    "React developer",
    "TypeScript developer",
    "creative portfolio",
    "frontend engineer",
    "fullstack engineer",
    "web developer portfolio",
    "UI UX engineer",
    "JavaScript expert",
    "Tailwind CSS developer",
    "Three.js portfolio",
    "3D web experience",
    "interactive portfolio",
    "WebGL developer",
    "India web developer"
  ],
  publisher: "Rahul Sahani",
  openGraph: {
    title: "R Sahani",
    description:
      "Hey, Im Rahul Sahani. I'm a full-stack developer and a designer.",
    url: "https://github.com/rahul-sahani04",
    siteName: "R Sahani",
    images: [
      {
        url: "https://rsahani.vercel.app/og.png",
        width: 1920,
        height: 1080,
      },
    ],
    locale: "en-US",
    type: "website",
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
  twitter: {
    title: "R Sahani",
    card: "summary_large_image",
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
    <html lang="en" className={[inter.variable, calSans.variable].join(" ")}>
      <head>
        <Analytics />
        <link rel="icon" href="/favicon.png" />
      </head>
      <body
        className={`bg-black
          overflow-x-hidden
          ${process.env.NODE_ENV === "development" ? "debug-screens" : undefined
          }`}
      >
        <meta name="google-site-verification" content="q-ccq6IeqoIYHzCtShRUeYUkVN3aIehlMun5oGsKQjY" />
        <CommandMenu />
        <CmdKToast />
        <Toaster theme="dark" />
        {children}


      </body>
    </html>
  );
}
