import { BookOpen, HeartHandshake, Users, Megaphone, Compass } from 'lucide-react'
import { workAreas } from '@/lib/content'
import { Reveal, Stagger, StaggerItem } from '@/components/reveal'

const icons = [BookOpen, HeartHandshake, Users, Megaphone, Compass]

export function OurWork() {
  return (
    <section id="work" className="scroll-mt-20 bg-background">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
                Our Work
              </p>
              <h2 className="mt-3 max-w-xl font-serif text-3xl leading-tight text-foreground text-balance sm:text-4xl">
                Focused work, grounded in the community.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Each area of our work supports the same goal &mdash; helping children
              step away from begging and toward education and dignity.
            </p>
          </div>
        </Reveal>

        <Stagger className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {workAreas.map((area, i) => {
            const Icon = icons[i % icons.length]
            return (
              <StaggerItem key={area.title}>
                <article className="group h-full rounded-2xl border border-border bg-card p-7 transition-colors hover:border-primary/30">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/8 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-serif text-xl text-foreground">{area.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{area.body}</p>
                </article>
              </StaggerItem>
            )
          })}
        </Stagger>
      </div>
    </section>
  )
}
