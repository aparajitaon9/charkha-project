import Link from 'next/link'
import { Pillar } from '@/lib/pillars'

export default function PillarCard({ pillar, index, count }: { pillar: Pillar; index: number; count?: number }) {
  return (
    <Link href={`/${pillar.slug}`} className={`pillar-card ${pillar.cardClass}`}>
      <div className={`pillar-num ${pillar.numClass}`}>
        Pillar 0{index + 1} · {pillar.name}
      </div>
      <div className="pillar-icon">{pillar.icon}</div>
      <div className="pillar-name">{pillar.name}</div>
      <div className="pillar-desc">{pillar.description}</div>
      <div className="pillar-count">
        <div className="pillar-count-dot" />
        {count ?? pillar.articleCount} deep articles
      </div>
    </Link>
  )
}
