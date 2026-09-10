import Image from 'next/image'
import { stories } from '@/lib/content'
import { Reveal, Stagger, StaggerItem } from '@/components/reveal'

export function StoriesSection() {
  return (
    <section id="stories" className="scroll-mt-20 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
            Real Stories
          </p>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-foreground text-balance sm:text-4xl">
            A child&rsquo;s story can change everything.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Behind every child we meet is a story, a family and a future waiting to
            be supported. These accounts are shared with care to protect privacy and
            dignity.
          </p>
        </Reveal>

        <Stagger className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {stories.map((story) => (
            <StaggerItem key={story.title}>
              <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card">
                <div className="relative aspect-4/3 overflow-hidden">
                  <Image
                    src={story.image}
                    alt={story.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="font-serif text-xl text-foreground">{story.title}</h3>
                  <dl className="mt-4 space-y-3 text-sm">
                    <div>
                      <dt className="font-semibold uppercase tracking-wide text-[0.68rem] text-accent">Situation</dt>
                      <dd className="mt-0.5 leading-relaxed text-muted-foreground">{story.situation}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold uppercase tracking-wide text-[0.68rem] text-accent">Intervention</dt>
                      <dd className="mt-0.5 leading-relaxed text-muted-foreground">{story.intervention}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold uppercase tracking-wide text-[0.68rem] text-accent">Outcome</dt>
                      <dd className="mt-0.5 leading-relaxed text-muted-foreground">{story.outcome}</dd>
                    </div>
                  </dl>
                  <blockquote className="mt-6 border-l-2 border-accent pl-4 font-serif text-base italic leading-snug text-primary text-pretty">
                    &ldquo;{story.quote}&rdquo;
                  </blockquote>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1}>
          <p className="mt-8 text-xs leading-relaxed text-muted-foreground">
            Note: Stories are illustrative composites and photographs are used
            respectfully. Verified, consented stories from the organization will
            replace these as they become available.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
