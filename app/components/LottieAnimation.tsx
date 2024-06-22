// components/LottieAnimation.tsx
import React, { useState } from "react";
import Lottie from "react-lottie";

interface LottieAnimationProps {
  animationData: any;
  width?: string;
  height?: string;
  color?: string;
  isHovered?: boolean;
  setIsHovered?: React.Dispatch<React.SetStateAction<boolean>>;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({ animationData, height, width, color }) => {
  const [isHovered, setIsHovered] = useState(false);

  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
    color: color || "#FFFFFF",
  };

  return (
    <div
      onMouseEnter={() => setIsHovered && setIsHovered(true)}
      onMouseLeave={() => setIsHovered && setIsHovered(false)}
    >
      <Lottie
        options={defaultOptions}
        isStopped={!isHovered}

        height={height}
        width={width}
      />
    </div>
  );
};

export default LottieAnimation;
