"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

import Museum from "../components/3d/Museum/Museum";
import OpeningSequence from "../components/3d/Museum/OpeningSequence";
import ArtifactInfo from "../components/UI/ArtifactInfo";

export default function Home() {
  return (
    <main className="relative h-screen w-screen overflow-hidden bg-black">
      {/* 3D Museum */}
      <Canvas
        shadows
        camera={{
          position: [0, 1.6, 5],
          fov: 75,
          near: 0.1,
          far: 1000,
        }}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["#030305"]} />

        <Suspense fallback={null}>
          <Museum />
        </Suspense>
      </Canvas>

      {/* Artifact information */}
      <ArtifactInfo />
      <OpeningSequence />
    </main>
  );
}
