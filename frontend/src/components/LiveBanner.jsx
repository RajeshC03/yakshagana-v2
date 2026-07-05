import React, { useState, useEffect } from 'react'
import useLiveUpdates from '../hooks/useLiveUpdates'

export default function LiveBanner() {
  const { latestUpdate } = useLiveUpdates()
  const [msg, setMsg]   = useState("Loading tonight's shows...")


  const [fade, setFade] = useState(true)

  useEffect(() => {
    if (latestUpdate?.message) {
      setFade(false)
      setTimeout(() => { setMsg(latestUpdate.message); setFade(true) }, 300)
    }
  }, [latestUpdate])

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12, padding: '0.75rem 1rem',
      background: 'rgba(139,26,26,0.1)', border: '1px solid rgba(139,26,26,0.3)',
      borderRadius: 8, marginBottom: '1.5rem', transition: 'all 0.3s',
    }}>
      <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#C9A84C', animation: 'pulse-live 1.5s infinite', flexShrink: 0 }}/>
      <span style={{ fontSize: 15, color: 'var(--text-secondary)', flex: 1, lineHeight: 1.5, opacity: fade ? 1 : 0, transition: 'opacity 0.3s ease' }}>
        {msg}
      </span>
      <span style={{ fontSize: 13, color: 'var(--text-muted)', flexShrink: 0, whiteSpace: 'nowrap' }}>
        {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
      </span>
    </div>
  )
}
