'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <nav>
      <div className="nav-inner">
        <Link href="/" className="nav-logo">
          <div className="nav-logo-dot" />
          The Charkha Project
        </Link>
        <ul className="nav-links">
          <li><Link href="/sacred-india">Sacred India</Link></li>
          <li><Link href="/food-culture">Food</Link></li>
          <li><Link href="/hidden-india">Hidden India</Link></li>
          <li><Link href="/mythology">Mythology</Link></li>
          <li><Link href="/articles">Read</Link></li>
          <li><Link href="/#newsletter" className="nav-cta">Newsletter ↗</Link></li>
        </ul>
        <button
          className="hamburger"
          onClick={() => setOpen(v => !v)}
          aria-label="Toggle navigation"
        >
          <span style={open ? { transform: 'rotate(45deg) translate(5px,5px)' } : {}} />
          <span style={open ? { opacity: 0 } : {}} />
          <span style={open ? { transform: 'rotate(-45deg) translate(5px,-5px)' } : {}} />
        </button>
      </div>
      <div className={`mobile-nav${open ? ' open' : ''}`}>
        <Link href="/sacred-india" onClick={() => setOpen(false)}>Sacred India</Link>
        <Link href="/food-culture" onClick={() => setOpen(false)}>Food & Culture</Link>
        <Link href="/hidden-india" onClick={() => setOpen(false)}>Hidden India</Link>
        <Link href="/mythology" onClick={() => setOpen(false)}>Mythology</Link>
        <Link href="/articles" onClick={() => setOpen(false)}>All Articles</Link>
        <Link
          href="/#newsletter"
          onClick={() => setOpen(false)}
          style={{ color: 'var(--saffron)' }}
        >
          Newsletter →
        </Link>
      </div>
    </nav>
  )
}
