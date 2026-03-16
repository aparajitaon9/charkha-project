import Link from 'next/link'
import Image from 'next/image'
import { Article } from '@/lib/articles'
import { PILLARS } from '@/lib/pillars'

type Props = {
  article: Article
  featured?: boolean
}

export default function ArticleCard({ article, featured = false }: Props) {
  const pillar = PILLARS.find(p => p.slug === article.pillar)
  const accentClass = pillar?.accentClass ?? 'ac-sacred'

  return (
    <Link
      href={`/articles/${article.slug}`}
      className={`article-card${featured ? ' featured' : ''}`}
    >
      <div className={`article-card-hero ${accentClass}`} style={{ position: 'relative' }}>
        {article.coverImage && (
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            style={{ objectFit: 'cover', opacity: 0.85 }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        )}
        <span className="card-cat-badge" style={{ position: 'relative', zIndex: 1 }}>{pillar?.name ?? article.pillar}</span>
        <span className="card-read-time" style={{ position: 'relative', zIndex: 1 }}>{article.readTime} min</span>
      </div>
      <div className="card-body">
        <h3 className="card-title">{article.title}</h3>
        {article.excerpt && (
          <p className="card-excerpt">{article.excerpt}</p>
        )}
        <div className="card-footer">
          <span>{pillar?.name ?? article.pillar} · {article.readTime} min read</span>
          <span className="card-read-link">Read story <span>→</span></span>
        </div>
      </div>
    </Link>
  )
}
