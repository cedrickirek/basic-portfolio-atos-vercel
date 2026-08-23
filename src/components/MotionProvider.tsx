"use client";

import { LayoutGroup } from "motion/react";
import type { ReactNode } from "react";

/**
 * Wraps the app so the "projects-title" layoutId is tracked across routes,
 * letting the landing CTA morph into the /projects heading.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <LayoutGroup>{children}</LayoutGroup>;
}
