// app/page.tsx — redirects root / → /es
// The middleware handles this too, but this is a server-side fallback.
import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect('/es');
}
