"use client";

import { AnimatePresence, motion } from "framer-motion";

import { useEffect } from "react";

import { useDiscoveryStore } from "../../stores/discoveryStore";

export default function DiscoveryNotification() {
  const lastDiscovery = useDiscoveryStore((state) => state.lastDiscovery);

  const clearLastDiscovery = useDiscoveryStore(
    (state) => state.clearLastDiscovery,
  );

  useEffect(() => {
    if (!lastDiscovery) return;

    const timer = window.setTimeout(() => {
      clearLastDiscovery();
    }, 4500);

    return () => {
      window.clearTimeout(timer);
    };
  }, [lastDiscovery, clearLastDiscovery]);

  return (
    <AnimatePresence>
      {lastDiscovery && (
        <motion.div
          initial={{
            opacity: 0,
            y: -30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: -20,
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
          className="pointer-events-none fixed left-1/2 top-8 z-[120] -translate-x-1/2"
        >
          <div className="pointer-events-auto min-w-[320px] border border-[#d4af37]/40 bg-[#080808]/90 px-7 py-5 text-center shadow-[0_0_40px_rgba(212,175,55,0.12)] backdrop-blur-xl">
            <div className="text-[9px] uppercase tracking-[4px] text-[#d4af37]">
              NEW DISCOVERY
            </div>

            <div className="mt-2 text-lg font-light uppercase tracking-[2px] text-white">
              {lastDiscovery.name}
            </div>

            <div className="mt-2 text-[9px] uppercase tracking-[2px] text-white/40">
              {lastDiscovery.category}
            </div>

            <button
              type="button"
              onClick={clearLastDiscovery}
              className="mt-4 text-[8px] uppercase tracking-[2px] text-white/35 transition hover:text-[#d4af37]"
            >
              DISMISS
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
