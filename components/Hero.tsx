'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useModal } from '@/context/ModalContext';
import PlaceholderMedia from './ui/PlaceholderMedia';
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
            {/* Social proof badge */}
            <motion.div variants={fadeInUp}>
              <span className="section-label">
                <span className="material-symbols-outlined text-primary text-sm align-middle mr-1">
                  storefront
                </span>
                {t('hero.social_proof')}
              </span>
            </motion.div>

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
            <motion.div
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
            </motion.div>
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
            <div className="relative rounded-2xl overflow-hidden shadow-ambient">
              <PlaceholderMedia
                label="Tablero Kanban principal — reemplazar con GIF real"
                aspectRatio="video"
              />
            </div>

            {/* Floating mini card — top left */}
            <motion.div
              initial={{ opacity: 0, x: -16, y: 8 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="
                absolute -left-4 top-8
                bg-surface-container-lowest rounded-xl
                px-4 py-3 shadow-ambient
                flex items-center gap-3
                hidden md:flex
              "
            >
              <div className="w-9 h-9 rounded-xl bg-primary-fixed flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-primary text-lg">task_alt</span>
              </div>
              <div>
                <p className="text-xs font-bold text-on-surface">Lote #1042 listo</p>
                <p className="text-xs text-on-surface-variant">Hace 2 minutos</p>
              </div>
            </motion.div>

            {/* Floating mini card — bottom right */}
            <motion.div
              initial={{ opacity: 0, x: 16, y: 8 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.65, duration: 0.5 }}
              className="
                absolute -right-4 bottom-8
                bg-surface-container-lowest rounded-xl
                px-4 py-3 shadow-ambient
                hidden md:block
              "
            >
              <p className="text-xs text-on-surface-variant mb-1.5">Progreso hoy</p>
              <div className="flex items-center gap-2">
                <div className="progress-flow w-28">
                  <div className="progress-flow-fill" style={{ width: '72%' }} />
                </div>
                <span className="text-xs font-bold text-primary">72%</span>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
