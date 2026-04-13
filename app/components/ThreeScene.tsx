"use client";

import React, { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import { Vector2, CylinderGeometry, MeshBasicMaterial, Mesh, Group } from "three";
import { Suspense } from "react";


const SpaceShipModel = ({
    scale,
    position,
}: {
    scale: any;
    position: any;
}) => {
    const spaceShipRef = useRef<Group>(null);
    const { scene, animations } = useGLTF("/model/SpaceShipV2.glb") as any;
    const { actions } = useAnimations(animations, spaceShipRef);

    const shootLaser = () => {
        const geometry = new CylinderGeometry(1, 1, 1, 32);
        const material = new MeshBasicMaterial({ color: 0x00ff00 });
        const laser = new Mesh(geometry, material);
        laser.scale.set(0.1, 0.1, 2);
        laser.position.z = -2;
        laser.rotation.x = Math.PI / 6;

        scene.add(laser);

        const startTime = Date.now();

        const animateLaser = () => {
            const elapsedTime = Date.now() - startTime;
            if (elapsedTime < 1000) {
                laser.position.z += 0.75;
                requestAnimationFrame(animateLaser);
            }
        };

        animateLaser();

        setTimeout(() => {
            scene.remove(laser);
            geometry.dispose();
            material.dispose();
        }, 1000);
    };

    useEffect(() => {
        document.addEventListener("click", shootLaser);
        return () => {
            document.removeEventListener("click", shootLaser);
        };
    }, []);

    let lastMove = 0;
    const handleMouseMove = (e: MouseEvent) => {
        const now = Date.now();
        if (now - lastMove > 16) {
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
        if (!window.matchMedia("(pointer: fine)").matches) return;
        const handler = (e: MouseEvent) => handleMouseMove(e);
        document.addEventListener("mousemove", handler);
        return () => document.removeEventListener("mousemove", handler);
    }, []);

    useEffect(() => {
        actions["Animation"]?.play();
    }, [actions]);

    return (
        // ✅ Use animated.mesh instead of a.mesh
        <animated.mesh
            ref={spaceShipRef}
            position={position}
            scale={scale}
            rotation={[0, 60, 0]}
        >
            <primitive object={scene} />
        </animated.mesh>
    );
};


const BlackHoleModel = ({
    opacity,
    scale,
    position,
}: {
    opacity: number;
    scale: any;
    position: any;
}) => {
    const macintoshRef = useRef<Group>(null);
    const { scene, animations } = useGLTF("/model/Black_hole.glb") as any;
    const { actions } = useAnimations(animations, macintoshRef);

    useFrame((_, delta) => {
        if (macintoshRef.current) {
            macintoshRef.current.rotation.z -= delta * 0.25;
        }
    });

    useEffect(() => {
        actions["Take 001"]?.play();
    }, [actions]);

    // ✅ Destructure opacity directly from useSpring
    const { animatedOpacity } = useSpring({ animatedOpacity: opacity });

    return (
        // ✅ Use animated.mesh instead of a.mesh
        <animated.mesh
            ref={macintoshRef}
            position={position}
            scale={scale}
            rotation={[0, 0, 0]}
        >
            <primitive object={scene} />
            {/* ✅ Use animated.meshStandardMaterial from the animated export */}
            <animated.meshStandardMaterial
                attach="material"
                transparent
                opacity={animatedOpacity}
            />
        </animated.mesh>
    );
};


export default function ThreeScene({ loading: _loading }: { loading: boolean }) {
    const size = 1;
    const scalingSize: [number, number, number] = [size, size, size];

    return (
        <Canvas
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
            className="absolute inset-0 bg-transparent -z-10"
            camera={{ near: 0.1, far: 1000 }}
            dpr={[1, 1.5]}
            id="black-hole-canvas"
        >
            <ambientLight intensity={1.5} />
            <directionalLight position={[2, 1, 1]} />

            <Suspense
                fallback={
                    <mesh>
                        <boxGeometry args={[1, 1, 1]} />
                        <meshBasicMaterial color="hotpink" />
                    </mesh>
                }
            >
                <SpaceShipModel scale={0.3} position={[0, 0, 0]} />
                <BlackHoleModel opacity={0} scale={scalingSize} position={[0, 0, 0]} />
            </Suspense>
        </Canvas>
    );
}