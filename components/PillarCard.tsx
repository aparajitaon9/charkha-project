import Link from 'next/link'
import { Pillar } from '@/lib/pillars'

export default function PillarCard({ pillar, index, count }: { pillar: Pillar; index: number; count?: number }) {
  return (
    <Link href={`/${pillar.slug}`} className="pillar-card">
      <div className="pillar-icon">{pillar.icon}</div>
      <div className="pillar-name">{pillar.name}</div>
      <div className="pillar-desc">{pillar.description}</div>
      <div className="pillar-count">
        {count ?? pillar.articleCount} stories
      </div>
    </Link>
  )
}
