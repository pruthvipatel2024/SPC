import { SiteNav } from '@/components/site-nav'
import { Hero } from '@/components/hero'
import { ImpactStrip } from '@/components/impact-strip'
import { AboutSection } from '@/components/about-section'
import { InitiativeSection } from '@/components/initiative-section'
import { OurWork } from '@/components/our-work'
import { StoriesSection } from '@/components/stories-section'
import { JourneySection } from '@/components/journey-section'
import { GallerySection } from '@/components/gallery-section'
import { NewsSection } from '@/components/news-section'
import { VolunteerSection } from '@/components/volunteer-section'
import { DonationSection } from '@/components/donation-section'
import { TransparencySection } from '@/components/transparency-section'
import { EventsSection } from '@/components/events-section'
import { ContactSection } from '@/components/contact-section'
import { SiteFooter } from '@/components/site-footer'
import { MobileDonateBar } from '@/components/mobile-donate-bar'

export default function Page() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <ImpactStrip />
        <AboutSection />
        <InitiativeSection />
        <OurWork />
        <StoriesSection />
        <JourneySection />
        <GallerySection />
        <NewsSection />
        <VolunteerSection />
        <DonationSection />
        <TransparencySection />
        <EventsSection />
        <ContactSection />
      </main>
      <SiteFooter />
      <MobileDonateBar />
    </>
  )
}
