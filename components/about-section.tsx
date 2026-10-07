import Image from 'next/image'
import { values } from '@/lib/content'
import { Reveal, Stagger, StaggerItem } from '@/components/reveal'

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-20 bg-background">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <Reveal className="relative">
          <div className="relative aspect-4/5 overflow-hidden rounded-3xl">
            <Image
              src="/images/about.png"
              alt="Volunteers of Shree Padm Charitable Trust teaching children in an outdoor community setting"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-2 hidden max-w-[15rem] rounded-2xl border border-border bg-background p-5 shadow-xl sm:block lg:-right-6">
            <p className="font-serif text-lg leading-snug text-primary text-balance">
              &ldquo;Compassion becomes real when it turns into action.&rdquo;
            </p>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
              Who We Are
            </p>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-foreground text-balance sm:text-4xl">
              Turning compassion into action.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Shree Padm Charitable Trust works directly with vulnerable children
              and communities in Bhavnagar, Gujarat. Our focus is clear: to move
              children away from begging and toward education, guidance and lasting
              opportunity.
            </p>
          </Reveal>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Reveal delay={0.05}>
              <div className="rounded-2xl border border-border bg-secondary/30 p-5">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-primary">
                  Mission
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Building a Child Beggar-Free Bhavnagar, one child and one family at a time.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="rounded-2xl border border-border bg-secondary/30 p-5">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-primary">
                  Vision
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  A city where every child grows up with education, dignity and a
                  future of their own choosing.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.05}>
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Our Values
            </p>
          </Reveal>
          <Stagger className="mt-4 flex flex-wrap gap-2.5">
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <span
                  title={value.note}
                  className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary"
                >
                  {value.title}
                </span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  )
}
