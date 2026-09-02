"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import Artifact from "../Objects/Artifact";

const ROOM_RADIUS = 70;
const ROOM_HEIGHT = 35;

const GOLD = "#d6b56a";
const GOLD_BRIGHT = "#ffd978";
const STONE = "#241c13";
const STONE_DARK = "#100d09";
const WARM = "#d28b38";

interface InteractiveAncientArtifactProps {
  artifact: React.ComponentProps<typeof Artifact>["artifact"];

  anchorPosition: [number, number, number];

  children: React.ReactNode;
}

function InteractiveAncientArtifact({
  artifact,
  anchorPosition,
  children,
}: InteractiveAncientArtifactProps) {
  return (
    <Artifact
      artifact={{
        ...artifact,
        position: [0, 0, 0],
      }}
      showDefaultOrb={false}
      anchorPosition={anchorPosition}
    >
      {children}
    </Artifact>
  );
}

export default function AncientRoom() {
  return (
    <group position={[0, 0, -150]}>
      <AncientArchitecture />

      <AncientLighting />

      <AncientOrb />

      <DustParticles />

      <InteractiveAncientArtifact
        artifact={{
          id: "ancient-sarcophagus",
          name: "Egyptian Sarcophagus",
          category: "Ancient Artifact",
          room: "Ancient",
          description:
            "A ceremonial Egyptian sarcophagus preserved within the ancient wing.",
          longDescription:
            "Its carved surface and golden funerary details suggest a ritual object created for a person of high status. The museum's records contain no confirmed provenance.",
          rarity: "rare",
          position: [-30, 6, 0],
          scale: 1,
          glowIntensity: 1.4,
        }}
        anchorPosition={[-30, 6, 0]}
      >
        <Sarcophagus />
      </InteractiveAncientArtifact>

      <InteractiveAncientArtifact
        artifact={{
          id: "ancient-greek-statue",
          name: "Greek Marble Statue",
          category: "Ancient Sculpture",
          room: "Ancient",
          description:
            "A rotating marble figure inspired by classical Greek sculpture.",
          longDescription:
            "The figure combines idealized human proportions with an unexplained golden halo. Its exact identity remains unknown.",
          rarity: "common",
          position: [20, 5, -15],
          scale: 1,
          glowIntensity: 1.1,
        }}
        anchorPosition={[20, 5, -15]}
      >
        <GreekStatue />
      </InteractiveAncientArtifact>

      <InteractiveAncientArtifact
        artifact={{
          id: "ancient-scroll",
          name: "Floating Ancient Scroll",
          category: "Ancient Manuscript",
          room: "Ancient",
          description: "A mysterious scroll suspended above the chamber floor.",
          longDescription:
            "The manuscript contains symbols that have not yet been matched to a known writing system. It appears to react to movement nearby.",
          rarity: "legendary",
          position: [0, 15, 10],
          scale: 1,
          glowIntensity: 1.8,
        }}
        anchorPosition={[0, 15, 10]}
      >
        <AncientScroll />
      </InteractiveAncientArtifact>

      <InteractiveAncientArtifact
        artifact={{
          id: "ancient-indian-sculpture",
          name: "Indian Temple Sculpture",
          category: "Ancient Sculpture",
          room: "Ancient",
          description:
            "A stylized ceremonial sculpture inspired by ancient Indian temple art.",
          longDescription:
            "The sculpture is surrounded by a luminous ring and appears to float above its pedestal, giving it an otherworldly presence.",
          rarity: "rare",
          position: [-10, 8, 20],
          scale: 1,
          glowIntensity: 1.5,
        }}
        anchorPosition={[-10, 8, 20]}
      >
        <IndianSculpture />
      </InteractiveAncientArtifact>

      <InteractiveAncientArtifact
        artifact={{
          id: "ancient-roman-coins",
          name: "Roman Coin Constellation",
          category: "Ancient Currency",
          room: "Ancient",
          description:
            "A constellation of Roman-inspired coins suspended in the darkness.",
          longDescription:
            "Twenty-four coins orbit an unseen center. Their arrangement resembles a celestial map rather than a conventional collection.",
          rarity: "common",
          position: [15, 0, 0],
          scale: 1,
          glowIntensity: 1.2,
        }}
        anchorPosition={[15, 0, 0]}
      >
        <RomanCoins />
      </InteractiveAncientArtifact>

      <AncientEntrance />
    </group>
  );
}

