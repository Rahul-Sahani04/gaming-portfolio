"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion-3d";
import { Icosahedron } from "@react-three/drei";
import * as THREE from "three";

function GeometricShape() {
    const meshRef = useRef<any>(null);

    const { scale } = { scale: 1.5 }; // target scale

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.2;
            meshRef.current.rotation.y += delta * 0.3;
            // animate scale smoothly
            meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.05);
        }
    });

    return (
        <mesh ref={meshRef} scale={0}>
            <Icosahedron args={[1, 1]}>
                <meshBasicMaterial color="#00f0ff" transparent opacity={0.6} fog={false} wireframe />
            </Icosahedron>
            {/* Inner solid core */}
            <Icosahedron args={[0.5, 1]}>
                <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={0.5} transparent opacity={0.8} />
            </Icosahedron>
        </mesh>
    );
}

export default function FloatingGeometry({ className }: { className?: string }) {
    return (
        <div className={`absolute pointer-events-none ${className || ''}`}>
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 10]} intensity={1} />
                <GeometricShape />
            </Canvas>
        </div>
    );
}
