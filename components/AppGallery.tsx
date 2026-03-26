'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  fadeInUp,
  stagger,
  staggerLong,
  viewport,
} from '@/lib/animations';

export default function AppGallery() {
  const t = useTranslations();

  const checks = [0, 1, 2].map((i) => t(`gallery.checks.${i}`));

  return (
    <section className="py-20 md:py-28 px-5 overflow-hidden bg-surface-container-low">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Left: Asymmetric image grid ─────────────────────────── */}
          <motion.div
            variants={staggerLong}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="grid grid-cols-2 gap-3 order-2 lg:order-1 w-full lg:max-w-sm"
          >
            {/* Col 1 — offset downwards */}
            <div className="flex flex-col gap-4 pt-10">
              <motion.div variants={fadeInUp}>
                <div className="relative w-full aspect-[9/16] rounded-xl overflow-hidden shadow-md bg-surface-container">
                  <Image src="/screenshots/inicio.jpeg" alt="Inicio" fill className="object-contain" />
                </div>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <div className="relative w-full aspect-[9/16] rounded-xl overflow-hidden shadow-md bg-surface-container">
                  <Image src="/screenshots/kanban2.jpeg" alt="Kanban" fill className="object-contain" />
                </div>
              </motion.div>
            </div>

            {/* Col 2 */}
            <div className="flex flex-col gap-4">
              <motion.div variants={fadeInUp}>
                <div className="relative w-full aspect-[9/16] rounded-xl overflow-hidden shadow-md bg-surface-container">
                  <Image src="/screenshots/lotes.jpeg" alt="Lotes" fill className="object-contain" />
                </div>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <div className="relative w-full aspect-[9/16] rounded-xl overflow-hidden shadow-md bg-surface-container">
                  <Image src="/screenshots/clientes.jpeg" alt="Clientes" fill className="object-contain" />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* ── Right: Copy ─────────────────────────────────────────── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="order-1 lg:order-2 flex flex-col gap-6"
          >
            <motion.div variants={fadeInUp}>
              <span className="section-label">{t('gallery.label')}</span>
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-black tracking-tighter text-on-surface"
            >
              {t('gallery.title')}
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-body-lg text-on-surface-variant leading-relaxed"
            >
              {t('gallery.desc')}
            </motion.p>

            {/* Checklist */}
            <motion.ul
              variants={staggerLong}
              className="flex flex-col gap-3 mt-2"
            >
              {checks.map((item) => (
                <motion.li
                  key={item}
                  variants={fadeInUp}
                  className="flex items-start gap-3"
                >
                  <span className="
                    flex-shrink-0 w-6 h-6 rounded-full
                    bg-primary-fixed flex items-center justify-center mt-0.5
                  ">
                    <span className="material-symbols-outlined text-primary text-sm">
                      check
                    </span>
                  </span>
                  <span className="text-body-md font-medium text-on-surface">{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
