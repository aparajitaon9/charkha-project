import { describe, it, expect } from 'vitest'
import { getAllArticles, getArticleBySlug, getArticlesByPillar } from '../articles'

describe('getAllArticles', () => {
  it('returns an array', () => {
    expect(Array.isArray(getAllArticles())).toBe(true)
  })

  it('returns at least 6 articles', () => {
    expect(getAllArticles().length).toBeGreaterThanOrEqual(6)
  })

  it('articles have required fields', () => {
    getAllArticles().forEach(a => {
      expect(a.slug).toBeTruthy()
      expect(a.title).toBeTruthy()
      expect(a.pillar).toBeTruthy()
      expect(a.readTime).toBeGreaterThan(0)
    })
  })

  it('articles are sorted newest first', () => {
    const articles = getAllArticles()
    for (let i = 1; i < articles.length; i++) {
      expect(new Date(articles[i].date).getTime())
        .toBeLessThanOrEqual(new Date(articles[i - 1].date).getTime())
    }
  })
})

describe('getArticleBySlug', () => {
  it('returns article with bodyHtml for valid slug', async () => {
    const article = await getArticleBySlug('why-varanasi')
    expect(article).not.toBeNull()
    expect(article?.title).toBe('Why Varanasi is not what you think it is')
    expect(article?.bodyHtml).toContain('<p>')
  })

  it('returns null for unknown slug', async () => {
    expect(await getArticleBySlug('nonexistent-slug')).toBeNull()
  })
})

describe('getArticlesByPillar', () => {
  it('returns only articles matching the pillar', () => {
    getArticlesByPillar('food-culture').forEach(a =>
      expect(a.pillar).toBe('food-culture')
    )
  })

  it('returns empty array for unknown pillar', () => {
    expect(getArticlesByPillar('unknown-pillar')).toHaveLength(0)
  })
})
