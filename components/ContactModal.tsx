'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import ContactForm from './ContactForm';
import { useModal } from '@/context/ModalContext';
import { backdrop, modalPanel } from '@/lib/animations';

export default function ContactModal() {
  const t = useTranslations();
  const { isOpen, close } = useModal();

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, close]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Backdrop ─────────────────────────────────────────────────── */}
          <motion.div
            key="modal-backdrop"
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={close}
            className="fixed inset-0 z-50 bg-on-surface/40 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* ── Panel ────────────────────────────────────────────────────── */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              key="modal-panel"
              variants={modalPanel}
              initial="hidden"
              animate="visible"
              exit="exit"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              className="
                pointer-events-auto
                w-full max-w-md
                bg-surface-container-lowest rounded-2xl
                shadow-ambient p-8
                max-h-[90vh] overflow-y-auto
              "
            >
              {/* Close button */}
              <button
                onClick={close}
                aria-label="Cerrar"
                className="
                  absolute top-5 right-5
                  w-9 h-9 rounded-xl
                  flex items-center justify-center
                  text-on-surface-variant
                  hover:bg-surface-container-high
                  transition-colors duration-200
                "
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>

              {/* Header */}
              <div className="mb-6">
                <div className="w-10 h-10 rounded-xl pulse-gradient flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-white text-xl">rocket_launch</span>
                </div>
                <h2
                  id="modal-title"
                  className="text-title-lg font-bold text-on-surface mb-1"
                >
                  {t('form.title')}
                </h2>
                <p className="text-body-md text-on-surface-variant">
                  {t('form.desc')}
                </p>
              </div>

              {/* Form */}
              <ContactForm variant="light" onSuccess={close} />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
