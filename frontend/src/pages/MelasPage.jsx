import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import { t } from '../data/translations'
import { melasAPI } from '../api'
import { smallFilledBtn, chipBtn } from '../utils/buttonStyles'
import MelaCard from '../components/MelaCard'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'

export default function MelasPage() {
  const { authUser, authOrg } = useAuth()
  const { lang } = useLanguage()
  const isLoggedIn = !!(authUser || authOrg)

  const [melas,   setMelas]   = useState([])
  const [loading, setLoading] = useState(true)
  const [sty,     setSty]     = useState('All')
  const [reg,     setReg]     = useState('All')

  useEffect(() => {
    if (isLoggedIn) {
      melasAPI.getAll().then(r => setMelas(r.data)).catch(console.error).finally(() => setLoading(false))
    } else {
      melasAPI.getAll({ famous: true }).then(r => setMelas(r.data)).catch(console.error).finally(() => setLoading(false))
    }
  }, [isLoggedIn])

  const regions = ['All', ...new Set(melas.map(m => m.region).filter(Boolean))]
  const styles  = ['All', 'Tenkutittu', 'Badagutittu']

  const filtered = melas.filter(m =>
    (sty === 'All' || m.style === sty) &&
    (reg === 'All' || m.region === reg)
  )

  const grouped = {}
  if (isLoggedIn) {
    // filtered.forEach(m => {
    //   const r = m.region || 'Other'
    //   if (!grouped[r]) grouped[r] = []
    //   grouped[r].push(m)
    // })
    filtered.forEach(m => {
  const r =
    lang === 'kn'
      ? (m.regionKn || m.region)
      : m.region

  if (!grouped[r]) grouped[r] = []
  grouped[r].push(m)
})
  }

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '5rem 2rem 3rem' }}>

      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ fontFamily: 'var(--font-kannada)', fontSize: 16, color: 'var(--gold)', marginBottom: 6 }}>
          {isLoggedIn ? t('h_all_melas_title','kn') : t('h_melas_title','kn')}
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, letterSpacing: '0.06em', color: 'var(--gold-light)', marginBottom: 8 }}>
          {isLoggedIn ? `${t('h_all_melas_title','en')} (${melas.length})` : t('h_melas_title','en')}
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 15, maxWidth: 600 }}>
          {isLoggedIn ? t('melas_all_desc',lang) : t('melas_famous_desc',lang)}
        </p>
      </div>

      {!isLoggedIn && (
        <div style={{
          background: 'linear-gradient(135deg,rgba(139,26,26,0.12) 0%,rgba(26,31,92,0.12) 100%)',
          border: '1px solid var(--border)', borderRadius: 10,
          padding: '1rem 1.5rem', marginBottom: '2rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem'
        }}>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', margin: 0 }}>
            🎭 {t('melas_login_banner',lang)} <span style={{ color: 'var(--gold)' }}>30+</span> {t('melas_region_text',lang)}
          </p>
          <Link to="/user/login" {...smallFilledBtn('var(--crimson)', '#A52020', 'var(--gold-pale)', {flexShrink:0})}>
            {t('btn_login_now',lang)}
          </Link>
        </div>
      )}

      {isLoggedIn && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: '2rem' }}>
          {styles.map(s => (
            <button key={s} onClick={() => setSty(s)} {...chipBtn(sty === s)}>{s}</button>
          ))}
          <span style={{ color: 'var(--border)', alignSelf: 'center', fontSize: 18 }}>|</span>
          {regions.map(r => (
            <button key={r} onClick={() => setReg(r)} {...chipBtn(reg === r)}>{r}</button>
          ))}
        </div>
      )}

      {loading ? <Spinner text={t('loading_melas',lang)} /> : (

        isLoggedIn ? (
          Object.entries(grouped).map(([region, regionMelas]) => (
            <div key={region} style={{ marginBottom: '3rem' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '1rem',
                marginBottom: '1.25rem', paddingBottom: '0.75rem',
                borderBottom: '1px solid var(--border)'
              }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--gold)', letterSpacing: '0.05em' }}>
                  📍 {region}
                </h2>
                <span style={{
                  fontSize: 14, padding: '3px 10px', borderRadius: 12,
                  background: 'rgba(201,168,76,0.1)', color: 'var(--text-muted)',
                  border: '1px solid var(--border)'
                }}>
                  {regionMelas.length} {t('mela_word',lang)}{regionMelas.length > 1 ? 's' : ''}
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 20 }}>
                {regionMelas.map((m, i) => (
                  <div key={m.id} className="card-in" style={{ animationDelay: `${i * 0.04}s` }}>
                    <MelaCard mela={m}/>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 20 }}>
            {filtered.map((m, i) => (
              <div key={m.id} className="card-in" style={{ animationDelay: `${i * 0.05}s` }}>
                <MelaCard mela={m}/>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  )
}
