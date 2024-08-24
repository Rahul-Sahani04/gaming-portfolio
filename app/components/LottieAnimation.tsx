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
  initialFrame?: number | 0;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({ animationData, height, width, color, isHovered, setIsHovered, initialFrame }) => {
  

  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
    color: color || "#FFFFFF",
    initialSegment: [initialFrame || 0, animationData.op],
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
