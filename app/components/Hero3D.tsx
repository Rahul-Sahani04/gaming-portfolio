import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron, Torus, Box, PointMaterial, Points } from "@react-three/drei";
import * as THREE from "three";
import { random } from "maath";

// --- Variants ---

function IcosahedronVariant() {
    const meshRef = useRef<any>(null);
    const { scale } = { scale: 1.5 };

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.2;
            meshRef.current.rotation.y += delta * 0.3;
            meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.05);
        }
    });

    return (
        <mesh ref={meshRef} scale={0}>
            <Icosahedron args={[1, 1]}>
                <meshBasicMaterial color="#00f0ff" transparent opacity={0.6} fog={false} wireframe />
            </Icosahedron>
            <Icosahedron args={[0.5, 1]}>
                <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={0.5} transparent opacity={0.8} />
            </Icosahedron>
        </mesh>
    );
}

function TorusVariant() {
    const meshRef = useRef<any>(null);
    const { scale } = { scale: 1.2 };

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.4;
            meshRef.current.rotation.y += delta * 0.2;
            meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.05);
        }
    });

    return (
        <mesh ref={meshRef} scale={0}>
            <Torus args={[1, 0.4, 16, 100]}>
                <meshBasicMaterial color="#ff00ff" transparent opacity={0.4} fog={false} wireframe />
            </Torus>
            <Torus args={[0.5, 0.2, 16, 50]}>
                <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={0.8} transparent opacity={0.9} />
            </Torus>
        </mesh>
    );
}

function CubeMatrixVariant() {
    const groupRef = useRef<any>(null);
    const { scale } = { scale: 1.0 };

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.15;
            groupRef.current.rotation.x += delta * 0.1;
            groupRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.05);
        }
    });

    return (
        <group ref={groupRef} scale={0}>
            {/* Inner core */}
            <Box args={[0.8, 0.8, 0.8]}>
                <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={0.6} />
            </Box>
            {/* Outer wireframe */}
            <Box args={[1.5, 1.5, 1.5]}>
                <meshBasicMaterial color="#ff00ff" transparent opacity={0.5} wireframe />
            </Box>
            <Box args={[2.2, 2.2, 2.2]}>
                <meshBasicMaterial color="#ffffff" transparent opacity={0.1} wireframe />
            </Box>
        </group>
    );
}

function ParticlesVariant() {
    const ref = useRef<any>(null);
    // Generate persistent positions using maath random utility
    const [sphere] = useState(() => random.inSphere(new Float32Array(3000), { radius: 2 }) as Float32Array);

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
                <PointMaterial transparent color="#00f0ff" size={0.03} sizeAttenuation={true} depthWrite={false} />
            </Points>
        </group>
    );
}

// --- Main Wrapper ---

export default function Hero3D({ className, variant }: { className?: string, variant?: string }) {
    const [isMobile, setIsMobile] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Check window width
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Do not render anything until client side (to avoid hydration mismatch)
    // or if we detect mobile
    if (!mounted || isMobile) {
        // We return a completely empty div for mobile to save performance, 
        // relying on CSS styling underneath instead.
        return null; 
    }

    let geometryContent = <IcosahedronVariant />;
    
    // Select variant based on the frontmatter string
    switch (variant?.toLowerCase()) {
        case 'torus':
            geometryContent = <TorusVariant />;
            break;
        case 'cubes':
            geometryContent = <CubeMatrixVariant />;
            break;
        case 'particles':
            geometryContent = <ParticlesVariant />;
            break;
        case 'icosahedron':
        default:
            geometryContent = <IcosahedronVariant />;
            break;
    }

    return (
        <div className={`absolute pointer-events-none ${className || ''}`}>
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 10]} intensity={1} />
                {geometryContent}
            </Canvas>
        </div>
    );
}
