import { MapPin } from 'lucide-react'
import { events } from '@/lib/content'
import { Reveal } from '@/components/reveal'

export function EventsSection() {
  return (
    <section className="bg-secondary/40">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
            Events & Activities
          </p>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-foreground text-balance sm:text-4xl">
            What we&rsquo;re working on.
          </h2>
        </Reveal>

        <ol className="mt-12 border-l border-border">
          {events.map((event, i) => (
            <Reveal as="li" key={event.title} delay={i * 0.06} className="relative pl-8 pb-10 last:pb-0">
              <span className="absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-background bg-accent" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                {event.date}
              </span>
              <h3 className="mt-1 font-serif text-xl text-foreground">{event.title}</h3>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                {event.location}
              </p>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">{event.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
