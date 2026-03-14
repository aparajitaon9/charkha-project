'use client'
import { useEffect } from 'react'

export default function ClientScripts() {
  useEffect(() => {
    // Scroll reveal
    const revealEls = document.querySelectorAll<HTMLElement>('.reveal')
    const revealObserver = new IntersectionObserver(
      entries =>
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            revealObserver.unobserve(e.target)
          }
        }),
      { threshold: 0.12 }
    )
    revealEls.forEach(el => revealObserver.observe(el))

    // Count-up animation
    function animateCount(el: HTMLElement, target: number) {
      let current = 0
      const step = target / (1800 / 16)
      const timer = setInterval(() => {
        current = Math.min(current + step, target)
        el.textContent = Math.floor(current) + (target >= 100 ? '+' : '')
        if (current >= target) clearInterval(timer)
      }, 16)
    }

    const countObserver = new IntersectionObserver(
      entries =>
        entries.forEach(e => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement
            animateCount(el, parseInt(el.dataset.count || '0'))
            countObserver.unobserve(el)
          }
        }),
      { threshold: 0.5 }
    )
    document
      .querySelectorAll<HTMLElement>('.stat-num[data-count]')
      .forEach(el => countObserver.observe(el))

    // Nav active on scroll
    const sections = document.querySelectorAll<HTMLElement>('section[id]')
    const handleScroll = () => {
      let current = ''
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 100) current = s.id
      })
      document.querySelectorAll<HTMLAnchorElement>('.nav-links a').forEach(a => {
        a.classList.remove('active')
        if (a.getAttribute('href') === '/#' + current) a.classList.add('active')
      })
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
      revealObserver.disconnect()
      countObserver.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return null
}
