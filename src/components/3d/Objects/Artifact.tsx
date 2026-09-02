"use client";

import { Html } from "@react-three/drei";
import { ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { ReactNode, useEffect, useMemo, useRef, useState } from "react";

import { ArtifactData, useMuseumStore } from "../../../stores/museumStore";
import ArtifactLabel from "./ArtifactLabel";

interface ArtifactProps {
  artifact: ArtifactData;
  children?: ReactNode;
  showDefaultOrb?: boolean;
  anchorPosition?: [number, number, number];
}

export default function Artifact({
  artifact,
  children,
  showDefaultOrb = !children,
  anchorPosition = artifact.position,
}: ArtifactProps) {
  const groupRef = useRef<THREE.Group>(null);
  const highlightRef = useRef<THREE.PointLight>(null);

  const { camera } = useThree();

  const [hovered, setHovered] = useState(false);
  const [distance, setDistance] = useState(Infinity);

  const openArtifactInfo = useMuseumStore((state) => state.openArtifactInfo);

  const glowMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#8a6a20",
        emissive: "#d4af37",
        emissiveIntensity: artifact.glowIntensity * 0.25,
        metalness: 0.7,
        roughness: 0.25,
      }),
    [artifact.glowIntensity],
  );

  useEffect(() => {
    return () => {
      glowMaterial.dispose();
    };
  }, [glowMaterial]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const worldPosition = new THREE.Vector3(
      anchorPosition[0],
      anchorPosition[1],
      anchorPosition[2],
    );

    groupRef.current.localToWorld(worldPosition);

    const currentDistance = camera.position.distanceTo(worldPosition);

    setDistance(currentDistance);

    const targetScale = showDefaultOrb ? (hovered ? 1.1 : 1) : 1;

    const currentScale = groupRef.current.scale.x;

    const nextScale = THREE.MathUtils.lerp(
      currentScale,
      targetScale,
      Math.min(delta * 8, 1),
    );

    groupRef.current.scale.setScalar(nextScale);

    const targetGlow = hovered
      ? artifact.glowIntensity * 4
      : artifact.glowIntensity;

    if (highlightRef.current) {
      highlightRef.current.intensity = THREE.MathUtils.lerp(
        highlightRef.current.intensity,
        targetGlow,
        Math.min(delta * 8, 1),
      );
    }
  });

  const handlePointerOver = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();

    setHovered(true);

    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();

    setHovered(false);

    document.body.style.cursor = "default";
  };

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();

    openArtifactInfo(artifact);
  };

  return (
    <group
      ref={groupRef}
      position={artifact.position}
      scale={showDefaultOrb ? artifact.scale : 1}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      {children}

      {showDefaultOrb && (
        <>
          <mesh castShadow receiveShadow material={glowMaterial}>
            <icosahedronGeometry args={[1, 2]} />
          </mesh>

          <mesh scale={0.55}>
            <sphereGeometry args={[1, 32, 32]} />

            <meshStandardMaterial
              color="#ffffff"
              emissive="#d4af37"
              emissiveIntensity={hovered ? 2.5 : 0.8}
              transparent
              opacity={0.85}
            />
          </mesh>

          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.25, 0.025, 12, 64]} />

            <meshBasicMaterial
              color="#d4af37"
              transparent
              opacity={hovered ? 0.9 : 0.35}
            />
          </mesh>
        </>
      )}

      {!showDefaultOrb && (
        <mesh
          position={[anchorPosition[0], 0.04, anchorPosition[2]]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={hovered ? 1.18 : 1}
        >
          <ringGeometry args={[2.8, 2.9, 64]} />

          <meshBasicMaterial
            color="#d4af37"
            transparent
            opacity={hovered ? 0.9 : 0.18}
          />
        </mesh>
      )}

      <pointLight
        ref={highlightRef}
        position={showDefaultOrb ? [0, 0, 0] : anchorPosition}
        color="#d4af37"
        intensity={artifact.glowIntensity}
        distance={showDefaultOrb ? 12 : 14}
        decay={2}
      />

      <ArtifactLabel
        artifact={artifact}
        distance={distance}
        visible={distance < 50}
        hovered={hovered}
      />

      {hovered && distance < 50 && !showDefaultOrb && (
        <Html
          position={[
            anchorPosition[0],
            anchorPosition[1] + 5,
            anchorPosition[2],
          ]}
          center
          style={{
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              padding: "6px 10px",
              background: "rgba(0,0,0,0.7)",
              border: "1px solid rgba(255,215,0,0.3)",
              color: "#d4af37",
              fontSize: "9px",
              letterSpacing: "1.5px",
              whiteSpace: "nowrap",
              fontFamily: "Arial, sans-serif",
            }}
          >
            CLICK TO EXPLORE
          </div>
        </Html>
      )}
    </group>
  );
}