/* ================================================================
   ARCHITECTURE
================================================================ */

function AncientArchitecture() {
  const wallMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: STONE,
        roughness: 0.85,
        metalness: 0.08,
      }),
    [],
  );

  const floorMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#17120d",
        roughness: 0.7,
        metalness: 0.2,
      }),
    [],
  );

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <circleGeometry args={[ROOM_RADIUS, 96]} />

        <primitive object={floorMaterial} attach="material" />
      </mesh>

      <mesh position={[0, ROOM_HEIGHT / 2, 0]}>
        <cylinderGeometry
          args={[ROOM_RADIUS, ROOM_RADIUS, ROOM_HEIGHT, 96, 1, true]}
        />

        <primitive object={wallMaterial} attach="material" />
      </mesh>

      <mesh position={[0, ROOM_HEIGHT / 2, 0]}>
        <cylinderGeometry
          args={[ROOM_RADIUS - 2, ROOM_RADIUS - 2, ROOM_HEIGHT, 96, 1, true]}
        />

        <meshStandardMaterial
          color={STONE_DARK}
          roughness={0.9}
          metalness={0.02}
          side={THREE.BackSide}
        />
      </mesh>

      <mesh position={[0, ROOM_HEIGHT, 0]}>
        <cylinderGeometry args={[ROOM_RADIUS - 2, ROOM_RADIUS - 2, 1.5, 96]} />

        <meshStandardMaterial color="#090705" roughness={0.95} />
      </mesh>

      {[15, 30, 45, 60].map((radius) => (
        <mesh
          key={radius}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0.03, 0]}
        >
          <ringGeometry args={[radius, radius + 0.06, 96]} />

          <meshBasicMaterial color={GOLD} transparent opacity={0.16} />
        </mesh>
      ))}

      <AncientPillars />
    </group>
  );
}

/* ================================================================
   PILLARS
================================================================ */

function AncientPillars() {
  const pillars = [];

  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;

    const radius = 57;

    pillars.push(
      <group
        key={i}
        position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]}
      >
        <mesh position={[0, 1, 0]} castShadow>
          <cylinderGeometry args={[2.5, 3, 2, 24]} />

          <meshStandardMaterial color="#31251a" roughness={0.8} />
        </mesh>

        <mesh position={[0, 13, 0]} castShadow>
          <cylinderGeometry args={[1.8, 2.2, 24, 20]} />

          <meshStandardMaterial color="#3b2c1d" roughness={0.8} />
        </mesh>

        <mesh position={[0, 25.5, 0]}>
          <cylinderGeometry args={[3, 2, 3, 24]} />

          <meshStandardMaterial color="#453321" roughness={0.75} />
        </mesh>

        <mesh position={[0, 24, 0]}>
          <torusGeometry args={[2.2, 0.08, 12, 32]} />

          <meshStandardMaterial
            color={GOLD}
            emissive={WARM}
            emissiveIntensity={0.6}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
      </group>,
    );
  }

  return <group>{pillars}</group>;
}

/* ================================================================
   LIGHTING
================================================================ */

function AncientLighting() {
  return (
    <group>
      <pointLight
        position={[0, 18, 0]}
        intensity={18}
        distance={80}
        color="#dca85a"
      />

      <pointLight
        position={[-30, 8, 20]}
        intensity={15}
        distance={45}
        color="#ff9d42"
      />

      <pointLight
        position={[30, 10, -20]}
        intensity={12}
        distance={40}
        color="#ffd27a"
      />

      <pointLight
        position={[0, 5, -45]}
        intensity={10}
        distance={35}
        color="#b86b28"
      />
    </group>
  );
}

/* ================================================================
   CENTRAL ORB
================================================================ */

function AncientOrb() {
  const orbRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!orbRef.current) return;

    orbRef.current.position.y =
      15 + Math.sin(state.clock.elapsedTime * 1.2) * 0.5;

    orbRef.current.rotation.y += 0.002;
  });

  return (
    <group>
      <mesh ref={orbRef} position={[0, 15, 0]}>
        <sphereGeometry args={[1.8, 48, 48]} />

        <meshStandardMaterial
          color="#fff1c2"
          emissive={GOLD_BRIGHT}
          emissiveIntensity={5}
          roughness={0.15}
          metalness={0.25}
        />
      </mesh>

      <pointLight
        position={[0, 15, 0]}
        intensity={30}
        distance={40}
        color={GOLD_BRIGHT}
      />
    </group>
  );
}

