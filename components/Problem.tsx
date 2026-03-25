'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { fadeInUp, stagger, staggerLong, viewport } from '@/lib/animations';

const ICONS = ['border_color', 'description', 'query_stats'];
const EMOJI_BG = ['bg-[#fff3cd]', 'bg-[#fce4ec]', 'bg-primary-fixed'];

export default function Problem() {
  const t = useTranslations();

  const items = [0, 1, 2].map((i) => ({
    icon: ICONS[i],
    bg: EMOJI_BG[i],
    title: t(`problem.items.${i}.title`),
    desc:  t(`problem.items.${i}.desc`),
  }));

  return (
    <section className="py-20 md:py-28 px-5 bg-surface-container-low">
      <div className="max-w-7xl mx-auto">

        {/* ── Header ──────────────────────────────────────────────────── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="text-center mb-14"
        >
          <motion.div variants={fadeInUp}>
            <span className="section-label">{t('problem.label')}</span>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="mt-4 text-4xl md:text-5xl font-black tracking-tighter text-on-surface"
          >
            {t('problem.title')}
          </motion.h2>
        </motion.div>

        {/* ── Cards ──────────────────────────────────────────────────── */}
        <motion.div
          variants={staggerLong}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {items.map(({ icon, bg, title, desc }) => (
            <motion.div
              key={title}
              variants={fadeInUp}
              className="
                bg-surface-container-lowest rounded-xl p-8
                flex flex-col gap-5
                hover:-translate-y-1 transition-transform duration-300
              "
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl ${bg} flex items-center justify-center`}>
                <span className="material-symbols-outlined text-on-surface text-2xl">{icon}</span>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-2">
                <h3 className="text-title-md font-bold text-on-surface">{title}</h3>
                <p className="text-body-md text-on-surface-variant leading-relaxed">{desc}</p>
              </div>

              {/* Visual "before" indicator */}
              <div className="flex items-center gap-2 mt-auto">
                <span className="material-symbols-outlined text-secondary text-base">warning</span>
                <span className="text-label-md text-secondary font-semibold">Sin Production Tracker</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Transition arrow ───────────────────────────────────────── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-col items-center gap-2 mt-12 text-on-surface-variant"
        >
          <span className="text-label-md">La solución</span>
          <span className="material-symbols-outlined text-primary text-3xl">
            arrow_downward
          </span>
        </motion.div>

      </div>
    </section>
  );
}
