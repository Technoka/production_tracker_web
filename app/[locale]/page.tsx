import Navbar      from '@/components/Navbar';
import Hero         from '@/components/Hero';
import Problem      from '@/components/Problem';
import Features     from '@/components/Features';
import AppGallery   from '@/components/AppGallery';
import ProgressDemo from '@/components/ProgressDemo';
import SocialProof  from '@/components/SocialProof';
import CtaSection   from '@/components/CtaSection';
import Footer       from '@/components/Footer';
import ContactModal from '@/components/ContactModal';

export default function LandingPage() {
  return (
    <>
      {/* ── Sticky nav (fixed, above everything) ───────────────────── */}
      <Navbar />

      {/* ── Contact modal (renders in portal via AnimatePresence) ───── */}
      <ContactModal />

      {/* ── Page content ────────────────────────────────────────────── */}
      <main>
        {/* 1. Hero — "De la pizarra al digital" */}
        <Hero />

        {/* 2. Problem — 3 pain points */}
        <Problem />

        {/* 3. Features — 3 feature cards */}
        <Features />

        {/* 4. App Gallery — asymmetric screenshot grid */}
        <AppGallery />

        {/* 5. Progress Demo — interactive kanban demo */}
        <ProgressDemo />

        {/* 6. Social Proof — stats + testimonials */}
        <SocialProof />

        {/* 7. CTA final — red gradient + inline form */}
        <CtaSection />
      </main>

      {/* ── Footer ──────────────────────────────────────────────────── */}
      <Footer />
    </>
  );
}
