import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "R Sahani",
  authors: [{
    name: "Rahul Sahani",
    url: "https://rsahani.tech",
  }],
  description: "Personal Portfolio of Rahul Sahani",
  keywords: ["portfolio", "developer", "designer", "react", "typescript", "tailwindcss", "threejs", "nextjs", "webgl", "webxr", "webdev", "webdesign", "webdevelopment", "webdeveloper", "webdesigner", "creative", "design", "ui", "ux", "frontend", "fullstack", "software", "engineer", "programmer", "coding", "programming", "javascript", "html", "css", "nodejs", "python", "java", "c", "c++", "rust", "go", "php", "ruby", "swift", "kotlin", "dart", "sql", "nosql", "mongodb", "firebase", "postgresql", "mysql", "sqlite", "docker", "kubernetes", "aws", "azure", "gcp", "cloud", "serverless", "rest", "graphql", "api", "microservices", "devops", "agile", "scrum", "kanban", "git", "github", "gitlab", "bitbucket", "jira", "figma", "adobe", "photoshop", "illustrator", "xd", "sketch", "blender", "unity", "unreal", "ar", "vr", "xr", "virtualreality", "augmentedreality", "mixedreality", "gamedev", "game", "gaming", "mobile", "android", "ios", "reactnative", "flutter", "ionic", "native", "pwa", "jamstack", "static", "dynamic", "server", "client", "frontend", "backend", "fullstack", "software", "engineer", "programmer", "coding", "programming", "javascript", "html", "css", "nodejs", "python", "java", "c", "c++", "rust", "go", "php", "ruby", "swift", "kotlin", "dart", "sql", "nosql", "mongodb", "firebase", "postgresql", "mysql", "sqlite", "docker", "kubernetes", "aws", "azure", "gcp", "cloud", "serverless", "rest", "graphql", "api", "microservices", "devops", "agile", "scrum", "kanban", "git", "github", "gitlab", "bitbucket", "jira", "figma", "adobe", "photoshop", "illustrator", "xd", "sketch", "blender", "unity", "unreal", "ar", "vr", "xr", "virtualreality", "augmentedreality", "mixedreality", "gamedev", "game", "gaming", "mobile", "android", "ios", "reactnative", "flutter", "ionic", "native", "pwa", "jamstack", "static", "dynamic", "server", "client"],
  publisher: "Rahul Sahani",
  robots: "index, follow",
  icons: "/favicon.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta name="google-site-verification" content="jwQZj-aIPP8nkEAFk9dtGbuFWNIWX6KdGgDHo4CMx-8" />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
