'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { fadeInUp, stagger, staggerLong, viewport } from '@/lib/animations';

export default function Features() {
  const t = useTranslations();

  const items = [0, 1, 2].map((i) => ({
    icon:  t(`features.items.${i}.icon`),
    title: t(`features.items.${i}.title`),
    desc:  t(`features.items.${i}.desc`),
  }));

  return (
    <section className="py-20 md:py-28 px-5 bg-surface">
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
            <span className="section-label">{t('features.label')}</span>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="mt-4 text-4xl md:text-5xl font-black tracking-tighter text-on-surface whitespace-pre-line"
          >
            {t('features.title')}
          </motion.h2>
        </motion.div>

        {/* ── Feature cards ──────────────────────────────────────────── */}
        <motion.div
          variants={staggerLong}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {items.map(({ icon, title, desc }, idx) => (
            <motion.div
              key={title}
              variants={fadeInUp}
              className="
                group
                bg-surface-container-lowest rounded-xl p-8
                flex flex-col gap-6
                hover:-translate-y-1.5 transition-all duration-300
                hover:shadow-ambient
              "
            >
              {/* Icon circle */}
              <div className="
                w-14 h-14 rounded-xl bg-primary-fixed
                flex items-center justify-center
                group-hover:scale-110 transition-transform duration-300
              ">
                <span className="material-symbols-outlined text-primary text-2xl">
                  {icon}
                </span>
              </div>

              {/* Content */}
              <div>
                <h3 className="text-title-md font-bold text-on-surface mb-2">{title}</h3>
                <p className="text-body-md text-on-surface-variant leading-relaxed">{desc}</p>
              </div>

              {/* Step number */}
              <div className="mt-auto flex items-center gap-2">
                <span className="
                  w-6 h-6 rounded-full bg-surface-container-high
                  flex items-center justify-center
                  text-xs font-black text-on-surface-variant
                ">
                  {idx + 1}
                </span>
                <span className="text-label-md text-on-surface-variant">
                  {idx === 0 ? 'Visual' : idx === 1 ? 'Simple' : 'Automático'}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
