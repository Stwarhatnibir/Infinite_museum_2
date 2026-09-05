"use client";

import { useEffect } from "react";

import { useMuseumStore } from "../../stores/museumStore";

import { useDiscoveryStore } from "../../stores/discoveryStore";

export default function ArtifactInfo() {
  const selectedArtifact = useMuseumStore((state) => state.selectedArtifact);

  const isOpen = useMuseumStore((state) => state.isArtifactInfoOpen);

  const closeArtifactInfo = useMuseumStore((state) => state.closeArtifactInfo);

  const hasDiscovered = useDiscoveryStore((state) =>
    selectedArtifact
      ? state.discoveredIds.includes(selectedArtifact.id)
      : false,
  );

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeArtifactInfo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeArtifactInfo]);

  if (!isOpen || !selectedArtifact) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={closeArtifactInfo}
    >
      <div
        className="relative w-[min(600px,90vw)] overflow-hidden border border-white/10 bg-[#080808]/95 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="h-[2px] w-full bg-[#d4af37]" />

        <button
          type="button"
          onClick={closeArtifactInfo}
          className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center border border-white/10 text-white/60 transition hover:border-[#d4af37]/50 hover:text-[#d4af37]"
          aria-label="Close artifact information"
        >
          ×
        </button>

        <div className="p-8 md:p-10">
          <div className="mb-3 flex items-center gap-3">
            <div className="text-[10px] font-medium uppercase tracking-[4px] text-[#d4af37]">
              {selectedArtifact.category}
            </div>

            {hasDiscovered && (
              <div className="border border-[#d4af37]/40 px-2 py-1 text-[8px] uppercase tracking-[2px] text-[#d4af37]">
                DISCOVERED
              </div>
            )}
          </div>

          <h2 className="pr-12 text-3xl font-light uppercase tracking-[3px] text-white md:text-4xl">
            {selectedArtifact.name}
          </h2>

          <div className="mt-4 flex gap-5 text-[10px] uppercase tracking-[2px] text-white/40">
            <span>ROOM · {selectedArtifact.room}</span>

            <span>RARITY · {selectedArtifact.rarity}</span>
          </div>

          <div className="my-7 h-px bg-white/10" />

          <p className="text-sm leading-7 text-white/65">
            {selectedArtifact.description}
          </p>

          <p className="mt-5 text-sm leading-7 text-white/45">
            {selectedArtifact.longDescription}
          </p>

          <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
            <span className="text-[9px] uppercase tracking-[2px] text-white/30">
              THE INFINITE MUSEUM
            </span>

            <button
              type="button"
              onClick={closeArtifactInfo}
              className="border border-[#d4af37]/40 px-5 py-3 text-[9px] uppercase tracking-[2px] text-[#d4af37] transition hover:bg-[#d4af37] hover:text-black"
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
