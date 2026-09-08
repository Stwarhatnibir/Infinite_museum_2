"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import Artifact from "../Objects/Artifact";
import { ArtifactData } from "../../../stores/museumStore";

const ROOM_RADIUS = 70;
const ROOM_HEIGHT = 35;

const SCIENCE_ARTIFACTS: ArtifactData[] = [
  {
    id: "science-dna",
    name: "The Human Genome",
    category: "GENETICS",
    room: "science",
    description: "A molecular representation of the human genetic blueprint.",
    longDescription:
      "DNA stores the biological instructions that define every living human organism. Its double-helix structure contains billions of chemical bases arranged into a sequence that carries genetic information.",
    rarity: "legendary",
    position: [-28, 7, -18],
    scale: 1,
    glowIntensity: 1.2,
  },
  {
    id: "science-atom",
    name: "The Atom",
    category: "PHYSICS",
    room: "science",
    description:
      "A visualization of matter reduced to its fundamental atomic structure.",
    longDescription:
      "Atoms form the basic building blocks of ordinary matter. Their structure consists of a dense nucleus surrounded by electrons occupying quantum states.",
    rarity: "rare",
    position: [28, 6, -10],
    scale: 1,
    glowIntensity: 1.1,
  },
  {
    id: "science-neuron",
    name: "The Human Neuron",
    category: "NEUROSCIENCE",
    room: "science",
    description:
      "A visualization of the biological machinery responsible for transmitting neural signals.",
    longDescription:
      "Neurons communicate using electrical and chemical signals. Networks of these specialized cells form the biological foundation of sensation, movement, memory, and cognition.",
    rarity: "rare",
    position: [18, 8, 24],
    scale: 1,
    glowIntensity: 1.25,
  },
  {
    id: "science-molecule",
    name: "Molecular Structure",
    category: "CHEMISTRY",
    room: "science",
    description:
      "A floating molecular model representing the architecture of chemical matter.",
    longDescription:
      "Molecules are groups of atoms connected through chemical bonds. Their three-dimensional structures determine many of the physical and chemical properties of matter.",
    rarity: "common",
    position: [-20, 5, 27],
    scale: 0.9,
    glowIntensity: 0.9,
  },
];

function ScienceMaterial({
  color,
  emissive,
  intensity = 2,
  transparent = false,
  opacity = 1,
}: {
  color: string;
  emissive?: string;
  intensity?: number;
  transparent?: boolean;
  opacity?: number;
}) {
  return (
    <meshStandardMaterial
      color={color}
      emissive={emissive ?? color}
      emissiveIntensity={intensity}
      metalness={0.65}
      roughness={0.25}
      transparent={transparent}
      opacity={opacity}
    />
  );
}

function HexagonalPlatform({
  position,
  scale = 1,
}: {
  position: [number, number, number];
  scale?: number;
}) {
  return (
    <group position={position} scale={scale}>
      <mesh receiveShadow castShadow>
        <cylinderGeometry args={[4, 4.5, 0.6, 6]} />
        <ScienceMaterial color="#10142a" emissive="#263cff" intensity={0.35} />
      </mesh>

      <mesh position={[0, 0.33, 0]}>
        <cylinderGeometry args={[3.6, 3.6, 0.04, 6]} />
        <meshBasicMaterial color="#4d5cff" transparent opacity={0.7} />
      </mesh>

      <pointLight
        position={[0, 1, 0]}
        color="#354cff"
        intensity={2}
        distance={8}
        decay={2}
      />
    </group>
  );
}

function Atom({
  position,
  scale = 1,
  color = "#4d7cff",
}: {
  position: [number, number, number];
  scale?: number;
  color?: string;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!group.current) return;

    group.current.rotation.y += delta * 0.45;
    group.current.rotation.x += delta * 0.18;
  });

  return (
    <group ref={group} position={position} scale={scale}>
      <mesh>
        <sphereGeometry args={[1.2, 32, 32]} />
        <ScienceMaterial color="#ffffff" emissive={color} intensity={3} />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.8, 0.06, 12, 64]} />
        <meshBasicMaterial color={color} />
      </mesh>

      <mesh rotation={[0, Math.PI / 3, 0]}>
        <torusGeometry args={[2.8, 0.06, 12, 64]} />
        <meshBasicMaterial color="#a26bff" />
      </mesh>

      <mesh rotation={[Math.PI / 4, 0, Math.PI / 4]}>
        <torusGeometry args={[2.8, 0.06, 12, 64]} />
        <meshBasicMaterial color="#49c6ff" />
      </mesh>

      <pointLight color={color} intensity={3} distance={12} decay={2} />
    </group>
  );
}

