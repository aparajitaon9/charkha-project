# Light Mode Toggle + Stub Callout Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add dark/light mode toggle (with system preference detection + localStorage persistence) and a "Story being weaved..." callout on stub articles that haven't been written yet.

**Architecture:** CSS custom properties on `[data-theme="light"]` override the dark-mode tokens on `:root`. A `ThemeToggle` client component writes `data-theme` to `<html>` and persists in `localStorage`. An inline `<script>` in layout prevents flash-of-wrong-theme on load. Stub detection uses `isStub` boolean on `ArticleWithBody`, set when `bodyHtml` contains the placeholder string.

**Tech Stack:** Next.js 16 App Router, CSS custom properties, React `useEffect`/`useState`, localStorage, Vitest

---

### Task 1: Fix broken test slug + add `isStub` to ArticleWithBody (TDD)

**Files:**
- Modify: `lib/articles.ts`
- Modify: `lib/__tests__/articles.test.ts`

**Step 1: Fix broken test slug**

The old placeholder slug `why-varanasi` no longer exists — it's now `why-varanasi-is-not-what-you-think-it-is`. Update the test:

```ts
// lib/__tests__/articles.test.ts
// Change this:
const article = await getArticleBySlug('why-varanasi')
expect(article?.title).toBe('Why Varanasi is not what you think it is')
// To this:
const article = await getArticleBySlug('why-varanasi-is-not-what-you-think-it-is')
expect(article?.title).toBe('Why Varanasi is not what you think it is')
```

**Step 2: Write the failing test for `isStub`**

Add to `lib/__tests__/articles.test.ts` inside `describe('getArticleBySlug', ...)`:

```ts
it('isStub is true for articles with placeholder body', async () => {
  const article = await getArticleBySlug('why-varanasi-is-not-what-you-think-it-is')
  expect(article?.isStub).toBe(true)
})
```

**Step 3: Run tests to confirm the new test fails**

```bash
cd "/Users/aparajita/Documents/Trials with claud/charkha-project"
npx vitest run lib/__tests__/articles.test.ts
```
Expected: `isStub` test FAILS with "Cannot read properties of undefined"

**Step 4: Add `isStub` to `ArticleWithBody` type and implementation**

In `lib/articles.ts`:

```ts
// Change type:
export type ArticleWithBody = Article & {
  bodyHtml: string
  isStub: boolean
}

// In getArticleBySlug, change the return object's last two fields:
    bodyHtml: processed.toString(),
    isStub: content.includes('coming soon'),
```

**Step 5: Run tests and confirm all pass**

```bash
npx vitest run lib/__tests__/articles.test.ts
```
Expected: all tests PASS

**Step 6: Commit**

```bash
git add lib/articles.ts lib/__tests__/articles.test.ts
git commit -m "feat: add isStub field to ArticleWithBody, fix test slug"
```

---

### Task 2: Add light mode CSS tokens to globals.css

**Files:**
- Modify: `styles/globals.css`

**Step 1: Add light mode overrides after the `:root` block**

Open `styles/globals.css`. After the closing `}` of the `:root { ... }` block (around line 16), add:

```css
/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   LIGHT MODE TOKENS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
[data-theme="light"] {
  --ink:    #FDF6EC;
  --ink2:   #F7EDD8;
  --ink3:   #F0E4C8;
  --ivory:  #1A1209;
  --cream:  #261C10;
  --muted:  #6B5A45;
  --border: rgba(0,0,0,0.08);
}
[data-theme="light"] body {
  background: var(--ink);
  color: var(--ivory);
}
[data-theme="light"] nav {
  background: rgba(253,246,236,0.92);
}
[data-theme="light"] .mobile-nav {
  background: #FDF6EC;
  border-top: 1px solid rgba(0,0,0,0.08);
}
```

**Step 2: No automated test for CSS — visual check comes in Task 6**

**Step 3: Commit**

```bash
git add styles/globals.css
git commit -m "feat: add light mode CSS token overrides"
```

---

### Task 3: Create ThemeToggle component

**Files:**
- Create: `components/ThemeToggle.tsx`

**Step 1: Create the component**

```tsx
// components/ThemeToggle.tsx
'use client'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    // Read current theme from html attribute (set by inline script in layout)
    const current = document.documentElement.getAttribute('data-theme')
    setTheme(current === 'light' ? 'light' : 'dark')
  }, [])

  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('theme', next)
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        background: 'none',
        border: '1px solid var(--border)',
        borderRadius: '6px',
        color: 'var(--muted)',
        cursor: 'pointer',
        fontSize: '16px',
        padding: '4px 8px',
        lineHeight: 1,
        transition: 'color 0.15s',
      }}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  )
}
```

