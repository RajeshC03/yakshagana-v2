// Shared hover-effect helpers
// Each returns { style, onMouseEnter, onMouseLeave } — spread onto <Link> or <button>

export function filledBtn(bg, hoverBg, color = 'var(--gold-pale)', extraStyle = {}) {
  return {
    style: {
      display: 'inline-block', padding: '0.85rem 2rem', background: bg, color,
      fontFamily: 'var(--font-display)', fontSize: 14, letterSpacing: '0.08em',
      borderRadius: 8, border: '1px solid transparent', textDecoration: 'none',
      cursor: 'pointer', transition: 'all 0.2s', ...extraStyle,
    },
    onMouseEnter: e => { e.currentTarget.style.background = hoverBg; e.currentTarget.style.transform = 'translateY(-1px)' },
    onMouseLeave: e => { e.currentTarget.style.background = bg; e.currentTarget.style.transform = 'translateY(0)' },
  }
}

export function outlineBtn(color = 'var(--gold)', borderColor = 'var(--border-hover)', extraStyle = {}) {
  return {
    style: {
      display: 'inline-block', padding: '0.85rem 2rem', background: 'transparent', color,
      border: `1px solid ${borderColor}`, borderRadius: 8, fontFamily: 'var(--font-display)',
      fontSize: 14, letterSpacing: '0.08em', textDecoration: 'none',
      cursor: 'pointer', transition: 'all 0.2s', ...extraStyle,
    },
    onMouseEnter: e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)' },
    onMouseLeave: e => { e.currentTarget.style.borderColor = borderColor; e.currentTarget.style.color = color },
  }
}

export function smallOutlineBtn(color = 'var(--text-secondary)', borderColor = 'var(--border)', extraStyle = {}) {
  return {
    style: {
      padding: '5px 14px', border: `1px solid ${borderColor}`, color, borderRadius: 6,
      fontSize: 15, textDecoration: 'none', fontFamily: 'var(--font-display)',
      cursor: 'pointer', transition: 'all 0.2s', ...extraStyle,
    },
    onMouseEnter: e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)' },
    onMouseLeave: e => { e.currentTarget.style.borderColor = borderColor; e.currentTarget.style.color = color },
  }
}

export function smallFilledBtn(bg = 'var(--crimson)', hoverBg = '#A52020', color = 'var(--gold-pale)', extraStyle = {}) {
  return {
    style: {
      padding: '5px 14px', background: bg, color, borderRadius: 6, fontSize: 15,
      fontFamily: 'var(--font-display)', letterSpacing: '0.05em', textDecoration: 'none',
      cursor: 'pointer', border: '1px solid transparent', transition: 'all 0.2s', ...extraStyle,
    },
    onMouseEnter: e => { e.currentTarget.style.background = hoverBg; e.currentTarget.style.transform = 'translateY(-1px)' },
    onMouseLeave: e => { e.currentTarget.style.background = bg; e.currentTarget.style.transform = 'translateY(0)' },
  }
}

export function ghostBtn(extraStyle = {}) {
  return {
    style: {
      padding: '9px 16px', background: 'transparent', color: 'var(--text-muted)',
      fontFamily: 'var(--font-display)', fontSize: 15, borderRadius: 8,
      border: '1px solid var(--border)', cursor: 'pointer', transition: 'all 0.2s', ...extraStyle,
    },
    onMouseEnter: e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)' },
    onMouseLeave: e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)' },
  }
}

export function chipBtn(active, extraStyle = {}) {
  return {
    style: {
      padding: '6px 14px', borderRadius: 20, fontSize: 14,
      border: `1px solid ${active ? 'var(--gold)' : 'var(--border)'}`,
      background: active ? 'rgba(201,168,76,0.12)' : 'transparent',
      color: active ? 'var(--gold)' : 'var(--text-muted)',
      cursor: 'pointer', transition: 'all 0.15s', fontFamily: 'var(--font-body)', ...extraStyle,
    },
    onMouseEnter: e => {
      if (!active) { e.currentTarget.style.borderColor = 'var(--border-hover)'; e.currentTarget.style.color = 'var(--text-secondary)' }
    },
    onMouseLeave: e => {
      if (!active) { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)' }
    },
  }
}

export function iconActionBtn(bg, border, color, hoverBg, extraStyle = {}) {
  return {
    style: {
      flex: 1, padding: '6px', background: bg, border: `1px solid ${border}`, color,
      borderRadius: 6, fontSize: 14, cursor: 'pointer', fontFamily: 'var(--font-body)',
      transition: 'all 0.2s', ...extraStyle,
    },
    onMouseEnter: e => { e.currentTarget.style.background = hoverBg },
    onMouseLeave: e => { e.currentTarget.style.background = bg },
  }
}

export function submitBtn(disabled, extraStyle = {}) {
  const bg = disabled ? 'var(--text-muted)' : 'var(--crimson)'
  return {
    style: {
      width: '100%', padding: '12px', background: bg, color: 'var(--gold-pale)',
      fontFamily: 'var(--font-display)', fontSize: 14, letterSpacing: '0.08em',
      border: 'none', borderRadius: 8, cursor: disabled ? 'not-allowed' : 'pointer',
      marginTop: '0.5rem', transition: 'background 0.2s, transform 0.2s', ...extraStyle,
    },
    onMouseEnter: e => {
      if (!disabled) { e.currentTarget.style.background = '#A52020'; e.currentTarget.style.transform = 'translateY(-1px)' }
    },
    onMouseLeave: e => { e.currentTarget.style.background = bg; e.currentTarget.style.transform = 'translateY(0)' },
  }
}

export function textLink(color = 'var(--text-muted)', hoverColor = 'var(--gold)', extraStyle = {}) {
  return {
    style: { color, fontSize: 15, cursor: 'pointer', transition: 'color 0.2s', ...extraStyle },
    onMouseEnter: e => { e.currentTarget.style.color = hoverColor },
    onMouseLeave: e => { e.currentTarget.style.color = color },
  }
}
