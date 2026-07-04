import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import { t } from '../data/translations'
import { showsAPI, melasAPI, getLocalToday, extractDate } from '../api'
import { filledBtn, outlineBtn, textLink } from '../utils/buttonStyles'
import ShowCard from '../components/ShowCard'
import MelaCard from '../components/MelaCard'
import LiveBanner from '../components/LiveBanner'
import Spinner from '../components/Spinner'
import ExploreBanner from '../components/ExploreBanner'
import FloatingEmbers from '../components/FloatingEmbers'

export default function Home() {
  const { authUser, authOrg } = useAuth()
  const { lang } = useLanguage()
  const isLoggedIn = !!(authUser || authOrg)
  const name = authOrg?.name || authUser?.name

  const [videoFailed, setVideoFailed] = useState(false)
  const [allShows, setAllShows] = useState([])
  const [melas,    setMelas]    = useState([])
  const [loading,  setLoading]  = useState(true)

  const today = getLocalToday()

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([melasAPI.getAll(), showsAPI.getAll()])
        .then(([m, s]) => { setMelas(m.data); setAllShows(s.data) })
        .catch(console.error)
        .finally(() => setLoading(false))
    } else {
      melasAPI.getAll({ famous: true })
        .then(r => setMelas(r.data))
        .catch(console.error)
        .finally(() => setLoading(false))
    }
  }, [isLoggedIn])

  const tonightShows = allShows.filter(s => extractDate(s.date) === today)

  return (
    <div>
      <section style={{
        minHeight: '90vh', display: 'flex', alignItems: 'center',
        padding: '6rem 2rem 4rem', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <div className="spotlight spotlight-a" style={{ width: 420, height: 420, background: 'radial-gradient(circle, rgba(201,168,76,0.55) 0%, transparent 70%)' }}/>
          <div className="spotlight spotlight-b" style={{ width: 360, height: 360, background: 'radial-gradient(circle, rgba(139,26,26,0.5) 0%, transparent 70%)' }}/>
          <div className="spotlight spotlight-c" style={{ width: 480, height: 480, background: 'radial-gradient(circle, rgba(26,31,92,0.55) 0%, transparent 70%)' }}/>
        </div>

        {!videoFailed && (
          <video
            autoPlay muted loop playsInline
            onError={() => setVideoFailed(true)}
            style={{
              position: 'absolute', top: '50%', left: '50%',
              width: '120%', height: '120%', objectFit: 'cover',
              transform: 'translate(-50%,-50%)',
              filter: 'blur(9px) brightness(0.5) saturate(1.15)',
              pointerEvents: 'none',
            }}
          >
            <source src="/videos/yakshagana-bg.mp4" type="video/mp4" />
          </video>
        )}

        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(180deg, rgba(13,10,6,0.35) 0%, rgba(13,10,6,0.55) 60%, var(--bg-dark) 100%)'
        }}/>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(ellipse 100% 80% at 50% 0%,rgba(139,26,26,0.25) 0%,transparent 55%),radial-gradient(ellipse 60% 50% at 90% 50%,rgba(26,31,92,0.2) 0%,transparent 50%)'
        }}/>
        <FloatingEmbers count={16}/>
        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', position: 'relative' }} className="fade-in">
          {name && <div style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--gold)', marginBottom: '0.75rem' }}>{t('welcome_back',lang)}, {name}! 🎭</div>}
          <div style={{ fontFamily: 'var(--font-kannada)', fontSize: 15, color: 'var(--gold)', letterSpacing: '0.15em', marginBottom: '1rem', opacity: 0.85 }}>
            ಯಕ್ಷಗಾನ · ತುಳುನಾಡಿನ ಜೀವಂತ ರಂಗಭೂಮಿ
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px,7vw,80px)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '0.04em', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
            {t('h_home_title',lang)}<br/>
            <span className="shimmer-text">{t('h_home_subtitle',lang)}</span>
          </h1>
          <p style={{ fontSize: 18, color: 'var(--text-secondary)', maxWidth: 520, lineHeight: 1.8, marginBottom: '2.5rem' }}>
            {t('hero_desc',lang)}
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {isLoggedIn ? (
              <>
                <Link to="/shows" {...filledBtn('var(--crimson)', '#A52020')}>{t('nav_shows',lang)}</Link>
                <Link to="/melas" {...outlineBtn('var(--gold)')}>{t('btn_all_melas',lang)}</Link>
              </>
            ) : (
              <>
                <Link to="/user/register" {...filledBtn('var(--crimson)', '#A52020')}>{t('btn_get_started',lang)}</Link>
                <Link to="/user/login"    {...outlineBtn('var(--gold)')}>{t('btn_login',lang)}</Link>
                <Link to="/melas"         {...outlineBtn('var(--text-secondary)', 'var(--border)')}>{t('btn_explore_melas',lang)}</Link>
              </>
            )}
          </div>
          <div style={{ display: 'flex', gap: '2rem', marginTop: '3rem', flexWrap: 'wrap' }}>
            {[
              {num:'25+',label:t('stat_active_melas',lang)},
              {num:'6000+',label:t('stat_shows_per_year',lang)},
              {num:t('season_months', lang), label:t('stat_season', lang)},
              {num:'200+',label:t('stat_artists',lang)},
            ].map(s=>(
              <div key={s.label} style={{ borderLeft: '2px solid var(--crimson)', paddingLeft: '1rem' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--gold)', lineHeight: 1 }}>{s.num}</div>
                <div style={{ fontSize: 15, color: 'var(--text-muted)', marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {isLoggedIn ? (
        <section style={{ padding: '2rem', maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.25rem' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, letterSpacing: '0.06em', color: 'var(--gold-light)' }}>
              {t('h_tonight_perf',lang)}
              <span style={{ fontSize: 15, color: 'var(--text-muted)', fontFamily: 'var(--font-body)', marginLeft: 10, fontWeight: 400 }}>{today}</span>
            </h2>
            <Link to="/shows" {...textLink()}>{t('btn_view_all',lang)}</Link>
          </div>
          <LiveBanner/>
          {loading ? <Spinner text={t('loading',lang)}/> :
            tonightShows.length === 0
              ? <div style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)', fontSize: 14, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12 }}>{t('no_shows_tonight',lang)} ({today}).</div>
              : <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 16 }}>
                  {tonightShows.map((s, i) => (
                    <div key={s.id} className="card-in" style={{ animationDelay: `${i * 0.06}s` }}>
                      <ShowCard show={s}/>
                    </div>
                  ))}
                </div>
          }
        </section>
      ) : (
        <section style={{ padding: '2rem', maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ background: 'linear-gradient(135deg,rgba(139,26,26,0.15) 0%,rgba(26,31,92,0.15) 100%)', border: '1px solid var(--border)', borderRadius: 14, padding: '2.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: 40, marginBottom: '1rem' }}>🎭</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--gold-light)', letterSpacing: '0.05em', marginBottom: 8 }}>{t('h_tonight_perf',lang)}</h3>
            <p style={{ fontSize: 15, color: 'var(--text-muted)', marginBottom: '1.5rem', maxWidth: 420, margin: '0 auto 1.5rem' }}>{t('tonight_schedule_desc',lang)}</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/user/register" {...filledBtn('var(--crimson)', '#A52020')}>{t('btn_register_free',lang)}</Link>
              <Link to="/user/login"    {...outlineBtn('var(--gold)')}>{t('btn_login',lang)}</Link>
            </div>
          </div>
        </section>
      )}

      <section style={{ padding: '3rem 2rem', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.5rem' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, letterSpacing: '0.06em', color: 'var(--gold-light)' }}>
            {isLoggedIn ? t('h_all_melas_title',lang) : t('h_melas_title',lang)}
          </h2>
          {!isLoggedIn && <Link to="/user/login" {...textLink()}>{t('btn_login_see_all',lang)}</Link>}
        </div>
        {loading ? <Spinner/> :
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(340px,1fr))', gap: 20 }}>
            {(isLoggedIn ? melas.slice(0, 12) : melas).map((m, i) => (
              <div key={m.id} className="card-in" style={{ animationDelay: `${i * 0.05}s` }}>
                <MelaCard mela={m}/>
              </div>
            ))}
          </div>
        }
        {isLoggedIn && melas.length > 12 && (
          <div style={{ marginTop: '1.75rem', textAlign: 'center' }}>
            <Link to="/melas" {...outlineBtn('var(--gold)')}>
              🎭 {t('btn_view_all_melas',lang)} ({melas.length})
            </Link>
          </div>
        )}
        {!isLoggedIn && (
          <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: 15, color: 'var(--text-muted)' }}>
            {t('login_see_all_melas',lang)} <span style={{ color: 'var(--gold)' }}>30+</span> {t('melas_and_shows',lang)}
          </div>
        )}
      </section>

      {!isLoggedIn && (
        <ExploreBanner
          title={t('h_explore_more',lang)}
          subtitle={t('explore_more_desc',lang)}
          buttonLabel={'🎭 ' + t('btn_explore_more',lang)}
          buttonTo="/user/login"
        />
      )}
    </div>
  )
}
