import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  title: 'Production Tracker — Gestión de producción para talleres',
  description:
    'Sustituye tu pizarra por un tablero digital visual. Controla el estado de cada pieza, lote y pedido en tiempo real. Prueba gratis.',
  keywords: [
    'gestión de producción',
    'taller',
    'kanban',
    'producción digital',
    'small workshop management',
    'production tracking',
  ],
  icons: {
    icon: '/screenshots/app_icon.png',
    apple: '/screenshots/app_icon.png',
  },
  openGraph: {
    title: 'Production Tracker',
    description: 'De la pizarra a tu móvil. Sin complicaciones.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        {/* Preconnect to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {children}

        {/* Google Analytics — loaded after interaction to not block LCP */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { page_path: window.location.pathname });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
