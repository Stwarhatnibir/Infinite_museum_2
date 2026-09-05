"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { ArtifactData } from "./museumStore";

interface DiscoveryState {
  discoveredIds: string[];
  lastDiscovery: ArtifactData | null;

  discoverArtifact: (artifact: ArtifactData) => boolean;
  clearLastDiscovery: () => void;
  hasDiscovered: (artifactId: string) => boolean;
  getDiscoveryCount: () => number;
  resetDiscoveries: () => void;
}

export const useDiscoveryStore = create<DiscoveryState>()(
  persist(
    (set, get) => ({
      discoveredIds: [],
      lastDiscovery: null,

      discoverArtifact: (artifact) => {
        const alreadyDiscovered = get().discoveredIds.includes(artifact.id);

        if (alreadyDiscovered) {
          return false;
        }

        set((state) => ({
          discoveredIds: [...state.discoveredIds, artifact.id],
          lastDiscovery: artifact,
        }));

        return true;
      },

      clearLastDiscovery: () => {
        set({
          lastDiscovery: null,
        });
      },

      hasDiscovered: (artifactId) => {
        return get().discoveredIds.includes(artifactId);
      },

      getDiscoveryCount: () => {
        return get().discoveredIds.length;
      },

      resetDiscoveries: () => {
        set({
          discoveredIds: [],
          lastDiscovery: null,
        });
      },
    }),
    {
      name: "infinite-museum-discoveries",

      storage: createJSONStorage(() => sessionStorage),

      partialize: (state) => ({
        discoveredIds: state.discoveredIds,
      }),
    },
  ),
);
