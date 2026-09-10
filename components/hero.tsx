'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { ArrowRight, ArrowDown } from 'lucide-react'
import { org } from '@/lib/content'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '18%'])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.12])

  return (
    <section ref={ref} id="top" className="relative min-h-[100svh] w-full overflow-hidden">
      <motion.div style={{ y: imageY, scale: imageScale }} className="absolute inset-0">
        <Image
          src="/images/hero.png"
          alt="Children learning together with the support of Shree Padma Charitable Trust in Bhavnagar"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Editorial dark wash for legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/55 to-primary/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-foreground/20" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-16 pt-32 sm:px-8 sm:pb-20 lg:justify-center lg:pb-24">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-xs font-semibold uppercase tracking-[0.28em] text-background/80"
          >
            {org.name}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 font-serif text-4xl font-medium leading-[1.05] text-background text-balance sm:text-5xl lg:text-6xl"
          >
            Every child deserves a future beyond begging.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xl text-base leading-relaxed text-background/85 sm:text-lg"
          >
            We work toward a Child Beggar-Free Bhavnagar by helping children move
            from the streets toward education, dignity and opportunity.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <a
              href="#donate"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground shadow-lg transition-transform hover:-translate-y-0.5"
            >
              Support Our Mission
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <a
              href="#work"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-background/40 bg-background/10 px-7 py-3.5 text-sm font-semibold text-background backdrop-blur-sm transition-colors hover:bg-background/20"
            >
              See Our Work
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-14 flex items-center gap-3 lg:absolute lg:bottom-8 lg:left-1/2 lg:mt-0 lg:-translate-x-1/2"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-background/40 text-background">
            <ArrowDown className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="text-xs font-medium uppercase tracking-[0.22em] text-background/80">
            Working for a Child Beggar-Free Bhavnagar
          </span>
        </motion.div>
      </div>
    </section>
  )
}
