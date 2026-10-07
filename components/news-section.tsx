'use client'

import { useState, useMemo, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import {
  Newspaper,
  Award,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  Calendar,
  Building2,
  CheckCircle2,
  BookOpen,
} from 'lucide-react'
import { newsArticles, founder, type NewsArticle } from '@/lib/content'
import { Reveal } from '@/components/reveal'
import { cn } from '@/lib/utils'

export function NewsSection() {
  const [filter, setFilter] = useState<string>('All')
  const [activeArticleIndex, setActiveArticleIndex] = useState<number | null>(null)

  const categories = useMemo(() => {
    return ['All', 'Divya Bhaskar', 'Gujarat Chhaya', 'Saurashtra Aaspas', 'Regional Press']
  }, [])

  const filteredArticles = useMemo(() => {
    if (filter === 'All') return newsArticles
    return newsArticles.filter((a) => a.category === filter)
  }, [filter])

  const activeArticle: NewsArticle | null =
    activeArticleIndex !== null ? filteredArticles[activeArticleIndex] || null : null

  const closeModal = useCallback(() => {
    setActiveArticleIndex(null)
  }, [])

  const nextArticle = useCallback(() => {
    setActiveArticleIndex((prev) =>
      prev === null ? null : (prev + 1) % filteredArticles.length,
    )
  }, [filteredArticles.length])

  const prevArticle = useCallback(() => {
    setActiveArticleIndex((prev) =>
      prev === null ? null : (prev - 1 + filteredArticles.length) % filteredArticles.length,
    )
  }, [filteredArticles.length])

  // Keyboard navigation
  useEffect(() => {
    if (activeArticleIndex === null) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
      if (e.key === 'ArrowRight') nextArticle()
      if (e.key === 'ArrowLeft') prevArticle()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [activeArticleIndex, closeModal, nextArticle, prevArticle])

  return (
    <section id="news" className="scroll-mt-20 bg-secondary/35 py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Header */}
        <Reveal>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                <Newspaper className="h-3.5 w-3.5" />
                Media & Press Coverage
              </div>
              <h2 className="mt-3 font-serif text-3xl leading-tight text-foreground text-balance sm:text-4xl lg:text-5xl">
                Published Newspaper Articles & Recognition.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              Prominent front-page press features and state-level recognition highlighting founder
              Puja Pandit Jani and the Child Beggar-Free Bhavnagar mission.
            </p>
          </div>
        </Reveal>

        {/* Founder & Impact Milestone Spotlight Banner */}
        <Reveal delay={0.06} className="mt-10">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_1.8fr] lg:gap-12">
              {/* Founder Profile Info */}
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
                  <Award className="h-3.5 w-3.5" />
                  Founder Spotlight
                </div>

                <h3 className="mt-4 font-serif text-2xl font-bold text-foreground sm:text-3xl">
                  {founder.name}
                </h3>
                <p className="mt-1 text-sm font-semibold text-primary">{founder.role}</p>
                <p className="mt-2 text-xs font-medium text-muted-foreground">{founder.titles}</p>

                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {founder.bio}
                </p>

                <div className="mt-6 flex flex-wrap gap-2 text-xs">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/8 px-3 py-1 font-medium text-primary">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    82+ Children Enrolled in Schools
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/8 px-3 py-1 font-medium text-primary">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Police & Community Coordinated Model
                  </span>
                </div>
              </div>

              {/* Key Press Highlights Grid */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-border/80 bg-background/60 p-5 backdrop-blur-sm">
                  <span className="font-serif text-3xl font-bold text-accent">82+</span>
                  <h4 className="mt-1 font-serif text-base font-semibold text-foreground">
                    Children Rescued & Schooled
                  </h4>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                    Transitioned directly from crossroad begging to school desks with uniforms and
                    transportation.
                  </p>
                </div>

                <div className="rounded-2xl border border-border/80 bg-background/60 p-5 backdrop-blur-sm">
                  <span className="font-serif text-3xl font-bold text-primary">Divya Bhaskar</span>
                  <h4 className="mt-1 font-serif text-base font-semibold text-foreground">
                    Monday Positive Front Page
                  </h4>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                    State Home Minister Harsh Sanghavi recommended expanding Bhavnagar&rsquo;s model
                    statewide.
                  </p>
                </div>

                <div className="rounded-2xl border border-border/80 bg-background/60 p-5 backdrop-blur-sm">
                  <span className="font-serif text-3xl font-bold text-primary">PM Modi</span>
                  <h4 className="mt-1 font-serif text-base font-semibold text-foreground">
                    Official Appreciation
                  </h4>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                    Commended for artistic humanitarian contributions and community reform
                    initiatives.
                  </p>
                </div>

                <div className="rounded-2xl border border-border/80 bg-background/60 p-5 backdrop-blur-sm">
                  <span className="font-serif text-3xl font-bold text-accent">1982</span>
                  <h4 className="mt-1 font-serif text-base font-semibold text-foreground">
                    Generational Legacy of Seva
                  </h4>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                    Continuing the social reform movement pioneered by late teacher Arvindbhai
                    Pandit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Filter Tabs */}
        <Reveal delay={0.1} className="mt-10">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={cn(
                  'rounded-full border px-4 py-2 text-xs font-semibold transition-all sm:text-sm',
                  filter === cat
                    ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                    : 'border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-primary',
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Articles Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filteredArticles.map((article, idx) => (
              <motion.article
                key={article.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
                onClick={() => setActiveArticleIndex(idx)}
                className="group flex cursor-pointer flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
              >
                {/* Image Clipping Container */}
                <div className="relative aspect-4/5 w-full overflow-hidden bg-muted/40">
                  <Image
                    src={article.image}
                    alt={article.titleGujarati}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity group-hover:opacity-80" />

                  {/* Top Badge */}
                  <div className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-[0.68rem] font-semibold text-accent-foreground shadow-sm">
                    {article.badge}
                  </div>

                  {/* Hover Inspect Prompt */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-background/95 px-4 py-2 text-xs font-bold text-foreground shadow-lg backdrop-blur-sm">
                      <Maximize2 className="h-3.5 w-3.5 text-primary" />
                      Read Article
                    </span>
                  </div>

                  {/* Publication name overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                    <p className="flex items-center gap-1.5 text-[0.72rem] font-semibold uppercase tracking-wider text-accent">
                      <Building2 className="h-3 w-3" />
                      {article.publication}
                    </p>
                  </div>
                </div>

                {/* Card Body */}
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <h4 className="line-clamp-2 font-serif text-base font-bold text-foreground group-hover:text-primary">
                      {article.titleGujarati}
                    </h4>
                    <p className="mt-1.5 line-clamp-2 text-xs font-medium text-primary/80">
                      {article.titleEnglish}
                    </p>
                    <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
                      {article.summary}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-3 text-[0.72rem] text-muted-foreground">
                    <span className="font-semibold text-primary">{article.category}</span>
                    <span className="inline-flex items-center gap-1 font-semibold text-accent group-hover:underline">
                      <BookOpen className="h-3.5 w-3.5" />
                      View Full Clipping
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Full-Screen Article Lightbox & Reader Modal */}
      <AnimatePresence>
        {activeArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-3 sm:p-6 backdrop-blur-md"
            onClick={closeModal}
            role="dialog"
            aria-modal="true"
            aria-label="Newspaper Article Viewer"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-4 top-4 z-40 rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/25"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Left Nav */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                prevArticle()
              }}
              className="absolute left-2 top-1/2 z-40 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/25 sm:left-5"
              aria-label="Previous article"
            >
              <ChevronLeft className="h-7 w-7" />
            </button>

            {/* Right Nav */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                nextArticle()
              }}
              className="absolute right-2 top-1/2 z-40 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/25 sm:right-5"
              aria-label="Next article"
            >
              <ChevronRight className="h-7 w-7" />
            </button>

            {/* Modal Dialog Content */}
            <motion.div
              key={activeArticle.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-card text-foreground shadow-2xl lg:flex-row"
            >
              {/* Image Column */}
              <div className="relative flex max-h-[50vh] w-full items-center justify-center overflow-auto bg-neutral-900 p-2 lg:max-h-[92vh] lg:w-3/5">
                <div className="relative h-full min-h-[380px] w-full lg:min-h-[600px]">
                  <Image
                    src={activeArticle.image}
                    alt={activeArticle.titleGujarati}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Text & Context Column */}
              <div className="flex flex-1 flex-col justify-between overflow-y-auto p-6 lg:p-8">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                      {activeArticle.badge}
                    </span>
                    <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                      {activeArticle.publication}
                    </span>
                  </div>

                  <h3 className="mt-4 font-serif text-xl font-bold leading-snug text-foreground sm:text-2xl">
                    {activeArticle.titleGujarati}
                  </h3>

                  <p className="mt-2 text-sm font-semibold text-primary">
                    {activeArticle.titleEnglish}
                  </p>

                  <div className="mt-6 rounded-2xl border border-border bg-secondary/30 p-4">
                    <h5 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
                      <Sparkles className="h-3.5 w-3.5" />
                      Article Summary & Context
                    </h5>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                      {activeArticle.summary}
                    </p>
                  </div>

                  <div className="mt-6 space-y-2 text-xs text-muted-foreground">
                    <p className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5 text-accent" />
                      <span>{activeArticle.date || 'Published Press Coverage'}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Building2 className="h-3.5 w-3.5 text-accent" />
                      <span>Bhavnagar, Gujarat • Child Beggar-Free Mission</span>
                    </p>
                  </div>
                </div>

                <div className="mt-8 border-t border-border pt-4">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>
                      Article {(activeArticleIndex ?? 0) + 1} of {filteredArticles.length}
                    </span>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="font-semibold text-primary underline underline-offset-2 hover:text-accent"
                    >
                      Close Viewer
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
