"use client";
import Beams from "./Beams";
import useIsMobile from "@/app/hooks/useIsMobile";

export default function AnimatedBeams() {
    const isMobile = useIsMobile();
    
    if (isMobile) return null;

    return (
      <div style={{ width: "150%", height: "150%", position: "absolute", opacity: 0.3, zIndex: 0 }}>
        <Beams
          beamWidth={1}
          beamHeight={5}
          beamNumber={isMobile ? 3 : 8}
          lightColor="#C0C0C0"
          speed={isMobile ? 1.5 : 2.5}
          noiseIntensity={isMobile ? 1.5 : 2.75}
          scale={0.3}
          rotation={-45}
        />
      </div>
    );
}