// components/ui/PlaceholderMedia.tsx
// Replace the className/label props with actual <Image> or <video> tags
// once you have the real screenshots and GIFs ready.

interface PlaceholderMediaProps {
  label: string;
  aspectRatio?: 'video' | 'square' | 'portrait' | 'tall';
  className?: string;
}

const aspectMap = {
  video:    'aspect-video',
  square:   'aspect-square',
  portrait: 'aspect-[4/5]',
  tall:     'aspect-[3/4]',
};

export default function PlaceholderMedia({
  label,
  aspectRatio = 'video',
  className = '',
}: PlaceholderMediaProps) {
  return (
    <div
      className={`
        ${aspectMap[aspectRatio]}
        bg-surface-container-high rounded-xl
        flex flex-col items-center justify-center gap-3
        relative overflow-hidden
        ${className}
      `}
    >
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 112, 108, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 112, 108, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Icon */}
      <div className="relative z-10 w-12 h-12 rounded-xl bg-surface-container-lowest flex items-center justify-center shadow-ambient">
        <span className="material-symbols-outlined text-on-surface-variant text-2xl">
          phone_iphone
        </span>
      </div>

      {/* Label */}
      <p className="relative z-10 text-label-md text-on-surface-variant font-medium text-center px-4">
        {label}
      </p>

      {/* Corner badge */}
      <span className="absolute top-3 right-3 bg-primary-fixed text-primary text-xs font-semibold px-2 py-0.5 rounded-full z-10">
        Screenshot
      </span>
    </div>
  );
}
