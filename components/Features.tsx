'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { fadeInUp, stagger, staggerLong, viewport } from '@/lib/animations';

const featureImages = [
  '/screenshots/kanban.jpeg',
  '/screenshots/creacion_rapida.jpeg',
];

export default function Features() {
  const t = useTranslations();

  const items = [0, 1].map((i) => ({
    icon:  t(`features.items.${i}.icon`),
    title: t(`features.items.${i}.title`),
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
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto"
        >
          {items.map(({ icon, title }, idx) => (
            <motion.div
              key={title}
              variants={fadeInUp}
              className="
                group
                bg-surface-container-lowest rounded-xl overflow-hidden
                flex flex-col
                hover:-translate-y-1.5 transition-all duration-300
                hover:shadow-ambient
              "
            >
              {/* Screenshot image */}
              <div className="relative w-full h-96 bg-surface-container overflow-hidden">
                <Image
                  src={featureImages[idx]}
                  alt={title}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col gap-6">
                {/* Icon circle */}
                {/* <div className="
                  w-14 h-14 rounded-xl bg-primary-fixed
                  flex items-center justify-center
                  group-hover:scale-110 transition-transform duration-300
                ">
                  <span className="material-symbols-outlined text-primary text-2xl">
                    {icon}
                  </span>
                </div> */}

                <h3 className="text-title-md font-bold text-on-surface">{title}</h3>

                {/* Step number */}
                <div className="mt-auto flex items-center gap-2">
                  {/* <span className="
                    w-6 h-6 rounded-full bg-surface-container-high
                    flex items-center justify-center
                    text-xs font-black text-on-surface-variant
                  ">
                    {idx + 1}
                  </span> */}
                  <span className="text-label-md text-on-surface-variant">
                    {idx === 0 ? 'Claro y directo' : 'Aprende a usarlo en 5 minutos'}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
