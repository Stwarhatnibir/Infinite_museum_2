import { create } from "zustand";

export interface ArtifactData {
  id: string;
  name: string;
  category: string;
  room: string;
  description: string;
  longDescription: string;
  rarity: "common" | "rare" | "legendary";
  position: [number, number, number];
  scale: number;
  glowIntensity: number;
}

interface MuseumState {
  currentRoom: string;

  selectedArtifact: ArtifactData | null;

  isArtifactInfoOpen: boolean;

  isMapOpen: boolean;

  isImmersiveModeOpen: boolean;

  setCurrentRoom: (room: string) => void;

  setSelectedArtifact: (artifact: ArtifactData | null) => void;

  openArtifactInfo: (artifact: ArtifactData) => void;

  closeArtifactInfo: () => void;

  setIsMapOpen: (open: boolean) => void;

  setIsImmersiveModeOpen: (open: boolean) => void;
}

export const useMuseumStore = create<MuseumState>((set) => ({
  currentRoom: "central",

  selectedArtifact: null,

  isArtifactInfoOpen: false,

  isMapOpen: false,

  isImmersiveModeOpen: false,

  setCurrentRoom: (room) =>
    set({
      currentRoom: room,
    }),

  setSelectedArtifact: (artifact) =>
    set({
      selectedArtifact: artifact,
    }),

  openArtifactInfo: (artifact) =>
    set({
      selectedArtifact: artifact,
      isArtifactInfoOpen: true,
    }),

  closeArtifactInfo: () =>
    set({
      selectedArtifact: null,
      isArtifactInfoOpen: false,
    }),

  setIsMapOpen: (open) =>
    set({
      isMapOpen: open,
    }),

  setIsImmersiveModeOpen: (open) =>
    set({
      isImmersiveModeOpen: open,
    }),
}));
