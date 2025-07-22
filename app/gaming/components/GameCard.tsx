import { memo, useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import GameIcon from "../utils/GameIcons";

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
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "-100px" });
  const [hovered, setHovered] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (!hovered) { setShowVideo(false); return; }
    const timer = setTimeout(() => setShowVideo(true), 3500); // Shorten to 1.5s for better UX
    return () => clearTimeout(timer);
  }, [hovered]);

  const videoSrc = game.bgVideoId ? getCloudinaryUrl(game.bgVideoId) : undefined;



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
      className="relative group"
      style={{ perspective: 1000 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {showVideo && videoSrc && (
        <>
          <video
            src={videoSrc}
            autoPlay
            controls={false}
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover rounded-2xl z-10"
            poster={`https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/${game.bgVideoId}.jpg`} // optional: video poster
          />
          <div className="absolute bottom-3 right-4 z-20 bg-black/40 text-neutral-200 text-xs px-2 py-1 rounded pointer-events-none opacity-80">
            Credits: @{game.videoCreator || "original_creator"}
          </div>
        </>
      )}

      {!showVideo && (
        <motion.div
          className={`relative p-6 rounded-2xl z-20 border border-neutral-700
            shadow-xl transition-all duration-200 
            bg-gradient-to-br from-white/5 via-white/2 to-white/0
            backdrop-blur-xl
            ${hovered ? "border-neutral-400 bg-white/5" : ""}
          `}
        >
          {/* Card glass shine effect (subtle overlay) */}
          <div
            className={`pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-500 
            ${hovered ? "opacity-20" : "opacity-10"} 
            bg-gradient-to-tr from-white/30 via-transparent to-transparent`}
          />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <GameIcon
                game={game.title}
                className="w-7 h-7 text-neutral-400"
              />
              <h3 className="text-xl font-bold text-white">{game.title}</h3>
            </div>
            <ul className="space-y-3 text-neutral-400">
              {game.lessons.map((lesson: string, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-neutral-600 rounded-full mt-2.5" />
                  <span className="text-sm">{lesson}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* Preload video */}
      {videoSrc && (
        <video
          src={videoSrc}
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover rounded-2xl z-10"
          style={{ display: "none" }} // Hide the preloaded video
        />
      )}
    </motion.div>
  );
});

export default GameCard;
