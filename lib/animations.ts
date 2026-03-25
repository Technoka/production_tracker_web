import type { Variants } from 'framer-motion';

// ── Easing ─────────────────────────────────────────────────────────────────
// Smooth deceleration — feels premium, not bouncy
export const ease = [0.22, 1, 0.36, 1] as const;

// ── Viewport config — trigger when 20% of element is visible ──────────────
export const viewport = { once: true, margin: '-60px' } as const;

// ── Variants ───────────────────────────────────────────────────────────────

/** Fade in and slide up — main entry animation for sections/cards */
export const fadeInUp: Variants = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
};

/** Fade in only — for backgrounds and overlays */
export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

/** Scale in from slightly smaller — for cards and modals */
export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease } },
};

/** Slide in from the right — for hero illustration */
export const slideInRight: Variants = {
  hidden:  { opacity: 0, x: 48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease } },
};

/** Stagger container — wraps list items that should animate one by one */
export const stagger: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

/** Stagger container with longer delay — for heavier sections */
export const staggerLong: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

/** Modal backdrop */
export const backdrop: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit:    { opacity: 0, transition: { duration: 0.2 } },
};

/** Modal panel */
export const modalPanel: Variants = {
  hidden:  { opacity: 0, scale: 0.94, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.35, ease } },
  exit:    { opacity: 0, scale: 0.96, y: 12, transition: { duration: 0.2 } },
};
