'use client'
import { useEffect } from 'react'

export default function ClientScripts() {
  useEffect(() => {
    // Scroll reveal with gentle fade-in
    const revealEls = document.querySelectorAll<HTMLElement>('.reveal')
    const revealObserver = new IntersectionObserver(
      entries =>
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            revealObserver.unobserve(e.target)
          }
        }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    revealEls.forEach(el => revealObserver.observe(el))

    return () => {
      revealObserver.disconnect()
    }
  }, [])

  return null
}
