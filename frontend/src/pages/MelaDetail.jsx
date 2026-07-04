import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import { t } from '../data/translations'
import { melasAPI, getLocalToday, extractDate } from '../api'
import { textLink, filledBtn, outlineBtn } from '../utils/buttonStyles'
import ShowCard from '../components/ShowCard'
import Spinner from '../components/Spinner'


export default function MelaDetail() {
  const { id } = useParams()
  const { authUser, authOrg } = useAuth()
  const { lang } = useLanguage()
  const isLoggedIn = !!(authUser || authOrg)

  const [mela, setMela]     = useState(null)
  const [shows, setShows]   = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const today = getLocalToday()
    melasAPI.getById(id)
      .then(m => {
        setMela(m.data)
        if (isLoggedIn) {
          return melasAPI.getShows(id).then(s => {
            const upcoming = s.data
              // .filter(sh => extractDate(sh.date) >= today)
              .filter(sh => extractDate(sh.date) >= today || sh.isFeatured || sh.featured)
              .sort((a, b) => extractDate(a.date).localeCompare(extractDate(b.date)))
            setShows(upcoming)
          })
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [id, isLoggedIn])

  if (loading) return <div style={{ paddingTop: '6rem' }}><Spinner /></div>

  if (!mela) {
    return (
      <div style={{ padding: '6rem 2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
        <p>{t('mela_not_found',lang)} <Link to="/melas">{t('btn_back',lang)}</Link></p>
      </div>
    )
  }

  if (!isLoggedIn && !mela.isFamous) {
    return (
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '8rem 2rem 3rem', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: '1.5rem' }}>🎭</div>
        <div style={{ fontFamily: 'var(--font-kannada)', fontSize: 15, color: 'var(--gold)', marginBottom: 6 }}>{t('h_login_view_mela','kn')}</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, color: 'var(--gold-light)', letterSpacing: '0.05em', marginBottom: 12 }}>
          {t('h_login_view_mela','en')}
        </h1>
        <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '2rem' }}>
          {t('mela_login_desc',lang)}
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/user/login"    {...filledBtn('var(--crimson)', '#A52020')}>{t('btn_login',lang)}</Link>
          <Link to="/user/register" {...outlineBtn('var(--gold)')}>{t('btn_register_free',lang)}</Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '5rem 2rem 3rem' }}>
      <Link to="/melas" {...textLink('var(--text-muted)', 'var(--gold)', { display: 'block', marginBottom: '1.5rem' })}>{t('btn_back_melas',lang)}</Link>

      <div className="fade-in" style={{ background: `linear-gradient(135deg,${mela.colorHex || '#8B1A1A'}BB 0%,${mela.colorHex || '#8B1A1A'}22 100%)`, border: '1px solid var(--border)', borderRadius: 16, padding: '2rem', marginBottom: '1.5rem' }}>
        {lang === 'kn' ? (
          <h1 style={{ fontFamily:'var(--font-kannada)',fontSize:28,color:'var(--gold-pale)',marginBottom:8 }}>{mela.kannadaName}</h1>
        ) : (
          <>
            {mela.kannadaName && <div style={{ fontFamily:'var(--font-kannada)',fontSize:20,color:'rgba(255,255,255,0.9)',marginBottom:8 }}>{mela.kannadaName}</div>}
            <h1 style={{ fontFamily:'var(--font-display)',fontSize:28,color:'var(--gold-pale)',letterSpacing:'0.04em',marginBottom:8 }}>{mela.name}</h1>
          </>
        )}
        <div style={{ fontSize: 17, color: 'rgba(255,255,255,0.55)', marginBottom: '1.25rem' }}>{mela.fullName}</div>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          {[
            { l: t('stat_troupes',lang), v: mela.troupeCount },
            // { l: t('stat_shows_season',lang), v: isLoggedIn ? shows.length : mela.showsThisSeason },
            { l: t('stat_style',lang), v: lang==='kn' ? mela.styleKn : mela.style },
            // { l: t('stat_founded',lang), v: mela.foundedYear },
            {
            l: t('stat_founded', lang),
            v: lang === 'kn' && mela.foundedYearKn
                ? mela.foundedYearKn
                : mela.foundedYear
          },

          ].map(s => (
            <div key={s.l}><div style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--gold)', lineHeight: 1,fontWeight: 'bold' }}>{s.v}</div><div style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', marginTop: 3,fontWeight: 'bold' }}>{s.l}</div></div>
          ))}
        </div>
      </div>

      {[
        { title: t('h_about',lang), content: <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{(lang==='kn' && mela.descriptionKn) ? mela.descriptionKn : mela.description}</p> },
        { title: t('h_location',lang), content: <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{lang==='kn' ? `${mela.locationKn} · ${mela.regionKn}` : `${mela.location} · ${mela.region}`}</p> },
        { title: t('h_deity',lang), content: <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{lang==='kn' ? mela.deityKn : mela.deity}</p> },
      ].map(b => (
        <div key={b.title} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: '1.25rem', marginBottom: 12 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 14, color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: 10 }}>{b.title.toUpperCase()}</h3>
          {b.content}
        </div>
      ))}

      {mela.famousArtists?.length > 0 && (
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: '1.25rem', marginBottom: 12 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 14, color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: 10 }}>{t('h_famous_artists',lang).toUpperCase()}</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{(lang==='kn' ? mela.famousArtistsKn : mela.famousArtists).map(a => <span key={a} style={{ padding: '5px 14px', borderRadius: 20, fontSize: 15, border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>{a}</span>)}</div>
        </div>
      )}

      {mela.popularPrasangas?.length > 0 && (
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: '1.25rem', marginBottom: '2rem' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 14, color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: 10 }}>{t('h_popular_prasangas',lang).toUpperCase()}</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{(lang==='kn' ? mela.popularPrasangasKn : mela.popularPrasangas).map(p => <span key={p} style={{ padding: '5px 14px', borderRadius: 20, fontSize: 15, border: '1px solid rgba(201,168,76,0.25)', color: 'var(--gold)', background: 'rgba(201,168,76,0.06)' }}>{p}</span>)}</div>
        </div>
      )}

      {isLoggedIn && (
        <>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--gold-light)', letterSpacing: '0.05em', marginBottom: '1rem' }}>
            🎭 {t('h_tonight_upcoming',lang)}
          </h2>
          {shows.length === 0 ? (
            <div style={{
              background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12,
              padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: 14,
            }}>
              {t('no_shows_for_mela',lang)} {mela.name}. {t('check_back_soon',lang)}
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 14 }}>
              {shows.map((s, i) => (
                <div key={s.id} className="card-in" style={{ animationDelay: `${i * 0.06}s` }}>
                  <ShowCard show={s} />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}