function DNAHelix({
  position,
  scale = 1,
}: {
  position: [number, number, number];
  scale?: number;
}) {
  const group = useRef<THREE.Group>(null);

  const points = useMemo(() => {
    const result: {
      x1: number;
      y: number;
      z1: number;
      x2: number;
      z2: number;
    }[] = [];

    const steps = 42;

    for (let i = 0; i < steps; i++) {
      const t = i / (steps - 1);
      const y = -8 + t * 16;

      const angle = t * Math.PI * 5;

      const radius = 2.2;

      result.push({
        x1: Math.cos(angle) * radius,
        y,
        z1: Math.sin(angle) * radius,
        x2: Math.cos(angle + Math.PI) * radius,
        z2: Math.sin(angle + Math.PI) * radius,
      });
    }

    return result;
  }, []);

  useFrame((_, delta) => {
    if (!group.current) return;

    group.current.rotation.y += delta * 0.22;
  });

  return (
    <group ref={group} position={position} scale={scale}>
      {points.map((point, index) => (
        <group key={index}>
          <mesh position={[point.x1, point.y, point.z1]}>
            <sphereGeometry args={[0.22, 16, 16]} />
            <meshBasicMaterial color="#4fc3ff" />
          </mesh>

          <mesh position={[point.x2, point.y, point.z2]}>
            <sphereGeometry args={[0.22, 16, 16]} />
            <meshBasicMaterial color="#a66cff" />
          </mesh>

          {index % 2 === 0 && (
            <mesh
              position={[
                (point.x1 + point.x2) / 2,
                point.y,
                (point.z1 + point.z2) / 2,
              ]}
              rotation={[
                0,
                -angleBetween(point.x1, point.z1, point.x2, point.z2),
                0,
              ]}
            >
              <boxGeometry args={[4.4, 0.08, 0.08]} />
              <meshBasicMaterial color="#7181ff" />
            </mesh>
          )}
        </group>
      ))}

      <pointLight
        position={[0, 0, 0]}
        color="#5d7cff"
        intensity={4}
        distance={18}
        decay={2}
      />
    </group>
  );
}

function angleBetween(x1: number, z1: number, x2: number, z2: number) {
  return Math.atan2(z2 - z1, x2 - x1);
}

function MolecularCloud({ position }: { position: [number, number, number] }) {
  const group = useRef<THREE.Group>(null);

  const molecules = useMemo(() => {
    return Array.from({ length: 18 }, (_, index) => {
      const angle = (index / 18) * Math.PI * 2;

      const radius = 2.5 + (index % 3) * 0.8;

      return {
        position: [
          Math.cos(angle) * radius,
          Math.sin(angle * 2) * 1.8,
          Math.sin(angle) * radius,
        ] as [number, number, number],
        scale: 0.22 + (index % 4) * 0.06,
      };
    });
  }, []);

  useFrame((_, delta) => {
    if (!group.current) return;

    group.current.rotation.y -= delta * 0.3;

    group.current.rotation.x += delta * 0.08;
  });

  return (
    <group ref={group} position={position}>
      {molecules.map((molecule, index) => (
        <mesh key={index} position={molecule.position} scale={molecule.scale}>
          <sphereGeometry args={[1, 16, 16]} />
          <ScienceMaterial
            color={index % 2 === 0 ? "#4ec8ff" : "#a66cff"}
            intensity={2.5}
          />
        </mesh>
      ))}

      <pointLight color="#596dff" intensity={3} distance={12} decay={2} />
    </group>
  );
}

function NeuralNetwork({ position }: { position: [number, number, number] }) {
  const group = useRef<THREE.Group>(null);

  const nodes = useMemo(() => {
    return Array.from({ length: 28 }, (_, index) => {
      const angle = (index / 28) * Math.PI * 2;

      const radius = 3.5 + Math.sin(index * 2.3) * 1.5;

      return new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.sin(index * 1.7) * 4,
        Math.sin(angle) * radius,
      );
    });
  }, []);

  useFrame((_, delta) => {
    if (!group.current) return;

    group.current.rotation.y += delta * 0.2;
  });

  return (
    <group ref={group} position={position}>
      {nodes.map((node, index) => (
        <mesh key={`node-${index}`} position={[node.x, node.y, node.z]}>
          <sphereGeometry args={[0.22, 16, 16]} />
          <meshBasicMaterial color={index % 2 === 0 ? "#55c8ff" : "#b06cff"} />
        </mesh>
      ))}

      {nodes.map((node, index) => {
        if (index % 2 !== 0) {
          return null;
        }

        const next = nodes[(index + 1) % nodes.length];

        const midpoint = new THREE.Vector3()
          .addVectors(node, next)
          .multiplyScalar(0.5);

        const direction = new THREE.Vector3().subVectors(next, node);

        const length = direction.length();

        const quaternion = new THREE.Quaternion();

        quaternion.setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          direction.normalize(),
        );

        return (
          <mesh
            key={`connection-${index}`}
            position={midpoint}
            quaternion={quaternion}
          >
            <cylinderGeometry args={[0.025, 0.025, length, 8]} />
            <meshBasicMaterial color="#6074ff" transparent opacity={0.7} />
          </mesh>
        );
      })}

      <pointLight color="#8068ff" intensity={3} distance={14} decay={2} />
    </group>
  );
}