/* ================================================================
   DUST PARTICLES
================================================================ */

function DustParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const count = 900;

    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const angle = (i * 2.399963229728653) % (Math.PI * 2);

      const radius = (Math.sin(i * 12.9898) * 0.5 + 0.5) * 65;

      positions[i * 3] = Math.cos(angle) * radius;

      positions[i * 3 + 1] = (Math.sin(i * 78.233) * 0.5 + 0.5) * 32;

      positions[i * 3 + 2] = Math.sin(angle) * radius;
    }

    return positions;
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;

    pointsRef.current.rotation.y += delta * 0.006;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[particles, 3]} />
      </bufferGeometry>

      <pointsMaterial
        color="#d9b77a"
        size={0.12}
        transparent
        opacity={0.5}
        depthWrite={false}
      />
    </points>
  );
}

/* ================================================================
   SARCOPHAGUS
================================================================ */

function Sarcophagus() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;

    groupRef.current.position.y =
      6 + Math.sin(state.clock.elapsedTime * 0.7) * 0.25;
  });

  return (
    <group ref={groupRef} position={[-30, 6, 0]} rotation={[0, Math.PI / 2, 0]}>
      <mesh castShadow>
        <boxGeometry args={[10, 3, 4]} />

        <meshStandardMaterial
          color="#6e4a24"
          roughness={0.65}
          metalness={0.2}
        />
      </mesh>

      <mesh position={[0, 2.2, 0]} castShadow>
        <boxGeometry args={[9, 2.5, 3.5]} />

        <meshStandardMaterial
          color="#8c612e"
          roughness={0.5}
          metalness={0.3}
          emissive="#5b3512"
          emissiveIntensity={0.3}
        />
      </mesh>

      <mesh position={[4.6, 2.8, 0]}>
        <boxGeometry args={[0.15, 2, 2]} />

        <meshStandardMaterial
          color="#d9ad52"
          emissive="#8b5c19"
          emissiveIntensity={0.8}
          metalness={0.8}
          roughness={0.25}
        />
      </mesh>

      <mesh position={[4.7, 2.8, 0]} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.45, 0.07, 12, 24]} />

        <meshBasicMaterial color={GOLD_BRIGHT} />
      </mesh>

      <pointLight
        position={[0, 4, 0]}
        intensity={6}
        distance={15}
        color="#e0a94f"
      />
    </group>
  );
}

/* ================================================================
   GREEK STATUE
================================================================ */

function GreekStatue() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.y += delta * 0.08;
  });

  return (
    <group ref={groupRef} position={[20, 5, -15]}>
      <mesh position={[0, 2, 0]}>
        <cylinderGeometry args={[4, 4.5, 4, 32]} />

        <meshStandardMaterial color="#716656" roughness={0.8} />
      </mesh>

      <mesh position={[0, 6, 0]} castShadow>
        <capsuleGeometry args={[1.7, 4.5, 12, 24]} />

        <meshStandardMaterial
          color="#c6bba7"
          roughness={0.75}
          metalness={0.05}
        />
      </mesh>

      <mesh position={[0, 9.3, 0]}>
        <sphereGeometry args={[1.25, 32, 32]} />

        <meshStandardMaterial color="#d0c4ae" roughness={0.75} />
      </mesh>

      <mesh position={[0, 9.3, -0.5]}>
        <torusGeometry args={[1.8, 0.06, 12, 48]} />

        <meshBasicMaterial color={GOLD} transparent opacity={0.5} />
      </mesh>

      <pointLight
        position={[0, 7, 0]}
        intensity={4}
        distance={12}
        color="#d6b56a"
      />
    </group>
  );
}

/* ================================================================
   ANCIENT SCROLL
================================================================ */

