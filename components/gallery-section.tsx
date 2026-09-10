'use client'

import { useMemo, useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'motion/react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { galleryImages, galleryFilters } from '@/lib/content'
import { Reveal } from '@/components/reveal'
import { cn } from '@/lib/utils'

export function GallerySection() {
  const [filter, setFilter] = useState('All')
  const [active, setActive] = useState<number | null>(null)

  const filtered = useMemo(
    () => (filter === 'All' ? galleryImages : galleryImages.filter((g) => g.category === filter)),
    [filter],
  )

  const close = useCallback(() => setActive(null), [])
  const next = useCallback(
    () => setActive((a) => (a === null ? a : (a + 1) % filtered.length)),
    [filtered.length],
  )
  const prev = useCallback(
    () => setActive((a) => (a === null ? a : (a - 1 + filtered.length) % filtered.length)),
    [filtered.length],
  )

  useEffect(() => {
    if (active === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [active, close, next, prev])

  return (
    <section id="gallery" className="scroll-mt-20 bg-background">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Gallery</p>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-foreground text-balance sm:text-4xl">
            Moments from our work in Bhavnagar.
          </h2>
        </Reveal>

        <Reveal className="mt-8">
          <div className="flex flex-wrap gap-2">
            {galleryFilters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={cn(
                  'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
                  filter === f
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-primary',
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((img, i) => (
              <motion.button
                type="button"
                key={img.src}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setActive(i)}
                className="group relative block w-full break-inside-avoid overflow-hidden rounded-2xl border border-border focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={800}
                  height={i % 3 === 0 ? 1000 : 640}
                  className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <span className="absolute inset-0 bg-primary/0 transition-colors group-hover:bg-primary/20" />
                <span className="absolute bottom-3 left-3 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  {img.category}
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {active !== null && filtered[active] && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
          >
            <button
              type="button"
              onClick={close}
              className="absolute right-4 top-4 rounded-full bg-background/10 p-2 text-background hover:bg-background/20"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                prev()
              }}
              className="absolute left-3 rounded-full bg-background/10 p-2 text-background hover:bg-background/20 sm:left-6"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-7 w-7" />
            </button>
            <motion.div
              key={filtered[active].src}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              className="relative max-h-[85vh] w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filtered[active].src}
                alt={filtered[active].alt}
                width={1400}
                height={1000}
                className="mx-auto h-auto max-h-[85vh] w-auto rounded-xl object-contain"
              />
              <p className="mt-3 text-center text-sm text-background/80">{filtered[active].alt}</p>
            </motion.div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                next()
              }}
              className="absolute right-3 rounded-full bg-background/10 p-2 text-background hover:bg-background/20 sm:right-6"
              aria-label="Next image"
            >
              <ChevronRight className="h-7 w-7" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
