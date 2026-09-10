'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, X, Heart } from 'lucide-react'
import { navLinks } from '@/lib/content'
import { Wordmark } from '@/components/logo'
import { cn } from '@/lib/utils'

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          'transition-all duration-300',
          scrolled
            ? 'border-b border-border/70 bg-background/85 backdrop-blur-md'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <nav
          className={cn(
            'mx-auto flex max-w-7xl items-center justify-between px-5 transition-all duration-300 sm:px-8',
            scrolled ? 'h-16' : 'h-20',
          )}
          aria-label="Primary"
        >
          <a href="#top" className="shrink-0" aria-label={`${'Shree Padma Charitable Trust'} home`}>
            <Wordmark />
          </a>

          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/75 transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href="#volunteer"
              className="rounded-full border border-primary/25 px-5 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
            >
              Volunteer
            </a>
            <a
              href="#donate"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2 text-sm font-semibold text-accent-foreground shadow-sm transition-transform hover:-translate-y-0.5"
            >
              <Heart className="h-4 w-4" aria-hidden="true" />
              Donate Now
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center justify-center rounded-full border border-border p-2 text-foreground lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              className="absolute inset-y-0 right-0 flex w-[86%] max-w-sm flex-col bg-background p-6 shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between">
                <Wordmark />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-border p-2"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-10 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="border-b border-border/60 py-4 font-serif text-xl text-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <div className="mt-auto flex flex-col gap-3 pt-8">
                <a
                  href="#volunteer"
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-primary/30 px-5 py-3 text-center text-sm font-semibold text-primary"
                >
                  Volunteer
                </a>
                <a
                  href="#donate"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-center text-sm font-semibold text-accent-foreground"
                >
                  <Heart className="h-4 w-4" aria-hidden="true" />
                  Donate Now
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
