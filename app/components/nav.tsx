"use client";
import { ArrowLeft, Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Navigation: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const [isIntersecting, setIntersecting] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting),
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/gaming", label: "Gaming" },
    { href: "/guestbook", label: "Guestbook" },
    { href: "/contact", label: "Contact" },
    {
      href: "https://raw.githubusercontent.com/Rahul-Sahani04/Rahul-Sahani04/main/Rahul_Resume.pdf",
      label: "Resume",
      external: true,
    },
  ];

  return (
    <header ref={ref}>
      <div
        className={`fixed inset-x-0 top-0 z-50 backdrop-blur duration-200 border-b ${isIntersecting
          ? "bg-zinc-900/0 border-transparent"
          : "bg-zinc-900/500 border-zinc-800"
          }`}
      >
        <div className="container flex items-center justify-between p-4 mx-auto">
          {/* Left: Back arrow */}
          <Link
            href="/"
            className="duration-200 text-zinc-300 hover:text-zinc-100"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex gap-6 items-center">
            {navLinks.map(({ href, label, external }) =>
              external ? (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="duration-200 text-zinc-400 hover:text-zinc-100"
                >
                  {label}
                </a>
              ) : (
                <Link
                  key={label}
                  href={href}
                  className="duration-200 text-zinc-400 hover:text-zinc-100"
                >
                  {label}
                </Link>
              ),
            )}

            <div className="hidden lg:flex items-center gap-2 px-2 py-1 rounded-md bg-zinc-900/50 border border-zinc-800 text-xs text-zinc-500 font-medium">
              <span className="text-xs">⌘</span>K
            </div>

            <Image
              src="https://i.pinimg.com/1200x/5e/9d/ef/5e9def915cdb97c0453505d6ac756bbd.jpg"
              alt="Rahul Sahani Logo"
              width={40}
              height={40}
              className="w-10 h-10 object-cover rounded-full"
            />
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-zinc-300 hover:text-zinc-100"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Full-screen animated overlay for mobile nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-zinc-950/95 backdrop-blur flex flex-col items-center justify-center space-y-8"
          >
            {navLinks.map(({ href, label, external }, idx) => (
              <motion.div
                key={label}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.4, ease: "easeOut" }}
              >
                {external ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-3xl font-medium text-zinc-200 hover:text-zinc-100 duration-200"
                    onClick={() => setMobileOpen(false)}
                  >
                    {label}
                  </a>
                ) : (
                  <Link
                    href={href}
                    className="text-3xl font-medium text-zinc-200 hover:text-zinc-100 duration-200"
                    onClick={() => setMobileOpen(false)}
                  >
                    {label}
                  </Link>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
