import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Aplica el middleware a todas las rutas excepto archivos estáticos y API
  matcher: [
    '/',
    '/(es|en)/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)' ,
  ],
};
