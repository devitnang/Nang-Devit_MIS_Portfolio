"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export interface ParallaxProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  speed?: number; // positive = moves up faster/opposite to scroll, negative = moves slower
  className?: string;
}

/**
 * Parallax wrapper that translates its content smoothly along the Y-axis as the user scrolls.
 * Respects `prefers-reduced-motion` and provides buttery-smooth 60-120fps GPU transitions.
 */
export function Parallax({
  children,
  speed = 0.15,
  className,
  style,
  ...props
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Calculate distance based on speed: when speed=0.15, translates smoothly between -45px and 45px
  const range = speed * 150;
  const y = useTransform(scrollYProgress, [0, 1], [-range, range]);

  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={className} style={style} {...props}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={cn("relative", className)} {...props}>
      <motion.div
        style={{
          y,
          willChange: "transform",
          ...style,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/**
 * Ambient Parallax Background Layer
 * Renders subtle multi-plane floating geometric orbs that drift gently with scroll depth.
 */
export function ParallaxBackground({
  className,
}: {
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [40, -40]);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden select-none", className)}
    >
      {/* Ambient Depth Sphere Top-Left */}
      <motion.div
        style={{ y: y1 }}
        className="absolute -top-16 -left-20 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-blue-500/5 dark:bg-blue-600/10 blur-3xl pointer-events-none"
      />

      {/* Ambient Depth Sphere Bottom-Right */}
      <motion.div
        style={{ y: y2 }}
        className="absolute top-1/3 -right-20 w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-[#0B2046]/5 dark:bg-indigo-600/10 blur-3xl pointer-events-none"
      />
    </div>
  );
}

export default Parallax;

