import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description:
    "The Charkha Project — research-led stories about India's food, mythology, sacred places, and hidden cultures.",
}

export default function AboutPage() {
  return (
    <main>
      <div className="article-hero">
        <div className="section-label">Our Philosophy</div>
        <h1 className="article-hero-title">
          India, Taken Seriously
        </h1>
      </div>

      <section style={{ padding: '64px 32px 100px' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <blockquote className="about-quote reveal" style={{ textAlign: 'center' }}>
            &ldquo;The charkha took raw cotton and turned it into something of value
            through patient, daily work.&rdquo;
          </blockquote>

          <div className="brass-line reveal"></div>

          <p className="about-text reveal" style={{ textAlign: 'center' }}>
            The charkha was Gandhi&apos;s symbol for self-reliance: a simple spinning
            wheel that turned raw material into something of value. That&apos;s the
            metaphor we work with here.
          </p>
          <p className="about-text reveal" style={{ textAlign: 'center' }}>
            The raw material is the internet: academic papers, regional archives,
            YouTube documentaries, Reddit threads, centuries-old texts, local
            journalism from towns most international readers have never heard of.
            We pull from all of it. We read what isn&apos;t in English. We find
            the scholars nobody cites. We go ten layers deep on questions that
            most travel writing treats as already answered.
          </p>
          <p className="about-text reveal" style={{ textAlign: 'center' }}>
            Then we spin it into stories.
          </p>
          <p className="about-text reveal" style={{ textAlign: 'center' }}>
            The Charkha Project is for people who find India fascinating but not
            always legible. Not for people who want a highlights reel. For people
            who want to understand why a city like Varanasi exists, what the
            Mahabharata actually says about dharma, how a dish like dosa evolved
            over two thousand years, and which parts of India the guidebooks
            systematically ignore.
          </p>
          <p className="about-text reveal" style={{ textAlign: 'center', color: 'var(--deep-stone)' }}>
            India, researched not visited.
          </p>

          <div
            style={{
              marginTop: '48px',
              display: 'flex',
              gap: '14px',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
            className="reveal"
          >
            <a href="/articles" className="btn-primary">
              Start reading
            </a>
            <a href="/#newsletter" className="btn-secondary">
              Join the newsletter
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
