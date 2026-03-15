# Design: Light Mode + "Story Being Weaved" Callout

**Date:** 2026-03-15
**Status:** Approved

---

## 1. Light / Dark Mode Toggle

### Approach
CSS custom properties with a `data-theme` attribute on `<html>`. JavaScript reads `localStorage` first, falls back to `prefers-color-scheme`, and writes the choice back to `localStorage` on toggle.

### Color Tokens — Light Mode Overrides
```css
[data-theme="light"] {
  --ink:    #FDF6EC;   /* background becomes ivory */
  --ink2:   #F7EDD8;
  --ink3:   #F0E4C8;
  --ivory:  #1A1209;   /* text becomes ink */
  --cream:  #261C10;
  --muted:  #6B5A45;
  --border: rgba(0,0,0,0.08);
}
```
Accent colors (`--saffron`, `--turmeric`, `--marigold`, etc.) are unchanged in both modes.

### Nav changes
- Add a `ThemeToggle` client component (icon button: ☀️ in dark mode, 🌙 in light mode)
- Position: inside `.nav-inner`, before the Newsletter CTA button
- On click: toggle `data-theme` on `<html>`, save to `localStorage`

### Hydration / flash prevention
- Inline `<script>` in `app/layout.tsx` (before any content renders) reads `localStorage` and sets `data-theme` synchronously — prevents flash of wrong theme on page load

### Nav background in light mode
```css
[data-theme="light"] nav {
  background: rgba(253,246,236,0.92);
}
```

---

## 2. "Story Being Weaved..." Callout

### Detection
Stub articles contain the placeholder string `"This article is coming soon"` in their markdown body. The `getArticleBySlug` function already returns `bodyHtml`. We check if the raw body contains this string to determine stub status.

Add a `isStub` boolean to `ArticleWithBody`:
```ts
isStub: bodyHtml.includes('coming soon')
```

### Callout UI (shown instead of article body on stub pages)
```
┌─────────────────────────────────────────────────┐
│  🪡  Story being weaved...                       │
│                                                   │
│  This piece is being researched. The Charkha     │
│  spins slowly — but what it makes lasts.         │
│                                                   │
│  Check back soon, or subscribe to know           │
│  when it's ready.  [Newsletter ↗]                │
└─────────────────────────────────────────────────┘
```
- Left border: `3px solid var(--saffron)`
- Background: subtle warm tint
- Replaces `dangerouslySetInnerHTML` div when `isStub === true`
- Excerpt lede (italic) is still shown above the callout

---

## 3. Files Changed

| File | Change |
|------|--------|
| `styles/globals.css` | Add `[data-theme="light"]` overrides |
| `app/layout.tsx` | Add inline theme script (flash prevention), add `ThemeToggle` to nav area |
| `components/Nav.tsx` | Import and render `ThemeToggle` |
| `components/ThemeToggle.tsx` | New client component — icon button with toggle logic |
| `lib/articles.ts` | Add `isStub` field to `ArticleWithBody` |
| `app/articles/[slug]/page.tsx` | Render callout when `isStub === true` |

---

## 4. Out of Scope
- Per-page theme memory (same theme site-wide)
- Animated theme transition (plain swap is fine)
- Image variants for light/dark (no real images yet)
