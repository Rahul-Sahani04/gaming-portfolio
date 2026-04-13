"use client";
import Beams from "./Beams";

export default function AnimatedBeams() {
    return (
      <div style={{ width: "100%", height: "100%", position: "absolute", opacity: 0.3, zIndex: 0 }}>
        <Beams
          beamWidth={2}
          beamHeight={10}
          beamNumber={10}
          lightColor="#C0C0C0"
          speed={2.5}
          noiseIntensity={2.75}
          scale={0.3}
          rotation={-45}
        />
      </div>
    );
}