import { getAllArticles, getFeaturedArticle } from '@/lib/articles'
import { PILLARS } from '@/lib/pillars'
import ArticleCard from '@/components/ArticleCard'
import PillarCard from '@/components/PillarCard'
import NewsletterSection from '@/components/NewsletterSection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Charkha Project — India, Researched Not Visited',
}

export default function HomePage() {
  const allArticles = getAllArticles()
  const featured = getFeaturedArticle() ?? allArticles[0]
  const row1Secondary = allArticles.filter(a => a.slug !== featured.slug).slice(0, 2)
  const row2 = allArticles.filter(a => a.slug !== featured.slug).slice(2, 5)
  const totalCount = allArticles.length

  const pillarCounts = Object.fromEntries(
    PILLARS.map(p => [p.slug, allArticles.filter(a => a.pillar === p.slug).length])
  )

  return (
    <main>
      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-bg">
          <div className="hero-orb hero-orb-1" />
          <div className="hero-orb hero-orb-2" />
          <div className="hero-orb hero-orb-3" />
          <div className="hero-grain" />
        </div>
        <div className="hero-inner">
          <div className="hero-eyebrow">
            <div className="eyebrow-dot" />
            India — researched, not visited
          </div>
          <h1 className="hero-h1">
            Threads of <span className="c-saffron">India&apos;s</span> soul —<br />
            spun into stories the world<br />
            <span className="c-turmeric">hasn&apos;t read</span>
          </h1>
          <p className="hero-sub">
            Deep research into India&apos;s food, mythology, spirituality, and hidden
            places. For the globally curious who want more than a highlights reel.
          </p>
          <div className="hero-cta">
            <a href="#articles" className="btn-primary">Start reading ↗</a>
            <a href="#newsletter" className="btn-secondary">Join the newsletter</a>
          </div>
          <div className="hero-tags">
            <a href="/sacred-india" className="hero-tag ht-sacred">Sacred India</a>
            <a href="/mythology" className="hero-tag ht-myth">Mythology</a>
            <a href="/food-culture" className="hero-tag ht-food">Food & Culture</a>
            <a href="/hidden-india" className="hero-tag ht-hidden">Hidden Places</a>
            <a href="/plan-india" className="hero-tag ht-plan">Plan Your Trip</a>
          </div>
        </div>
        <div className="hero-scroll-hint">
          <div className="scroll-line" />
          <div className="scroll-text">Scroll</div>
        </div>
      </section>

      {/* STATS BAR */}
      <div className="stats-bar">
        <div className="stats-inner">
          <div className="stat-item reveal">
            <div className="stat-num" data-count={String(totalCount)}>0</div>
            <div className="stat-label">Deep articles</div>
          </div>
          <div className="stat-item reveal reveal-delay-1">
            <div className="stat-num" data-count="0">0</div>
            <div className="stat-label">YouTube videos</div>
          </div>
          <div className="stat-item reveal reveal-delay-2">
            <div className="stat-num" data-count="5">0</div>
            <div className="stat-label">Content pillars</div>
          </div>
          <div className="stat-item reveal reveal-delay-3">
            <div className="stat-num" data-count="0">0</div>
            <div className="stat-label">Curious readers</div>
          </div>
        </div>
      </div>

      {/* PILLARS — show first 4 to match original 4-column grid */}
      <section className="pillars-section" id="pillars">
        <div className="section-inner">
          <div className="section-eyebrow reveal">What we cover</div>
          <div className="section-head reveal">
            <h2 className="section-title">Four ways into <span>India</span></h2>
            <a href="/articles" className="section-link">Browse all stories <span>→</span></a>
          </div>
          <div className="pillars-grid reveal">
            {PILLARS.slice(0, 4).map((pillar, i) => (
              <PillarCard key={pillar.slug} pillar={pillar} index={i} count={pillarCounts[pillar.slug]} />
            ))}
          </div>
        </div>
      </section>

      {/* ARTICLES */}
      <section className="articles-section" id="articles">
        <div className="section-inner">
          <div className="section-eyebrow reveal">Latest stories</div>
          <div className="section-head reveal">
            <h2 className="section-title">What we&apos;ve been <span>spinning</span></h2>
            <a href="/articles" className="section-link">
              All {totalCount} articles <span>→</span>
            </a>
          </div>
          <div className="articles-grid reveal">
            <ArticleCard article={featured} featured />
            {row1Secondary.map(a => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
          <div className="articles-row2 reveal reveal-delay-1">
            {row2.map(a => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </div>
      </section>

      {/* YOUTUBE */}
      <section className="youtube-section" id="youtube">
        <div className="section-inner">
          <div className="section-eyebrow reveal">On YouTube</div>
          <div className="section-head reveal">
            <h2 className="section-title">Watch India <span>unfold</span></h2>
            <a
              href="https://youtube.com/@thecharkhaproject"
              target="_blank"
              rel="noopener noreferrer"
              className="section-link"
            >
              All videos <span>→</span>
            </a>
          </div>
          <div className="yt-channel-bar reveal">
            <div className="yt-channel-info">
              <div className="yt-avatar">CP</div>
              <div className="yt-channel-text">
                <strong>The Charkha Project</strong>
                <span>One new documentary-style video every Thursday</span>
              </div>
            </div>
            <a
              href="https://youtube.com/@thecharkhaproject"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-yt"
            >
              ▶ Subscribe on YouTube
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about-section" id="about">
        <div className="section-inner">
          <div className="about-grid">
            <div className="about-visual reveal">
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
            <div className="about-content reveal reveal-delay-1">
              <div className="section-eyebrow">Our philosophy</div>
              <blockquote className="about-quote">
                &ldquo;The charkha took raw cotton and turned it into something of
                value through patient, daily work.&rdquo;
              </blockquote>
              <p className="about-text">
                That&apos;s what we do here. The raw material is the internet —{' '}
                <strong>
                  academic papers, regional archives, YouTube documentaries, Reddit
                  threads, centuries-old texts, local journalism
                </strong>{' '}
                from towns most international readers have never heard of.
              </p>
              <p className="about-text">
                We pull from all of it. We read what isn&apos;t in English, find the
                scholars nobody cites, go ten layers deep on questions that most
                travel writing treats as already answered. Then we spin it into
                stories.
              </p>
              <p className="about-text">
                The Charkha Project is for people who find India fascinating but not
                always legible. <strong>India, taken seriously.</strong>
              </p>
              <a
                href="/about"
                className="btn-primary"
                style={{ marginTop: '8px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                Read our story ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <NewsletterSection />
    </main>
  )
}
