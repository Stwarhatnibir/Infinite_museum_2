"use client";

import { useMemo } from "react";
import * as THREE from "three";

export default function CentralHall() {
  const stoneMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#24201a",
        roughness: 0.72,
        metalness: 0.12,
      }),
    [],
  );

  return (
    <group>
      {/* Floor */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
        material={stoneMaterial}
      >
        <circleGeometry args={[100, 96]} />
      </mesh>

      {/* Central platform */}
      <mesh position={[0, 0.35, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[8, 8, 0.7, 64]} />
        <meshStandardMaterial
          color="#332b20"
          roughness={0.5}
          metalness={0.25}
        />
      </mesh>

      {/* Floating orb */}
      <mesh position={[0, 12, 0]}>
        <sphereGeometry args={[2.2, 64, 64]} />
        <meshStandardMaterial
          color="#fff1c2"
          emissive="#d9a441"
          emissiveIntensity={4}
          roughness={0.1}
          metalness={0.2}
        />
      </mesh>

      {/* Orb light */}
      <pointLight
        position={[0, 12, 0]}
        intensity={80}
        distance={70}
        color="#ffd166"
      />

      {/* Decorative rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 12, 0]}>
        <torusGeometry args={[4, 0.035, 16, 96]} />
        <meshBasicMaterial color="#d6a94c" transparent opacity={0.65} />
      </mesh>

      <mesh rotation={[0, 0, Math.PI / 2]} position={[0, 12, 0]}>
        <torusGeometry args={[5, 0.025, 16, 96]} />
        <meshBasicMaterial color="#d6a94c" transparent opacity={0.4} />
      </mesh>

      {/* Room markers */}
      <RoomMarker position={[-35, 0.05, -25]} label="ANCIENT" />
      <RoomMarker position={[35, 0.05, -25]} label="SCIENCE" />
      <RoomMarker position={[35, 0.05, 30]} label="TECHNOLOGY" />
      <RoomMarker position={[-35, 0.05, 30]} label="SPACE" />
    </group>
  );
}

function RoomMarker({
  position,
  label,
}: {
  position: [number, number, number];
  label: string;
}) {
  return (
    <group position={position}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[4, 4.15, 48]} />
        <meshBasicMaterial color="#c9a45c" transparent opacity={0.45} />
      </mesh>

      <pointLight
        position={[0, 2, 0]}
        intensity={5}
        distance={15}
        color="#c9a45c"
      />
    </group>
  );
}
