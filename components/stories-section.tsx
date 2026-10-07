'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import {
  Play,
  Pause,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  RotateCcw,
  MapPin,
} from 'lucide-react'
import { videoStories, type VideoStory } from '@/lib/content'
import { Reveal } from '@/components/reveal'
import { cn } from '@/lib/utils'

export function StoriesSection() {
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [videoProgress, setVideoProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const currentStory: VideoStory = videoStories[selectedStoryIndex] || videoStories[0]

  // Switch story selection
  const handleSelectStory = (index: number) => {
    if (index === selectedStoryIndex) return
    setSelectedStoryIndex(index)
    setHasStarted(false)
    setIsPlaying(false)
    setVideoProgress(0)
    setCurrentTime(0)
  }

  // Handle Play/Pause
  const togglePlay = useCallback(() => {
    if (!videoRef.current) return
    if (!hasStarted) {
      setHasStarted(true)
    }
    if (videoRef.current.paused) {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {})
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }, [hasStarted])

  // Handle Mute/Unmute
  const toggleMute = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !videoRef.current.muted
    setIsMuted(videoRef.current.muted)
  }

  // Handle Fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {})
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {})
    }
  }

  // Listen to fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  // Video time update
  const handleTimeUpdate = () => {
    if (!videoRef.current) return
    const cur = videoRef.current.currentTime
    const dur = videoRef.current.duration || 0
    setCurrentTime(cur)
    setDuration(dur)
    if (dur > 0) {
      setVideoProgress((cur / dur) * 100)
    }
  }

  // Seek bar scrub
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || duration <= 0) return
    const rect = e.currentTarget.getBoundingClientRect()
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    const targetTime = pos * duration
    videoRef.current.currentTime = targetTime
    setVideoProgress(pos * 100)
  }

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  // Reset video source on story change
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load()
      if (hasStarted) {
        videoRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {})
      }
    }
  }, [currentStory.src, hasStarted])

  return (
    <section id="stories" className="scroll-mt-20 bg-[#141d1b] py-24 text-background">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Simple, Clean Section Header */}
        <Reveal className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
            Video Stories
          </p>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-balance sm:text-4xl lg:text-5xl">
            Stories of Change in Action
          </h2>
          <p className="mt-4 text-base leading-relaxed text-background/75">
            Real video footage documenting our outreach, family counseling, and learning programs with children in Bhavnagar.
          </p>
        </Reveal>

        {/* Clean Story Selector Tabs */}
        <Reveal delay={0.05} className="mt-10">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {videoStories.map((story, i) => {
              const isSelected = selectedStoryIndex === i
              return (
                <button
                  key={story.id}
                  type="button"
                  onClick={() => handleSelectStory(i)}
                  className={cn(
                    'group flex items-center gap-4 rounded-2xl border p-4 text-left transition-all sm:p-5',
                    isSelected
                      ? 'border-accent bg-accent/15 text-background shadow-sm'
                      : 'border-background/10 bg-background/5 text-background/70 hover:border-background/25 hover:bg-background/10 hover:text-background',
                  )}
                >
                  {/* Thumbnail preview */}
                  <div className="relative h-18 w-26 shrink-0 overflow-hidden rounded-xl bg-background/10 sm:h-20 sm:w-30">
                    <Image
                      src={story.poster}
                      alt={story.title}
                      fill
                      sizes="140px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className={cn(
                          'flex h-7 w-7 items-center justify-center rounded-full transition-transform group-hover:scale-110',
                          isSelected
                            ? 'bg-accent text-accent-foreground'
                            : 'bg-black/60 text-white',
                        )}
                      >
                        <Play className="ml-0.5 h-3 w-3 fill-current" />
                      </div>
                    </div>
                  </div>

                  {/* Story Title & Meta */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-background/60">{story.category}</p>
                    <h3 className="mt-1 font-serif text-base font-semibold leading-snug text-background sm:text-lg">
                      {story.title}
                    </h3>
                    <p className="mt-1 flex items-center gap-1 text-xs text-background/50">
                      <MapPin className="h-3 w-3 text-accent shrink-0" />
                      <span>Bhavnagar, Gujarat</span>
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
        </Reveal>

        {/* Video Player & Natural Narrative Layout */}
        <Reveal delay={0.1} className="mt-8">
          <div className="grid grid-cols-1 gap-8 rounded-3xl border border-background/10 bg-background/5 p-4 sm:p-6 lg:grid-cols-[1.65fr_1.1fr] lg:gap-10 lg:p-8">
            {/* Video Player Column */}
            <div className="flex flex-col">
              <div
                ref={containerRef}
                className="group relative aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-xl ring-1 ring-background/10"
              >
                {/* HTML5 Video */}
                <video
                  ref={videoRef}
                  src={currentStory.src}
                  poster={currentStory.poster}
                  preload="metadata"
                  playsInline
                  onTimeUpdate={handleTimeUpdate}
                  onEnded={() => setIsPlaying(false)}
                  onClick={togglePlay}
                  className="h-full w-full object-contain"
                />

                {/* Poster / Play Overlay if not started */}
                <AnimatePresence>
                  {!hasStarted && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={togglePlay}
                      className="absolute inset-0 z-20 flex cursor-pointer flex-col items-center justify-center bg-black/40 backdrop-blur-[1px] transition-all hover:bg-black/30"
                    >
                      <Image
                        src={currentStory.poster}
                        alt={currentStory.title}
                        fill
                        className="object-cover opacity-60"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                      <div className="relative z-10 flex flex-col items-center px-4 text-center">
                        <motion.button
                          whileHover={{ scale: 1.08 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-xl transition-transform sm:h-18 sm:w-18"
                          aria-label="Play video"
                        >
                          <Play className="ml-1 h-7 w-7 fill-current sm:h-8 sm:w-8" />
                        </motion.button>
                        <h3 className="mt-4 font-serif text-lg font-semibold text-background sm:text-xl">
                          {currentStory.title}
                        </h3>
                        <p className="mt-1 text-xs text-background/75">
                          Click to play
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Video Controls Overlay */}
                {hasStarted && (
                  <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 focus-within:opacity-100">
                    {/* Scrub Bar */}
                    <div
                      onClick={handleSeek}
                      className="group/seek relative mb-3 h-1.5 w-full cursor-pointer rounded-full bg-white/25 transition-all hover:h-2"
                    >
                      <div
                        style={{ width: `${videoProgress}%` }}
                        className="h-full rounded-full bg-accent transition-all duration-75"
                      />
                    </div>

                    <div className="flex items-center justify-between gap-3 text-xs text-background">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={togglePlay}
                          className="rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
                          aria-label={isPlaying ? 'Pause' : 'Play'}
                        >
                          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (videoRef.current) {
                              videoRef.current.currentTime = 0
                            }
                          }}
                          className="rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
                          aria-label="Restart video"
                        >
                          <RotateCcw className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={toggleMute}
                          className="rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
                          aria-label={isMuted ? 'Unmute' : 'Mute'}
                        >
                          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                        </button>
                        <span className="font-mono text-[0.72rem] text-background/80">
                          {formatTime(currentTime)} / {formatTime(duration)}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={toggleFullscreen}
                        className="rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
                        aria-label={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                      >
                        {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Natural Narrative Column */}
            <div className="flex flex-col justify-between space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                  {currentStory.category}
                </p>
                <h3 className="mt-1 font-serif text-2xl font-semibold text-background sm:text-3xl">
                  {currentStory.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-background/70">
                  {currentStory.subtitle}
                </p>

                {/* Natural Narrative Story Text */}
                <div className="mt-5 space-y-3 text-sm leading-relaxed text-background/85">
                  <p>
                    {currentStory.description}
                  </p>
                  <p className="text-xs leading-relaxed text-background/70">
                    {currentStory.intervention}
                  </p>
                </div>

                {/* Featured Quote */}
                <blockquote className="mt-6 border-l-2 border-accent pl-4 font-serif text-base italic leading-relaxed text-background/90">
                  &ldquo;{currentStory.quote}&rdquo;
                </blockquote>
              </div>

              {/* Location Footer Note */}
              <div className="text-xs text-background/50 border-t border-background/10 pt-4">
                Location: Bhavnagar, Gujarat &bull; Shree Padm Charitable Trust
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
