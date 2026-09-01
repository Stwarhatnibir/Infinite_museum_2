"use client";

import { useMemo } from "react";
import * as THREE from "three";

const ROOM_RADIUS = 92;
const WALL_HEIGHT = 45;
const WALL_THICKNESS = 2.5;

const GOLD = "#d6b56a";
const STONE = "#24201a";
const STONE_DARK = "#15120f";

interface RoomMarkerProps {
  position: [number, number, number];
  rotation: [number, number, number];
  label: string;
}

export default function CentralHall() {
  const stoneMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: STONE,
        roughness: 0.72,
        metalness: 0.12,
      }),
    [],
  );

  const darkStoneMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: STONE_DARK,
        roughness: 0.82,
        metalness: 0.08,
      }),
    [],
  );

  const goldMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: GOLD,
        emissive: "#6b4b16",
        emissiveIntensity: 0.5,
        roughness: 0.3,
        metalness: 0.7,
      }),
    [],
  );

  return (
    <group>
      {/* =========================================================
          FLOOR
      ========================================================= */}

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <circleGeometry args={[ROOM_RADIUS, 128]} />
        <meshStandardMaterial
          color="#181511"
          roughness={0.45}
          metalness={0.35}
        />
      </mesh>

      {/* Floor inner circle */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.025, 0]}>
        <ringGeometry args={[8, 8.08, 96]} />
        <meshBasicMaterial color={GOLD} transparent opacity={0.65} />
      </mesh>

      {/* Floor radial decoration */}
      <FloorRings />

      {/* =========================================================
          OUTER WALL
      ========================================================= */}

      <mesh position={[0, WALL_HEIGHT / 2, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry
          args={[ROOM_RADIUS, ROOM_RADIUS, WALL_HEIGHT, 128, 1, true]}
        />
        <primitive object={stoneMaterial} attach="material" />
      </mesh>

      {/* Inner dark wall layer */}
      <mesh position={[0, WALL_HEIGHT / 2, 0]}>
        <cylinderGeometry
          args={[
            ROOM_RADIUS - WALL_THICKNESS,
            ROOM_RADIUS - WALL_THICKNESS,
            WALL_HEIGHT,
            128,
            1,
            true,
          ]}
        />
        <primitive object={darkStoneMaterial} attach="material" />
      </mesh>

      {/* =========================================================
          CEILING
      ========================================================= */}

      <mesh position={[0, WALL_HEIGHT, 0]}>
        <cylinderGeometry args={[ROOM_RADIUS - 2, ROOM_RADIUS - 2, 2, 128]} />
        <meshStandardMaterial
          color="#0c0b09"
          roughness={0.9}
          metalness={0.05}
        />
      </mesh>

      {/* Ceiling opening */}
      <mesh position={[0, WALL_HEIGHT + 1.05, 0]}>
        <cylinderGeometry args={[20, 20, 0.5, 96]} />
        <meshBasicMaterial color="#050505" transparent opacity={0.95} />
      </mesh>

      {/* =========================================================
          CENTRAL PLATFORM
      ========================================================= */}

      <mesh position={[0, 0.35, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[8, 8, 0.7, 96]} />
        <meshStandardMaterial
          color="#332b20"
          roughness={0.5}
          metalness={0.25}
        />
      </mesh>

      <mesh position={[0, 0.72, 0]}>
        <cylinderGeometry args={[6.8, 6.8, 0.08, 96]} />
        <meshStandardMaterial color="#0d0b08" roughness={0.3} metalness={0.6} />
      </mesh>

      {/* =========================================================
          FLOATING CENTRAL ORB
      ========================================================= */}

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

      <pointLight
        position={[0, 12, 0]}
        intensity={80}
        distance={70}
        color="#ffd166"
      />

      {/* Orb rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 12, 0]}>
        <torusGeometry args={[4, 0.035, 16, 96]} />
        <meshBasicMaterial color={GOLD} transparent opacity={0.65} />
      </mesh>

      <mesh rotation={[0, 0, Math.PI / 2]} position={[0, 12, 0]}>
        <torusGeometry args={[5, 0.025, 16, 96]} />
        <meshBasicMaterial color={GOLD} transparent opacity={0.4} />
      </mesh>

      {/* =========================================================
          COLUMNS
      ========================================================= */}

      <Columns material={stoneMaterial} goldMaterial={goldMaterial} />

      {/* =========================================================
          ARCHWAYS
      ========================================================= */}

      <Archway
        position={[0, 0, -ROOM_RADIUS + 2]}
        rotation={[0, 0, 0]}
        label="ANCIENT"
        material={stoneMaterial}
        goldMaterial={goldMaterial}
      />

      <Archway
        position={[ROOM_RADIUS - 2, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
        label="SCIENCE"
        material={stoneMaterial}
        goldMaterial={goldMaterial}
      />

      <Archway
        position={[0, 0, ROOM_RADIUS - 2]}
        rotation={[0, Math.PI, 0]}
        label="TECHNOLOGY"
        material={stoneMaterial}
        goldMaterial={goldMaterial}
      />

      <Archway
        position={[-ROOM_RADIUS + 2, 0, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        label="SPACE"
        material={stoneMaterial}
        goldMaterial={goldMaterial}
      />

      {/* =========================================================
          FUTURE ROOM PORTAL
      ========================================================= */}

      <FuturePortal material={stoneMaterial} goldMaterial={goldMaterial} />

      {/* =========================================================
          ROOM MARKERS
      ========================================================= */}

      <RoomMarker
        position={[0, 0.06, -55]}
        rotation={[-Math.PI / 2, 0, 0]}
        label="ANCIENT"
      />

      <RoomMarker
        position={[55, 0.06, 0]}
        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
        label="SCIENCE"
      />

      <RoomMarker
        position={[0, 0.06, 55]}
        rotation={[-Math.PI / 2, 0, Math.PI]}
        label="TECHNOLOGY"
      />

      <RoomMarker
        position={[-55, 0.06, 0]}
        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
        label="SPACE"
      />

      {/* =========================================================
          LIGHTING
      ========================================================= */}

      <pointLight
        position={[0, 30, -60]}
        intensity={18}
        distance={80}
        color="#e5bd70"
      />

      <pointLight
        position={[60, 25, 0]}
        intensity={14}
        distance={75}
        color="#b5c7ff"
      />

      <pointLight
        position={[0, 25, 60]}
        intensity={12}
        distance={75}
        color="#8ea8ff"
      />

      <pointLight
        position={[-60, 25, 0]}
        intensity={14}
        distance={75}
        color="#9d8cff"
      />

      {/* Upper ceiling light */}
      <pointLight
        position={[0, 40, 0]}
        intensity={25}
        distance={100}
        color="#fff0c4"
      />
    </group>
  );
}

/* ===============================================================
   FLOOR RINGS
================================================================ */

function FloorRings() {
  return (
    <group position={[0, 0.04, 0]}>
      {[20, 35, 50, 65, 80].map((radius) => (
        <mesh key={radius} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius, radius + 0.08, 128]} />

          <meshBasicMaterial color={GOLD} transparent opacity={0.18} />
        </mesh>
      ))}

      {Array.from({ length: 16 }).map((_, index) => {
        const angle = (index / 16) * Math.PI * 2;

        return (
          <mesh
            key={index}
            position={[Math.cos(angle) * 45, 0, Math.sin(angle) * 45]}
            rotation={[-Math.PI / 2, 0, angle]}
          >
            <planeGeometry args={[0.08, 70]} />

            <meshBasicMaterial color={GOLD} transparent opacity={0.08} />
          </mesh>
        );
      })}
    </group>
  );
}

/* ===============================================================
   COLUMNS
================================================================ */

function Columns({
  material,
  goldMaterial,
}: {
  material: THREE.Material;
  goldMaterial: THREE.Material;
}) {
  const columns = Array.from({ length: 16 });

  return (
    <group>
      {columns.map((_, index) => {
        const angle = (index / 16) * Math.PI * 2;

        const radius = 75;

        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <group key={index} position={[x, 0, z]}>
            {/* Column */}
            <mesh position={[0, 16, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[1.8, 2.2, 32, 24]} />

              <primitive object={material} attach="material" />
            </mesh>

            {/* Base */}
            <mesh position={[0, 0.8, 0]}>
              <cylinderGeometry args={[3, 3.5, 1.6, 32]} />

              <primitive object={material} attach="material" />
            </mesh>

            {/* Capital */}
            <mesh position={[0, 32.2, 0]}>
              <cylinderGeometry args={[3.2, 2.1, 1.5, 32]} />

              <primitive object={material} attach="material" />
            </mesh>

            {/* Gold accent */}
            <mesh position={[0, 31.5, 0]}>
              <torusGeometry args={[2.4, 0.08, 12, 32]} />

              <primitive object={goldMaterial} attach="material" />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

/* ===============================================================
   ARCHWAY
================================================================ */

function Archway({
  position,
  rotation,
  label,
  material,
  goldMaterial,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  label: string;
  material: THREE.Material;
  goldMaterial: THREE.Material;
}) {
  return (
    <group position={position} rotation={rotation}>
      {/* Left pillar */}
      <mesh position={[-10, 12, 0]} castShadow>
        <boxGeometry args={[4, 24, 6]} />
        <primitive object={material} attach="material" />
      </mesh>

      {/* Right pillar */}
      <mesh position={[10, 12, 0]} castShadow>
        <boxGeometry args={[4, 24, 6]} />
        <primitive object={material} attach="material" />
      </mesh>

      {/* Arch top */}
      <mesh position={[0, 25, 0]} castShadow>
        <torusGeometry args={[10, 2, 16, 48, Math.PI]} />

        <primitive object={material} attach="material" />
      </mesh>

      {/* Arch crown */}
      <mesh position={[0, 27, 0]}>
        <boxGeometry args={[18, 4, 6]} />

        <primitive object={material} attach="material" />
      </mesh>

      {/* Gold accent */}
      <mesh position={[0, 25, -3.1]}>
        <torusGeometry args={[9.5, 0.12, 12, 48, Math.PI]} />

        <primitive object={goldMaterial} attach="material" />
      </mesh>

      {/* Entrance glow */}
      <pointLight
        position={[0, 12, 2]}
        intensity={8}
        distance={25}
        color="#d6b56a"
      />

      {/* Room floor marker */}
      <mesh position={[0, 0.08, 4]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[4, 4.12, 48]} />

        <meshBasicMaterial color={GOLD} transparent opacity={0.55} />
      </mesh>

      {/* Invisible opening volume */}
      <mesh position={[0, 12, 0]} visible={false}>
        <boxGeometry args={[16, 24, 8]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </group>
  );
}

/* ===============================================================
   FUTURE PORTAL
================================================================ */

function FuturePortal({
  material,
  goldMaterial,
}: {
  material: THREE.Material;
  goldMaterial: THREE.Material;
}) {
  return (
    <group position={[0, 0, -88]}>
      {/* Vertical portal pillars */}
      <mesh position={[-7, 15, 0]}>
        <boxGeometry args={[3, 30, 3]} />

        <primitive object={material} attach="material" />
      </mesh>

      <mesh position={[7, 15, 0]}>
        <boxGeometry args={[3, 30, 3]} />

        <primitive object={material} attach="material" />
      </mesh>

      {/* Portal ring */}
      <mesh position={[0, 27, 0]}>
        <torusGeometry args={[8, 1.2, 20, 64]} />

        <primitive object={goldMaterial} attach="material" />
      </mesh>

      {/* Portal light */}
      <pointLight
        position={[0, 15, 2]}
        intensity={15}
        distance={35}
        color="#d6b56a"
      />
    </group>
  );
}

/* ===============================================================
   ROOM MARKER
================================================================ */

function RoomMarker({ position, rotation }: RoomMarkerProps) {
  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <ringGeometry args={[4, 4.15, 48]} />

        <meshBasicMaterial color={GOLD} transparent opacity={0.5} />
      </mesh>

      <pointLight
        position={[0, 2, 0]}
        intensity={5}
        distance={15}
        color={GOLD}
      />
    </group>
  );
}
