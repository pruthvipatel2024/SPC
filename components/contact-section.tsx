'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { MapPin, Phone, Mail, MessageCircle, CheckCircle2 } from 'lucide-react'
import { InstagramIcon } from '@/components/social-icons'
import { org, contactReasons } from '@/lib/content'
import { Reveal } from '@/components/reveal'

const fieldClass =
  'w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/20'
const labelClass = 'mb-1.5 block text-sm font-medium text-foreground'

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false)

  const details = [
    { icon: MapPin, label: 'Address', value: org.addressLines.join(', ') },
    { icon: Phone, label: 'Phone', value: org.phone, href: `tel:${org.phone.replace(/\s/g, '')}` },
    { icon: Mail, label: 'Email', value: org.email, href: `mailto:${org.email}` },
    { icon: InstagramIcon, label: 'Instagram', value: org.instagramHandle, href: org.instagram },
    { icon: MessageCircle, label: 'WhatsApp', value: 'Message us', href: `https://wa.me/${org.whatsapp.replace(/\D/g, '')}` },
  ]

  return (
    <section id="contact" className="scroll-mt-20 bg-background">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Contact</p>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-foreground text-balance sm:text-4xl lg:text-5xl">
              Let&rsquo;s work together.
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
              Whether you want to volunteer, support our work or simply learn more,
              we&rsquo;d love to hear from you.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <ul className="mt-8 space-y-4">
              {details.map((d) => {
                const Icon = d.icon
                const content = (
                  <span className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/8 text-primary">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground">{d.label}</span>
                      <span className="mt-0.5 block text-sm text-foreground">{d.value}</span>
                    </span>
                  </span>
                )
                return (
                  <li key={d.label}>
                    {d.href ? (
                      <a
                        href={d.href}
                        target={d.href.startsWith('http') ? '_blank' : undefined}
                        rel={d.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="transition-opacity hover:opacity-75"
                      >
                        {content}
                      </a>
                    ) : (
                      content
                    )}
                  </li>
                )
              })}
            </ul>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-8 overflow-hidden rounded-2xl border border-border">
              <iframe
                title="Map of Bhavnagar, Gujarat"
                src={`https://www.google.com/maps?q=${encodeURIComponent(org.mapQuery)}&output=embed`}
                className="h-56 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <CheckCircle2 className="h-14 w-14 text-primary" aria-hidden="true" />
                  <h3 className="mt-4 font-serif text-2xl text-foreground">Message sent.</h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                    Thank you for reaching out. We&rsquo;ll get back to you as soon as we can.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-sm font-semibold text-primary underline underline-offset-4"
                  >
                    Send another message
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
                  <h3 className="font-serif text-xl text-foreground">Send a message</h3>
                  <div>
                    <label htmlFor="c-name" className={labelClass}>Name</label>
                    <input id="c-name" name="name" required className={fieldClass} placeholder="Your name" />
                  </div>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="c-phone" className={labelClass}>Phone</label>
                      <input id="c-phone" name="phone" type="tel" className={fieldClass} placeholder="Phone number" />
                    </div>
                    <div>
                      <label htmlFor="c-email" className={labelClass}>Email</label>
                      <input id="c-email" name="email" type="email" required className={fieldClass} placeholder="you@example.com" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="c-reason" className={labelClass}>Reason for contact</label>
                    <select id="c-reason" name="reason" className={fieldClass} defaultValue="">
                      <option value="" disabled>Select a reason</option>
                      {contactReasons.map((r) => (
                        <option key={r}>{r}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="c-message" className={labelClass}>Message</label>
                    <textarea id="c-message" name="message" rows={4} required className={fieldClass} placeholder="How can we help?" />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
                  >
                    Send message
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
