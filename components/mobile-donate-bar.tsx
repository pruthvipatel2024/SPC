'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Heart, MessageCircle } from 'lucide-react'
import { org } from '@/lib/content'

export function MobileDonateBar() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 backdrop-blur-md lg:hidden"
        >
          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${org.whatsapp.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact us on WhatsApp"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/25 text-primary"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href="#donate"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground"
            >
              <Heart className="h-4 w-4" aria-hidden="true" />
              Donate Now
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
