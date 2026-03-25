'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { fadeInUp, stagger, staggerLong, viewport } from '@/lib/animations';

export default function SocialProof() {
  const t = useTranslations();

  const stats = [
    { value: t('social_proof.stat1_value'), label: t('social_proof.stat1_label') },
    { value: t('social_proof.stat2_value'), label: t('social_proof.stat2_label') },
    { value: t('social_proof.stat3_value'), label: t('social_proof.stat3_label') },
  ];

  const testimonials = [0, 1].map((i) => ({
    text:    t(`social_proof.testimonials.${i}.text`),
    name:    t(`social_proof.testimonials.${i}.name`),
    company: t(`social_proof.testimonials.${i}.company`),
    role:    t(`social_proof.testimonials.${i}.role`),
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
            <span className="section-label">{t('social_proof.label')}</span>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="mt-4 text-4xl md:text-5xl font-black tracking-tighter text-on-surface whitespace-pre-line"
          >
            {t('social_proof.title')}
          </motion.h2>
        </motion.div>

        {/* ── Stats ───────────────────────────────────────────────────── */}
        <motion.div
          variants={staggerLong}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-3 gap-4 mb-14"
        >
          {stats.map(({ value, label }) => (
            <motion.div
              key={label}
              variants={fadeInUp}
              className="
                bg-surface-container-lowest rounded-xl
                p-6 md:p-8 text-center
                shadow-ambient
              "
            >
              <p className="text-display-md text-primary font-black mb-1">{value}</p>
              <p className="text-label-md text-on-surface-variant">{label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Testimonials ────────────────────────────────────────────── */}
        <motion.div
          variants={staggerLong}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {testimonials.map(({ text, name, company, role }) => (
            <motion.div
              key={name}
              variants={fadeInUp}
              className="
                bg-surface-container-lowest rounded-xl p-8
                flex flex-col gap-5
                hover:-translate-y-1 transition-transform duration-300
              "
            >
              {/* Quote mark */}
              <span
                aria-hidden="true"
                className="text-5xl font-black text-primary leading-none select-none"
              >
                "
              </span>

              {/* Quote text */}
              <p className="text-body-lg text-on-surface leading-relaxed -mt-3">
                {text}
              </p>

              {/* Stars */}
              <div className="flex gap-0.5" aria-label="5 estrellas">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined text-amber-400 text-base"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                ))}
              </div>

              {/* Attribution */}
              <div className="flex items-center gap-3 mt-auto">
                {/* Avatar initials */}
                <div className="
                  w-10 h-10 rounded-full
                  bg-primary-fixed flex items-center justify-center
                  text-primary font-bold text-sm flex-shrink-0
                ">
                  {name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <p className="text-label-md font-bold text-on-surface">{name}</p>
                  <p className="text-label-md text-on-surface-variant">{role} · {company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
