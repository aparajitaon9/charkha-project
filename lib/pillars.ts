export type Pillar = {
  slug: string
  name: string
  description: string
  icon: string
  cardClass: string
  accentClass: string
  numClass: string
  articleCount: number
}

// Order matters — first 4 are shown on the home page pillars grid
export const PILLARS: Pillar[] = [
  {
    slug: 'sacred-india',
    name: 'Sacred India',
    description: 'Temples, rituals, and mythology. The spiritual architecture of a civilisation that never stopped building.',
    icon: '\u{1F54C}',
    cardClass: '',
    accentClass: '',
    numClass: '',
    articleCount: 25,
  },
  {
    slug: 'mythology',
    name: 'Mythology',
    description: 'The Ramayana, the Mahabharata, 30 million gods, and the cosmic stories that still shape a billion lives.',
    icon: '\u{1F531}',
    cardClass: '',
    accentClass: '',
    numClass: '',
    articleCount: 20,
  },
  {
    slug: 'food-culture',
    name: 'Food & Culture',
    description: "Two thousand years of spice, fermentation, and meaning. India's food is a civilisation on a plate.",
    icon: '\u{1F35B}',
    cardClass: '',
    accentClass: '',
    numClass: '',
    articleCount: 25,
  },
  {
    slug: 'plan-india',
    name: 'Plan India',
    description: 'Practical guidance for first-timers and returning wanderers. Itineraries, logistics, and insider knowledge.',
    icon: '\u{1F5FA}',
    cardClass: '',
    accentClass: '',
    numClass: '',
    articleCount: 30,
  },
  {
    slug: 'hidden-india',
    name: 'Hidden India',
    description: 'The places the guidebooks skip, the histories nobody tells, and the corners of India that reward the curious.',
    icon: '\u{1F3DB}',
    cardClass: '',
    accentClass: '',
    numClass: '',
    articleCount: 15,
  },
]

export function getPillarBySlug(slug: string): Pillar | undefined {
  return PILLARS.find(p => p.slug === slug)
}

export function getPillarSlugs(): string[] {
  return PILLARS.map(p => p.slug)
}
