import Image from "next/image";
// Game Icon Component
const GameIcon = ({ game, className }: { game: string, className?: string }) => {
  const icons = {
    "Call of Duty": (
      <div className={`w-8 h-8 bg-gradient-to-br from-blue-500/20 to-blue-700/20 border border-blue-500/30 rounded-lg flex items-center justify-center text-blue-400 font-bold text-xs ${className}`}>
        <Image
          src="/icons/games/COD.webp"
          alt="Call of Duty Icon"
          width={24}
          height={24}
          className="w-5 h-5"
        />
      </div>
    ),
    Minecraft: (
      <div className={`w-8 h-8 bg-gradient-to-br from-teal-500/20 to-teal-700/20 border border-teal-500/30 rounded-lg flex items-center justify-center ${className}`}>
        <Image
          src="/icons/games/Minecraft.webp"
          alt="Minecraft Icon"
          width={24}
          height={24}
          className="w-5 h-5"
        />
      </div>
    ),
    "Sekiro": (
      <div className={`w-8 h-8 bg-gradient-to-br from-purple-500/20 to-purple-700/20 border border-purple-500/30 rounded-lg flex items-center justify-center text-purple-400 font-bold text-xs ${className}`}>
        <Image
          src="/icons/games/Sekiro.webp"
          alt="Sekiro Icon"
          width={24}
          height={24}
          className="w-5 h-5"
        />
      </div>
    ),
    "Elden Ring": (
      <div className={`w-8 h-8 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-lg flex items-center justify-center text-blue-400 font-bold text-xs ${className}`}>
        <Image
          src="/icons/games/EldenRing.webp"
          alt="Elden Ring Icon"
          width={24}
          height={24}
          className="w-5 h-5"
        />
      </div>
    ),
    "Marvel's Spider-Man": (
      <div className={`w-8 h-8 bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-lg flex items-center justify-center text-blue-400 font-bold text-xs ${className}`}>
        <Image
          src="/icons/games/SpiderMan.webp"
          alt="Marvel's Spider-Man Icon"
          width={24}
          height={24}
          className="w-5 h-5"
        />
      </div>
    ),
    "Dying Light": (
      <div className={`w-8 h-8 bg-gradient-to-br from-purple-500/20 to-teal-500/20 border border-purple-500/30 rounded-lg flex items-center justify-center text-purple-400 font-bold text-xs ${className}`}>
        <Image
          src="/icons/games/DyingLight.webp"
          alt="Dying Light Icon"
          width={24}
          height={24}
          className="w-5 h-5"
        />
      </div>
    ),
  };

  return (
    icons[game as keyof typeof icons] || (
      <div className={`w-8 h-8 bg-zinc-600/20 border border-zinc-500/30 rounded-lg ${className}`}></div>
    )
  );
}

export default GameIcon;