function AncientScroll() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;

    groupRef.current.position.y = 15 + Math.sin(state.clock.elapsedTime) * 0.7;
  });

  return (
    <group ref={groupRef} position={[0, 15, 10]}>
      <mesh rotation={[0.3, 0.4, 0.2]}>
        <planeGeometry args={[6, 9]} />

        <meshStandardMaterial
          color="#a8783c"
          roughness={0.9}
          side={THREE.DoubleSide}
          emissive="#4a2d10"
          emissiveIntensity={0.25}
        />
      </mesh>

      <mesh position={[-3, 0, 0]} rotation={[0.3, 0.4, 0.2]}>
        <cylinderGeometry args={[0.18, 0.18, 9.5, 16]} />

        <meshStandardMaterial color="#5b3817" metalness={0.3} />
      </mesh>

      <mesh position={[3, 0, 0]} rotation={[0.3, 0.4, 0.2]}>
        <cylinderGeometry args={[0.18, 0.18, 9.5, 16]} />

        <meshStandardMaterial color="#5b3817" metalness={0.3} />
      </mesh>

      <pointLight
        position={[0, 0, 0]}
        intensity={3}
        distance={10}
        color="#d6b56a"
      />
    </group>
  );
}

/* ================================================================
   INDIAN SCULPTURE
================================================================ */

function IndianSculpture() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;

    groupRef.current.position.y =
      8 + Math.sin(state.clock.elapsedTime * 0.8) * 0.35;
  });

  return (
    <group ref={groupRef} position={[-10, 8, 20]}>
      <mesh position={[0, -5, 0]}>
        <cylinderGeometry args={[4, 4.5, 2, 32]} />

        <meshStandardMaterial color="#4e321b" roughness={0.75} />
      </mesh>

      <mesh castShadow>
        <sphereGeometry args={[2.8, 32, 32]} />

        <meshStandardMaterial
          color="#8c5b27"
          roughness={0.4}
          metalness={0.55}
          emissive="#43270e"
          emissiveIntensity={0.5}
        />
      </mesh>

      <mesh position={[0, 3.2, 0]}>
        <coneGeometry args={[2, 3, 6]} />

        <meshStandardMaterial
          color="#b98032"
          metalness={0.7}
          roughness={0.25}
        />
      </mesh>

      <mesh position={[0, 0, -1]}>
        <torusGeometry args={[4, 0.12, 16, 64]} />

        <meshStandardMaterial
          color={GOLD_BRIGHT}
          emissive={WARM}
          emissiveIntensity={1.2}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      <pointLight
        position={[0, 0, 0]}
        intensity={7}
        distance={18}
        color="#e5a94f"
      />
    </group>
  );
}

/* ================================================================
   ROMAN COINS
================================================================ */

function RomanCoins() {
  const coins = useMemo(() => {
    return Array.from({
      length: 24,
    }).map((_, index) => ({
      angle: (index / 24) * Math.PI * 2,

      radius: 3 + (((index * 17) % 100) / 100) * 7,

      height: 10 + (((index * 43) % 100) / 100) * 5,

      speed: 0.2 + (((index * 71) % 100) / 100) * 0.3,
    }));
  }, []);

  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
  });

  return (
    <group ref={groupRef} position={[15, 0, 0]}>
      {coins.map((coin, index) => (
        <mesh
          key={index}
          position={[
            Math.cos(coin.angle) * coin.radius,

            coin.height,

            Math.sin(coin.angle) * coin.radius,
          ]}
          rotation={[coin.angle, coin.angle * 2, coin.angle]}
        >
          <cylinderGeometry args={[0.65, 0.65, 0.18, 24]} />

          <meshStandardMaterial
            color="#c99a42"
            metalness={0.85}
            roughness={0.25}
            emissive="#5b3b0f"
            emissiveIntensity={0.4}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ================================================================
   ENTRANCE
================================================================ */

function AncientEntrance() {
  return (
    <group position={[0, 0, 68]}>
      <mesh position={[-9, 12, 0]}>
        <boxGeometry args={[3, 24, 4]} />

        <meshStandardMaterial color="#3c2b1c" roughness={0.8} />
      </mesh>

      <mesh position={[9, 12, 0]}>
        <boxGeometry args={[3, 24, 4]} />

        <meshStandardMaterial color="#3c2b1c" roughness={0.8} />
      </mesh>

      <mesh position={[0, 25, 0]}>
        <boxGeometry args={[21, 4, 4]} />

        <meshStandardMaterial color="#3c2b1c" roughness={0.8} />
      </mesh>

      <mesh position={[0, 23, -2]}>
        <torusGeometry args={[9, 0.14, 16, 64, Math.PI]} />

        <meshBasicMaterial color={GOLD_BRIGHT} transparent opacity={0.7} />
      </mesh>

      <pointLight
        position={[0, 10, 2]}
        intensity={8}
        distance={25}
        color="#d6b56a"
      />
    </group>
  );
}
