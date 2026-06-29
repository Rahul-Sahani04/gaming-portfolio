"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useRouteTransitionState } from "./RouteTransition";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/gaming", label: "Gaming" },
  { href: "/hobbies", label: "Hobbies" },
  { href: "/guestbook", label: "Guestbk" },
  { href: "/blog", label: "Writing" },
  { href: "/contact", label: "Contact" },
  { href: "/resume", label: "Resume" },
];

export const Navigation: React.FC = () => {
  const pathname = usePathname();
  const { isTransitioning, timingMs } = useRouteTransitionState();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [displayedPath, setDisplayedPath] = useState("");

  const headerRef = useRef<HTMLElement>(null);
  const scanFlashRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const logoCursorRef = useRef<HTMLSpanElement>(null);
  const hasBootedRef = useRef(false);

  // ─── Close mobile nav on route change ────────────────────────────────────
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // ─── Idea 4 (New): Dynamic Path Typing ───────────────────────────────────
  useEffect(() => {
    const targetPath = pathname === "/" ? "" : pathname;
    if (displayedPath === targetPath) return;

    let timeout: NodeJS.Timeout;
    if (targetPath?.startsWith(displayedPath)) {
      timeout = setTimeout(() => {
        setDisplayedPath(targetPath.slice(0, displayedPath.length + 1));
      }, 30);
    } else {
      timeout = setTimeout(() => {
        setDisplayedPath(displayedPath.slice(0, -1));
      }, 15);
    }
    return () => clearTimeout(timeout);
  }, [pathname, displayedPath]);

  const triggerCmdK = () => {
    document.dispatchEvent(
      new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true })
    );
  };

  // ─── Idea 1: Boot sequence entrance ──────────────────────────────────────
  useGSAP(
    () => {
      if (hasBootedRef.current) return;
      hasBootedRef.current = true;

      const mm = gsap.matchMedia();
      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const { reduceMotion } = ctx.conditions as {
            isDesktop: boolean;
            reduceMotion: boolean;
          };

          const dur = reduceMotion ? 0 : 0.45;
          const staggerVal = reduceMotion ? 0 : 0.065;

          // Logo slams in
          gsap.from(".nav-logo", {
            autoAlpha: 0,
            y: -18,
            duration: dur,
            ease: "back.out(1.7)",
            delay: 0.1,
          });

          // Nav items boot right-to-left (like a HUD powering on)
          gsap.from(".nav-item", {
            autoAlpha: 0,
            y: -10,
            duration: dur,
            stagger: { each: staggerVal, from: "end" },
            ease: "power2.out",
            delay: 0.2,
          });

          // Mobile menu button
          gsap.from(".nav-mobile-toggle", {
            autoAlpha: 0,
            y: -10,
            duration: dur,
            ease: "power2.out",
            delay: 0.3,
          });
        }
      );

      return () => mm.revert();
    },
    { scope: headerRef }
  );

  // ─── Idea 3: Scan-flash on route change ──────────────────────────────────
  useEffect(() => {
    if (!scanFlashRef.current) return;
    const el = scanFlashRef.current;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        el,
        { scaleX: 0, autoAlpha: 0.8, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 0.35,
          ease: "power3.out",
          onComplete: () => {
            gsap.to(el, { autoAlpha: 0, duration: 0.15, ease: "power1.in" });
          },
        }
      );
    });

    return () => mm.revert();
  }, [pathname]);

  // ─── Idea 4: Scroll HUD compress ─────────────────────────────────────────
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const { reduceMotion } = ctx.conditions as {
            isDesktop: boolean;
            reduceMotion: boolean;
          };
          if (reduceMotion) return;

          ScrollTrigger.create({
            start: "top top",
            end: "+=100",
            scrub: true,
            onUpdate: (self) => {
              const p = self.progress;
              const labels = document.querySelectorAll(".nav-index-label");
              if (labels.length > 0) {
                gsap.set(labels, {
                  autoAlpha: 1 - p,
                  y: -5 * p,
                });
              }
              gsap.set(headerRef.current, {
                paddingTop: `${32 * (1 - p * 0.55)}px`,
              });
            },
          });
        }
      );

      return () => mm.revert();
    },
    { scope: headerRef }
  );

  // ─── Idea 5: Logo cursor blink on hover ──────────────────────────────────
  const handleLogoEnter = () => {
    if (!logoCursorRef.current) return;
    gsap.to(logoCursorRef.current, {
      autoAlpha: 0,
      duration: 0.4,
      repeat: -1,
      yoyo: true,
      ease: "steps(1)",
    });
  };

  const handleLogoLeave = () => {
    if (!logoCursorRef.current) return;
    gsap.killTweensOf(logoCursorRef.current);
    gsap.set(logoCursorRef.current, { autoAlpha: 1 });
  };

  // ─── Idea 2: Hover flicker (signal noise) ────────────────────────────────
  const handleNavHoverEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = e.currentTarget;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.killTweensOf(target);
      gsap.to(target, {
        keyframes: [
          { skewX: -2, x: 2, duration: 0.05 },
          { skewX: 1.5, x: -1.5, duration: 0.04 },
          { skewX: 0, x: 0, duration: 0.07 },
        ],
        ease: "none",
        overwrite: true,
      });
    });
  };

  const handleNavHoverLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.killTweensOf(e.currentTarget);
    gsap.to(e.currentTarget, {
      skewX: 0,
      x: 0,
      duration: 0.1,
      ease: "power1.out",
    });
  };

  return (
    <>
      {/* Top Gradient Mask */}
      <div className="fixed top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/90 via-black/50 to-transparent pointer-events-none z-40" />

      {/* ─── Main Header ──────────────────────────────────────────────────── */}
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 pointer-events-none select-none px-6 md:px-12 pt-8"
      >
        <motion.div
          className="relative flex justify-between items-end border-b border-zinc-800/60 pb-4"
          animate={{ opacity: isTransitioning ? 0 : 1, y: isTransitioning ? -12 : 0 }}
          transition={{ duration: timingMs / 1000, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* ─── Logo / Home ──────────────────────────────────────────── */}
          <Link
            href="/"
            ref={logoRef}
            className="nav-logo pointer-events-auto group relative flex flex-col items-start gap-1"
            onMouseEnter={handleLogoEnter}
            onMouseLeave={handleLogoLeave}
          >
            <span className="text-zinc-500 font-mono text-[9px] tracking-[0.25em] group-hover:text-zinc-300 transition-colors">
              // 127.0.0.1<span className="text-zinc-400">{displayedPath}</span>
              <span
                ref={logoCursorRef}
                className="inline-block ml-0.5 text-zinc-400"
                style={{ visibility: "visible" }}
              >
                _
              </span>
            </span>
            <span className="text-zinc-200 text-xs font-bold tracking-widest uppercase">
              Rahul Sahani
            </span>
            {pathname === "/" && (
              <motion.div
                layoutId="active-nav-rail"
                className="absolute -bottom-[17px] left-0 w-full h-[2px] bg-zinc-200"
                transition={{ type: "spring", stiffness: 350, damping: 35 }}
              />
            )}
          </Link>

          {/* ─── Desktop Nav ──────────────────────────────────────────── */}
          <nav className="pointer-events-auto hidden md:flex items-center gap-10">
            {navLinks.map(({ href, label }, idx) => {
              const isActive =
                pathname === href ||
                (href !== "/" && pathname?.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  className="nav-item relative group flex flex-col items-end gap-1"
                  onMouseEnter={handleNavHoverEnter}
                  onMouseLeave={handleNavHoverLeave}
                >
                  {/* Index label — hidden on scroll via Idea 4 */}
                  <span
                    className={`nav-index-label font-mono text-[9px] tracking-[0.25em] transition-colors duration-300 ${isActive
                        ? "text-zinc-400"
                        : "text-zinc-600 group-hover:text-zinc-400"
                      }`}
                  >
                    0{idx + 1}
                  </span>
                  <span
                    className={`text-[11px] font-bold tracking-[0.2em] uppercase transition-colors duration-300 ${isActive
                        ? "text-zinc-100"
                        : "text-zinc-400 group-hover:text-zinc-200"
                      }`}
                  >
                    {label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-rail"
                      className="absolute -bottom-[17px] left-0 w-full h-[2px] bg-zinc-200"
                      transition={{ type: "spring", stiffness: 350, damping: 35 }}
                    />
                  )}
                </Link>
              );
            })}

            {/* ─── CMD+K Trigger ────────────────────────────────────────── */}
            <button
              onClick={triggerCmdK}
              className="nav-item group relative flex flex-col items-end gap-1 pointer-events-auto"
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, { y: -2, duration: 0.2, ease: "power2.out" });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, { y: 0, duration: 0.2, ease: "power2.out" });
              }}
            >
              <span className="nav-index-label font-mono text-[9px] tracking-[0.25em] text-zinc-600 transition-colors group-hover:text-zinc-400">
                SYS
              </span>
              <span className="text-[11px] font-bold tracking-[0.2em] text-zinc-400 transition-colors group-hover:text-zinc-100 flex items-center gap-1">
                <span className="font-mono text-[9px] px-1.5 py-0.5 border border-zinc-700 rounded text-zinc-500 group-hover:text-zinc-300 group-hover:border-zinc-500 transition-colors bg-zinc-900/50 backdrop-blur-sm">⌘K</span>
              </span>
            </button>
          </nav>

          {/* ─── Mobile Menu Toggle ───────────────────────────────────── */}
          <button
            onClick={() => setMobileOpen(true)}
            className="nav-mobile-toggle pointer-events-auto md:hidden flex flex-col items-end gap-1 relative text-zinc-400 hover:text-zinc-200 transition-colors "
          >
            <span className="nav-index-label font-mono text-[9px] tracking-[0.25em]">
              0{navLinks.length + 1}
            </span>
            <span className="text-[11px] uppercase tracking-widest font-bold">
              Menu
            </span>
          </button>

          {/* ─── Idea 3: Route-change scan flash ─────────────────────── */}
          <div
            ref={scanFlashRef}
            className="absolute bottom-0 left-0 right-0 h-[1px] bg-zinc-100/70 pointer-events-none"
            style={{ opacity: 0, transformOrigin: "left center" }}
          />
        </motion.div>
      </header>

      {/* ─── Mobile Fullscreen Overlay ────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-2xl flex flex-col p-6 overflow-hidden "
          >
            {/* Header row */}
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

            {/* ─── Idea 6: Signal-Lock mobile link reveal ─── */}
            <nav className="flex flex-col gap-6 overflow-y-auto overflow-x-clip pb-24 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-700 [&::-webkit-scrollbar-thumb]:rounded-full">
              {[{ href: "/", label: "Home" }, ...navLinks].map((link, i) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname?.startsWith(link.href));
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ delay: i * 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={link.href}
                      className="flex flex-col gap-1 group"
                      onClick={() => setMobileOpen(false)}
                    >
                      <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-600 mb-0.5 group-hover:text-zinc-400 transition-colors">
                        {String("0" + i).slice(-2)}
                      </span>
                      <span
                        className={`text-[2rem] font-medium tracking-wide uppercase transition-all duration-300 ${isActive
                            ? "text-zinc-100 translate-x-2"
                            : "text-zinc-500 group-hover:text-zinc-300 group-hover:translate-x-2"
                          }`}
                      >
                        {link.label}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Footer links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="absolute bottom-0 left-6 right-6 border-t border-zinc-800/80 py-6 flex gap-6 backdrop-blur-lg items-center"
            >
              <a
                href="https://github.com/Rahul-Sahani04"
                className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-600 hover:text-zinc-300 transition-colors"
              >
                GitHub
              </a>
              <a
                href="mailto:me.rsahani@gmail.com"
                className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-600 hover:text-zinc-300 transition-colors"
              >
                Email
              </a>
              <button
                onClick={() => { setMobileOpen(false); triggerCmdK(); }}
                className="ml-auto text-xs font-mono font-bold uppercase tracking-[0.2em] text-zinc-600 hover:text-zinc-300 transition-colors border border-zinc-800 hover:border-zinc-600 px-2 py-1"
              >
                ⌘K
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
