import React, { useMemo } from 'react'

// Decorative drifting "ember" particles — purely CSS, no external assets.
// Drop inside any `position: relative; overflow: hidden;` container.
export default function FloatingEmbers({ count = 14 }) {
  const embers = useMemo(() => Array.from({ length: count }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: 2 + Math.random() * 4,
    duration: 6 + Math.random() * 6,
    delay: Math.random() * 8,
    drift: (Math.random() * 60 - 30).toFixed(0) + 'px',
    opacity: 0.4 + Math.random() * 0.5,
  })), [count])

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }} aria-hidden="true">
      {embers.map(e => (
        <span
          key={e.id}
          className="ember"
          style={{
            left: `${e.left}%`,
            width: e.size, height: e.size,
            animationDuration: `${e.duration}s`,
            animationDelay: `${e.delay}s`,
            opacity: e.opacity,
            '--drift': e.drift,
          }}
        />
      ))}
    </div>
  )
}
