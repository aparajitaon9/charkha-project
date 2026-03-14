import { getArticleBySlug, getAllArticles } from '@/lib/articles'
import { PILLARS } from '@/lib/pillars'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllArticles().map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) return {}
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
    },
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) notFound()

  const pillar = PILLARS.find(p => p.slug === article.pillar)

  return (
    <main>
      {/* Article hero banner */}
      <div
        className={`article-card-hero ${pillar?.accentClass ?? 'ac-sacred'}`}
        style={{
          height: '340px',
          display: 'flex',
          alignItems: 'flex-end',
          padding: '48px 32px',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: '800px',
            margin: '0 auto',
            width: '100%',
          }}
        >
          <Link
            href={`/${article.pillar}`}
            className="card-cat-badge"
            style={{ marginBottom: '20px', display: 'inline-block' }}
          >
            {pillar?.name ?? article.pillar}
          </Link>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 4vw, 52px)',
              color: 'var(--ivory)',
              lineHeight: 1.1,
              marginBottom: '16px',
            }}
          >
            {article.title}
          </h1>
          <div
            style={{
              fontSize: '13px',
              color: 'rgba(255,255,255,0.55)',
              display: 'flex',
              gap: '20px',
            }}
          >
            <span>{article.readTime} min read</span>
            <span>
              {new Date(article.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Article body */}
      <section style={{ padding: '64px 32px 100px' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          {article.excerpt && (
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: 'clamp(17px, 2vw, 21px)',
                color: 'var(--muted)',
                lineHeight: 1.65,
                marginBottom: '48px',
                paddingBottom: '48px',
                borderBottom: '1px solid var(--border)',
              }}
            >
              {article.excerpt}
            </p>
          )}

          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: article.bodyHtml }}
          />

          {/* Navigation */}
          <div
            style={{
              marginTop: '64px',
              paddingTop: '32px',
              borderTop: '1px solid var(--border)',
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap',
            }}
          >
            <Link
              href="/articles"
              className="btn-secondary"
              style={{ padding: '10px 20px', fontSize: '13px' }}
            >
              ← All articles
            </Link>
            {pillar && (
              <Link
                href={`/${article.pillar}`}
                className="btn-secondary"
                style={{ padding: '10px 20px', fontSize: '13px' }}
              >
                More {pillar.name} →
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
