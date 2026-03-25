import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { ModalProvider } from '@/context/ModalContext';
import type { Metadata } from 'next';

// ── Locale-aware metadata ─────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const isEs = locale === 'es';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://productiontracker.vercel.app';

  return {
    title: isEs
      ? 'Production Tracker — Gestión de producción para talleres'
      : 'Production Tracker — Workshop production management',
    description: isEs
      ? 'Sustituye tu pizarra por un tablero digital visual. Prueba gratis sin compromiso.'
      : 'Replace your whiteboard with a visual digital board. Free trial now.',
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: {
        es: `${siteUrl}/es`,
        en: `${siteUrl}/en`,
      },
    },
    openGraph: {
      locale: isEs ? 'es_ES' : 'en_US',
      alternateLocale: isEs ? 'en_US' : 'es_ES',
    },
  };
}

// ── Generate static params for both locales ───────────────────────────────────
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// ── Layout ────────────────────────────────────────────────────────────────────
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale — returns 404 for unknown locales
  if (!routing.locales.includes(locale as 'es' | 'en')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ModalProvider>
        {children}
      </ModalProvider>
    </NextIntlClientProvider>
  );
}
