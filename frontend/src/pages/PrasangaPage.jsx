import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import { t } from '../data/translations'
import { prasangasAPI } from '../api'
import Spinner from '../components/Spinner'
import ExploreBanner from '../components/ExploreBanner'

export default function PrasangaPage() {

  const EPIC_KANNADA = {
  "Mahabharata": "ಮಹಾಭಾರತ",
  "Ramayana": "ರಾಮಾಯಣ",
  "Devi Bhagavatha": "ದೇವಿ ಭಾಗವತ",
  "Skanda Purana": "ಸ್ಕಂದ ಪುರಾಣ",
  "Bhagavatha": "ಭಾಗವತ",
  "Other": "ಇತರೆ"
}

  const { authUser, authOrg } = useAuth()
  const { lang } = useLanguage()
  const isLoggedIn = !!(authUser || authOrg)

  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const params = isLoggedIn ? {} : { famous: true }
    prasangasAPI.getAll(params)
      .then(r => setList(r.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [isLoggedIn])

  
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '5rem 2rem 3rem' }}>
      <div style={{ fontFamily: 'var(--font-kannada)', fontSize: 16, color: 'var(--gold)', marginBottom: 6 }}>
        {isLoggedIn ? t('h_prasangas_title','kn') : t('h_famous_prasangas','kn')}
      </div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, letterSpacing: '0.06em', color: 'var(--gold-light)', marginBottom: 8 }}>
        {isLoggedIn ? `${t('h_prasangas_title','en')} (${list.length})` : t('h_famous_prasangas','en')}
      </h1>
      <p style={{ color: 'var(--text-muted)', fontSize: 15, marginBottom: '2rem' }}>
        {isLoggedIn ? t('prasangas_all_desc',lang) : t('prasangas_famous_desc',lang)}
      </p>

      {loading ? <Spinner /> : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {list.map(p => (
            <div key={p.id} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: '1.25rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(139,26,26,0.2)', border: '1px solid rgba(139,26,26,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>📖</div>
              <div>
                {lang==='kn' && p.nameKn && (
                  <div style={{ fontFamily: 'var(--font-kannada)', fontSize: 14, color: 'var(--gold)', marginBottom: 3 }}>{p.nameKn}</div>
                )}
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 19, color: 'var(--gold)', letterSpacing: '0.04em', marginBottom: 5 }}>{p.name}</h3>
                
              {/* <div style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 8 }}>{t('from_epic',lang)} {p.epic}</div> */}
                <div style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 8 }}>
                      {t('from_epic', lang)}{" : "}
                      {lang === "kn"
                          ? (EPIC_KANNADA[p.epic] || p.epic)
                          : p.epic}
                    </div>

                <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.75 }}>{(lang==='kn' && p.descriptionKn) ? p.descriptionKn : p.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {!isLoggedIn && !loading && (
        <div style={{ marginTop: '2rem' }}>
          <ExploreBanner
            title={t('h_login_explore_more',lang)}
            subtitle={t('login_unlock_prasangas',lang)}
            buttonLabel={'🎭 ' + t('btn_login_explore',lang)}
            buttonTo="/user/login"
          />
        </div>
      )}
    </div>
  )
}
