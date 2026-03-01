import { Metadata } from "next";
import HeroSection from "./components/HeroSection";

export const metadata: Metadata = {
  title: "Rahul Sahani — Full-Stack Developer & Creative Engineer",
  description:
    "Full-stack developer crafting interactive web experiences with Next.js, React, Three.js, and TypeScript. Explore projects & experiments.",
  alternates: { canonical: "https://www.rsahani.space" },
};

export default function Home() {
  return (
    <>
      <HeroSection />

      {/* SEO-rich content — visible to crawlers and assistive technologies */}
      <section className="sr-only" aria-label="About Rahul Sahani">
        <h2>Rahul Sahani — Full-Stack Developer &amp; Creative Engineer</h2>
        <p>
          Welcome to the portfolio of Rahul Sahani, a  full-stack
          developer and creative engineer from India, specializing in crafting
          immersive, high-performance web applications that push the boundaries
          of what&apos;s possible in the browser.
        </p>

        <h3>What I Build</h3>
        <p>
          I specialize in building modern web applications using trending
          technologies including Next.js, React, TypeScript, Three.js, and
          Tailwind CSS. From interactive 3D experiences to scalable full-stack
          platforms, every project I build prioritizes performance, accessibility,
          and exceptional user experience.
        </p>
        <p>
          My work spans across frontend engineering, creative development, and
          full-stack architecture. I bring designs to life with smooth animations
          powered by Framer Motion, build real-time 3D visualizations with
          Three.js and React Three Fiber, and architect serverless backends with
          modern tooling.
        </p>

        <h3>Featured Projects</h3>
        <p>
          Explore the project showcase to see case studies of interactive web
          experiences, SaaS platforms, game prototypes, and open-source
          contributions. Each project demonstrates a thoughtful approach to
          solving real problems with elegant, maintainable code.
        </p>

        <h3>Skills &amp; Technologies</h3>
        <p>
          Frontend: React, Next.js, TypeScript, Tailwind CSS, Framer Motion,
          Three.js. Backend: Node.js, Express, Serverless Functions, REST APIs.
          Tools: Git, Vercel, Figma, VS Code. Creative: 3D Web Development,
          WebGL, GLSL Shaders, Interactive Animations.
        </p>

        <h3>Let&apos;s Connect</h3>
        <p>
          I&apos;m always open to discussing new projects, creative ideas, or
          opportunities to collaborate. Whether you&apos;re looking for a developer
          to bring your vision to life or want to explore a partnership, feel
          free to reach out through the contact page or connect with me on
          GitHub, LinkedIn, or X.
        </p>
      </section>
    </>
  );
}
