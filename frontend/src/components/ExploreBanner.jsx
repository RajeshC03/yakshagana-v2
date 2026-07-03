import React from 'react'
import { Link } from 'react-router-dom'

export default function ExploreBanner({
  title = 'Explore More about Yakshagana',
  subtitle = 'Login or create a free account to unlock tonight\'s shows, full mela listings, and more.',
  buttonLabel = '🎭 Explore More about Yakshagana',
  buttonTo = '/user/login',
}) {
  return (
    <section style={{ padding: '3rem 2rem 4rem', maxWidth: 1200, margin: '0 auto' }}>
      <div
        className="glow-pulse fade-in"
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 20,
          padding: '3rem 2rem',
          textAlign: 'center',
          background: 'linear-gradient(120deg, #8B1A1A 0%, #5C1A3A 35%, #1A1F5C 70%, #8B6A1A 100%)',
          border: '1px solid rgba(201,168,76,0.4)',
        }}
      >
        {/* decorative glow */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(circle at 30% 20%, rgba(201,168,76,0.35) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(201,168,76,0.25) 0%, transparent 50%)',
        }}/>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 36, marginBottom: '0.75rem' }}>🎭</div>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(22px,4vw,32px)',
            color: '#F5E6B8', letterSpacing: '0.04em', marginBottom: 12,
            textShadow: '0 2px 12px rgba(0,0,0,0.3)',
          }}>
            {title}
          </h2>
          <p style={{
            fontSize: 15, color: 'rgba(245,230,184,0.85)', maxWidth: 480,
            margin: '0 auto 1.75rem', lineHeight: 1.7,
          }}>
            {subtitle}
          </p>
          <Link
            to={buttonTo}
            style={{
              display: 'inline-block', padding: '0.9rem 2.2rem',
              background: '#F5E6B8', color: '#5C0E0E',
              fontFamily: 'var(--font-display)', fontSize: 14, letterSpacing: '0.06em',
              borderRadius: 10, textDecoration: 'none', border: '1px solid transparent',
              transition: 'all 0.2s', fontWeight: 600,
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#FFF6D9'; e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#F5E6B8'; e.currentTarget.style.transform = 'translateY(0) scale(1)' }}
          >
            {buttonLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}
