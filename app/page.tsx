"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import Particles from "./components/particles";

import "./page.css";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

// import { TextureLoader } from "three/src/loaders/TextureLoader";

import { useGLTF, useAnimations } from "@react-three/drei";

import { useSpring, a } from "@react-spring/three";

import { Suspense } from "react";
import { EffectComposer, Glitch } from "@react-three/postprocessing";
import { GlitchMode } from "postprocessing";

import CustomCursor from "./components/CustomCursor";
import { Vector2 } from "three";

// import macintoshClassic from ;


const BlackHoleModel = ({
  opacity,
  scale,
  position,
}: {
  opacity: number;
  scale: any;
  position: any;
}) => {
  const macintoshRef = React.useRef(null) as any;
  const { scene, animations } = useGLTF("/model/Black_hole.glb") as any;
  const { actions } = useAnimations(animations, macintoshRef);

  useFrame((state, delta) => {
    macintoshRef.current.rotation.y -= delta * 0.25;
  });

  useEffect(() => {
    // actions["idle"].play();
    console.log("actions", actions, animations);
  }, [actions]);

  const props = useSpring({ opacity });

  return (
    <a.mesh
      ref={macintoshRef}
      position={position}
      scale={scale}
      rotation={[0, -25, 0]}
    >
      <primitive object={scene} />
      <a.meshStandardMaterial
        attach="material"
        transparent
        opacity={props.opacity}
      />
    </a.mesh>
  );
};

const BlackHoleCanvas = () => {
  const size = 1;
  const scalingSize = [size, size, size];

  const delayTimeX = new Vector2(1.5);
  const delayTimeY = new Vector2(3.5);

  return (
    <Canvas
      style={{ position: "absolute", height: "100vh", width: "100vw" }}
      className="absolute w-screen h-screen bg-transparent -z-10"
      camera={{ near: 0.1, far: 1000 }}
    >
      <OrbitControls enableZoom={false} enablePan={false} />
      {/* <ambientLight />
      <pointLight position={[10, 10, 10]} /> */}
      <ambientLight intensity={1.5} />

      <directionalLight position={[2, 1, 1]} />
      <Suspense fallback={null}>
        <BlackHoleModel
          opacity={0}
          scale={scalingSize}
          position={[0, -15, -5]}
        />
        {/* <EffectComposer>
          <Glitch
            delay={[1, 2]} // min and max glitch delay
            duration={[0.45, 0.7]} // min and max glitch duration
            strength={[0.1, 0.25]} // min and max glitch strength
            mode={GlitchMode.SPORADIC} // glitch mode
            active // turn on/off the effect (switches between "mode" prop and GlitchMode.DISABLED)
            ratio={0.25} // Threshold for strong glitches, 0 - no weak glitches, 1 - no strong glitches.
          />
        </EffectComposer> */}
      </Suspense>
    </Canvas>
  );
};

const navigation = [
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      <CustomCursor />
      <nav className="my-16 animate-fade-in">
        <ul className="flex items-center justify-center gap-4">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm duration-500 text-zinc-500 hover:text-zinc-300"
            >
              {item.name}
            </Link>
          ))}
        </ul>
      </nav>
      <BlackHoleCanvas />
      <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      />
      <h3 className="z-10 text-sm text-center text-zinc-500 sm:text-base md:text-lg animate-fade-in">
        Hey, Ready to be impressed? Explore my portfolio. 🚀
      </h3>
      <h1 className="z-10 text-6xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text ">
        Rahul Sahani
      </h1>

      <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />

      <div className="my-16 text-center animate-fade-in ">
        <h2 className="text-sm text-zinc-500 ">
          <Link
            href="/projects"
            className=" duration-500 hover:text-zinc-300 no-underline press-start sm:text-xl md:text-3xl z-20"
          >
            Press Start
          </Link>
        </h2>
      </div>
    </div>
  );
}
