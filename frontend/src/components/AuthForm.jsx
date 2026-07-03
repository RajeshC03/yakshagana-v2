import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { t } from '../data/translations'
import { submitBtn, outlineBtn } from '../utils/buttonStyles'

export function Field({ label, name, type = 'text', placeholder, value, onChange }) {
  const [f, setF] = useState(false)
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ display: 'block', fontSize: 13, color: 'var(--text-muted)', marginBottom: 5, letterSpacing: '0.06em' }}>{label.toUpperCase()}</label>
      <input
        name={name} type={type} placeholder={placeholder} value={value} onChange={onChange}
        onFocus={() => setF(true)} onBlur={() => setF(false)}
        style={{
          width: '100%', padding: '10px 12px', background: 'var(--bg-dark)',
          border: `1px solid ${f ? 'var(--gold)' : 'var(--border)'}`, borderRadius: 8,
          color: 'var(--text-primary)', fontSize: 14, outline: 'none',
          boxSizing: 'border-box', transition: 'border-color 0.2s',
        }}
      />
    </div>
  )
}

export function SelectField({ label, name, value, onChange, options }) {
  const [f, setF] = useState(false)
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ display: 'block', fontSize: 13, color: 'var(--text-muted)', marginBottom: 5, letterSpacing: '0.06em' }}>{label.toUpperCase()}</label>
      <select
        name={name} value={value} onChange={onChange}
        onFocus={() => setF(true)} onBlur={() => setF(false)}
        style={{
          width: '100%', padding: '10px 12px', background: 'var(--bg-dark)',
          border: `1px solid ${f ? 'var(--gold)' : 'var(--border)'}`, borderRadius: 8,
          color: value ? 'var(--text-primary)' : 'var(--text-muted)', fontSize: 14,
          outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s',
        }}
      >
        <option value="">Select...</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  )
}

export function AuthCard({ title, titleKn, subtitle, error, children, bottomText, bottomLinkTo, bottomLinkLabel }) {
  return (
    <div style={{
      minHeight: '100vh', background: 'var(--bg-dark)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', padding: '2rem',
      backgroundImage: 'radial-gradient(ellipse 80% 50% at 50% 0%,rgba(139,26,26,0.18) 0%,transparent 60%)',
    }}>
      <div style={{ width: '100%', maxWidth: 460, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: 38, marginBottom: 8 }}>🎭</div>
          <div style={{ fontFamily: 'var(--font-kannada)', fontSize: 15, color: 'var(--gold)', marginBottom: 4 }}>{titleKn || 'ಯಕ್ಷಗಾನ'}</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--gold-light)', letterSpacing: '0.05em', marginBottom: 6 }}>{title}</h1>
          <p style={{ fontSize: 15, color: 'var(--text-muted)' }}>{subtitle}</p>
        </div>

        {error && (
          <div style={{ background: 'rgba(139,26,26,0.2)', border: '1px solid rgba(139,26,26,0.5)', borderRadius: 8, padding: '0.75rem 1rem', marginBottom: '1.25rem', fontSize: 15, color: '#FF9090' }}>
            ⚠️ {error}
          </div>
        )}

        {children}

        {bottomText && (
          <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
            <p style={{ fontSize: 15, color: 'var(--text-muted)', marginBottom: 8 }}>{bottomText}</p>
            <Link to={bottomLinkTo} {...outlineBtn('var(--gold)', 'var(--border-hover)', { padding: '8px 24px', fontSize: 15 })}>
              {bottomLinkLabel}
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export function SubmitBtn({ loading, label }) {
  const { lang } = useLanguage()
  return (
    <button type="submit" disabled={loading} {...submitBtn(loading)}>
      {loading ? t('btn_please_wait',lang) : label}
    </button>
  )
}
