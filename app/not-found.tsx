import Link from 'next/link'

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 32px',
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: '480px' }}>
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '80px',
            color: 'var(--saffron)',
            lineHeight: 1,
            marginBottom: '16px',
          }}
        >
          404
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '28px',
            color: 'var(--ivory)',
            marginBottom: '16px',
          }}
        >
          This thread doesn&apos;t exist
        </h1>
        <p
          style={{
            color: 'var(--muted)',
            fontSize: '15px',
            lineHeight: 1.7,
            marginBottom: '32px',
            fontWeight: 300,
          }}
        >
          The page you&apos;re looking for has either moved or never existed. Try
          exploring from the home page.
        </p>
        <div
          style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Link href="/" className="btn-primary">
            Back to home ↗
          </Link>
          <Link href="/articles" className="btn-secondary">
            Browse all articles
          </Link>
        </div>
      </div>
    </main>
  )
}
