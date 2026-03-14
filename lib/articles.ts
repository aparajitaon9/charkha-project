import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const articlesDir = path.join(process.cwd(), 'content/articles')

export type Article = {
  slug: string
  title: string
  pillar: string
  excerpt: string
  readTime: number
  date: string
  featured: boolean
}

export type ArticleWithBody = Article & {
  bodyHtml: string
}

export function getAllArticles(): Article[] {
  const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'))
  return files
    .map(filename => {
      const raw = fs.readFileSync(path.join(articlesDir, filename), 'utf-8')
      const { data } = matter(raw)
      return {
        slug: (data.slug as string) || filename.replace('.md', ''),
        title: data.title as string,
        pillar: data.pillar as string,
        excerpt: (data.excerpt as string) || '',
        readTime: (data.readTime as number) || 5,
        date: data.date
          ? new Date(data.date).toISOString()
          : new Date().toISOString(),
        featured: (data.featured as boolean) || false,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getArticleBySlug(
  slug: string
): Promise<ArticleWithBody | null> {
  const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'))

  const filename = files.find(f => {
    const raw = fs.readFileSync(path.join(articlesDir, f), 'utf-8')
    const { data } = matter(raw)
    return (data.slug as string) === slug || f.replace('.md', '') === slug
  })

  if (!filename) return null

  const raw = fs.readFileSync(path.join(articlesDir, filename), 'utf-8')
  const { data, content } = matter(raw)
  const processed = await remark().use(html).process(content)

  return {
    slug: (data.slug as string) || filename.replace('.md', ''),
    title: data.title as string,
    pillar: data.pillar as string,
    excerpt: (data.excerpt as string) || '',
    readTime: (data.readTime as number) || 5,
    date: data.date
      ? new Date(data.date).toISOString()
      : new Date().toISOString(),
    featured: (data.featured as boolean) || false,
    bodyHtml: processed.toString(),
  }
}

export function getArticlesByPillar(pillar: string): Article[] {
  return getAllArticles().filter(a => a.pillar === pillar)
}

export function getFeaturedArticle(): Article | undefined {
  return getAllArticles().find(a => a.featured)
}
