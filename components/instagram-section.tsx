'use client'

import { useState, useMemo, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  X,
  ArrowUpRight,
  Heart,
  MessageCircle,
  Share2,
  Film,
  Camera,
  Layers,
  MapPin,
  Sparkles,
} from 'lucide-react'
import { InstagramIcon } from '@/components/social-icons'
import { LogoMark } from '@/components/logo'
import { instagramFeed, type InstagramFeedItem, org } from '@/lib/content'
import { Reveal } from '@/components/reveal'
import { cn } from '@/lib/utils'

export function InstagramSection() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'reel' | 'post'>('all')
  const [activeModalItem, setActiveModalItem] = useState<InstagramFeedItem | null>(null)
  const [isModalPlaying, setIsModalPlaying] = useState(true)
  const [isModalMuted, setIsModalMuted] = useState(false)
  const modalVideoRef = useRef<HTMLVideoElement>(null)

  const filteredItems = useMemo(() => {
    if (activeFilter === 'all') return instagramFeed
    return instagramFeed.filter((item) => item.type === activeFilter)
  }, [activeFilter])

  const closeModal = useCallback(() => {
    setActiveModalItem(null)
    setIsModalPlaying(false)
  }, [])

  const toggleModalPlay = () => {
    if (!modalVideoRef.current) return
    if (modalVideoRef.current.paused) {
      modalVideoRef.current.play().then(() => setIsModalPlaying(true)).catch(() => {})
    } else {
      modalVideoRef.current.pause()
      setIsModalPlaying(false)
    }
  }

  const toggleModalMute = () => {
    if (!modalVideoRef.current) return
    modalVideoRef.current.muted = !modalVideoRef.current.muted
    setIsModalMuted(modalVideoRef.current.muted)
  }

  // Keyboard navigation for modal
  useEffect(() => {
    if (!activeModalItem) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [activeModalItem, closeModal])

  return (
    <section id="instagram" className="scroll-mt-20 bg-secondary/35 py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Header */}
        <Reveal>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                <InstagramIcon className="h-3.5 w-3.5" />
                Live Instagram Stream
              </div>
              <h2 className="mt-3 font-serif text-3xl leading-tight text-foreground text-balance sm:text-4xl lg:text-5xl">
                Real Posts & Reels from the Ground.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              Follow our daily journey and real-time community stories on our official Instagram channel.
            </p>
          </div>
        </Reveal>

        {/* Profile Card Banner */}
        <Reveal delay={0.06} className="mt-10">
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-border bg-card p-6 shadow-sm sm:flex-row sm:items-center sm:p-7">
            <div className="flex items-center gap-4">
              <div className="relative rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 p-[2.5px] shadow-md">
                <div className="rounded-full bg-card p-0.5">
                  <LogoMark className="h-14 w-14 sm:h-16 sm:w-16" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-lg font-bold text-foreground sm:text-xl">
                    {org.name}
                  </h3>
                  <span className="inline-flex items-center justify-center rounded-full bg-primary/10 p-1 text-primary">
                    <Sparkles className="h-3 w-3" />
                  </span>
                </div>
                <p className="text-sm font-medium text-muted-foreground">{org.instagramHandle}</p>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground/80">
                  <MapPin className="h-3.5 w-3.5 text-accent" />
                  Bhavnagar, Gujarat • Child Beggar-Free Mission
                </p>
              </div>
            </div>

            <a
              href={org.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-transform hover:-translate-y-0.5 sm:w-auto"
            >
              <InstagramIcon className="h-4 w-4" />
              Follow on Instagram
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>

        {/* Filter Tabs */}
        <Reveal delay={0.1} className="mt-8">
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'all', label: 'All Feeds', icon: Layers },
              { key: 'reel', label: 'Reels 🎥', icon: Film },
              { key: 'post', label: 'Posts 📸', icon: Camera },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveFilter(key as 'all' | 'reel' | 'post')}
                className={cn(
                  'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-all sm:text-sm',
                  activeFilter === key
                    ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                    : 'border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-primary',
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Dynamic Media Grid */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => {
              const isReel = item.type === 'reel'

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35 }}
                  className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-md"
                >
                  {/* Media Container */}
                  <div
                    onClick={() => setActiveModalItem(item)}
                    className={cn(
                      'relative cursor-pointer overflow-hidden bg-black',
                      isReel ? 'aspect-[9/14]' : 'aspect-square sm:aspect-[4/5]',
                    )}
                  >
                    <Image
                      src={item.poster}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />

                    {/* Dark gradient wash */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 opacity-60 transition-opacity group-hover:opacity-80" />

                    {/* Badge */}
                    <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-[0.68rem] font-semibold text-white backdrop-blur-md">
                      {isReel ? (
                        <>
                          <Film className="h-3 w-3 text-accent" />
                          <span>Reel</span>
                        </>
                      ) : (
                        <>
                          <Camera className="h-3 w-3 text-accent" />
                          <span>Post</span>
                        </>
                      )}
                    </div>

                    {/* Views / Likes Pill */}
                    {item.viewsOrLikes && (
                      <div className="absolute right-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-[0.68rem] font-medium text-white/90 backdrop-blur-md">
                        {item.viewsOrLikes}
                      </div>
                    )}

                    {/* Center Play Button for Reels */}
                    {isReel && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/25 text-white backdrop-blur-md transition-transform group-hover:scale-110 group-hover:bg-accent group-hover:text-accent-foreground">
                          <Play className="ml-0.5 h-5 w-5 fill-current" />
                        </span>
                      </div>
                    )}

                    {/* Bottom overlay info */}
                    <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                      <p className="line-clamp-1 font-serif text-sm font-semibold">{item.title}</p>
                      <p className="mt-1 line-clamp-2 text-xs text-white/80">{item.caption}</p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="flex items-center justify-between border-t border-border/60 p-3.5 text-xs text-muted-foreground">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Heart className="h-3.5 w-3.5 text-rose-500" />
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="h-3.5 w-3.5" />
                      </span>
                    </div>

                    <a
                      href={org.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-primary transition-colors hover:text-accent"
                    >
                      <span>View on IG</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Interactive Reel & Post Modal */}
      <AnimatePresence>
        {activeModalItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-card text-foreground shadow-2xl md:flex-row"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={closeModal}
                className="absolute right-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/80"
                aria-label="Close viewer"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Media Player Column */}
              <div className="relative flex aspect-[9/14] w-full max-w-sm items-center justify-center bg-black md:w-1/2">
                {activeModalItem.type === 'reel' ? (
                  <div className="relative h-full w-full">
                    <video
                      ref={modalVideoRef}
                      src={activeModalItem.mediaSrc}
                      poster={activeModalItem.poster}
                      autoPlay
                      loop
                      playsInline
                      muted={isModalMuted}
                      className="h-full w-full object-contain"
                    />

                    {/* Video Controls Overlay */}
                    <div className="absolute inset-x-0 bottom-3 flex items-center justify-between px-4 text-white">
                      <button
                        type="button"
                        onClick={toggleModalPlay}
                        className="rounded-full bg-black/50 p-2 backdrop-blur-sm hover:bg-black/70"
                      >
                        {isModalPlaying ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}
                      </button>
                      <button
                        type="button"
                        onClick={toggleModalMute}
                        className="rounded-full bg-black/50 p-2 backdrop-blur-sm hover:bg-black/70"
                      >
                        {isModalMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="relative h-full w-full">
                    <Image
                      src={activeModalItem.mediaSrc}
                      alt={activeModalItem.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
              </div>

              {/* Story Details Column */}
              <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 p-[1.5px]">
                      <div className="rounded-full bg-card p-0.5">
                        <LogoMark className="h-8 w-8" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-serif text-sm font-bold text-foreground">
                        {org.instagramHandle}
                      </h4>
                      <p className="text-xs text-muted-foreground">{activeModalItem.location}</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-accent">
                      {activeModalItem.type === 'reel' ? 'Official Reel' : 'Instagram Post'}
                    </span>
                    <h3 className="mt-2 font-serif text-xl font-bold text-foreground">
                      {activeModalItem.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {activeModalItem.caption}
                    </p>
                  </div>
                </div>

                <div className="mt-8 border-t border-border pt-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <Heart className="h-5 w-5 cursor-pointer text-rose-500 transition-transform hover:scale-110" />
                      <MessageCircle className="h-5 w-5 cursor-pointer transition-transform hover:scale-110" />
                      <Share2 className="h-5 w-5 cursor-pointer transition-transform hover:scale-110" />
                    </div>

                    <a
                      href={org.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5"
                    >
                      <InstagramIcon className="h-3.5 w-3.5" />
                      Open on Instagram
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
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
