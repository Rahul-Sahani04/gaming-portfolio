"use client";
import { ArrowLeft, Menu, X, Download, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/gaming", label: "Gaming" },
  { href: "/hobbies", label: "Hobbies" },
  { href: "/guestbook", label: "Guestbook" },
  { href: "/contact", label: "Contact" },
  { href: "/blog", label: "Blogs" },
];

const RESUME_URL =
  "https://raw.githubusercontent.com/Rahul-Sahani04/Rahul-Sahani04/main/Rahul_Resume.pdf";

export const Navigation: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const [isIntersecting, setIntersecting] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting),
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile nav on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header ref={ref}>
      <div
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled
            ? "py-2"
            : "py-3"
          }`}
      >
        {/* Glassmorphic background bar */}
        <div
          className={`absolute inset-0 transition-all duration-500 border-b ${scrolled || !isIntersecting
              ? "bg-zinc-950/80 backdrop-blur-xl border-zinc-800/60 shadow-[0_1px_30px_rgba(0,0,0,0.4)]"
              : "bg-transparent border-transparent"
            }`}
        />

        <div className="relative container flex items-center justify-between px-4 mx-auto">
          {/* Left: Logo / Back arrow */}
          <Link
            href="/"
            className="group flex items-center gap-2 text-zinc-400 hover:text-zinc-100 transition-colors duration-200"
          >
            <motion.div
              whileHover={{ x: -3 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.div>
            <span className="hidden sm:inline text-sm font-medium tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Home
            </span>
          </Link>

          {/* Desktop nav — centered floating pill */}
          <nav className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full border border-zinc-800/70 bg-zinc-900/60 backdrop-blur-md shadow-lg">
            {navLinks.map(({ href, label }) => {
              const isActive =
                pathname === href ||
                (href !== "/" && pathname?.startsWith(href));
              return (
                <Link
                  key={label}
                  href={href}
                  className={`relative px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${isActive
                      ? "text-white"
                      : "text-zinc-400 hover:text-zinc-100"
                    }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-zinc-700/70 border border-zinc-600/50"
                      style={{ zIndex: -1 }}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Right: ⌘K · Resume · Avatar */}
          <div className="hidden md:flex items-center gap-3">
            {/* ⌘K hint */}
            <button
              className="flex items-center gap-1 px-2 py-1 rounded-md bg-zinc-900/60 border border-zinc-800/70 text-xs text-zinc-500 font-medium hover:text-zinc-300 hover:border-zinc-700 transition-all duration-200 backdrop-blur-md"
              onClick={() => {
                // trigger command menu via synthetic keyboard event
                document.dispatchEvent(
                  new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true })
                );
              }}
              title="Open command menu"
            >
              <span className="text-xs">⌘</span>K
            </button>

            {/* Resume download */}
            <a
              href={RESUME_URL}
              download="Rahul_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide text-zinc-800 transition-all duration-200
                bg-gradient-to-r from-[#00f0ff] to-[#00c8d4]
                hover:from-[#00d4e8] hover:to-[#00b8c0]
                shadow-[0_0_15px_rgba(0,240,255,0.25)]
                hover:shadow-[0_0_22px_rgba(0,240,255,0.45)]"
              title="Download Resume"
            >
              Resume
              <Download className="w-3 h-3 transition-transform duration-200 group-hover:translate-y-0.5" />
            </a>

            {/* Avatar */}
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#00f0ff]/30 to-transparent blur-sm" />
              <Image
                src="/NavaPfp.webp"
                alt="Rahul Sahani"
                width={36}
                height={36}
                className="relative w-9 h-9 object-cover rounded-full ring-2 ring-zinc-700/60 hover:ring-[#00f0ff]/50 transition-all duration-300"
              />
            </div>
          </div>

          {/* Mobile: Resume + Menu toggle */}
          <div className="md:hidden flex items-center gap-2">
            <a
              href={RESUME_URL}
              download="Rahul_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold text-zinc-800
                bg-gradient-to-r from-[#00f0ff] to-[#00c8d4]
                shadow-[0_0_12px_rgba(0,240,255,0.3)]"
            >
              <Download className="w-3 h-3" />
            </a>
            <button
              className="text-zinc-300 hover:text-zinc-100 min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors duration-200"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-zinc-950/96 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            {/* Decorative glow */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#00f0ff]/5 blur-3xl pointer-events-none" />

            <nav className="flex flex-col items-center gap-2 w-full px-8">
              {navLinks.map(({ href, label }, idx) => {
                const isActive =
                  pathname === href ||
                  (href !== "/" && pathname?.startsWith(href));
                return (
                  <motion.div
                    key={label}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 15, opacity: 0 }}
                    transition={{
                      delay: idx * 0.07,
                      duration: 0.35,
                      ease: "easeOut",
                    }}
                    className="w-full max-w-xs"
                  >
                    <Link
                      href={href}
                      className={`flex items-center justify-center w-full py-3 px-6 rounded-xl text-2xl font-medium transition-all duration-200 ${isActive
                          ? "text-[#00f0ff] bg-[#00f0ff]/10 border border-[#00f0ff]/25"
                          : "text-zinc-300 hover:text-white hover:bg-zinc-800/50 border border-transparent"
                        }`}
                    >
                      {label}
                    </Link>
                  </motion.div>
                );
              })}

              {/* Resume in mobile menu */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 15, opacity: 0 }}
                transition={{
                  delay: navLinks.length * 0.07,
                  duration: 0.35,
                  ease: "easeOut",
                }}
                className="w-full max-w-xs mt-2"
              >
                <a
                  href={RESUME_URL}
                  download="Rahul_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl text-2xl font-medium
                    text-zinc-800 bg-gradient-to-r from-[#00f0ff] to-[#00c8d4]
                    shadow-[0_0_30px_rgba(0,240,255,0.3)]"
                >
                  Resume
                  <Download className="w-5 h-5" />
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
