"use client";
import Beams from "./Beams";

export default function AnimatedBeams() {
    return (
      <div style={{ width: "150%", height: "150%", position: "absolute", opacity: 0.3, zIndex: 0 }}>
        <Beams
          beamWidth={1}
          beamHeight={5}
          beamNumber={8}
          lightColor="#C0C0C0"
          speed={2.5}
          noiseIntensity={2.75}
          scale={0.3}
          rotation={-45}
        />
      </div>
    );
}