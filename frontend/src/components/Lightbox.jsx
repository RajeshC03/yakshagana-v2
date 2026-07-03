import React, { useState, useEffect } from 'react'

export default function Lightbox({ images, title, onClose }) {
  const [index, setIndex] = useState(0)
  const hasMultiple = images.length > 1

  useEffect(() => {
    const handleKey = e => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight' && hasMultiple) next()
      if (e.key === 'ArrowLeft' && hasMultiple) prev()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index])

  const next = () => setIndex(i => (i + 1) % images.length)
  const prev = () => setIndex(i => (i - 1 + images.length) % images.length)

  const current = images[index]

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.78)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 1000, padding: '2rem', backdropFilter: 'blur(3px)',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative', width: '100%', maxWidth: 420,
          background: 'var(--bg-card)', border: '1px solid var(--border-hover)',
          borderRadius: 16, padding: '1rem', boxShadow: '0 20px 60px rgba(0,0,0,0.55)',
        }}
      >
        {/* Close button — top right */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute', top: -14, right: -14, width: 34, height: 34,
            borderRadius: '50%', background: 'var(--crimson)', border: '2px solid var(--bg-dark)',
            color: 'var(--gold-pale)', fontSize: 18, lineHeight: 1, cursor: 'pointer', zIndex: 3,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.2s, transform 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#A52020'; e.currentTarget.style.transform = 'scale(1.1)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--crimson)'; e.currentTarget.style.transform = 'scale(1)' }}
        >×</button>

        {title && (
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, color: 'var(--gold-light)', letterSpacing: '0.05em', marginBottom: 10, textAlign: 'center' }}>
            {title}
          </div>
        )}

        {/* Image / illustration area */}
        <div style={{ position: 'relative', borderRadius: 10, overflow: 'hidden', aspectRatio: '1/1' }}>
          {current.render ? current.render() : (
            <img src={current.src} alt={current.caption || title} style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}/>
          )}

          {hasMultiple && (
            <>
              <button onClick={prev} style={navBtnStyle('left')}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,0.9)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(13,10,6,0.6)'}
              >‹</button>
              <button onClick={next} style={navBtnStyle('right')}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,0.9)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(13,10,6,0.6)'}
              >›</button>
            </>
          )}
        </div>

        {current.caption && (
          <div style={{ textAlign: 'center', fontSize: 19, color: 'rgba(201, 168, 76, 0.77)', marginTop: 10 }}>
            {current.caption}
          </div>
        )}

        {hasMultiple && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 10 }}>
            {images.map((_, i) => (
              <span
                key={i}
                onClick={() => setIndex(i)}
                style={{
                  width: 7, height: 7, borderRadius: '50%', cursor: 'pointer',
                  background: i === index ? 'var(--gold)' : 'var(--border)',
                  transition: 'background 0.2s',
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function navBtnStyle(side) {
  return {
    position: 'absolute', top: '50%', transform: 'translateY(-50%)',
    [side]: 8, width: 32, height: 32, borderRadius: '50%',
    background: 'rgba(13,10,6,0.6)', border: '1px solid var(--border-hover)',
    color: 'var(--gold)', fontSize: 18, cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'background 0.2s', zIndex: 2,
  }
}
