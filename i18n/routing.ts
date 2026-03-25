import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['es', 'en'] as const,
  defaultLocale: 'es',
  // /es y /en son las rutas explícitas, / redirige a /es por defecto
  localePrefix: 'always',
});

export type Locale = (typeof routing.locales)[number];
