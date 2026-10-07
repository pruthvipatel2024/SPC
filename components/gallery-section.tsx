'use client'

import { useMemo, useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'motion/react'
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Sparkles,
  Shuffle,
  Camera,
  Play,
  Pause,
  Layers,
} from 'lucide-react'
import { galleryImages, galleryFilters, type GalleryImage } from '@/lib/content'
import { Reveal } from '@/components/reveal'
import { cn } from '@/lib/utils'

export function GallerySection() {
  const [filter, setFilter] = useState('All')
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null)
  const [spotlightIndex, setSpotlightIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [showAllGrid, setShowAllGrid] = useState(false)

  // Filtered image list
  const filtered = useMemo(
    () => (filter === 'All' ? galleryImages : galleryImages.filter((g) => g.category === filter)),
    [filter],
  )

  // Spotlight rotation timer
  useEffect(() => {
    if (!isAutoPlaying || filtered.length <= 1) return
    const interval = setInterval(() => {
      setSpotlightIndex((prev) => (prev + 1) % filtered.length)
    }, 4500)
    return () => clearInterval(interval)
  }, [isAutoPlaying, filtered.length])

  // Reset spotlight index when filter changes
  useEffect(() => {
    setSpotlightIndex(0)
  }, [filter])

  // Shuffle images randomly
  const handleShuffle = () => {
    const nextIdx = Math.floor(Math.random() * filtered.length)
    setSpotlightIndex(nextIdx)
  }

  // Lightbox handlers
  const openLightbox = (index: number) => {
    setActiveLightboxIndex(index)
  }
  const closeLightbox = useCallback(() => setActiveLightboxIndex(null), [])
  const nextLightbox = useCallback(() => {
    setActiveLightboxIndex((prev) => (prev === null ? null : (prev + 1) % filtered.length))
  }, [filtered.length])
  const prevLightbox = useCallback(() => {
    setActiveLightboxIndex((prev) => (prev === null ? null : (prev - 1 + filtered.length) % filtered.length))
  }, [filtered.length])

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (activeLightboxIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') nextLightbox()
      if (e.key === 'ArrowLeft') prevLightbox()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [activeLightboxIndex, closeLightbox, nextLightbox, prevLightbox])

  // Images to display in the grid: either all or first 8 with view more button
  const displayGridImages = showAllGrid || filter !== 'All' ? filtered : filtered.slice(0, 8)

  const currentSpotlight: GalleryImage = filtered[spotlightIndex] || filtered[0] || galleryImages[0]

  return (
    <section id="gallery" className="scroll-mt-20 bg-background py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Header */}
        <Reveal>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/15 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-accent">
                <Camera className="h-3.5 w-3.5" />
                Real Ground Photography
              </div>
              <h2 className="mt-4 font-serif text-3xl leading-tight text-foreground text-balance sm:text-4xl lg:text-5xl">
                Moments of Hope & Dignity.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Authentic photographic documentation of field outreach, classroom sessions, school supply distributions, and community assemblies in Bhavnagar.
              </p>
            </div>

            {/* Live Auto-Tour & Shuffle Controls */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground shadow-xs transition-colors hover:border-primary/40 hover:bg-secondary/40"
              >
                {isAutoPlaying ? (
                  <>
                    <Pause className="h-3.5 w-3.5 text-accent" />
                    <span>Auto-Rotating</span>
                  </>
                ) : (
                  <>
                    <Play className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>Paused</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleShuffle}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground shadow-xs transition-colors hover:border-primary/40 hover:bg-secondary/40"
                title="View random image"
              >
                <Shuffle className="h-3.5 w-3.5 text-accent" />
                <span>Shuffle</span>
              </button>
            </div>
          </div>
        </Reveal>

        {/* Dynamic Rotating Spotlight Showcase */}
        <Reveal delay={0.05} className="mt-10">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr]">
              {/* Spotlight Image with Smooth Crossfade */}
              <div
                className="group relative aspect-16/10 w-full cursor-pointer overflow-hidden bg-muted sm:aspect-16/9 lg:aspect-auto lg:min-h-[420px]"
                onClick={() => openLightbox(spotlightIndex)}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSpotlight.src}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={currentSpotlight.src}
                      alt={currentSpotlight.alt}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 65vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  </motion.div>
                </AnimatePresence>

                {/* Overlay Badge & Expand Icon */}
                <div className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur-md shadow-sm">
                  <Sparkles className="h-3 w-3 text-accent" />
                  <span>Featured Live Moment</span>
                </div>

                <div className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2.5 text-white backdrop-blur-md transition-transform group-hover:scale-110">
                  <Maximize2 className="h-4 w-4" />
                </div>

                <div className="absolute bottom-4 left-4 right-4 z-10 text-white sm:bottom-6 sm:left-6 sm:right-6">
                  <span className="rounded-full bg-accent/90 px-2.5 py-0.5 text-[0.68rem] font-bold uppercase tracking-wider text-accent-foreground">
                    {currentSpotlight.category}
                  </span>
                  <h3 className="mt-2 font-serif text-xl font-bold leading-tight sm:text-2xl text-balance">
                    {currentSpotlight.title}
                  </h3>
                </div>
              </div>

              {/* Spotlight Details & Controls */}
              <div className="flex flex-col justify-between p-6 sm:p-8 bg-card">
                <div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="font-semibold uppercase tracking-wider text-accent">
                      Live Showcase
                    </span>
                    <span>
                      {spotlightIndex + 1} of {filtered.length}
                    </span>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSpotlight.src}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4 }}
                      className="mt-4"
                    >
                      <h4 className="font-serif text-2xl font-semibold text-foreground">
                        {currentSpotlight.title}
                      </h4>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {currentSpotlight.alt}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Progress Indicators & Quick Nav */}
                <div className="mt-8 border-t border-border pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      {filtered.map((img, idx) => (
                        <button
                          key={img.src}
                          type="button"
                          onClick={() => setSpotlightIndex(idx)}
                          aria-label={`Go to slide ${idx + 1}`}
                          className={cn(
                            'h-2 rounded-full transition-all duration-300',
                            spotlightIndex === idx
                              ? 'w-6 bg-accent'
                              : 'w-2 bg-muted hover:bg-muted-foreground/40',
                          )}
                        />
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setSpotlightIndex((prev) => (prev - 1 + filtered.length) % filtered.length)
                        }
                        className="rounded-full border border-border p-2 text-foreground transition-colors hover:bg-secondary/60"
                        aria-label="Previous moment"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setSpotlightIndex((prev) => (prev + 1) % filtered.length)}
                        className="rounded-full border border-border p-2 text-foreground transition-colors hover:bg-secondary/60"
                        aria-label="Next moment"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Category Filters */}
        <Reveal delay={0.1} className="mt-14">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {galleryFilters.map((f) => {
                const count =
                  f === 'All' ? galleryImages.length : galleryImages.filter((g) => g.category === f).length
                return (
                  <button
                    key={f}
                    type="button"
                    onClick={() => {
                      setFilter(f)
                      setShowAllGrid(false)
                    }}
                    className={cn(
                      'flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-all',
                      filter === f
                        ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                        : 'border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-primary',
                    )}
                  >
                    <span>{f}</span>
                    <span
                      className={cn(
                        'rounded-full px-1.5 py-0.2 text-[0.68rem] font-bold',
                        filter === f
                          ? 'bg-primary-foreground/20 text-primary-foreground'
                          : 'bg-muted text-muted-foreground',
                      )}
                    >
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>

            <div className="text-xs text-muted-foreground">
              Showing {displayGridImages.length} of {filtered.length} photos
            </div>
          </div>
        </Reveal>

        {/* Photo Gallery Grid */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {displayGridImages.map((img, i) => {
              const originalIndex = filtered.findIndex((f) => f.src === img.src)
              return (
                <motion.div
                  key={img.src}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative aspect-4/5 w-full cursor-pointer overflow-hidden rounded-2xl border border-border bg-card shadow-xs focus-within:ring-2 focus-within:ring-ring"
                  onClick={() => openLightbox(originalIndex !== -1 ? originalIndex : i)}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-90" />

                  {/* Top Category Badge */}
                  <div className="absolute left-3 top-3 z-10">
                    <span className="rounded-full bg-background/90 backdrop-blur-md px-2.5 py-0.5 text-[0.68rem] font-semibold text-foreground shadow-xs">
                      {img.category}
                    </span>
                  </div>

                  {/* Expand Icon */}
                  <div className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-xs opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <Maximize2 className="h-3.5 w-3.5" />
                  </div>

                  {/* Bottom Title & Description */}
                  <div className="absolute bottom-3 left-3 right-3 z-10">
                    <h4 className="font-serif text-sm font-semibold text-white group-hover:text-accent transition-colors line-clamp-1">
                      {img.title}
                    </h4>
                    <p className="mt-0.5 text-[0.72rem] text-white/70 line-clamp-2 leading-relaxed">
                      {img.alt}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* View All Toggle Button */}
        {filtered.length > 8 && filter === 'All' && (
          <Reveal delay={0.1} className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAllGrid(!showAllGrid)}
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card px-6 py-3 text-sm font-semibold text-primary shadow-sm transition-all hover:border-primary hover:bg-primary/5"
            >
              <Layers className="h-4 w-4" />
              <span>{showAllGrid ? 'Show Fewer Photos' : `View All ${galleryImages.length} Real Work Photos`}</span>
            </button>
          </Reveal>
        )}
      </div>

      {/* Enhanced Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxIndex !== null && filtered[activeLightboxIndex] && (
          <motion.div
            className="fixed inset-0 z-[70] flex flex-col justify-between bg-black/95 p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
          >
            {/* Top Toolbar */}
            <div className="flex items-center justify-between text-white" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-accent/90 px-3 py-1 text-xs font-bold text-accent-foreground">
                  {filtered[activeLightboxIndex].category}
                </span>
                <span className="text-xs text-white/70">
                  {activeLightboxIndex + 1} of {filtered.length}
                </span>
              </div>

              <button
                type="button"
                onClick={closeLightbox}
                className="rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20"
                aria-label="Close lightbox"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Main Lightbox Image View */}
            <div
              className="relative my-auto flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Prev Button */}
              <button
                type="button"
                onClick={prevLightbox}
                className="absolute left-2 z-20 rounded-full bg-black/60 p-3 text-white backdrop-blur-md transition-colors hover:bg-white/20 sm:left-6"
                aria-label="Previous photo"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <AnimatePresence mode="wait">
                <motion.div
                  key={filtered[activeLightboxIndex].src}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  className="relative max-h-[72vh] w-full max-w-5xl"
                >
                  <Image
                    src={filtered[activeLightboxIndex].src}
                    alt={filtered[activeLightboxIndex].alt}
                    width={1600}
                    height={1100}
                    priority
                    className="mx-auto max-h-[72vh] w-auto rounded-2xl object-contain shadow-2xl"
                  />
                  <div className="mt-4 text-center">
                    <h3 className="font-serif text-lg font-bold text-white sm:text-xl">
                      {filtered[activeLightboxIndex].title}
                    </h3>
                    <p className="mt-1 mx-auto max-w-2xl text-xs text-white/80 sm:text-sm">
                      {filtered[activeLightboxIndex].alt}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Next Button */}
              <button
                type="button"
                onClick={nextLightbox}
                className="absolute right-2 z-20 rounded-full bg-black/60 p-3 text-white backdrop-blur-md transition-colors hover:bg-white/20 sm:right-6"
                aria-label="Next photo"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Bottom Thumbnail Strip */}
            <div
              className="mx-auto flex max-w-4xl gap-2 overflow-x-auto py-2 scrollbar-none"
              onClick={(e) => e.stopPropagation()}
            >
              {filtered.map((img, idx) => (
                <button
                  key={img.src}
                  type="button"
                  onClick={() => setActiveLightboxIndex(idx)}
                  className={cn(
                    'relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all',
                    activeLightboxIndex === idx
                      ? 'border-accent scale-105 opacity-100 shadow-md'
                      : 'border-transparent opacity-50 hover:opacity-80',
                  )}
                >
                  <Image src={img.src} alt={img.title} fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
