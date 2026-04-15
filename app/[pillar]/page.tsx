import { getArticlesByPillar } from '@/lib/articles'
import { getPillarBySlug, getPillarSlugs } from '@/lib/pillars'
import ArticleCard from '@/components/ArticleCard'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

type Props = { params: Promise<{ pillar: string }> }

export function generateStaticParams() {
  return getPillarSlugs().map(slug => ({ pillar: slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pillar: slug } = await params
  const pillar = getPillarBySlug(slug)
  if (!pillar) return {}
  return {
    title: pillar.name,
    description: pillar.description,
  }
}

export default async function PillarPage({ params }: Props) {
  const { pillar: slug } = await params
  const pillar = getPillarBySlug(slug)
  if (!pillar) notFound()

  const articles = getArticlesByPillar(slug)

  return (
    <main>
      {/* Pillar hero */}
      <div className="article-hero">
        <div className="section-label">{pillar.icon} Content Pillar</div>
        <h1 className="article-hero-title">{pillar.name}</h1>
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.05rem',
            color: 'var(--temple-grey)',
            maxWidth: '540px',
            lineHeight: 2,
            textAlign: 'center',
          }}
        >
          {pillar.description}
        </p>
      </div>

      {/* Articles */}
      <section style={{ padding: '48px 32px 100px' }}>
        <div className="section-inner" style={{ maxWidth: '1000px' }}>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.65rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase' as const,
              color: 'var(--ash)',
              marginBottom: '32px',
            }}
          >
            {articles.length} {articles.length === 1 ? 'story' : 'stories'}
          </p>

          <div className="articles-grid">
            {articles.map(article => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>

          {articles.length === 0 && (
            <p
              style={{
                color: 'var(--ash)',
                textAlign: 'center',
                padding: '60px 0',
                fontFamily: 'var(--font-display)',
                fontSize: '1.1rem',
              }}
            >
              Stories coming soon.{' '}
              <a href="/#newsletter" style={{ color: 'var(--brass)' }}>
                Subscribe to be notified.
              </a>
            </p>
          )}
        </div>
      </section>
    </main>
  )
}
