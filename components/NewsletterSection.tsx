'use client'
import { useState } from 'react'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [note, setNote] = useState('Free forever. Unsubscribe any time.')
  const [noteColor, setNoteColor] = useState('var(--muted)')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (email && email.includes('@')) {
      setNote('🎉 Welcome to The Charkha Letter! Check your inbox.')
      setNoteColor('#4DB6AC')
      setEmail('')
    }
  }

  return (
    <section className="newsletter-section" id="newsletter">
      <div className="nl-glow-1" />
      <div className="nl-glow-2" />
      <div className="nl-inner">
        <div className="nl-badge reveal">
          <div className="eyebrow-dot" />
          The Charkha Letter
        </div>
        <h2 className="nl-title reveal">
          One deep <span>India story</span>,<br />every week.
        </h2>
        <p className="nl-sub reveal reveal-delay-1">
          Join readers who want more than a highlights reel. No noise, no travel
          hacks — just properly researched stories about the India most people
          never access.
        </p>
        <form className="nl-form reveal reveal-delay-2" onSubmit={handleSubmit}>
          <input
            className="nl-input"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <button className="nl-btn" type="submit">
            Subscribe free
          </button>
        </form>
        <p className="nl-note reveal reveal-delay-2" style={{ color: noteColor }}>
          {note}
        </p>
        <div className="nl-features reveal reveal-delay-3">
          <div className="nl-feat">
            <div className="nl-feat-dot" style={{ background: 'var(--saffron)' }} />
            Weekly deep story
          </div>
          <div className="nl-feat">
            <div className="nl-feat-dot" style={{ background: '#7B8DD4' }} />
            Mythology explainers
          </div>
          <div className="nl-feat">
            <div className="nl-feat-dot" style={{ background: '#4DB6AC' }} />
            Food histories
          </div>
          <div className="nl-feat">
            <div className="nl-feat-dot" style={{ background: '#E87AB4' }} />
            Hidden India
          </div>
        </div>
      </div>
    </section>
  )
}
