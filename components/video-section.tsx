'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import {
  Play,
  Pause,
  Maximize2,
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
  Film,
  CheckCircle2,
  Tv,
} from 'lucide-react'
import { videoStories, type VideoStory, type VideoPart } from '@/lib/content'
import { Reveal } from '@/components/reveal'
import { cn } from '@/lib/utils'

export function VideoSection() {
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0)
  const [selectedPartIndex, setSelectedPartIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [isBuffering, setIsBuffering] = useState(false)
  const [videoProgress, setVideoProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const currentStory: VideoStory = videoStories[selectedStoryIndex]
  const currentPart: VideoPart = currentStory.parts[selectedPartIndex] || currentStory.parts[0]

  // Switch stories
  const handleSelectStory = (idx: number) => {
    if (idx === selectedStoryIndex) return
    setSelectedStoryIndex(idx)
    setSelectedPartIndex(0)
    setHasStarted(false)
    setIsPlaying(false)
    setVideoProgress(0)
  }

  // Switch parts within current story
  const handleSelectPart = (idx: number, autoPlay = true) => {
    setSelectedPartIndex(idx)
    setVideoProgress(0)
    if (autoPlay) {
      setHasStarted(true)
      setIsPlaying(true)
      // Play after DOM update
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = 0
          videoRef.current.play().catch(() => {})
        }
      }, 50)
    }
  }

  // Video ended handler: auto-advance to next part if available!
  const handleVideoEnded = () => {
    if (selectedPartIndex < currentStory.parts.length - 1) {
      handleSelectPart(selectedPartIndex + 1, true)
    } else {
      setIsPlaying(false)
    }
  }

  const togglePlay = useCallback(() => {
    if (!videoRef.current) return
    if (!hasStarted) {
      setHasStarted(true)
    }
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {})
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }, [hasStarted])

  const toggleMute = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !videoRef.current.muted
    setIsMuted(videoRef.current.muted)
  }

  const toggleFullscreen = () => {
    if (!containerRef.current) return
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {})
    } else {
      document.exitFullscreen().catch(() => {})
    }
  }

  // Handle time update
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

  // Handle manual seek
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || duration <= 0) return
    const rect = e.currentTarget.getBoundingClientRect()
    const pos = (e.clientX - rect.left) / rect.width
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

  // Reset video element when part changes
  useEffect(() => {
    if (videoRef.current && hasStarted) {
      videoRef.current.load()
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {})
    }
  }, [currentPart.src, hasStarted])

  return (
    <section id="videos" className="scroll-mt-20 bg-foreground py-24 text-background">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Header */}
        <Reveal>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/15 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-accent">
                <Film className="h-3.5 w-3.5" />
                Real Ground Documentation
              </div>
              <h2 className="mt-4 font-serif text-3xl leading-tight text-balance sm:text-4xl lg:text-5xl">
                Real Work in Action.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-background/70">
              Authentic video footage from our field outreach and learning programs in Bhavnagar.
              Watch each multi-part story in full original quality.
            </p>
          </div>
        </Reveal>

        {/* Story Selector Tabs */}
        <Reveal delay={0.05} className="mt-10">
          <div className="flex flex-wrap gap-3">
            {videoStories.map((story, i) => (
              <button
                key={story.id}
                type="button"
                onClick={() => handleSelectStory(i)}
                className={cn(
                  'group flex items-center gap-3 rounded-2xl border px-5 py-3.5 text-left transition-all',
                  selectedStoryIndex === i
                    ? 'border-accent bg-accent/20 text-background ring-1 ring-accent'
                    : 'border-background/15 bg-background/5 text-background/70 hover:border-background/30 hover:bg-background/10 hover:text-background',
                )}
              >
                <div
                  className={cn(
                    'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-serif text-lg font-bold transition-colors',
                    selectedStoryIndex === i
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-background/10 text-background/80 group-hover:bg-background/20',
                  )}
                >
                  {i + 1}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-base font-semibold">{story.title}</span>
                    <span className="rounded-full bg-background/15 px-2 py-0.5 text-[0.68rem] font-medium text-accent">
                      {story.badge}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-background/60">{story.category}</p>
                </div>
              </button>
            ))}
          </div>
        </Reveal>

        {/* Main Cinema Player Card */}
        <Reveal delay={0.1} className="mt-8">
          <div className="grid grid-cols-1 gap-8 rounded-3xl border border-background/15 bg-background/5 p-4 backdrop-blur-md sm:p-6 lg:grid-cols-[1.75fr_1fr] lg:gap-8 lg:p-8">
            {/* Video Player Column */}
            <div className="flex flex-col">
              {/* Part selector pills */}
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                    Playing:
                  </span>
                  <div className="flex gap-1.5">
                    {currentStory.parts.map((p, idx) => (
                      <button
                        key={p.src}
                        type="button"
                        onClick={() => handleSelectPart(idx, true)}
                        className={cn(
                          'rounded-full px-3 py-1 text-xs font-semibold transition-all',
                          selectedPartIndex === idx
                            ? 'bg-accent text-accent-foreground shadow-sm'
                            : 'bg-background/10 text-background/70 hover:bg-background/20 hover:text-background',
                        )}
                      >
                        {p.partLabel}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-background/60">
                  <Tv className="h-3.5 w-3.5 text-accent" />
                  <span>
                    Part {selectedPartIndex + 1} of {currentStory.parts.length}
                  </span>
                </div>
              </div>

              {/* Video Player Box */}
              <div
                ref={containerRef}
                className="group relative aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-background/10"
              >
                {/* HTML5 Video Element */}
                <video
                  ref={videoRef}
                  src={currentPart.src}
                  poster={currentStory.poster}
                  preload="metadata"
                  playsInline
                  onTimeUpdate={handleTimeUpdate}
                  onEnded={handleVideoEnded}
                  onWaiting={() => setIsBuffering(true)}
                  onPlaying={() => setIsBuffering(false)}
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
                      className="absolute inset-0 z-20 flex cursor-pointer flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] transition-all hover:bg-black/30"
                    >
                      <Image
                        src={currentStory.poster}
                        alt={currentStory.title}
                        fill
                        className="object-cover opacity-60"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                      <div className="relative z-10 flex flex-col items-center text-center">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-2xl transition-transform sm:h-20 sm:w-20"
                          aria-label="Play video"
                        >
                          <Play className="ml-1 h-7 w-7 fill-current sm:h-8 sm:w-8" />
                        </motion.button>
                        <h3 className="mt-4 font-serif text-lg font-medium text-background sm:text-xl">
                          {currentPart.title}
                        </h3>
                        <p className="mt-1 text-xs text-background/80 sm:text-sm">
                          Click to play in full original quality
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Custom Overlay Controls (Visible on hover or pause when started) */}
                {hasStarted && (
                  <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 focus-within:opacity-100">
                    {/* Scrub Bar */}
                    <div
                      onClick={handleSeek}
                      className="group/seek relative mb-3 h-1.5 w-full cursor-pointer rounded-full bg-white/20 transition-all hover:h-2.5"
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
                          aria-label="Restart part"
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

                      <div className="flex items-center gap-2">
                        <span className="hidden text-[0.7rem] text-background/60 sm:inline">
                          {currentPart.partLabel}
                        </span>
                        <button
                          type="button"
                          onClick={toggleFullscreen}
                          className="rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
                          aria-label="Fullscreen"
                        >
                          <Maximize2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Active Part Info & Description */}
              <div className="mt-5">
                <div className="flex items-center gap-2 text-accent">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    {currentPart.partLabel} of {currentStory.parts.length}
                  </span>
                </div>
                <h3 className="mt-1 font-serif text-2xl text-background">
                  {currentPart.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-background/75">
                  {currentPart.note}
                </p>
              </div>
            </div>

            {/* Side Story Parts Playlist */}
            <div className="flex flex-col justify-between border-t border-background/15 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-lg font-semibold text-background">
                    Story Breakdown
                  </h4>
                  <span className="rounded-full border border-background/20 px-2.5 py-0.5 text-xs text-background/70">
                    {currentStory.parts.length} Video Parts
                  </span>
                </div>
                <p className="mt-1 text-xs text-background/60">
                  Click any part to jump directly. The player auto-advances smoothly to the next part.
                </p>

                {/* Playlist list */}
                <div className="mt-5 space-y-3">
                  {currentStory.parts.map((part, idx) => {
                    const isCurrent = selectedPartIndex === idx
                    return (
                      <button
                        key={part.src}
                        type="button"
                        onClick={() => handleSelectPart(idx, true)}
                        className={cn(
                          'group/item relative flex w-full items-start gap-3.5 rounded-2xl border p-3.5 text-left transition-all',
                          isCurrent
                            ? 'border-accent bg-accent/20 text-background ring-1 ring-accent'
                            : 'border-background/10 bg-background/5 text-background/75 hover:border-background/25 hover:bg-background/10 hover:text-background',
                        )}
                      >
                        <div
                          className={cn(
                            'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-bold transition-colors',
                            isCurrent
                              ? 'bg-accent text-accent-foreground'
                              : 'bg-background/10 text-background/70 group-hover/item:bg-background/20',
                          )}
                        >
                          {isCurrent && isPlaying ? (
                            <div className="flex items-end gap-0.5 h-3.5">
                              <span className="w-0.5 bg-current animate-[pulse_0.6s_ease-in-out_infinite]" style={{ height: '60%' }} />
                              <span className="w-0.5 bg-current animate-[pulse_0.8s_ease-in-out_infinite]" style={{ height: '100%' }} />
                              <span className="w-0.5 bg-current animate-[pulse_0.5s_ease-in-out_infinite]" style={{ height: '40%' }} />
                            </div>
                          ) : (
                            <span>{part.partNumber}</span>
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-serif text-sm font-semibold">{part.title}</span>
                            {isCurrent && (
                              <span className="shrink-0 text-[0.68rem] font-bold uppercase tracking-wider text-accent">
                                Active
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-xs leading-relaxed text-background/60">
                            {part.note}
                          </p>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Story Context Box */}
              <div className="mt-6 rounded-2xl border border-background/10 bg-background/5 p-4 text-xs leading-relaxed text-background/70">
                <p className="font-medium text-background">
                  &ldquo;{currentStory.description}&rdquo;
                </p>
                <div className="mt-3 flex items-center gap-2 text-accent">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>Recorded on location in Bhavnagar, Gujarat</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
