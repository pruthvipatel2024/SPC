import { cn } from '@/lib/utils'

/**
 * Official logo emblem of Shree Padm Charitable Trust (S.P.C. Seva Trust).
 * Represents a parent and child figure nurtured within an open lotus blossom.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={cn('h-11 w-11 shrink-0 drop-shadow-sm', className)}
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Circular White Badge */}
      <circle cx="100" cy="100" r="98" fill="#ffffff" className="stroke-primary/10 stroke-1" />

      {/* Official Sage / Lotus Green Graphic Elements */}
      <g fill="#568782">
        {/* Adult Head */}
        <circle cx="114" cy="87" r="16" />

        {/* Child Head */}
        <circle cx="89.5" cy="115" r="9.5" />

        {/* Parent Main Body Leaf */}
        <path d="M 106 185 C 105 160 110 134 126 106 C 137 122 143 145 137 165 C 131 178 120 184 106 185 Z" />

        {/* Child Inner Left Body Leaf */}
        <path d="M 102 185 C 94 163 87 146 76 126 C 88 138 93 157 98 181 Z" />

        {/* Left Outer Floating Leaf */}
        <path d="M 50 144 C 54 136 65 140 70 148 C 65 156 55 154 50 144 Z" />

        {/* Right Outer Floating Leaf */}
        <path d="M 150 144 C 146 136 135 140 130 148 C 135 156 145 154 150 144 Z" />

        {/* Left Bottom Horizontal Petal */}
        <path d="M 100 186 C 75 187 52 178 48 160 C 65 158 86 168 100 186 Z" />

        {/* Right Bottom Horizontal Petal */}
        <path d="M 100 186 C 125 187 148 178 152 160 C 135 158 114 168 100 186 Z" />
      </g>
    </svg>
  )
}

/**
 * Authentic PADM / पद्म brand unit as designed on official signage
 */
export function PadmBrandBadge({ className, light = false }: { className?: string; light?: boolean }) {
  return (
    <span className={cn('inline-flex flex-col items-center justify-center leading-none text-center select-none', className)}>
      <span
        className={cn(
          'font-sans text-[0.52rem] font-bold tracking-[0.34em] uppercase translate-x-[0.09em] transition-colors',
          light ? 'text-accent-foreground' : 'text-accent',
        )}
      >
        PADM
      </span>
      <span
        className={cn(
          'font-devanagari text-xl font-black tracking-normal transition-colors -mt-0.5',
          light ? 'text-primary-foreground' : 'text-primary',
        )}
      >
        पद्म
      </span>
    </span>
  )
}

/**
 * Complete Wordmark for Navbar, Footer, and Brand headings:
 * Displays 'श्री पद्म' in Hindi (Devanagari) with 'CHARITABLE TRUST' in English underneath.
 */
export function Wordmark({ className, light = false }: { className?: string; light?: boolean }) {
  return (
    <span className={cn('flex items-center gap-3.5 select-none', className)}>
      <LogoMark className="h-12 w-12" />
      <span className="flex flex-col justify-center">
        <span
          className={cn(
            'font-devanagari text-2xl sm:text-[1.7rem] font-bold tracking-tight leading-none transition-colors',
            light ? 'text-primary-foreground' : 'text-primary',
          )}
        >
          श्री पद्म
        </span>

        <span
          className={cn(
            'font-sans text-[0.62rem] sm:text-[0.68rem] font-semibold uppercase tracking-[0.22em] leading-none transition-colors mt-1',
            light ? 'text-primary-foreground/75' : 'text-muted-foreground',
          )}
        >
          Charitable Trust
        </span>
      </span>
    </span>
  )
}
