"use client";

import { motion } from "framer-motion";
import { clsx } from "clsx";
import styles from "./ExpressionStep.module.css";

type ExpressionStepProps = {
  index: number;
  headline: string;
  detail: string;
  math: string;
  active: boolean;
  delay: number;
};

const variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" }
};

export function ExpressionStep({ index, headline, detail, math, active, delay }: ExpressionStepProps) {
  return (
    <motion.li
      className={clsx(styles.step, active && styles.active)}
      initial="hidden"
      animate={active ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: 0.7, delay }}
    >
      <div className={styles.stepNumber}>Step {index}</div>
      <motion.h3 layout className={styles.headline}>
        {headline}
      </motion.h3>
      <motion.p layout className={styles.detail}>
        {detail}
      </motion.p>
      <motion.code layout className={styles.math}>
        {math}
      </motion.code>
    </motion.li>
  );
}
