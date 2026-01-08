import { memo, useState, useEffect, useRef } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import GameIcon from "../utils/GameIcons";
import "../page.css"; // Import global styles

// Cloudinary settings
const CLOUDINARY_CLOUD_NAME = "dezgrhc2p";

const cardVariants: Variants = {
  off: { opacity: 0, y: 50 },
  on: { opacity: 1, y: 0 },
};

interface GameCardProps {
  game: Game;
  index: number;
}
interface Game {
  title: string;
  lessons: string[];
  bgVideoId?: string; // Use publicId instead of url
  videoCreator?: string;
}

const getCloudinaryUrl = (publicId: string) =>
  `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/q_auto,f_auto/${publicId}.mp4`;

const GameCard = memo(({ game, index }: GameCardProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "-100px",
  });
  const [hovered, setHovered] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const videoSrc = game.bgVideoId
    ? getCloudinaryUrl(game.bgVideoId)
    : undefined;

  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);


  useEffect(() => {
    if (!hovered) {
      setShowVideo(false);
      return;
    }
    const timer = setTimeout(() => setShowVideo(true), 1200);
    return () => clearTimeout(timer);
  }, [hovered]);

  // Ambient Light Loop
  useEffect(() => {
    if (!showVideo) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Low-res buffer for performance
    canvas.width = 40;
    canvas.height = 20;

    let frameId: number;

    const render = () => {
      if (!video || video.paused || video.ended) return;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      frameId = requestAnimationFrame(render);
    };

    video.addEventListener("play", render);
    if (!video.paused) render();

    return () => {
      video.removeEventListener("play", render);
      cancelAnimationFrame(frameId);
    };
  }, [showVideo]);

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="off"
      animate={inView ? "on" : "off"}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        type: "spring",
        stiffness: 120,
      }}
      className="relative group w-full h-full min-h-[220px]"
      style={{ perspective: 1000 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >

      {/* --- VIDEO LAYER (Absolute Background) --- */}
      {/* Set overflow-visible specifically on this container so the blur can spill out */}
      <div className="absolute inset-0 z-0 overflow-visible rounded-lg pointer-events-none">
        <AnimatePresence>
          {!isMobile && showVideo && videoSrc && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 w-full h-full"
            >
              {/* Ambient Glow Canvas - BEHIND VIDEO */}
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full object-cover blur-[60px] opacity-70 scale-110 z-0"
                aria-hidden="true"
              />

              <video
                src={videoSrc}
                ref={videoRef}
                autoPlay
                // muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover rounded-lg z-10"
              />

              {/* Dark overlay for text readability if needed, currently light to let video pop */}
              <div className="absolute inset-0 bg-black/20 z-10 rounded-lg" />

              <div className="absolute bottom-3 right-4 z-20 bg-black/60 text-white/80 text-[10px] uppercase font-medium tracking-wider px-2 py-1 rounded backdrop-blur-sm">
                @{game.videoCreator || "GAMEPLAY"}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>


      {/* --- CONTENT LAYER (Relative Foreground) --- */}
      <div
        className={`relative z-10 w-full h-full flex flex-col justify-between p-6 sm:p-8 rounded-lg border transition-all duration-500
            ${showVideo
            ? "border-transparent bg-transparent" // Transparent when video plays
            : "bg-zinc-900/20 backdrop-blur-md border-zinc-800 hover:bg-zinc-900 hover:border-zinc-500" // Default premium style
          }
        `}
      >
        {/* Using opacity to hide content without collapsing height */}
        <div className={`transition-opacity duration-500 ${showVideo ? "opacity-0" : "opacity-100"}`}>
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="p-2 border border-zinc-800 bg-black/40 text-zinc-400 group-hover:text-white transition-colors duration-300 rounded-md">
              <GameIcon
                game={game.title}
                className="w-5 h-5 sm:w-6 sm:h-6"
              />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-medium text-zinc-200 group-hover:text-white transition-colors tracking-wide font-display">
                {game.title.toUpperCase()}
              </h3>
              <div className="h-px w-8 group-hover:w-full bg-zinc-700 group-hover:bg-zinc-500 transition-all duration-500 mt-2" />
            </div>
          </div>

          {/* Content */}
          <ul className="space-y-3">
            {game.lessons.map((lesson: string, i: number) => (
              <li key={i} className="flex items-start gap-3 group/item">
                <div className="w-1.5 h-1.5 border border-zinc-600 group-hover/item:border-zinc-400 group-hover/item:bg-zinc-400 rounded-full mt-1.5 transition-all duration-300" />
                <span className="text-zinc-500 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">
                  {lesson}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Preload video - Hidden */}
      {videoSrc && (
        <video
          src={videoSrc}
          preload="auto"
          className="hidden"
        />
      )}
    </motion.div>
  );
});

export default GameCard;
