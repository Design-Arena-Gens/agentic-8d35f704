"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState, useEffect } from "react";
import { ExpressionStep } from "./components/ExpressionStep";
import styles from "./page.module.css";

const STEPS = [
  {
    headline: "Convert to sine & cosine",
    detail:
      "पहले cosec A और cot A को sin और cos में लिखते हैं ताकि identities के साथ काम करना आसान हो जाए।",
    math: "cosec A = 1 / sin A,\n cot A = cos A / sin A"
  },
  {
    headline: "हर पद को एक साथ लाएं",
    detail:
      "Expression को sin A denominator में लिखने पर cosec A - cot A = (1 - cos A) / sin A बन जाता है।",
    math: "cosec A - cot A = (1 - cos A) / sin A"
  },
  {
    headline: "पूरे expression को सरल करें",
    detail:
      "अब (1 - cos A) को identity (1 - cos^2 A) = sin^2 A के साथ गुणा करते हैं।",
    math: "(1 - cos A)(1 + cos A) = 1 - cos^2 A = sin^2 A"
  },
  {
    headline: "Final Answer",
    detail: "सब कुछ मिलाकर expression केवल sin A रह जाता है — यही Option (D) है।",
    math: "(cosec A - cot A)(1 + cos A) = sin A"
  }
];

export default function Page() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const cycle = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % STEPS.length);
    }, 3600);
    return () => clearInterval(cycle);
  }, []);

  const activeMath = useMemo(() => STEPS[activeIndex].math, [activeIndex]);

  return (
    <main className={styles.scene}>
      <div className={styles.backdrop}>
        <div className={styles.grid} aria-hidden />
        <motion.div
          className={styles.orb}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.08, 0.95, 1]
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <section className={styles.panel}>
        <header className={styles.header}>
          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Motion Visual: Identity Reveal
          </motion.h1>
          <motion.p
            className={styles.tagline}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            "भाई" expression को स्टेप-बाय-स्टेप देखें और महसूस करें कि कैसे {("cosec A - cot A")} अंततः सिर्फ sin A बन जाता
            है।
          </motion.p>
        </header>

        <div className={styles.visualBoard}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMath}
              className={styles.formulaCard}
              initial={{ opacity: 0, y: 30, rotateX: -25 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, y: -40, rotateX: 25 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <motion.span
                className={styles.label}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                Live transformation
              </motion.span>
              <div className={styles.formula}>
                {activeMath.split("\n").map((line) => (
                  <motion.span
                    key={line}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                  >
                    {line}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <ul className={styles.timeline}>
          {STEPS.map((step, idx) => (
            <ExpressionStep
              key={step.headline}
              index={idx + 1}
              headline={step.headline}
              detail={step.detail}
              math={step.math}
              active={idx === activeIndex}
              delay={idx * 0.1}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}
