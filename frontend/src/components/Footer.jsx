import React from 'react'

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '1.5rem 2rem',
      textAlign: 'center',
      marginTop: '2rem',
    }}>
      <p style={{ fontSize: 15, color: 'var(--text-muted)', margin: 0 }}>
        © 2026 RC Tech. All Rights Reserved.
      </p>
    </footer>
  )
}
