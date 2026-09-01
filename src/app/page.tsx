"use client";

import { Canvas } from "@react-three/fiber";

import { Suspense } from "react";

import Museum from "../components/3d/Museum/Museum";
import OpeningSequence from "../components/3d/Museum/OpeningSequence";

export default function Home() {
  return (
    <main className="relative h-screen w-screen overflow-hidden bg-black">
      {/* ================================
          3D MUSEUM
      ================================= */}

      <Canvas
        camera={{
          position: [0, 1.6, 25],
          fov: 75,
          near: 0.1,
          far: 1000,
        }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
        }}
      >
        <Suspense fallback={null}>
          <Museum />
        </Suspense>
      </Canvas>

      {/* ================================
          OPENING SEQUENCE
      ================================= */}

      <OpeningSequence />

      {/* ================================
          CONTROL HINT
      ================================= */}

      <div className="pointer-events-none absolute bottom-6 left-6 z-10 text-xs tracking-widest text-white/40">
        CLICK TO LOOK&nbsp;&nbsp;•&nbsp;&nbsp; WASD TO
        MOVE&nbsp;&nbsp;•&nbsp;&nbsp; SHIFT TO SPRINT&nbsp;&nbsp;•&nbsp;&nbsp;
        SCROLL TO MOVE
      </div>
    </main>
  );
}
