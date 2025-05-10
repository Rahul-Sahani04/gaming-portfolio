"use client";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";
import Particles from "./components/particles";

import "./page.css";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

// import { TextureLoader } from "three/src/loaders/TextureLoader";

import { useGLTF, useAnimations } from "@react-three/drei";

import { useSpring, a } from "@react-spring/three";

import { Suspense } from "react";
// import { EffectComposer, Outline, Bloom } from "@react-three/postprocessing";
// import { GlitchMode } from "postprocessing";

import CustomCursor from "./components/CustomCursor";
import { Vector2 } from "three";

import NextTopLoader from 'nextjs-toploader';

import { BoxHelper, CylinderGeometry, MeshBasicMaterial, Mesh } from "three";

import { motion, AnimatePresence } from 'framer-motion';




const SpaceShipModel = ({
  scale,
  position,
}: {
  scale: any;
  position: any;
}) => {
  const spaceShipRef = React.useRef(null) as any;
  const { scene, animations } = useGLTF("/model/SpaceShipV2.glb") as any;
  const { actions } = useAnimations(animations, spaceShipRef);

  // On mouse click, shoot a laser beam
  const shootLaser = () => {
    console.log("Shooting laser");
    const geometry = new CylinderGeometry(1, 1, 1, 32);
    const material = new MeshBasicMaterial({ color: 0x00ff00 });
    const laser = new Mesh(geometry, material);
    laser.scale.set(0.1, 0.1, 2);
    laser.position.z = -2;
    laser.rotation.x = Math.PI / 6;
    // laser.updateMatrix();
    // laser.updateMatrixWorld();

    
    scene.add(laser);

    const startTime = Date.now();

    const animateLaser = () => {
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime < 1000) {
        laser.position.z += 0.75; // Adjust the speed as needed
        requestAnimationFrame(animateLaser);
      }
    };
  
    animateLaser();

    
    // Remove the laser beam after 1 second
    setTimeout(() => {
      scene.remove(laser);
    }, 1000);
  };



  useEffect(() => {
    document.addEventListener("click", shootLaser);
    return () => {
      document.removeEventListener("click", shootLaser);
    };
  }, []);


  // Move the spaceship up, down and left, right using mouse move

  let lastMove = 0;
const handleMouseMove = (e : any) => {
  const now = Date.now();
  if (now - lastMove > 16) {  // Roughly 60 FPS
    lastMove = now;
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth) * 2 - 1;
    const y = -(clientY / window.innerHeight) * 2 + 1;
    if(spaceShipRef.current) {
    spaceShipRef.current.position.x = x;
    spaceShipRef.current.position.y = y;
    }
  }
};


  useEffect(() => {
    document.addEventListener("mousemove", (e) => handleMouseMove(e));
  }, []);

  useEffect(() => {
    // console.log("Ship actions", actions, animations);
    actions["Animation"]?.play();
    // actions["Animation"]?.setDuration(50);
    // slow down the animation speed by 0.5 times every 10 seconds (10000 ms) and then reset it
  }, [actions]);



  return (
    <a.mesh
      ref={spaceShipRef}
      position={position}
      scale={scale}
      rotation={[0, 60, 0]}
    >
      <primitive object={scene} />
      {/* <EffectComposer>
          <Outline
          edgeStrength={2.5}
          resolutionScale={0.5}
          visibleEdgeColor={0xffffff}
          
          />
        </EffectComposer> */}
    </a.mesh>
  );
}

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
    macintoshRef.current.rotation.z -= delta * 0.25;
  });
  

  useEffect(() => {
    // console.log("actions", actions, animations);
    actions["Take 001"]?.play();
  }, [actions]);

  const props = useSpring({ opacity });

  return (
    <a.mesh
      ref={macintoshRef}
      position={position}
      scale={scale}
      rotation={[0, 0, 0]}
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

const BlackHoleCanvas = (
  { loading }: { loading: boolean }
) => {
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
      <Suspense fallback={
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color="hotpink" />
        </mesh>
      }>


            <SpaceShipModel
            scale={0.3}
            position={[0, 0, 0]}
            />


        
        <BlackHoleModel
          opacity={0}
          scale={scalingSize}
          position={[0, 0, 0]}
        />

      </Suspense>
    </Canvas>
  );
};

const navigation = [
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];


export default function Home() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load assets
    console.log("Loading assets");
    const loadAssets = async () => {
      await Promise.all([
        useGLTF.preload("/model/Black_hole.glb"),
        useGLTF.preload("/model/SpaceShipV2.glb"),
      ]);
      setTimeout(() => {
        setLoading(false);
      }, 1600);
      console.log("Assets loaded");
    };

    loadAssets();

    // On mouse click anywhere on the page, play sound effect
    document.addEventListener("click", () => {
      const audio = new Audio("/plasmablaster-37114.mp3");
      audio.volume = 0.2;
      audio.playbackRate = 0.9;
      audio.play();
    });
  }, []);


  function LoadingScreen() {
    const [progress, setProgress] = useState(0)
  
    useEffect(() => {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            clearInterval(timer)
            setTimeout(() => setLoading(false), 500) // Delay to show 100% briefly
            return 100
          }
          const diff = Math.random() * 10
          return Math.min(oldProgress + diff, 100)
        })
      }, 200)
  
      return () => clearInterval(timer)
    }, [])
  
    return (
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-white text-4xl font-bold mb-8"
            >
              Rahul Sahani
            </motion.div>
            <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 text-gray-500 text-sm font-mono"
            >
              {progress.toFixed(0)}%
            </motion.div>
            <motion.div
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 1, repeatType: "reverse" }}
              className="mt-8 text-white text-xl font-mono"
            >
              Entering Warp Drive...
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center w-screen h-screen bg-black">
        <LoadingScreen />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      <CustomCursor />
      <NextTopLoader />
        <BlackHoleCanvas loading={loading} />
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
            href="/about"
            className=" duration-500 hover:text-zinc-300 no-underline press-start sm:text-xl md:text-3xl z-20"
          >
            Press Start
          </Link>
        </h2>
      </div>
    </div>
  );
}