**Step 2: No test needed** — pure UI, tested visually in Task 6

**Step 3: Commit**

```bash
git add components/ThemeToggle.tsx
git commit -m "feat: add ThemeToggle client component"
```

---

### Task 4: Add flash-prevention script + ThemeToggle to layout

**Files:**
- Modify: `app/layout.tsx`

**Step 1: Add the inline script and ThemeToggle import**

Open `app/layout.tsx`. Make these two changes:

**Change 1** — Add import at top:
```tsx
import ThemeToggle from '@/components/ThemeToggle'
```

**Change 2** — Add inline script inside `<html>` tag, before `<body>`:
```tsx
<html lang="en" className={`${yatra.variable} ${dmSans.variable} ${playfair.variable}`}>
  <head>
    <script dangerouslySetInnerHTML={{ __html: `
      (function() {
        var saved = localStorage.getItem('theme');
        var preferred = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', saved || preferred);
      })();
    `}} />
  </head>
  <body>
    ...
  </body>
</html>
```

**Note:** Next.js App Router doesn't use a manual `<head>` tag by default — if there's no `<head>` in the current layout, add it. The inline script must run synchronously before paint to prevent flash.

**Step 2: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: add flash-prevention theme script to layout"
```

---

### Task 5: Add ThemeToggle to Nav

**Files:**
- Modify: `components/Nav.tsx`

**Step 1: Import and render ThemeToggle**

In `components/Nav.tsx`:

Add import at top:
```tsx
import ThemeToggle from './ThemeToggle'
```

Add `<ThemeToggle />` inside `.nav-inner`, between the `<ul>` and the `<button className="hamburger">`:
```tsx
<ul className="nav-links">
  ...
</ul>
<ThemeToggle />
<button className="hamburger" ...>
```

**Step 2: Commit**

```bash
git add components/Nav.tsx
git commit -m "feat: add ThemeToggle to Nav"
```

---

### Task 6: Add "Story being weaved..." callout to article page

**Files:**
- Modify: `app/articles/[slug]/page.tsx`

**Step 1: Replace article body section with stub-aware render**

In `app/articles/[slug]/page.tsx`, find the `<div className="article-body" ...>` block and replace the entire body section with:

```tsx
{article.isStub ? (
  <div style={{
    borderLeft: '3px solid var(--saffron)',
    background: 'rgba(244,115,31,0.06)',
    borderRadius: '0 8px 8px 0',
    padding: '28px 32px',
    marginTop: '8px',
  }}>
    <div style={{
      fontSize: '22px',
      marginBottom: '12px',
    }}>🪡</div>
    <p style={{
      fontFamily: 'var(--font-display)',
      fontSize: '20px',
      color: 'var(--ivory)',
      marginBottom: '10px',
    }}>
      Story being weaved...
    </p>
    <p style={{
      fontSize: '15px',
      color: 'var(--muted)',
      lineHeight: 1.65,
      marginBottom: '20px',
    }}>
      This piece is being researched. The Charkha spins slowly — but what it makes lasts.
      Subscribe to know when it&apos;s ready.
    </p>
    <a
      href="/#newsletter"
      className="btn-primary"
      style={{ fontSize: '13px', padding: '10px 20px', display: 'inline-block' }}
    >
      Newsletter ↗
    </a>
  </div>
) : (
  <div
    className="article-body"
    dangerouslySetInnerHTML={{ __html: article.bodyHtml }}
  />
)}
```

**Step 2: Commit**

```bash
git add app/articles/[slug]/page.tsx
git commit -m "feat: show story-being-weaved callout on stub articles"
```

---

### Task 7: Build verification + deploy

**Step 1: Run full test suite**

```bash
cd "/Users/aparajita/Documents/Trials with claud/charkha-project"
npm test
```
Expected: all 14 tests pass (or more if new ones added)

**Step 2: Run production build**

```bash
npm run build
```
Expected: clean build, no TypeScript errors, 100 article slugs prerendered

**Step 3: Start dev server and visually verify**

Dev server should already be running. Check:
- `http://localhost:3000` — toggle ☀️ button in nav, page switches to warm ivory
- Refresh page — theme persists (localStorage working)
- `http://localhost:3000/articles/why-varanasi-is-not-what-you-think-it-is` — "Story being weaved..." callout shown
- `http://localhost:3000/articles` — all 100 articles listed

**Step 4: Deploy to Vercel**

```bash
cd "/Users/aparajita/Documents/Trials with claud/charkha-project"
git push origin main
vercel --prod
```

**Step 5: Final commit if any fixes needed**

```bash
git add -A
git commit -m "feat: complete light mode toggle and stub callout"
```
