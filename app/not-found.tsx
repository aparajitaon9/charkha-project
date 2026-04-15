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
        background: 'var(--marble)',
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: '480px' }}>
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 300,
            fontSize: '5rem',
            color: 'var(--stone)',
            lineHeight: 1,
            marginBottom: '16px',
          }}
        >
          404
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 300,
            fontSize: '1.5rem',
            color: 'var(--deep-stone)',
            marginBottom: '16px',
          }}
        >
          This thread doesn&apos;t exist
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-display)',
            color: 'var(--temple-grey)',
            fontSize: '1rem',
            lineHeight: 1.9,
            marginBottom: '32px',
          }}
        >
          The page you&apos;re looking for has either moved or never existed.
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
            Back to home
          </Link>
          <Link href="/articles" className="btn-secondary">
            Browse stories
          </Link>
        </div>
      </div>
    </main>
  )
}
