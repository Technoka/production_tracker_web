'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { scaleIn } from '@/lib/animations';

// ── Validation schema ────────────────────────────────────────────────────────
function buildSchema(t: ReturnType<typeof useTranslations>) {
  return z.object({
    name: z
      .string()
      .min(2, t('form.name_min'))
      .max(100),
    company: z
      .string()
      .min(2, t('form.company_min'))
      .max(100),
    phone: z
      .string()
      .min(6, t('form.phone_invalid'))
      .max(25)
      .regex(/^[+\d\s\-().]+$/, t('form.phone_invalid')),
    email: z
      .string()
      .email(t('form.email_invalid'))
      .optional()
      .or(z.literal('')),
  });
}

type FormData = {
  name: string;
  company: string;
  phone: string;
  email?: string;
};

interface ContactFormProps {
  /** Callback after a successful submission (e.g. close the modal) */
  onSuccess?: () => void;
  /** Visual variant: 'light' for modal, 'dark' for CTA section on red bg */
  variant?: 'light' | 'dark';
}

export default function ContactForm({
  onSuccess,
  variant = 'light',
}: ContactFormProps) {
  const t = useTranslations();
  const schema = buildSchema(t);

  const [serverError, setServerError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setServerError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('server_error');
      setSubmitted(true);
    } catch {
      setServerError(t('form.error_message'));
    }
  };

  const isDark = variant === 'dark';

  // ── Styles scoped to variant ─────────────────────────────────────────────
  const labelCls = isDark
    ? 'text-white/80 text-label-md font-medium mb-1'
    : 'text-on-surface-variant text-label-md font-medium mb-1';

  const inputCls = isDark
    ? `w-full bg-white/10 text-white placeholder:text-white/40 rounded-md px-4 py-3
       text-body-md outline-none border border-white/20 focus:border-white/60
       transition-all duration-200`
    : 'input-filled';

  const errorCls = 'text-xs mt-1 ' + (isDark ? 'text-red-200' : 'text-primary');

  // ── Success state ────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <motion.div
        variants={scaleIn}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center text-center gap-4 py-4"
      >
        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${isDark ? 'bg-white/20' : 'bg-primary-fixed'}`}>
          <span className={`material-symbols-outlined text-3xl ${isDark ? 'text-white' : 'text-primary'}`}>
            check_circle
          </span>
        </div>
        <div>
          <h3 className={`text-title-md font-bold mb-2 ${isDark ? 'text-white' : 'text-on-surface'}`}>
            {t('form.success_title')}
          </h3>
          <p className={isDark ? 'text-white/80 text-body-md' : 'text-on-surface-variant text-body-md'}>
            {t('form.success_desc')}
          </p>
        </div>
        {onSuccess && (
          <button
            onClick={onSuccess}
            className={`mt-2 font-semibold text-body-md underline underline-offset-4 ${isDark ? 'text-white/70 hover:text-white' : 'text-on-surface-variant hover:text-on-surface'} transition-colors`}
          >
            {t('form.success_cta')}
          </button>
        )}
      </motion.div>
    );
  }

  // ── Form ─────────────────────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">

      {/* Name */}
      <div>
        <label className={`block ${labelCls}`}>
          {t('form.name_label')} <span className="text-primary">*</span>
        </label>
        <input
          {...register('name')}
          type="text"
          placeholder={t('form.name_placeholder')}
          autoComplete="name"
          className={inputCls}
        />
        {errors.name && <p className={errorCls}>{errors.name.message}</p>}
      </div>

      {/* Company */}
      <div>
        <label className={`block ${labelCls}`}>
          {t('form.company_label')} <span className="text-primary">*</span>
        </label>
        <input
          {...register('company')}
          type="text"
          placeholder={t('form.company_placeholder')}
          autoComplete="organization"
          className={inputCls}
        />
        {errors.company && <p className={errorCls}>{errors.company.message}</p>}
      </div>

      {/* Phone */}
      <div>
        <label className={`block ${labelCls}`}>
          {t('form.phone_label')} <span className="text-primary">*</span>
        </label>
        <input
          {...register('phone')}
          type="tel"
          placeholder={t('form.phone_placeholder')}
          autoComplete="tel"
          className={inputCls}
        />
        {errors.phone && <p className={errorCls}>{errors.phone.message}</p>}
      </div>

      {/* Email (optional) */}
      <div>
        <label className={`block ${labelCls}`}>
          {t('form.email_label')}{' '}
          <span className={isDark ? 'text-white/50' : 'text-on-surface-variant/70'}>
            {t('form.email_optional')}
          </span>
        </label>
        <input
          {...register('email')}
          type="email"
          placeholder={t('form.email_placeholder')}
          autoComplete="email"
          className={inputCls}
        />
        {errors.email && <p className={errorCls}>{errors.email.message}</p>}
      </div>

      {/* Server error */}
      <AnimatePresence>
        {serverError && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`text-sm ${isDark ? 'text-red-200' : 'text-primary'}`}
          >
            {serverError}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`
          w-full py-4 rounded-md font-bold text-body-md
          transition-all duration-200 active:scale-[0.98]
          disabled:opacity-60 disabled:cursor-not-allowed
          ${isDark
            ? 'bg-white text-primary hover:bg-white/90'
            : 'pulse-gradient text-white hover:shadow-primary'
          }
        `}
      >
        {isSubmitting ? t('form.submitting') : t('form.submit')}
      </button>

    </form>
  );
}
