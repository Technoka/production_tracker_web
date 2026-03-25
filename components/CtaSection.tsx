'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import ContactForm from './ContactForm';
import { fadeInUp, stagger, viewport } from '@/lib/animations';

export default function CtaSection() {
  const t = useTranslations();

  return (
    <section className="py-20 md:py-28 px-5" id="prueba-gratis">
      <div className="max-w-6xl mx-auto">
        <div className="
          relative overflow-hidden
          pulse-gradient rounded-3xl
          p-10 md:p-16 lg:p-20
        ">
          {/* ── Decorative blobs ────────────────────────────────────── */}
          <div aria-hidden="true" className="pointer-events-none">
            <div className="absolute -top-28 -right-28 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-28 -left-28 w-72 h-72 bg-black/10 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* ── Left: Copy ────────────────────────────────────────── */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="flex flex-col gap-5"
            >
              {/* Badge */}
              <motion.div variants={fadeInUp}>
                <span className="
                  inline-block
                  bg-white/20 text-white
                  text-label-md font-bold
                  px-4 py-1 rounded-full
                ">
                  🎁 {t('cta.badge')}
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h2
                variants={fadeInUp}
                className="text-4xl md:text-5xl xl:text-6xl font-black text-white tracking-tighter leading-tight"
              >
                {t('cta.title')}
              </motion.h2>

              {/* Subtext */}
              <motion.p
                variants={fadeInUp}
                className="text-body-lg text-red-100 max-w-sm"
              >
                {t('cta.desc')}
              </motion.p>

              {/* Mini checklist */}
              {/* <motion.ul variants={stagger} className="flex flex-col gap-2 mt-2">
                {[
                  'Sin tarjeta de crédito',
                  'Configuración en 15 minutos',
                  'Soporte incluido',
                ].map((item) => (
                  <motion.li
                    key={item}
                    variants={fadeInUp}
                    className="flex items-center gap-2 text-red-100"
                  >
                    <span className="material-symbols-outlined text-white/80 text-base">
                      check_circle
                    </span>
                    <span className="text-body-md">{item}</span>
                  </motion.li>
                ))}
              </motion.ul> */}
            </motion.div>

            {/* ── Right: Inline form ────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="
                bg-white/10 backdrop-blur-md
                rounded-2xl p-7 md:p-8
                border border-white/20
              "
            >
              <h3 className="text-title-md font-bold text-white mb-1">
                {t('form.title')}
              </h3>
              <p className="text-body-md text-red-100 mb-6">
                {t('form.desc')}
              </p>
              <ContactForm variant="dark" />
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
