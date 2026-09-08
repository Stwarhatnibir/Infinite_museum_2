"use client";

import { useMuseumStore } from "@/stores/museumStore";
import { useDiscoveryStore } from "@/stores/discoveryStore";

const HIDDEN_ROOM_REQUIREMENT = 3;

export default function HUD() {
  const currentRoom = useMuseumStore((state) => state.currentRoom);

  const discoveryCount = useDiscoveryStore(
    (state) => state.discoveredIds.length,
  );

  const hiddenRoomUnlocked = discoveryCount >= HIDDEN_ROOM_REQUIREMENT;

  return (
    <div className="pointer-events-none fixed inset-0 z-40 select-none">
      {/* Top Left */}
      <div className="absolute left-6 top-6 md:left-8 md:top-8">
        <div className="text-[8px] uppercase tracking-[3px] text-white/30">
          THE INFINITE MUSEUM
        </div>

        <div className="mt-2 text-[10px] uppercase tracking-[3px] text-white/60">
          {currentRoom}
        </div>
      </div>

      {/* Top Right */}
      <div className="absolute right-6 top-6 text-right md:right-8 md:top-8">
        <div className="text-[8px] uppercase tracking-[3px] text-white/30">
          DISCOVERIES
        </div>

        <div className="mt-1 flex items-baseline justify-end gap-2">
          <span className="text-xl font-light tracking-[2px] text-[#d4af37]">
            {String(discoveryCount).padStart(2, "0")}
          </span>

          <span className="text-[9px] tracking-[2px] text-white/30">/ 03</span>
        </div>

        <div className="mt-2 h-px w-24 bg-white/10">
          <div
            className="h-full bg-[#d4af37] transition-all duration-700"
            style={{
              width: `${Math.min(
                (discoveryCount / HIDDEN_ROOM_REQUIREMENT) * 100,
                100,
              )}%`,
            }}
          />
        </div>
      </div>

      {/* Bottom Center */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:bottom-8">
        <div className="flex items-center gap-4 text-[8px] uppercase tracking-[2px] text-white/25">
          <span>W A S D</span>

          <span className="h-3 w-px bg-white/10" />

          <span>SHIFT · SPRINT</span>

          <span className="h-3 w-px bg-white/10" />

          <span>MOUSE · LOOK</span>
        </div>
      </div>

      {/* Hidden Room Status */}
      <div className="absolute bottom-6 right-6 text-right md:bottom-8 md:right-8">
        <div
          className={
            hiddenRoomUnlocked
              ? "text-[8px] uppercase tracking-[3px] text-[#d4af37]"
              : "text-[8px] uppercase tracking-[3px] text-white/20"
          }
        >
          {hiddenRoomUnlocked
            ? "HIDDEN ROOM · UNLOCKED"
            : "HIDDEN ROOM · LOCKED"}
        </div>

        {!hiddenRoomUnlocked && (
          <div className="mt-1 text-[7px] uppercase tracking-[2px] text-white/15">
            {discoveryCount} / 3 discoveries required
          </div>
        )}
      </div>
    </div>
  );
}
