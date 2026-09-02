"use client";

import { Suspense } from "react";
import { Environment } from "@react-three/drei";

import FirstPersonCamera from "../Camera/FirstPersonCamera";
import Artifact from "../Objects/Artifact";
import AncientRoom from "./AncientRoom";

type ArtifactData = {
  id: string;
  name: string;
  category: string;
  room: string;
  description: string;
  longDescription: string;
  rarity: "rare" | "common" | "legendary";
  position: [number, number, number];
  scale: number;
  glowIntensity: number;
};

const testArtifact: ArtifactData = {
  id: "ancient-golden-artifact",
  name: "Golden Relic",
  category: "Ancient Artifact",
  room: "Ancient",
  description:
    "A mysterious golden relic preserved inside the Infinite Museum.",
  longDescription:
    "Its origin remains unknown. The surface appears to contain patterns that do not correspond to any known writing system. This artifact is currently being catalogued as one of the museum's earliest discoveries.",
  rarity: "rare",
  position: [0, 2, -8],
  scale: 1.5,
  glowIntensity: 1.5,
};

export default function Museum() {
  return (
    <>
      {/* =====================================================
          FIRST PERSON CAMERA
      ===================================================== */}

      <FirstPersonCamera />

      {/* =====================================================
          GLOBAL ENVIRONMENT
      ===================================================== */}

      <Environment preset="night" />

      <ambientLight intensity={0.35} color="#ffffff" />

      <directionalLight position={[10, 20, 10]} intensity={0.8} castShadow />

      {/* =====================================================
          CENTRAL TEST AREA
      ===================================================== */}

      <pointLight
        position={[0, 5, -8]}
        intensity={3}
        distance={20}
        color="#d4af37"
      />

      <Suspense fallback={null}>
        {/* Test artifact */}
        <Artifact artifact={testArtifact} />

        {/* Central floor */}
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0, 0]}
          receiveShadow
        >
          <planeGeometry args={[100, 100]} />

          <meshStandardMaterial
            color="#111111"
            roughness={0.65}
            metalness={0.25}
          />
        </mesh>

        {/* Central decorative ring */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, -8]}>
          <ringGeometry args={[2.5, 2.55, 64]} />

          <meshBasicMaterial color="#d4af37" transparent opacity={0.35} />
        </mesh>

        {/* =================================================
            ANCIENT ROOM
        ================================================= */}

        <AncientRoom />
      </Suspense>
    </>
  );
}
