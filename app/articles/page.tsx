import { getAllArticles } from '@/lib/articles'
import { PILLARS } from '@/lib/pillars'
import ArticleCard from '@/components/ArticleCard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All Stories',
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
      {/* Hero */}
      <div className="articles-index-hero">
        <div className="section-label">The Archive</div>
        <h1>
          {activePillarData ? activePillarData.name : 'All Stories'}
        </h1>
        <p>{filtered.length} articles</p>
      </div>

      <section style={{ padding: '48px 32px 100px' }}>
        <div className="section-inner" style={{ maxWidth: '1000px' }}>
          {/* Pillar filter tabs */}
          <div
            style={{
              display: 'flex',
              gap: '8px',
              flexWrap: 'wrap',
              marginBottom: '48px',
              justifyContent: 'center',
            }}
          >
            <a
              href="/articles"
              className="btn-secondary"
              style={
                !activePillar
                  ? {
                      borderColor: 'var(--deep-stone)',
                      color: 'var(--deep-stone)',
                      padding: '8px 20px',
                    }
                  : { padding: '8px 20px' }
              }
            >
              All
            </a>
            {PILLARS.map(p => (
              <a
                key={p.slug}
                href={`/articles?pillar=${p.slug}`}
                className="btn-secondary"
                style={
                  activePillar === p.slug
                    ? {
                        borderColor: 'var(--deep-stone)',
                        color: 'var(--deep-stone)',
                        padding: '8px 20px',
                      }
                    : { padding: '8px 20px' }
                }
              >
                {p.name}
              </a>
            ))}
          </div>

          {/* Articles grid */}
          <div className="articles-grid">
            {filtered.map(article => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>

          {filtered.length === 0 && (
            <p
              style={{
                color: 'var(--ash)',
                textAlign: 'center',
                padding: '60px 0',
                fontFamily: 'var(--font-display)',
                fontSize: '1.1rem',
              }}
            >
              No stories in this category yet.
            </p>
          )}
        </div>
      </section>
    </main>
  )
}
