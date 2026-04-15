import Link from 'next/link'
import { Article } from '@/lib/articles'
import { PILLARS } from '@/lib/pillars'

type Props = {
  article: Article
  featured?: boolean
}

export default function ArticleCard({ article, featured = false }: Props) {
  const pillar = PILLARS.find(p => p.slug === article.pillar)

  return (
    <Link
      href={`/articles/${article.slug}`}
      className={`article-card${featured ? ' featured' : ''}`}
    >
      <span className="card-cat-badge">{pillar?.name ?? article.pillar}</span>
      <h3 className="card-title">{article.title}</h3>
      {article.excerpt && (
        <p className="card-excerpt">{article.excerpt}</p>
      )}
      <div className="card-footer">
        <span>{article.readTime} min read</span>
        <span className="card-read-link">Read &rarr;</span>
      </div>
    </Link>
  )
}
