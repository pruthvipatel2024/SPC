import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { InstagramIcon } from '@/components/social-icons'
import { instagramPosts, org } from '@/lib/content'
import { Reveal, Stagger, StaggerItem } from '@/components/reveal'

export function InstagramSection() {
  return (
    <section className="bg-secondary/40">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
                Follow Our Journey
              </p>
              <h2 className="mt-3 font-serif text-3xl leading-tight text-foreground text-balance sm:text-4xl">
                See our work as it happens.
              </h2>
            </div>
            <a
              href={org.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              <InstagramIcon className="h-4 w-4" />
              Follow {org.instagramHandle}
            </a>
          </div>
        </Reveal>

        <Stagger className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {instagramPosts.map((post) => (
            <StaggerItem key={post.src}>
              <a
                href={org.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square overflow-hidden rounded-xl border border-border"
                aria-label={`View on Instagram: ${post.alt}`}
              >
                <Image
                  src={post.src}
                  alt={post.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-primary/0 text-background opacity-0 transition-all group-hover:bg-primary/40 group-hover:opacity-100">
                  <ArrowUpRight className="h-6 w-6" aria-hidden="true" />
                </span>
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
