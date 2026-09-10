import { cn } from '@/lib/utils'

/**
 * Simple lotus ("Padma") wordmark placeholder. Replace `LogoMark` with the
 * organization's official logo asset when available.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={cn('h-9 w-9', className)}
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24 8c2.6 3.2 4 6.7 4 10.2 0 3.1-1.1 5.9-4 8.8-2.9-2.9-4-5.7-4-8.8C20 14.7 21.4 11.2 24 8Z"
        className="fill-accent"
      />
      <path
        d="M24 27c-3.2-2.6-6.7-4-10.2-4-2 0-3.9.4-5.8 1.4 1.3 3.5 3.6 6.2 6.9 8 3.2 1.7 6.4 2.1 9.1 1.6-.2-2.8-.1-5.1 0-7Z"
        className="fill-primary"
      />
      <path
        d="M24 27c3.2-2.6 6.7-4 10.2-4 2 0 3.9.4 5.8 1.4-1.3 3.5-3.6 6.2-6.9 8-3.2 1.7-6.4 2.1-9.1 1.6.2-2.8.1-5.1 0-7Z"
        className="fill-primary opacity-80"
      />
      <circle cx="24" cy="34" r="3" className="fill-accent" />
    </svg>
  )
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn('flex items-center gap-2.5', className)}>
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span className="font-serif text-base font-semibold tracking-tight text-primary">
          Shree Padma
        </span>
        <span className="text-[0.62rem] font-medium uppercase tracking-[0.22em] text-muted-foreground">
          Charitable Trust
        </span>
      </span>
    </span>
  )
}
