"use client";

import { Html } from "@react-three/drei";
import { ArtifactData } from "../../../stores/museumStore";

interface ArtifactLabelProps {
  artifact: ArtifactData;
  distance: number;
  visible: boolean;
  hovered: boolean;
  position?: [number, number, number];
}

export default function ArtifactLabel({
  artifact,
  distance,
  visible,
  hovered,
  position = [0, 2.8, 0],
}: ArtifactLabelProps) {
  if (!visible) return null;

  return (
    <Html
      position={position}
      center
      distanceFactor={10}
      style={{
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          minWidth: "190px",
          padding: "12px 16px",

          border: hovered
            ? "1px solid rgba(255, 215, 0, 0.9)"
            : "1px solid rgba(255, 255, 255, 0.15)",

          background: hovered ? "rgba(15, 12, 5, 0.94)" : "rgba(5, 5, 8, 0.82)",

          backdropFilter: "blur(12px)",

          color: "white",

          fontFamily: "Arial, sans-serif",

          opacity: hovered ? 1 : 0.8,

          transform: hovered ? "scale(1.05)" : "scale(1)",

          transition: "all 180ms ease",

          boxShadow: hovered ? "0 0 25px rgba(255, 215, 0, 0.18)" : "none",

          whiteSpace: "nowrap",

          userSelect: "none",
        }}
      >
        <div
          style={{
            fontSize: "13px",
            letterSpacing: "2px",
            fontWeight: 600,
            marginBottom: "5px",
          }}
        >
          {artifact.name}
        </div>

        <div
          style={{
            fontSize: "10px",
            color: "#d4af37",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
          }}
        >
          {artifact.category}
        </div>

        <div
          style={{
            marginTop: "6px",
            fontSize: "10px",
            color: "rgba(255,255,255,0.55)",
          }}
        >
          {distance.toFixed(1)}m
        </div>

        {hovered && (
          <div
            style={{
              marginTop: "8px",
              paddingTop: "7px",

              borderTop: "1px solid rgba(255,255,255,0.1)",

              fontSize: "9px",
              letterSpacing: "1px",

              color: "rgba(255,255,255,0.7)",
            }}
          >
            CLICK TO EXPLORE
          </div>
        )}
      </div>
    </Html>
  );
}
