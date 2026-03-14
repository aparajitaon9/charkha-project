import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description:
    "The Charkha Project — research-led stories about India's food, mythology, sacred places, and hidden cultures.",
}

export default function AboutPage() {
  return (
    <main>
      <section className="about-section" style={{ paddingTop: '120px' }}>
        <div className="section-inner">
          <div style={{ maxWidth: '720px' }}>
            <div className="section-eyebrow">Our philosophy</div>
            <h1
              className="section-title"
              style={{ marginBottom: '40px', fontSize: 'clamp(32px, 4vw, 52px)' }}
            >
              India, taken <span>seriously</span>
            </h1>

            <div
              className="about-visual reveal"
              style={{ height: '320px', marginBottom: '52px' }}
            >
              <div className="about-visual-bg" />
              <div className="charkha-symbol">
                <div className="charkha-ring cr1" />
                <div className="charkha-ring cr2" />
                <div className="charkha-ring cr3" />
                <div className="charkha-ring cr4" />
                <div className="cr-center" />
              </div>
              <div className="about-label al-1">Research-led</div>
              <div className="about-label al-2">Globally curious</div>
              <div className="about-label al-3">No tourist clichés</div>
            </div>

            <blockquote className="about-quote reveal">
              &ldquo;The charkha took raw cotton and turned it into something of value
              through patient, daily work.&rdquo;
            </blockquote>

            <p className="about-text reveal">
              The charkha was Gandhi&apos;s symbol for self-reliance: a simple spinning
              wheel that turned raw material into something of value. That&apos;s the
              metaphor we work with here.
            </p>
            <p className="about-text reveal">
              The raw material is the internet —{' '}
              <strong>
                academic papers, regional archives, YouTube documentaries, Reddit
                threads, centuries-old texts, local journalism
              </strong>{' '}
              from towns most international readers have never heard of. We pull from
              all of it. We read what isn&apos;t in English. We find the scholars nobody
              cites. We go ten layers deep on questions that most travel writing treats
              as already answered.
            </p>
            <p className="about-text reveal">Then we spin it into stories.</p>
            <p className="about-text reveal">
              The Charkha Project is for people who find India fascinating but not
              always legible. Not for people who want a highlights reel — for people
              who want to understand why a city like Varanasi exists, what the
              Mahabharata actually says about dharma, how a dish like dosa evolved over
              two thousand years, and which parts of India the guidebooks
              systematically ignore.
            </p>
            <p className="about-text reveal">
              <strong>India, researched not visited.</strong>
            </p>

            <div
              style={{
                marginTop: '40px',
                display: 'flex',
                gap: '14px',
                flexWrap: 'wrap',
              }}
            >
              <a href="/articles" className="btn-primary">
                Start reading ↗
              </a>
              <a href="/#newsletter" className="btn-secondary">
                Join the newsletter
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
