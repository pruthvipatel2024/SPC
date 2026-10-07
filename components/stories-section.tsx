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
  Sparkles,
  Film,
  CheckCircle2,
  MapPin,
  HeartHandshake,
  GraduationCap,
  AlertCircle,
  Quote,
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
    <section id="stories" className="scroll-mt-20 bg-gradient-to-b from-foreground via-[#162320] to-foreground py-24 text-background">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header */}
        <Reveal>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/15 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-accent">
                <Film className="h-3.5 w-3.5" />
                Real Ground Video Stories
              </div>
              <h2 className="mt-4 font-serif text-3xl leading-tight text-balance sm:text-4xl lg:text-5xl">
                Real Stories of Change in Action.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-background/75">
                Authentic, continuous video footage documenting our field outreach, family counseling, and classroom learning in Bhavnagar. Every story plays in full original quality from start to finish.
              </p>
            </div>

            {/* Quick Stats Pill */}
            <div className="flex items-center gap-4 rounded-2xl border border-background/15 bg-background/5 p-4 backdrop-blur-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20 text-accent">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <div className="font-serif text-xl font-bold text-background">100% Real Footage</div>
                <div className="text-xs text-background/60">Bhavnagar, Gujarat • Single Continuous Playback</div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Story Selector Cards / Tabs */}
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
                    'group relative flex items-start gap-4 rounded-2xl border p-4 text-left transition-all duration-300 sm:p-5',
                    isSelected
                      ? 'border-accent bg-accent/15 text-background shadow-xl ring-1 ring-accent/60'
                      : 'border-background/15 bg-background/5 text-background/70 hover:border-background/30 hover:bg-background/10 hover:text-background',
                  )}
                >
                  {/* Thumbnail with overlay icon */}
                  <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl border border-background/20 bg-background/10 sm:h-24 sm:w-32">
                    <Image
                      src={story.poster}
                      alt={story.title}
                      fill
                      sizes="150px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/35" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className={cn(
                          'flex h-8 w-8 items-center justify-center rounded-full transition-transform group-hover:scale-110',
                          isSelected
                            ? 'bg-accent text-accent-foreground shadow-lg'
                            : 'bg-black/60 text-white backdrop-blur-xs',
                        )}
                      >
                        <Play className="ml-0.5 h-3.5 w-3.5 fill-current" />
                      </div>
                    </div>
                  </div>

                  {/* Story Details */}
                  <div className="flex flex-1 flex-col justify-between self-stretch">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-accent/20 px-2 py-0.5 text-[0.68rem] font-bold uppercase tracking-wider text-accent">
                          Story 0{i + 1}
                        </span>
                        <span className="text-xs text-background/60">{story.category}</span>
                      </div>
                      <h3 className="mt-1 font-serif text-base font-semibold leading-snug text-background sm:text-lg">
                        {story.title}
                      </h3>
                    </div>

                    <div className="mt-2 flex items-center justify-between gap-2 text-xs text-background/60">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-accent" />
                        Bhavnagar
                      </span>
                      {isSelected ? (
                        <span className="flex items-center gap-1.5 font-semibold text-accent">
                          <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                          </span>
                          Selected
                        </span>
                      ) : (
                        <span className="text-background/50 group-hover:text-background/80">Click to watch</span>
                      )}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </Reveal>

        {/* Main Video Cinema & Case Narrative */}
        <Reveal delay={0.1} className="mt-8">
          <div className="grid grid-cols-1 gap-8 rounded-3xl border border-background/15 bg-background/5 p-4 backdrop-blur-md sm:p-6 lg:grid-cols-[1.7fr_1.1fr] lg:gap-10 lg:p-8">
            {/* Left Column: Full Continuous Video Player */}
            <div className="flex flex-col">
              {/* Header inside player box */}
              <div className="mb-3 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-semibold uppercase tracking-wider text-accent">
                    Now Viewing:
                  </span>
                  <span className="font-medium text-background/80">
                    {currentStory.title}
                  </span>
                </div>
                <span className="rounded-full border border-background/20 bg-background/10 px-2.5 py-0.5 text-[0.68rem] font-medium text-accent">
                  Full Continuous Video
                </span>
              </div>

              {/* Video Player Box */}
              <div
                ref={containerRef}
                className="group relative aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-background/15"
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
                      className="absolute inset-0 z-20 flex cursor-pointer flex-col items-center justify-center bg-black/45 backdrop-blur-[2px] transition-all hover:bg-black/35"
                    >
                      <Image
                        src={currentStory.poster}
                        alt={currentStory.title}
                        fill
                        className="object-cover opacity-60"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

                      <div className="relative z-10 flex flex-col items-center px-4 text-center">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-2xl transition-transform sm:h-20 sm:w-20"
                          aria-label="Play full video"
                        >
                          <Play className="ml-1 h-7 w-7 fill-current sm:h-8 sm:w-8" />
                        </motion.button>
                        <h3 className="mt-4 font-serif text-lg font-semibold text-background sm:text-2xl">
                          {currentStory.title}
                        </h3>
                        <p className="mt-1 text-xs text-background/80 sm:text-sm">
                          Click to play complete footage in original high quality
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
                      className="group/seek relative mb-3 h-1.5 w-full cursor-pointer rounded-full bg-white/25 transition-all hover:h-2.5"
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

                      <div className="flex items-center gap-3">
                        <span className="hidden text-[0.7rem] text-background/60 sm:inline">
                          Full Video Playback
                        </span>
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
                  </div>
                )}
              </div>

              {/* Video Description Banner */}
              <div className="mt-4 rounded-2xl border border-background/10 bg-background/5 p-4 text-xs leading-relaxed text-background/75">
                <p>{currentStory.description}</p>
              </div>
            </div>

            {/* Right Column: In-Depth Story Case Study & Narrative */}
            <div className="flex flex-col justify-between border-t border-background/15 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <div className="space-y-5">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
                    <Sparkles className="h-4 w-4" />
                    Story Case Study
                  </div>
                  <h3 className="mt-1 font-serif text-2xl font-bold text-background sm:text-3xl">
                    {currentStory.title}
                  </h3>
                  <p className="mt-1 text-xs text-background/60">
                    {currentStory.subtitle}
                  </p>
                </div>

                {/* Structured Breakdown Cards */}
                <div className="space-y-3.5">
                  {/* Situation */}
                  <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4">
                    <div className="flex items-center gap-2 text-amber-400">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span className="text-xs font-bold uppercase tracking-wider">The Initial Situation</span>
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-background/80 sm:text-sm">
                      {currentStory.situation}
                    </p>
                  </div>

                  {/* Intervention */}
                  <div className="rounded-2xl border border-accent/20 bg-accent/5 p-4">
                    <div className="flex items-center gap-2 text-accent">
                      <HeartHandshake className="h-4 w-4 shrink-0" />
                      <span className="text-xs font-bold uppercase tracking-wider">The Trust&apos;s Intervention</span>
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-background/80 sm:text-sm">
                      {currentStory.intervention}
                    </p>
                  </div>

                  {/* Outcome */}
                  <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-4">
                    <div className="flex items-center gap-2 text-emerald-400">
                      <GraduationCap className="h-4 w-4 shrink-0" />
                      <span className="text-xs font-bold uppercase tracking-wider">The Lasting Outcome</span>
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-background/80 sm:text-sm">
                      {currentStory.outcome}
                    </p>
                  </div>
                </div>

                {/* Featured Quote */}
                <blockquote className="relative rounded-2xl border border-background/10 bg-background/5 p-4 italic text-background/90">
                  <Quote className="absolute right-4 top-4 h-6 w-6 text-accent/20" />
                  <p className="font-serif text-sm leading-snug sm:text-base text-pretty pr-6">
                    &ldquo;{currentStory.quote}&rdquo;
                  </p>
                </blockquote>
              </div>

              {/* Verified Location & Ground Note */}
              <div className="mt-6 flex items-center gap-2.5 rounded-2xl border border-background/10 bg-background/5 px-4 py-3 text-xs text-background/70">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />
                <span>
                  Recorded on location in <strong>Bhavnagar, Gujarat</strong> &bull; Shree Padma Charitable Trust
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
