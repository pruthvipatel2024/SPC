'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { journeyStages } from '@/lib/content'
import { Reveal } from '@/components/reveal'

export function JourneySection() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', reduce ? '-8%' : '8%'])

  return (
    <section id="journey" ref={ref} className="scroll-mt-20 bg-background">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
            A Journey Toward Opportunity
          </p>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-foreground text-balance sm:text-4xl">
            Not a before and after &mdash; a path forward.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            We measure progress in possibility, not pity. Every child&rsquo;s path is
            different, but each step forward is worth celebrating.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <div className="relative h-72 overflow-hidden rounded-3xl sm:h-96">
            <motion.div style={{ y }} className="absolute inset-0 scale-110">
              <Image
                src="/images/journey.png"
                alt="A child walking toward a school building at sunrise, symbolising hope and opportunity"
                fill
                sizes="100vw"
                className="object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/25 to-transparent" />
          </div>
        </Reveal>

        <div className="mt-12">
          <div className="flex flex-col gap-4 md:flex-row md:items-stretch md:gap-0">
            {journeyStages.map((stage, i) => (
              <motion.div
                key={stage.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex-1 md:px-4 md:first:pl-0 md:last:pr-0"
              >
                <div className="flex items-center gap-3 md:block">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">
                    {i + 1}
                  </span>
                  <h3 className="font-serif text-xl text-primary md:mt-4">{stage.label}</h3>
                </div>
                <p className="mt-2 pl-11 text-sm leading-relaxed text-muted-foreground md:pl-0">
                  {stage.note}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
