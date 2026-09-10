import { transparencyCards } from '@/lib/content'
import { Reveal, Stagger, StaggerItem } from '@/components/reveal'

export function TransparencySection() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
            Transparency
          </p>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-foreground text-balance sm:text-4xl">
            Your trust matters.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            We are committed to being open about who we are and how we work.
            Verified reports, financials and registration details will be published
            here as they become available.
          </p>
        </Reveal>

        <Stagger className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {transparencyCards.map((card) => (
            <StaggerItem key={card.title}>
              <article className="h-full rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-serif text-lg text-foreground">{card.title}</h3>
                  {card.pending && (
                    <span className="shrink-0 rounded-full bg-secondary px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-secondary-foreground">
                      Coming soon
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.body}</p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
