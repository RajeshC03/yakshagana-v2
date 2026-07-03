import React from 'react'

// Always renders both languages together, regardless of the selected
// language toggle — used for page titles/section headings specifically.
export default function BilingualHeading({ en, kn, size = 32, style = {} }) {
  return (
    <div style={{ marginBottom: 8, ...style }}>
      <div style={{
        fontFamily: 'var(--font-kannada)', fontSize: size * 0.5,
        color: 'var(--gold)', letterSpacing: '0.04em', marginBottom: 4, opacity: 0.9,
      }}>
        {kn}
      </div>
      <h1 style={{
        fontFamily: 'var(--font-display)', fontSize: size,
        letterSpacing: '0.05em', color: 'var(--gold-light)', margin: 0,
      }}>
        {en}
      </h1>
    </div>
  )
}
