import React, { useState, useEffect } from 'react'

// Appears bottom-right only once the user has scrolled down a bit.
// On short pages with nothing to scroll, it simply never appears —
// no per-page wiring needed, drop it once in App.jsx.
export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 360)
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  if (!visible) return null

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      style={{
        position: 'fixed', bottom: 24, right: 24, zIndex: 90,
        width: 46, height: 46, borderRadius: '50%',
        background: 'var(--crimson)', border: '1px solid rgba(201,168,76,0.4)',
        color: 'var(--gold-pale)', fontSize: 20, cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 6px 20px rgba(0,0,0,0.4)',
        transition: 'background 0.2s, transform 0.2s, opacity 0.3s',
        animation: 'fadeInUp 0.3s ease both',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = '#A52020'; e.currentTarget.style.transform = 'translateY(-3px)' }}
      onMouseLeave={e => { e.currentTarget.style.background = 'var(--crimson)'; e.currentTarget.style.transform = 'translateY(0)' }}
    >
      ↑
    </button>
  )
}
