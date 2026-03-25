'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { fadeInUp, stagger, viewport } from '@/lib/animations';

// Phase states
type PhaseStatus = 'done' | 'active' | 'pending';

interface Phase {
  name: string;
  status: PhaseStatus;
}

const STATUS_CONFIG: Record<PhaseStatus, {
  icon: string;
  bg: string;
  iconColor: string;
  label: string;
}> = {
  done:    { icon: 'task_alt',  bg: 'bg-primary-fixed',            iconColor: 'text-primary',          label: 'Completado' },
  active:  { icon: 'sync',      bg: 'bg-[#e3f2fd]',                iconColor: 'text-[#1565c0]',        label: 'En curso'   },
  pending: { icon: 'pending',   bg: 'bg-surface-container-highest', iconColor: 'text-on-surface-variant', label: 'Pendiente'  },
};

export default function ProgressDemo() {
  const t = useTranslations();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const phaseNames = [0, 1, 2, 3].map((i) => t(`progress.phases.${i}`));

  // Start with 0 done so we can animate in when section enters view
  const [progress, setProgress] = useState(0);
  const [activePhase, setActivePhase] = useState(2); // index of "in-progress" phase

  // Animate progress bar to 75% when in view
  useEffect(() => {
    if (!isInView) return;
    const timeout = setTimeout(() => setProgress(75), 400);
    return () => clearTimeout(timeout);
  }, [isInView]);

  // Allow clicking phases to demo interactivity
  const handlePhaseClick = (idx: number) => {
    setActivePhase(idx);
    const pct = Math.round(((idx) / (phaseNames.length - 1)) * 100);
    setProgress(pct);
  };

  const getStatus = (idx: number): PhaseStatus => {
    if (idx < activePhase)  return 'done';
    if (idx === activePhase) return 'active';
    return 'pending';
  };

  const phases: Phase[] = phaseNames.map((name, idx) => ({
    name,
    status: getStatus(idx),
  }));

  return (
    <section className="py-20 md:py-28 px-5 bg-surface" ref={ref}>
      <div className="max-w-4xl mx-auto">

        {/* ── Header ──────────────────────────────────────────────────── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="text-center mb-12"
        >
          <motion.div variants={fadeInUp}>
            <span className="section-label">{t('progress.label')}</span>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="mt-4 text-4xl md:text-5xl font-black tracking-tighter text-on-surface whitespace-pre-line"
          >
            {t('progress.title')}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mt-4 text-body-md text-on-surface-variant"
          >
            {t('progress.desc')}
          </motion.p>
        </motion.div>

        {/* ── Demo card ───────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="bg-surface-container-lowest rounded-2xl p-8 md:p-10 shadow-ambient"
        >
          {/* Order header */}
          <div className="flex flex-wrap justify-between items-end gap-3 mb-5">
            <div>
              <p className="text-label-md text-on-surface-variant mb-0.5">
                {t('progress.order_label')}
              </p>
              <p className="text-title-md font-bold text-on-surface">#4029 — Mesa de roble</p>
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={progress}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-title-md font-black text-primary"
              >
                {progress}% {t('progress.completed')}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* DESIGN.md: "Flow Bar" — thick, full roundness */}
          <div className="progress-flow mb-8">
            <motion.div
              className="progress-flow-fill"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          {/* Phase cards — clickable */}
          <p className="text-label-md text-on-surface-variant mb-4">
            Toca una fase para explorar:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {phases.map(({ name, status }, idx) => {
              const cfg = STATUS_CONFIG[status];
              return (
                <motion.button
                  key={name}
                  onClick={() => handlePhaseClick(idx)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className={`
                    ${cfg.bg} rounded-xl p-4
                    flex flex-col items-start gap-2 text-left
                    transition-all duration-200 cursor-pointer
                    ${activePhase === idx ? 'ring-2 ring-primary ring-offset-2' : ''}
                  `}
                >
                  <div className="flex items-center justify-between w-full">
                    <p className="text-xs text-on-surface-variant uppercase tracking-widest font-bold">
                      {name}
                    </p>
                  </div>
                  <motion.span
                    key={status}
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.25 }}
                    className={`material-symbols-outlined text-2xl ${cfg.iconColor} ${
                      status === 'active' ? 'animate-spin' : ''
                    }`}
                    style={status === 'active' ? { animationDuration: '2s' } : {}}
                  >
                    {cfg.icon}
                  </motion.span>
                  <span className={`text-xs font-semibold ${cfg.iconColor}`}>
                    {cfg.label}
                  </span>
                </motion.button>
              );
            })}
          </div>

        </motion.div>

      </div>
    </section>
  );
}