function FloatingParticles() {
  const group = useRef<THREE.Group>(null);

  const particles = useMemo(() => {
    return Array.from({ length: 120 }, (_, index) => ({
      position: [
        (Math.random() - 0.5) * ROOM_RADIUS * 1.7,
        Math.random() * ROOM_HEIGHT,
        (Math.random() - 0.5) * ROOM_RADIUS * 1.7,
      ] as [number, number, number],
      scale: 0.015 + Math.random() * 0.035,
    }));
  }, []);

  useFrame((_, delta) => {
    if (!group.current) return;

    group.current.rotation.y += delta * 0.015;
  });

  return (
    <group ref={group}>
      {particles.map((particle, index) => (
        <mesh key={index} position={particle.position} scale={particle.scale}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial color="#607cff" transparent opacity={0.55} />
        </mesh>
      ))}
    </group>
  );
}

function ScienceArchitecture() {
  const pillars = useMemo(() => {
    return Array.from({ length: 16 }, (_, index) => {
      const angle = (index / 16) * Math.PI * 2;

      return [
        Math.cos(angle) * (ROOM_RADIUS - 5),
        ROOM_HEIGHT / 2,
        Math.sin(angle) * (ROOM_RADIUS - 5),
      ] as [number, number, number];
    });
  }, []);

  return (
    <>
      <mesh position={[0, -0.6, 0]} receiveShadow>
        <cylinderGeometry args={[ROOM_RADIUS, ROOM_RADIUS, 1, 64]} />
        <ScienceMaterial color="#070914" emissive="#0c1030" intensity={0.4} />
      </mesh>

      <mesh position={[0, ROOM_HEIGHT, 0]}>
        <cylinderGeometry args={[ROOM_RADIUS, ROOM_RADIUS, 1, 64]} />
        <ScienceMaterial color="#060812" emissive="#101743" intensity={0.3} />
      </mesh>

      {pillars.map((position, index) => (
        <group key={index} position={position}>
          <mesh castShadow>
            <boxGeometry args={[1.5, ROOM_HEIGHT, 1.5]} />
            <ScienceMaterial
              color="#090d1d"
              emissive={index % 2 === 0 ? "#304cff" : "#713dff"}
              intensity={0.25}
            />
          </mesh>

          <pointLight
            color={index % 2 === 0 ? "#385cff" : "#783cff"}
            intensity={1.2}
            distance={10}
            decay={2}
          />
        </group>
      ))}

      <mesh position={[0, 10, 0]}>
        <torusGeometry args={[ROOM_RADIUS - 7, 0.15, 12, 96]} />
        <meshBasicMaterial color="#334cff" />
      </mesh>

      <mesh position={[0, 22, 0]}>
        <torusGeometry args={[ROOM_RADIUS - 10, 0.1, 12, 96]} />
        <meshBasicMaterial color="#7a4cff" transparent opacity={0.7} />
      </mesh>
    </>
  );
}

export default function ScienceRoom() {
  return (
    <group position={[0, 0, 150]}>
      <ScienceArchitecture />

      <ambientLight color="#263cff" intensity={0.35} />

      <pointLight
        position={[0, 18, 0]}
        color="#435cff"
        intensity={8}
        distance={70}
        decay={2}
      />

      <pointLight
        position={[0, 4, 0]}
        color="#8b4cff"
        intensity={5}
        distance={50}
        decay={2}
      />

      <DNAHelix position={[-28, 14, -18]} scale={1.1} />

      <Atom position={[28, 12, -10]} scale={1.2} color="#4d7cff" />

      <NeuralNetwork position={[18, 11, 24]} />

      <MolecularCloud position={[-20, 10, 27]} />

      <HexagonalPlatform position={[-28, 0, -18]} />

      <HexagonalPlatform position={[28, 0, -10]} />

      <HexagonalPlatform position={[18, 0, 24]} />

      <HexagonalPlatform position={[-20, 0, 27]} />

      <FloatingParticles />

      {SCIENCE_ARTIFACTS.map((artifact) => (
        <Artifact
          key={artifact.id}
          artifact={artifact}
          showDefaultOrb={false}
          anchorPosition={artifact.position}
        />
      ))}

      <group position={[0, 0, -68]}>
        <mesh position={[0, 4, 0]}>
          <torusGeometry args={[8, 0.15, 16, 64]} />
          <meshBasicMaterial color="#4e63ff" transparent opacity={0.8} />
        </mesh>

        <pointLight
          position={[0, 5, 0]}
          color="#536cff"
          intensity={5}
          distance={15}
          decay={2}
        />
      </group>
    </group>
  );
}
