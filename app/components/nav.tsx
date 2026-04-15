"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useRouteTransitionState } from "./RouteTransition";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/gaming", label: "Gaming" },
  { href: "/hobbies", label: "Hobbies" },
  { href: "/guestbook", label: "Guestbk" },
  { href: "/blog", label: "Writing" },
  { href: "/contact", label: "Contact" },
];

export const Navigation: React.FC = () => {
  const pathname = usePathname();
  const { isTransitioning, timingMs } = useRouteTransitionState();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile nav on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Top Gradient Mask for smooth reading over page content */}
      <div className="fixed top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/90 via-black/50 to-transparent pointer-events-none z-40" />

      {/* Main Header Container */}
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none select-none px-6 md:px-12 pt-8">
        
        <motion.div 
           className="relative flex justify-between items-end border-b border-zinc-800/60 pb-4"
           animate={{ opacity: isTransitioning ? 0 : 1, y: isTransitioning ? -12 : 0 }}
           transition={{ duration: timingMs / 1000, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Logo / Home */}
          <Link
            href="/"
            className="pointer-events-auto group relative flex flex-col items-start gap-1"
          >
            <span className="text-zinc-500 font-mono text-[9px] tracking-[0.25em] group-hover:text-zinc-300 transition-colors">
              // SYSTEM.INDEX
            </span>
            <span className="text-zinc-200 text-xs font-bold tracking-widest uppercase">
              Rahul Sahani
            </span>
            {/* Active indicator for Home */}
            {pathname === "/" && (
              <motion.div
                layoutId="active-nav-rail"
                className="absolute -bottom-[17px] left-0 w-full h-[2px] bg-zinc-200"
                transition={{ type: "spring", stiffness: 350, damping: 35 }}
              />
            )}
          </Link>

          {/* Desktop Nav */}
          <nav className="pointer-events-auto hidden md:flex items-center gap-10">
            {navLinks.map(({ href, label }, idx) => {
              const isActive = pathname === href || (href !== "/" && pathname?.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  className="relative group flex flex-col items-end gap-1"
                >
                  <span
                    className={`font-mono text-[9px] tracking-[0.25em] transition-colors duration-300 ${
                      isActive ? "text-zinc-400" : "text-zinc-600 group-hover:text-zinc-400"
                    }`}
                  >
                    0{idx + 1}
                  </span>
                  <span
                    className={`text-[11px] font-bold tracking-[0.2em] uppercase transition-colors duration-300 ${
                      isActive ? "text-zinc-100" : "text-zinc-400 group-hover:text-zinc-200"
                    }`}
                  >
                    {label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-rail"
                      // Exact offset to rest precisely on the border-b
                      className="absolute -bottom-[17px] left-0 w-full h-[2px] bg-zinc-200"
                      transition={{ type: "spring", stiffness: 350, damping: 35 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(true)}
            className="pointer-events-auto md:hidden flex flex-col items-end gap-1 relative text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            <span className="font-mono text-[9px] tracking-[0.25em]">
              0{navLinks.length + 1}
            </span>
            <span className="text-[11px] uppercase tracking-widest font-bold">Menu</span>
          </button>
        </motion.div>
      </header>

      {/* Mobile Fullscreen Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-black/85 flex flex-col p-6 overflow-hidden"
          >
            <div className="flex justify-between items-center mb-16">
              <span className="text-zinc-500 font-mono text-[9px] tracking-[0.25em]">
                // NAV.SYS
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="text-zinc-400 hover:text-zinc-100 p-2 -mr-2 transition-colors"
              >
                <X className="w-6 h-6 stroke-[1.5]" />
              </button>
            </div>

            <nav className="flex flex-col gap-6 overflow-y-auto pb-24">
              {[{ href: "/", label: "Home" }, ...navLinks].map((link, i) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20, rotateX: 10 }}
                    animate={{ opacity: 1, x: 0, rotateX: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ delay: i * 0.04, duration: 0.5, ease: "easeOut" }}
                  >
                    <Link
                      href={link.href}
                      className="flex flex-col gap-1 group"
                      onClick={() => setMobileOpen(false)}
                    >
                      <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-600 mb-0.5 group-hover:text-zinc-400 transition-colors">
                         {String("0" + i).slice(-2)}
                      </span>
                      <span className={`text-[2rem] font-medium tracking-wide uppercase transition-all duration-300 ${
                        isActive ? "text-zinc-100 translate-x-2" : "text-zinc-500 group-hover:text-zinc-300 group-hover:translate-x-2"
                      }`}>
                        {link.label}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-8 left-6 right-6 border-t border-zinc-800/80 pt-6 flex gap-6"
            >
              <a href="https://github.com/Rahul-Sahani04" className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-600 hover:text-zinc-300 transition-colors">GitHub</a>
              <a href="mailto:contact@rsahani.space" className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-600 hover:text-zinc-300 transition-colors">Email</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
