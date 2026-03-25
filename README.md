# Production Tracker — Landing Page

Landing page de **Production Tracker** para talleres y pequeñas empresas de manufactura.  
Stack: Next.js 14 · Tailwind CSS · Framer Motion · next-intl · Resend

---

## Requisitos

- Node.js ≥ 18
- Cuenta en [Vercel](https://vercel.com) (deploy gratuito)
- Cuenta en [Resend](https://resend.com) (3,000 emails/mes gratis)
- (Opcional) Google Analytics 4 Measurement ID

---

## Setup local

```bash
# 1. Clonar el repo
git clone https://github.com/tu-usuario/production-tracker-landing.git
cd production-tracker-landing

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local
# Edita .env.local con tus valores reales

# 4. Arrancar en desarrollo
npm run dev
# → http://localhost:3000  (redirige a /es automáticamente)
```

---

## Variables de entorno (`.env.local`)

| Variable               | Descripción                                     | Ejemplo                        |
|------------------------|-------------------------------------------------|--------------------------------|
| `RESEND_API_KEY`       | API key de Resend                               | `re_xxxxxxxxxxxx`              |
| `RESEND_FROM_EMAIL`    | Email remitente verificado en Resend            | `noreply@tudominio.com`        |
| `CONTACT_EMAIL`        | Email donde recibes los leads                   | `tu@email.com`                 |
| `NEXT_PUBLIC_GA_ID`    | Google Analytics Measurement ID (opcional)      | `G-XXXXXXXXXX`                 |
| `NEXT_PUBLIC_SITE_URL` | URL de producción (para SEO/alternates)         | `https://productiontracker.app`|

### Resend en modo gratuito (sin dominio propio)
Mientras no tengas dominio verificado, usa `onboarding@resend.dev` como `RESEND_FROM_EMAIL`.  
Solo funciona enviando al email con el que te registraste en Resend.

---

## Deploy en Vercel (recomendado)

```bash
# Opción A: desde la CLI
npx vercel

# Opción B: conectar el repo en vercel.com → Import → configurar env vars
```

Vercel detecta Next.js automáticamente. No necesitas configuración adicional.  
Tu URL gratuita será: `https://production-tracker-landing.vercel.app`

---

## Añadir capturas y GIFs reales

Sustituye los componentes `<PlaceholderMedia>` por `<Image>` de Next.js:

```tsx
// Antes (placeholder):
<PlaceholderMedia label="Kanban principal" aspectRatio="video" />

// Después (con imagen real):
import Image from 'next/image';
import kanbanGif from '@/public/screenshots/kanban.gif';

<div className="rounded-xl overflow-hidden">
  <Image src={kanbanGif} alt="Tablero Kanban de Production Tracker" />
</div>
```

Coloca los archivos en `/public/screenshots/`.  
Para GIFs pesados (>2MB), considera subirlos a un bucket de Cloudflare R2 o similar.

---

## Estructura del proyecto

```
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx    ← next-intl + ModalProvider
│   │   └── page.tsx      ← ensamblado de secciones
│   ├── api/contact/
│   │   └── route.ts      ← form handler → Resend
│   ├── layout.tsx        ← root layout + GA
│   ├── page.tsx          ← redirect / → /es
│   └── globals.css
├── components/
│   ├── ui/
│   │   └── PlaceholderMedia.tsx
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Problem.tsx
│   ├── Features.tsx
│   ├── AppGallery.tsx
│   ├── ProgressDemo.tsx
│   ├── SocialProof.tsx
│   ├── CtaSection.tsx
│   ├── ContactForm.tsx   ← form compartido (modal + CTA)
│   ├── ContactModal.tsx
│   └── Footer.tsx
├── context/
│   └── ModalContext.tsx  ← estado global del modal
├── i18n/
│   ├── routing.ts        ← define locales es/en
│   └── request.ts        ← carga mensajes por locale
├── lib/
│   └── animations.ts     ← Framer Motion variants
├── messages/
│   ├── es.json           ← todos los textos en español
│   └── en.json           ← todos los textos en inglés
└── public/
    └── screenshots/      ← tus imágenes y GIFs
```

---

## Personalización rápida

### Textos
Edita `messages/es.json` y `messages/en.json`. No toques código — todo el copy está ahí.

### Colores
El archivo `tailwind.config.ts` contiene la paleta completa del DESIGN.md.  
El color principal `primary: '#a20513'` está en ese archivo.

### Formulario de destino
Cambia `CONTACT_EMAIL` en `.env.local` para que los leads lleguen a otro email.

---

## Checklist antes de publicar

- [ ] Reemplazar todos los `<PlaceholderMedia>` con capturas reales
- [ ] Configurar dominio propio en Vercel
- [ ] Verificar dominio de envío en Resend
- [ ] Actualizar `NEXT_PUBLIC_SITE_URL` en Vercel env vars
- [ ] Añadir GA4 Measurement ID
- [ ] Revisar textos de testimonials (son placeholder)
- [ ] Añadir favicon (`/public/favicon.ico`)
- [ ] Probar formulario en producción (Resend puede rechazar emails en `localhost`)
