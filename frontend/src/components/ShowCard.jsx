import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import { t } from '../data/translations'
import { getLocalToday, extractDate } from '../api'
import { iconActionBtn } from '../utils/buttonStyles'

export default function ShowCard({ show, onDelete, onEdit }) {

  const EPIC_KANNADA = {
  "Mahabharata": "ಮಹಾಭಾರತ",
  "Ramayana": "ರಾಮಾಯಣ",
  "Devi Bhagavatha": "ದೇವಿ ಭಾಗವತ",
  "Skanda Purana": "ಸ್ಕಂದ ಪುರಾಣ",
  "Bhagavatha": "ಭಾಗವತ",
  "Other": "ಇತರೆ"
}

const DISTRICT_KANNADA = {
  "Dakshina Kannada": "ದಕ್ಷಿಣ ಕನ್ನಡ",
  "Udupi": "ಉಡುಪಿ",
  "Uttara Kannada": "ಉತ್ತರ ಕನ್ನಡ",
  "Shivamogga": "ಶಿವಮೊಗ್ಗ"
}

  const { authOrg } = useAuth()
  const { lang } = useLanguage()

  const today    = getLocalToday()
  const showDate = extractDate(show.date)
  const isToday  = showDate === today

  // ✅ FIX: Lombok generates isFeatured() getter as `isFeatured`, but
  // some Jackson versions serialise a boolean field named `isFeatured`
  // as `featured` (stripping the `is` prefix). We check both.
  const featured = (show.isFeatured || show.featured)

  const badge = isToday
    ? { label: lang==='kn' ? 'ಇಂದು ರಾತ್ರಿ' : 'Tonight', bg: '#8B1A1A', color: '#F5E6B8' }
    : featured
    ? { label: lang==='kn' ? 'ವೈಶಿಷ್ಟ್ಯ' : 'Featured', bg: 'rgba(201,168,76,0.15)', color: '#C9A84C' }
    : { label: showDate, bg: 'rgba(26,31,92,0.3)', color: '#B8C4F5' }

  const isOwner = authOrg &&
    show.melaName?.toLowerCase().includes(authOrg.melaName?.toLowerCase()) &&
    (onEdit || onDelete)

  return (
    <div style={{
      background: 'var(--bg-card)', border: '3px solid var(--border)',
      borderRadius: 16, padding: '1.25rem',
      transition: 'border-color 0.2s, transform 0.2s', position: 'relative'
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(247, 216, 131, 0.72)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 10 }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: 'var(--gold-light)', letterSpacing: '0.05em', marginBottom: 4 }}>
            {/* {show.prasanga} */}
            {lang === "kn" && show.prasangaKn
                      ? show.prasangaKn
                      : show.prasanga}
          </h3>
          {show.epic && (
            <div style={{ fontSize: 13, color: 'var(--text-muted)', fontStyle: 'italic' }}>
              {/* {lang==='kn' ? 'ಮೂಲ' : 'from'} {show.epic} */}
              {lang === 'kn'
                ? `ಮೂಲ ${EPIC_KANNADA[show.epic] || show.epic}`
                : `from ${show.epic}`}
            </div>
          )}
        </div>
        <span style={{ flexShrink: 0, fontSize: 13, fontWeight: 600, padding: '4px 10px', borderRadius: 16, background: badge.bg, color: badge.color }}>
          {badge.label}
        </span>
      </div>

      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '0.75rem' }}>
        <div style={{ fontSize: 15, color: 'var(--gold)', fontWeight: 600, marginBottom: 6 }}>
         🎭 {lang === "kn" && show.melaNameKn
          ? show.melaNameKn
          : show.melaName}{show.troupeNo ? ` · ${show.troupeNo}` : ''}
        </div>
        <div style={{ fontSize: 15, color: 'var(--text-secondary)', marginBottom: 4 }}>
          {/* 📍 {show.venue} */}
          📍 {lang === "kn" && show.venueKn
            ? show.venueKn
            : show.venue}
        </div>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: 15, color: 'var(--text-secondary)' }}>
          <span>🕗 {show.startTime}{show.endTime ? ' – ' + show.endTime : ''}</span>
          <span>🗺️ {lang === "kn"
                      ? (DISTRICT_KANNADA[show.district] || show.district)
                      : show.district}</span>
          {/* <span>🎟️ {show.ticketPrice || (lang==='kn' ? 'ಉಚಿತ' : 'Free')}</span> */}
          <span>
            🎟️ {
              show.ticketPrice === "Free"
                ? (lang === "kn" ? "ಉಚಿತ" : "Free")
                : show.ticketPrice
            }
          </span>
        </div>
      </div>

      {isOwner && (
        <div style={{ display: 'flex', gap: 8, marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border)' }}>
          <button onClick={() => onEdit && onEdit(show)} {...iconActionBtn('rgba(26,31,92,0.4)', 'rgba(26,31,92,0.6)', '#B8C4F5', 'rgba(26,31,92,0.65)')}>
            {t('btn_edit',lang)}
          </button>
          <button onClick={() => onDelete && onDelete(show.id)} {...iconActionBtn('rgba(139,26,26,0.3)', 'rgba(139,26,26,0.5)', '#FF9090', 'rgba(139,26,26,0.55)')}>
            {t('btn_delete',lang)}
          </button>
        </div>
      )}
    </div>
  )
}
