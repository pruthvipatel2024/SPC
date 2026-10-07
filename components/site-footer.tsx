import { MessageCircle } from 'lucide-react'
import { InstagramIcon, FacebookIcon, YoutubeIcon } from '@/components/social-icons'
import { org } from '@/lib/content'
import { Wordmark } from '@/components/logo'

const footerNav = [
  { label: 'About', href: '#about' },
  { label: 'Our Work', href: '#work' },
  { label: 'Impact', href: '#journey' },
  { label: 'Video Stories', href: '#stories' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Media & News', href: '#news' },
  { label: 'Volunteer', href: '#volunteer' },
  { label: 'Donate', href: '#donate' },
  { label: 'Contact', href: '#contact' },
]

const socials = [
  { label: 'Instagram', href: org.instagram, icon: InstagramIcon },
  { label: 'Facebook', href: '#', icon: FacebookIcon },
  { label: 'YouTube', href: '#', icon: YoutubeIcon },
  { label: 'WhatsApp', href: `https://wa.me/${org.whatsapp.replace(/\D/g, '')}`, icon: MessageCircle },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <div className="rounded-xl bg-background/95 p-3 [display:inline-block]">
              <Wordmark />
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-primary-foreground/75">
              Working toward a Child Beggar-Free Bhavnagar by creating pathways to
              education, dignity and opportunity.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((s) => {
                const Icon = s.icon
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-primary-foreground/25 text-primary-foreground transition-colors hover:bg-primary-foreground hover:text-primary"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                )
              })}
            </div>
          </div>

          <nav aria-label="Footer">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/60">
              Explore
            </h3>
            <ul className="mt-4 grid grid-cols-2 gap-y-2.5 gap-x-6">
              {footerNav.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-primary-foreground/80 transition-colors hover:text-primary-foreground">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/60">
              Reach Us
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-primary-foreground/80">
              <li>{org.location}</li>
              <li>
                <a href={`tel:${org.phone.replace(/\s/g, '')}`} className="transition-colors hover:text-primary-foreground">
                  {org.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${org.email}`} className="transition-colors hover:text-primary-foreground">
                  {org.email}
                </a>
              </li>
              <li>
                <a href={org.instagram} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-primary-foreground">
                  {org.instagramHandle}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-primary-foreground/15 pt-6 text-sm text-primary-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {org.name}. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="#" className="transition-colors hover:text-primary-foreground">Privacy Policy</a>
            <a href="#" className="transition-colors hover:text-primary-foreground">Terms</a>
            <a href="#" className="transition-colors hover:text-primary-foreground">Child Safeguarding & Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
