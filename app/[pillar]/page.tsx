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
      <section className="pillars-section" style={{ paddingTop: '120px', paddingBottom: '60px' }}>
        <div className="section-inner">
          <div className={`section-eyebrow ${pillar.numClass}`}>
            {pillar.icon} Content pillar
          </div>
          <h1 className="section-title" style={{ marginBottom: '16px' }}>
            {pillar.name}
          </h1>
          <p
            style={{
              fontSize: '16px',
              color: 'var(--muted)',
              maxWidth: '580px',
              lineHeight: 1.75,
              fontWeight: 300,
            }}
          >
            {pillar.description}
          </p>
        </div>
      </section>

      {/* Articles */}
      <section style={{ padding: '40px 32px 100px' }}>
        <div className="section-inner">
          <div className="section-head" style={{ marginBottom: '32px' }}>
            <p style={{ fontSize: '13px', color: 'var(--muted)' }}>
              {articles.length} {articles.length === 1 ? 'story' : 'stories'}
            </p>
          </div>

          <div
            className="articles-row2"
            style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}
          >
            {articles.map(article => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>

          {articles.length === 0 && (
            <p
              style={{
                color: 'var(--muted)',
                textAlign: 'center',
                padding: '60px 0',
                fontSize: '15px',
              }}
            >
              Stories coming soon.{' '}
              <a href="/#newsletter" style={{ color: 'var(--saffron)' }}>
                Subscribe to be notified.
              </a>
            </p>
          )}
        </div>
      </section>
    </main>
  )
}
