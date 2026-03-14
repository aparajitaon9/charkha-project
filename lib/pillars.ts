export type Pillar = {
  slug: string
  name: string
  description: string
  icon: string
  cardClass: string      // CSS class for pillar card hover colour
  accentClass: string    // CSS class for article card gradient
  numClass: string       // CSS class for pillar number text colour
  articleCount: number
}

// Order matters — first 4 are shown on the home page pillars grid
export const PILLARS: Pillar[] = [
  {
    slug: 'sacred-india',
    name: 'Sacred India',
    description: 'Temples, rituals, and mythology — the spiritual architecture of a civilisation that never stopped building.',
    icon: '🕌',
    cardClass: 'pc-sacred',
    accentClass: 'ac-sacred',
    numClass: 'pn-sacred',
    articleCount: 25,
  },
  {
    slug: 'mythology',
    name: 'Mythology',
    description: 'The Ramayana, the Mahabharata, 30 million gods, and the cosmic stories that still shape a billion lives today.',
    icon: '🔱',
    cardClass: 'pc-myth',
    accentClass: 'ac-myth',
    numClass: 'pn-myth',
    articleCount: 20,
  },
  {
    slug: 'food-culture',
    name: 'Food & Culture',
    description: "Two thousand years of spice, fermentation, and meaning. India's food is not a cuisine — it's a civilisation on a plate.",
    icon: '🍛',
    cardClass: 'pc-food',
    accentClass: 'ac-food',
    numClass: 'pn-food',
    articleCount: 25,
  },
  {
    slug: 'plan-india',
    name: 'Plan India',
    description: 'Practical guidance for first-timers and returning wanderers. Itineraries, logistics, and insider knowledge.',
    icon: '🗺',
    cardClass: 'pc-plan',
    accentClass: 'ac-plan',
    numClass: 'pn-plan',
    articleCount: 30,
  },
  {
    slug: 'hidden-india',
    name: 'Hidden India',
    description: 'The places the guidebooks skip, the histories nobody tells, and the corners of India that reward the curious.',
    icon: '🏛',
    cardClass: 'pc-plan',
    accentClass: 'ac-hidden',
    numClass: 'pn-plan',
    articleCount: 15,
  },
]

export function getPillarBySlug(slug: string): Pillar | undefined {
  return PILLARS.find(p => p.slug === slug)
}

export function getPillarSlugs(): string[] {
  return PILLARS.map(p => p.slug)
}
