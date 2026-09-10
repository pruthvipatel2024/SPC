'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { CheckCircle2 } from 'lucide-react'
import { volunteerInterests } from '@/lib/content'
import { Reveal } from '@/components/reveal'

const fieldClass =
  'w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/20'
const labelClass = 'mb-1.5 block text-sm font-medium text-foreground'

export function VolunteerSection() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <section id="volunteer" className="scroll-mt-20 bg-background">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
            Get Involved
          </p>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-foreground text-balance sm:text-4xl lg:text-5xl">
            You can be part of the change.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
            Change becomes possible when communities come together. Whether you can
            give an hour or an afternoon, your time helps a child move forward.
          </p>
          <ul className="mt-8 space-y-3">
            {['Work directly with children and families', 'Support education and outreach', 'Help spread awareness across Bhavnagar'].map(
              (item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  {item}
                </li>
              ),
            )}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-14 text-center"
                >
                  <CheckCircle2 className="h-14 w-14 text-primary" aria-hidden="true" />
                  <h3 className="mt-4 font-serif text-2xl text-foreground">Thank you for stepping forward.</h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                    We&rsquo;ve received your interest and our team will reach out to
                    you soon. Together, we move closer to a Child Beggar-Free Bhavnagar.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-sm font-semibold text-primary underline underline-offset-4"
                  >
                    Submit another response
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={(e) => {
                    e.preventDefault()
                    setSubmitted(true)
                  }}
                  className="space-y-5"
                >
                  <h3 className="font-serif text-xl text-foreground">Become a volunteer</h3>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="v-name" className={labelClass}>Full name</label>
                      <input id="v-name" name="name" required className={fieldClass} placeholder="Your name" />
                    </div>
                    <div>
                      <label htmlFor="v-phone" className={labelClass}>Phone</label>
                      <input id="v-phone" name="phone" type="tel" required className={fieldClass} placeholder="Phone number" />
                    </div>
                    <div>
                      <label htmlFor="v-email" className={labelClass}>Email</label>
                      <input id="v-email" name="email" type="email" required className={fieldClass} placeholder="you@example.com" />
                    </div>
                    <div>
                      <label htmlFor="v-city" className={labelClass}>City</label>
                      <input id="v-city" name="city" className={fieldClass} placeholder="Bhavnagar" />
                    </div>
                    <div>
                      <label htmlFor="v-interest" className={labelClass}>Area of interest</label>
                      <select id="v-interest" name="interest" className={fieldClass} defaultValue="">
                        <option value="" disabled>Choose an area</option>
                        {volunteerInterests.map((i) => (
                          <option key={i} value={i}>{i}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="v-availability" className={labelClass}>Availability</label>
                      <select id="v-availability" name="availability" className={fieldClass} defaultValue="">
                        <option value="" disabled>When are you free?</option>
                        <option>Weekdays</option>
                        <option>Weekends</option>
                        <option>Flexible</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="v-message" className={labelClass}>Message</label>
                    <textarea id="v-message" name="message" rows={3} className={fieldClass} placeholder="Tell us a little about yourself" />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
                  >
                    Submit application
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
