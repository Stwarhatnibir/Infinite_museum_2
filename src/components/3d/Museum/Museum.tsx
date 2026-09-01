"use client";

import { Environment, Stars } from "@react-three/drei";

import CentralHall from "./CentralHall";

import FirstPersonCamera from "../Camera/FirstPersonCamera";

export default function Museum() {
  return (
    <>
      {/* ================================
          BACKGROUND
      ================================= */}

      <color attach="background" args={["#050505"]} />

      {/* ================================
          FOG
      ================================= */}

      <fog attach="fog" args={["#050505", 80, 500]} />

      {/* ================================
          AMBIENT LIGHT
      ================================= */}

      <ambientLight intensity={0.35} />

      {/* ================================
          MAIN DIRECTIONAL LIGHT
      ================================= */}

      <directionalLight position={[100, 100, 100]} intensity={1} castShadow />

      {/* ================================
          CENTRAL ORB LIGHT
      ================================= */}

      <pointLight
        position={[0, 25, 0]}
        intensity={30}
        distance={100}
        color="#ffd98a"
      />

      {/* ================================
          ENVIRONMENT
      ================================= */}

      <Environment preset="night" />

      {/* ================================
          STARFIELD
      ================================= */}

      <Stars
        radius={500}
        depth={100}
        count={3000}
        factor={4}
        saturation={0}
        fade
        speed={0.3}
      />

      {/* ================================
          FIRST PERSON CAMERA
      ================================= */}

      <FirstPersonCamera />

      {/* ================================
          MUSEUM
      ================================= */}

      <CentralHall />
    </>
  );
}
