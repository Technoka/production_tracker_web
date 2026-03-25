import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations();

  return (
    <footer className="bg-surface-container-low border-t border-outline-variant/30 py-10 px-5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">

          {/* Brand */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg pulse-gradient flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-sm">view_kanban</span>
              </div>
              <span className="font-black text-base tracking-tight text-on-surface">
                Production<span className="text-primary"> Tracker</span>
              </span>
            </div>
            <p className="text-label-md text-on-surface-variant max-w-xs">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-label-md">
            {[
              { key: 'privacy', href: '#' },
              { key: 'terms',   href: '#' },
              { key: 'contact', href: '#' },
            ].map(({ key, href }) => (
              <a
                key={key}
                href={href}
                className="text-on-surface-variant hover:text-primary transition-colors duration-200"
              >
                {t(`footer.${key}`)}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-label-md text-on-surface-variant/70">
            {t('footer.copyright')}
          </p>

        </div>
      </div>
    </footer>
  );
}
