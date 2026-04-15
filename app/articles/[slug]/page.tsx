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
      {/* Article hero — full-screen title card */}
      <div className="article-hero">
        <Link href={`/${article.pillar}`} className="article-hero-pillar">
          {pillar?.name ?? article.pillar}
        </Link>
        <h1 className="article-hero-title">{article.title}</h1>
        <div className="article-hero-meta">
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

      {/* Article body */}
      <section style={{ padding: '64px 32px 100px' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          {article.excerpt && (
            <p className="article-excerpt-block">
              {article.excerpt}
            </p>
          )}

          {article.isStub ? (
            <div className="article-stub">
              <p className="article-stub-title">
                Story being woven...
              </p>
              <p className="article-stub-text">
                This piece is being researched. The Charkha spins slowly,
                but what it makes lasts. Subscribe to know when it&apos;s ready.
              </p>
              <a href="/#newsletter" className="btn-primary">
                Newsletter
              </a>
            </div>
          ) : (
            <div
              className="article-body"
              dangerouslySetInnerHTML={{ __html: article.bodyHtml }}
            />
          )}

          {/* Navigation */}
          <div className="article-nav">
            <Link href="/articles" className="btn-secondary">
              &larr; All stories
            </Link>
            {pillar && (
              <Link href={`/${article.pillar}`} className="btn-secondary">
                More {pillar.name} &rarr;
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
