"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

function CyberParticles() {
    const pointsRef = useRef<THREE.Points>(null);

    useFrame((state, delta) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y -= delta * 0.05;
            pointsRef.current.rotation.x -= delta * 0.02;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Stars
                ref={pointsRef as any}
                radius={50}
                depth={50}
                count={3000}
                factor={4}
                saturation={1}
                fade
                speed={1}
            />
        </group>
    );
}

export default function ThreeCanvas() {
    return (
        <div className="absolute inset-0 -z-10 pointer-events-none opacity-40">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <CyberParticles />
            </Canvas>
        </div>
    );
}
