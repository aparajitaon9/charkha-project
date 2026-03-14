import { describe, it, expect } from 'vitest'
import { PILLARS, getPillarBySlug, getPillarSlugs } from '../pillars'

describe('PILLARS', () => {
  it('has exactly 5 pillars', () => {
    expect(PILLARS).toHaveLength(5)
  })

  it('all pillars have required fields', () => {
    PILLARS.forEach(p => {
      expect(p.slug).toBeTruthy()
      expect(p.name).toBeTruthy()
      expect(p.description).toBeTruthy()
      expect(p.icon).toBeTruthy()
      expect(p.cardClass).toBeTruthy()
      expect(p.accentClass).toBeTruthy()
    })
  })

  it('first 4 pillars match original design order', () => {
    expect(PILLARS[0].slug).toBe('sacred-india')
    expect(PILLARS[1].slug).toBe('mythology')
    expect(PILLARS[2].slug).toBe('food-culture')
    expect(PILLARS[3].slug).toBe('plan-india')
  })
})

describe('getPillarBySlug', () => {
  it('returns pillar for valid slug', () => {
    const p = getPillarBySlug('mythology')
    expect(p?.name).toBe('Mythology')
  })

  it('returns undefined for unknown slug', () => {
    expect(getPillarBySlug('unknown')).toBeUndefined()
  })
})

describe('getPillarSlugs', () => {
  it('returns array of 5 slugs', () => {
    expect(getPillarSlugs()).toHaveLength(5)
  })
})
