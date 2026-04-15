import { getAllArticles, getFeaturedArticle } from '@/lib/articles'
import { PILLARS } from '@/lib/pillars'
import ArticleCard from '@/components/ArticleCard'
import PillarCard from '@/components/PillarCard'
import NewsletterSection from '@/components/NewsletterSection'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Charkha Project — India, Researched Not Visited',
}

export default function HomePage() {
  const allArticles = getAllArticles()
  const featured = getFeaturedArticle() ?? allArticles[0]
  const recentArticles = allArticles.filter(a => a.slug !== featured.slug).slice(0, 6)
  const totalCount = allArticles.length

  const pillarCounts = Object.fromEntries(
    PILLARS.map(p => [p.slug, allArticles.filter(a => a.pillar === p.slug).length])
  )

  return (
    <main>
      {/* ═══ HERO ═══ */}
      <section className="hero" id="home">
        <div className="hero-label reveal">India, researched not visited</div>
        <h1 className="hero-h1 reveal">
          Stories the World<br />
          Hasn&apos;t Read Yet
        </h1>
        <div className="brass-line reveal"></div>
        <p className="hero-sub reveal">
          Deep research into India&apos;s food, mythology, spirituality,
          and hidden places. For the culturally curious who want more
          than a highlights reel.
        </p>
        <div className="hero-cta reveal">
          <a href="#articles" className="btn-primary">Start reading</a>
          <a href="#newsletter" className="btn-secondary">Join the newsletter</a>
        </div>
        <div className="hero-scroll-hint">
          <div className="scroll-line" />
          <div className="scroll-text">Scroll</div>
        </div>
      </section>

      {/* ═══ FEATURED ARTICLE ═══ */}
      {featured && (
        <section className="scroll-section featured-section" id="featured">
          <div className="section-label reveal">Featured Story</div>
          <div className="brass-line reveal"></div>
          <div className="featured-card reveal">
            <div className="featured-pillar">
              {PILLARS.find(p => p.slug === featured.pillar)?.name ?? featured.pillar}
            </div>
            <h2 className="featured-title">{featured.title}</h2>
            {featured.excerpt && (
              <p className="featured-excerpt">{featured.excerpt}</p>
            )}
            <div className="featured-meta">
              <span>{featured.readTime} min read</span>
              <span>
                {new Date(featured.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
            <Link href={`/articles/${featured.slug}`} className="featured-link">
              Read this story &rarr;
            </Link>
          </div>
        </section>
      )}

      {/* ═══ PILLARS ═══ */}
      <section className="scroll-section pillars-section" id="pillars">
        <div className="section-label reveal">What We Cover</div>
        <h2 className="section-heading reveal">Four Ways Into India</h2>
        <div className="brass-line reveal"></div>
        <div className="pillars-grid reveal">
          {PILLARS.slice(0, 4).map((pillar, i) => (
            <PillarCard key={pillar.slug} pillar={pillar} index={i} count={pillarCounts[pillar.slug]} />
          ))}
        </div>
      </section>

      {/* ═══ ARTICLES ═══ */}
      <section className="articles-section" id="articles">
        <div className="section-inner">
          <div className="section-head reveal">
            <div>
              <div className="section-label" style={{ textAlign: 'left' }}>Latest Stories</div>
              <h2 className="section-heading" style={{ textAlign: 'left', marginBottom: 0 }}>
                What We&apos;ve Been Writing
              </h2>
            </div>
            <Link href="/articles" className="section-link">
              All {totalCount} stories <span>&rarr;</span>
            </Link>
          </div>
          <div className="articles-grid reveal">
            {recentArticles.slice(0, 3).map(a => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
          <div className="articles-row2 reveal reveal-delay-1">
            {recentArticles.slice(3, 6).map(a => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section className="about-section" id="about">
        <div className="about-grid">
          <div className="about-content reveal">
            <div className="section-eyebrow" style={{ textAlign: 'center' }}>Our Philosophy</div>
            <div className="brass-line"></div>
            <blockquote className="about-quote">
              &ldquo;The charkha took raw cotton and turned it into something of
              value through patient, daily work.&rdquo;
            </blockquote>
            <p className="about-text">
              That&apos;s what we do here. The raw material is the internet:
              academic papers, regional archives, YouTube documentaries, Reddit
              threads, centuries-old texts, local journalism from towns most
              international readers have never heard of.
            </p>
            <p className="about-text">
              We pull from all of it. We read what isn&apos;t in English, find the
              scholars nobody cites, go ten layers deep on questions that most
              travel writing treats as already answered. Then we spin it into
              stories.
            </p>
            <p className="about-text">
              The Charkha Project is for people who find India fascinating but not
              always legible. India, taken seriously.
            </p>
            <div style={{ marginTop: '24px', textAlign: 'center' }}>
              <Link href="/about" className="btn-secondary">
                Read our story &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ YOUTUBE ═══ */}
      <section className="youtube-section" id="youtube">
        <div className="section-inner" style={{ textAlign: 'center' }}>
          <div className="section-label reveal">On YouTube</div>
          <h2 className="section-heading reveal">Watch India Unfold</h2>
          <div className="brass-line reveal"></div>
          <div className="yt-channel-bar reveal">
            <div className="yt-channel-info">
              <div className="yt-avatar">CP</div>
              <div className="yt-channel-text">
                <strong>The Charkha Project</strong>
                <span>Documentary-style videos, every Thursday</span>
              </div>
            </div>
            <a
              href="https://youtube.com/@thecharkhaproject"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-yt"
            >
              Subscribe on YouTube
            </a>
          </div>
        </div>
      </section>

      {/* ═══ NEWSLETTER ═══ */}
      <NewsletterSection />
    </main>
  )
}
