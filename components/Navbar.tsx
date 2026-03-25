'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useModal } from '@/context/ModalContext';

export default function Navbar() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { open } = useModal();

  const [scrolled, setScrolled] = useState(false);

  // Add shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const switchLocale = (next: string) => {
    // Swap locale prefix in pathname
    // e.g. /es/... → /en/...
    const newPath = pathname.replace(`/${locale}`, `/${next}`);
    router.push(newPath || `/${next}`);
  };

  return (
    <motion.nav
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`
        fixed top-0 left-0 right-0 z-40
        glass-nav
        transition-shadow duration-300
        ${scrolled ? 'shadow-ambient' : ''}
      `}
    >
      <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between gap-4">

        {/* ── Logo ───────────────────────────────────────────────────────── */}
        <a
          href={`/${locale}`}
          className="flex items-center gap-2 flex-shrink-0"
          aria-label="Production Tracker — Home"
        >
          {/* Brand mark */}
          <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src="/screenshots/app_icon.png"
              alt="Production Tracker"
              width={32}
              height={32}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-black text-base tracking-tight text-on-surface hidden sm:block">
            Production<span className="text-primary"> Tracker</span>
          </span>
        </a>

        {/* ── Right side ─────────────────────────────────────────────────── */}
        <div className="flex items-center gap-3">

          {/* Language switcher */}
          <div
            className="
              flex items-center
              bg-surface-container-high rounded-full
              p-0.5 text-label-md font-semibold
            "
            aria-label="Cambiar idioma"
          >
            {(['es', 'en'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => switchLocale(lang)}
                className={`
                  px-3 py-1 rounded-full uppercase text-xs font-bold
                  transition-all duration-200
                  ${locale === lang
                    ? 'bg-surface-container-lowest text-on-surface shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                  }
                `}
                aria-current={locale === lang ? 'true' : undefined}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={open}
            className="
              btn-primary
              px-5 py-2.5 text-label-md
              hidden sm:flex items-center gap-1.5
            "
          >
            <span className="material-symbols-outlined text-base">rocket_launch</span>
            {t('nav.cta')}
          </button>

          {/* Mobile CTA (icon only) */}
          <button
            onClick={open}
            aria-label={t('nav.cta')}
            className="sm:hidden btn-primary w-9 h-9 flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-base">rocket_launch</span>
          </button>

        </div>
      </div>
    </motion.nav>
  );
}
