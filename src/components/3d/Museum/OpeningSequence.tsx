"use client";

import { AnimatePresence, motion } from "framer-motion";

import { useEffect, useState } from "react";

export default function OpeningSequence() {
  const [visible, setVisible] = useState(true);

  const [canEnter, setCanEnter] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCanEnter(true);
    }, 3500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
          }}
          className="absolute inset-0 z-50 flex items-center justify-center bg-black text-white"
        >
          <div className="flex flex-col items-center text-center">
            {/* THE */}

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 1.2,
              }}
              className="text-sm tracking-[0.7em] text-white/50"
            >
              THE
            </motion.div>

            {/* INFINITE */}

            <motion.h1
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.8,
                duration: 1.4,
              }}
              className="mt-4 text-5xl font-light tracking-[0.25em] md:text-7xl"
            >
              INFINITE
            </motion.h1>

            {/* MUSEUM */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 1.7,
                duration: 1.4,
              }}
              className="mt-3 text-2xl font-light tracking-[0.45em] text-[#d6b56a] md:text-4xl"
            >
              MUSEUM
            </motion.div>

            {/* SUBTITLE */}

            <motion.p
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 2.5,
                duration: 1,
              }}
              className="mt-8 text-xs tracking-[0.5em] text-white/40"
            >
              ENTER THE UNKNOWN
            </motion.p>

            {/* ENTER BUTTON */}

            <motion.button
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: canEnter ? 1 : 0,
              }}
              transition={{
                duration: 1,
              }}
              disabled={!canEnter}
              onClick={() => {
                setVisible(false);
              }}
              className="mt-12 border border-[#d6b56a]/50 px-8 py-3 text-xs tracking-[0.4em] text-[#d6b56a] transition-all duration-500 hover:border-[#d6b56a] hover:bg-[#d6b56a]/10 disabled:cursor-not-allowed"
            >
              [ ENTER ]
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
