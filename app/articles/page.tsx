import { getAllArticles } from '@/lib/articles'
import { PILLARS } from '@/lib/pillars'
import ArticleCard from '@/components/ArticleCard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All Articles',
  description:
    'Browse all articles from The Charkha Project — sacred India, mythology, food & culture, hidden India, and travel planning.',
}

type Props = {
  searchParams: Promise<{ pillar?: string }>
}

export default async function ArticlesPage({ searchParams }: Props) {
  const params = await searchParams
  const all = getAllArticles()
  const activePillar = params.pillar
  const filtered = activePillar ? all.filter(a => a.pillar === activePillar) : all
  const activePillarData = PILLARS.find(p => p.slug === activePillar)

  return (
    <main>
      <section style={{ paddingTop: '100px', padding: '100px 32px 80px' }}>
        <div className="section-inner">
          <div className="section-eyebrow">The archive</div>
          <div className="section-head" style={{ marginBottom: '32px' }}>
            <h1 className="section-title">
              {activePillarData ? (
                <>{activePillarData.name}</>
              ) : (
                <>All <span>stories</span></>
              )}
            </h1>
            <span style={{ fontSize: '13px', color: 'var(--muted)' }}>
              {filtered.length} articles
            </span>
          </div>

          {/* Pillar filter tabs */}
          <div
            style={{
              display: 'flex',
              gap: '10px',
              flexWrap: 'wrap',
              marginBottom: '40px',
            }}
          >
            <a
              href="/articles"
              className="hero-tag"
              style={
                !activePillar
                  ? { borderColor: 'var(--saffron)', color: 'var(--saffron)' }
                  : {}
              }
            >
              All
            </a>
            {PILLARS.map(p => (
              <a
                key={p.slug}
                href={`/articles?pillar=${p.slug}`}
                className="hero-tag"
                style={
                  activePillar === p.slug
                    ? { borderColor: 'var(--saffron)', color: 'var(--saffron)' }
                    : {}
                }
              >
                {p.name}
              </a>
            ))}
          </div>

          {/* Articles grid */}
          <div
            className="articles-row2"
            style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}
          >
            {filtered.map(article => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>

          {filtered.length === 0 && (
            <p
              style={{
                color: 'var(--muted)',
                textAlign: 'center',
                padding: '60px 0',
              }}
            >
              No articles in this category yet. Check back soon.
            </p>
          )}
        </div>
      </section>
    </main>
  )
}
