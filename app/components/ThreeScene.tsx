"use client";

import React, { useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";
import { useSpring, a } from "@react-spring/three";
import { Vector2, CylinderGeometry, MeshBasicMaterial, Mesh } from "three";
import { Suspense } from "react";

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
    const handleMouseMove = (e: any) => {
        const now = Date.now();
        if (now - lastMove > 16) {  // Roughly 60 FPS
            lastMove = now;
            const { clientX, clientY } = e;
            const x = (clientX / window.innerWidth) * 2 - 1;
            const y = -(clientY / window.innerHeight) * 2 + 1;
            if (spaceShipRef.current) {
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

export default function ThreeScene({ loading }: { loading: boolean }) {
    const size = 1;
    const scalingSize = [size, size, size];

    const delayTimeX = new Vector2(1.5);
    const delayTimeY = new Vector2(3.5);

    return (
        <Canvas
            style={{ position: "absolute", height: "100vh", width: "100vw" }}
            className="absolute w-screen h-screen bg-transparent -z-10"
            camera={{ near: 0.1, far: 1000 }}
            id="black-hole-canvas"
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
