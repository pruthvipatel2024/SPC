'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { initiativeSteps } from '@/lib/content'
import { Reveal } from '@/components/reveal'

export function InitiativeSection() {
  return (
    <section className="relative bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
            Our Vision
          </p>
          <h2 className="mt-3 max-w-3xl font-serif text-3xl leading-tight text-balance sm:text-4xl lg:text-5xl">
            A Child Beggar-Free Bhavnagar.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-primary-foreground/75">
            We believe no child belongs on the street. Our work follows a patient,
            respectful path &mdash; meeting each child where they are and walking with
            them and their family toward something better.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Sticky visual */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <Reveal>
              <div className="relative aspect-4/5 overflow-hidden rounded-3xl ring-1 ring-primary-foreground/15">
                <Image
                  src="/images/initiative.png"
                  alt="An outreach worker speaking gently with a child on a street in Bhavnagar"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
                <p className="absolute bottom-6 left-6 right-6 font-serif text-lg leading-snug text-balance">
                  From the street to the classroom &mdash; a journey made possible
                  with patience, trust and support.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Steps */}
          <ol className="flex flex-col">
            {initiativeSteps.map((step, i) => (
              <motion.li
                key={step.no}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="border-t border-primary-foreground/15 py-8 first:border-t-0 first:pt-0"
              >
                <div className="flex items-baseline gap-5">
                  <span className="font-serif text-3xl text-accent">{step.no}</span>
                  <div>
                    <h3 className="font-serif text-2xl">{step.title}</h3>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-primary-foreground/75">
                      {step.body}
                    </p>
                  </div>
                </div>
                {i < initiativeSteps.length - 1 && (
                  <div className="ml-1 mt-6 h-6 w-px bg-primary-foreground/20" aria-hidden="true" />
                )}
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
