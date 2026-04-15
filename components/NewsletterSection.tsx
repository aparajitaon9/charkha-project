'use client'
import { useState } from 'react'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [note, setNote] = useState('Free forever. Unsubscribe any time.')
  const [noteColor, setNoteColor] = useState('var(--incense)')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (email && email.includes('@')) {
      setNote('Welcome to The Charkha Letter. Check your inbox.')
      setNoteColor('var(--brass)')
      setEmail('')
    }
  }

  return (
    <section className="newsletter-section" id="newsletter">
      <div className="nl-inner">
        <div className="nl-label reveal">The Charkha Letter</div>
        <h2 className="nl-title reveal">
          One Deep India Story,<br />Every Week
        </h2>
        <div className="brass-line reveal" style={{ background: 'var(--brass-muted)' }}></div>
        <p className="nl-sub reveal">
          Join readers who want more than a highlights reel. No noise,
          no travel hacks. Just properly researched stories about the
          India most people never access.
        </p>
        <form className="nl-form reveal" onSubmit={handleSubmit}>
          <input
            className="nl-input"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <button className="nl-btn" type="submit">
            Subscribe
          </button>
        </form>
        <p className="nl-note reveal" style={{ color: noteColor }}>
          {note}
        </p>
        <div className="nl-features reveal">
          <div className="nl-feat">
            <div className="nl-feat-dot" />
            Weekly deep story
          </div>
          <div className="nl-feat">
            <div className="nl-feat-dot" />
            Mythology explainers
          </div>
          <div className="nl-feat">
            <div className="nl-feat-dot" />
            Food histories
          </div>
          <div className="nl-feat">
            <div className="nl-feat-dot" />
            Hidden India
          </div>
        </div>
      </div>
    </section>
  )
}
