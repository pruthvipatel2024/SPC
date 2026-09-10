import { impactPillars } from '@/lib/content'
import { Reveal, Stagger, StaggerItem } from '@/components/reveal'

export function ImpactStrip() {
  return (
    <section className="border-b border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
            Our Mission in Action
          </p>
          <h2 className="mt-3 max-w-2xl font-serif text-2xl leading-tight text-foreground text-balance sm:text-3xl">
            A single, clear purpose guides everything we do.
          </h2>
        </Reveal>

        <Stagger className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {impactPillars.map((pillar) => (
            <StaggerItem key={pillar.title} className="bg-background p-7">
              <h3 className="font-serif text-xl text-primary">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pillar.note}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
