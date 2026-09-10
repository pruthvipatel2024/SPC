'use client'

import { useState } from 'react'
import { Heart, ShieldCheck, ReceiptText, Info } from 'lucide-react'
import { donationTiers, org } from '@/lib/content'
import { Reveal } from '@/components/reveal'
import { cn } from '@/lib/utils'

export function DonationSection() {
  const [selected, setSelected] = useState<number | null>(1000)
  const [custom, setCustom] = useState('')

  const amount = custom ? Number(custom) : selected

  return (
    <section id="donate" className="scroll-mt-20 bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Donate</p>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-balance sm:text-4xl lg:text-5xl">
            Help a child take the next step.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-primary-foreground/80">
            Your support can help create access to education, guidance and
            opportunity for children who need it most.
          </p>

          <ul className="mt-8 space-y-4">
            <li className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
              <span className="text-sm leading-relaxed text-primary-foreground/80">
                Support is directed toward outreach, education access and family
                guidance in Bhavnagar.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ReceiptText className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
              <span className="text-sm leading-relaxed text-primary-foreground/80">
                Receipt and donation details will be provided once a secure payment
                gateway is connected.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
              <span className="text-sm leading-relaxed text-primary-foreground/80">
                Any applicable tax-benefit information will be shown here only once
                verified by the organization.
              </span>
            </li>
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-3xl bg-background p-6 text-foreground shadow-xl sm:p-8">
            <h3 className="font-serif text-xl">Choose an amount</h3>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {donationTiers.map((tier) => (
                <button
                  key={tier.amount}
                  type="button"
                  onClick={() => {
                    setSelected(tier.amount)
                    setCustom('')
                  }}
                  className={cn(
                    'rounded-2xl border p-4 text-left transition-colors',
                    selected === tier.amount && !custom
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/40',
                  )}
                >
                  <span className="block font-serif text-2xl text-primary">{tier.label}</span>
                  <span className="mt-1 block text-xs leading-snug text-muted-foreground">{tier.note}</span>
                </button>
              ))}
            </div>

            <div className="mt-4">
              <label htmlFor="custom-amount" className="mb-1.5 block text-sm font-medium">
                Custom amount
              </label>
              <div className="flex items-center rounded-xl border border-border bg-background px-4 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
                <span className="text-muted-foreground">&#8377;</span>
                <input
                  id="custom-amount"
                  type="number"
                  min={1}
                  inputMode="numeric"
                  value={custom}
                  onChange={(e) => {
                    setCustom(e.target.value)
                    setSelected(null)
                  }}
                  placeholder="Enter amount"
                  className="w-full bg-transparent px-2 py-3 text-sm outline-none"
                />
              </div>
            </div>

            <button
              type="button"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={!amount || amount <= 0}
              onClick={() =>
                alert(
                  `Thank you! Secure online payments (UPI / Razorpay / Stripe) will be enabled here soon. Your intended contribution: \u20B9${amount}.`,
                )
              }
            >
              <Heart className="h-4 w-4" aria-hidden="true" />
              Donate {amount ? `\u20B9${amount}` : 'Now'}
            </button>

            <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">
              Online payments are not yet live. This form is ready for a secure
              gateway (UPI / Razorpay / Stripe). To contribute now, contact us at{' '}
              <a href={`mailto:${org.email}`} className="font-medium text-primary underline underline-offset-2">
                {org.email}
              </a>
              .
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
