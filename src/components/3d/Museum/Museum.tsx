"use client";

import { Environment, Stars } from "@react-three/drei";
import CentralHall from "./CentralHall";
import AncientRoom from "./AncientRoom";
import FirstPersonCamera from "../Camera/FirstPersonCamera";

export default function Museum() {
  return (
    <>
      {/* =====================================================
          GLOBAL SCENE
      ===================================================== */}

      <color attach="background" args={["#050505"]} />

      <fog attach="fog" args={["#050505", 70, 500]} />

      {/* =====================================================
          GLOBAL LIGHTING
      ===================================================== */}

      <ambientLight intensity={0.3} color="#d8d0c0" />

      <directionalLight
        position={[100, 150, 100]}
        intensity={0.8}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-200}
        shadow-camera-right={200}
        shadow-camera-top={200}
        shadow-camera-bottom={-200}
      />

      {/* =====================================================
          GLOBAL ENVIRONMENT
      ===================================================== */}

      <Environment preset="night" />

      {/* =====================================================
          BACKGROUND STARS
      ===================================================== */}

      <Stars
        radius={500}
        depth={100}
        count={3000}
        factor={4}
        saturation={0}
        fade
        speed={0.3}
      />

      {/* =====================================================
          CAMERA
      ===================================================== */}

      <FirstPersonCamera />

      {/* =====================================================
          CENTRAL HALL
      ===================================================== */}

      <CentralHall />

      {/* =====================================================
          ANCIENT ROOM
      ===================================================== */}

      <AncientRoom />
    </>
  );
}
