'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useModal } from '@/context/ModalContext';
import PlaceholderMedia from './ui/PlaceholderMedia';
import Image from 'next/image';
import kanbanGif from '@/public/screenshots/kanban_web.png';
import {
  fadeInUp,
  slideInRight,
  stagger,
  viewport,
} from '@/lib/animations';

export default function Hero() {
  const t = useTranslations();
  const { open } = useModal();

  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 px-5 overflow-hidden">

      {/* ── Subtle background texture ──────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage: `radial-gradient(circle at 70% 20%, rgba(162,5,19,0.05) 0%, transparent 55%),
                            radial-gradient(circle at 10% 80%, rgba(162,5,19,0.04) 0%, transparent 45%)`,
        }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left: Copy ─────────────────────────────────────────────── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-7"
          >
            {/* Social proof badge
            <motion.div variants={fadeInUp}>
              <span className="section-label">
                <span className="material-symbols-outlined text-primary text-sm align-middle mr-1">
                  storefront
                </span>
                {t('hero.social_proof')}
              </span>
            </motion.div> */}

            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-6xl xl:text-7xl font-black tracking-tighter leading-[0.9] text-on-surface"
            >
              {t('hero.headline1')}{' '}
              {t('hero.headline2')}
              <br />
              <span className="text-primary italic">{t('hero.highlight')}</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeInUp}
              className="text-body-lg text-on-surface-variant max-w-lg"
            >
              {t('hero.subheadline')}
            </motion.p>

            {/* CTA */}
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={open}
                className="btn-primary px-8 py-4 text-lg flex items-center justify-center gap-2 shadow-primary"
              >
                <span className="material-symbols-outlined text-xl">rocket_launch</span>
                {t('hero.cta_primary')}
              </button>
            </motion.div>

            {/* Trust signals */}
            {/* <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center gap-x-6 gap-y-2 text-label-md text-on-surface-variant"
            >
              {[
                { icon: 'credit_card_off', text: 'Sin tarjeta de crédito' },
                { icon: 'lock',            text: 'Datos seguros' },
                { icon: 'cancel',          text: 'Cancela cuando quieras' },
              ].map(({ icon, text }) => (
                <span key={text} className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-base">{icon}</span>
                  {text}
                </span>
              ))}
            </motion.div> */}
          </motion.div>

          {/* ── Right: App screenshot ───────────────────────────────────── */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            viewport={viewport}
            className="relative"
          >
            {/* Main screenshot */}
<div className="rounded-xl overflow-hidden w-full">
  <Image src={kanbanGif} alt="Tablero Kanban de Production Tracker" className="w-full h-auto" />
</div>


          </motion.div>

        </div>
      </div>
    </section>
  );
}
