import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { showsAPI, getLocalToday, extractDate } from '../api'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import { t } from '../data/translations'
import { filledBtn, outlineBtn, chipBtn } from '../utils/buttonStyles'
import ShowCard from '../components/ShowCard'
import LiveBanner from '../components/LiveBanner'
import Spinner from '../components/Spinner'

const DISTRICTS = ['All', 'Dakshina Kannada', 'Udupi', 'Uttara Kannada']
const STYLES    = ['All', 'Tenkutittu', 'Badagutittu']

export default function ShowsPage() {
  const { authUser, authOrg } = useAuth()
  const { lang } = useLanguage()
  const isLoggedIn = !!(authUser || authOrg)

  const [allShows, setAllShows] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [search,   setSearch]   = useState('')
  const [district, setDistrict] = useState('All')
  const [style,    setStyle]    = useState('All')
  const [tab,      setTab]      = useState('all')

  const today = getLocalToday()

  const fetchShows = useCallback(async () => {
    if (!isLoggedIn) { setLoading(false); return }
    setLoading(true)
    try {
      let res
      if (district !== 'All') res = await showsAPI.getAll({ district })
      else if (style !== 'All') res = await showsAPI.getAll({ style })
      else res = await showsAPI.getAll()
      setAllShows(res.data)
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }, [district, style, isLoggedIn])

  useEffect(() => { fetchShows() }, [fetchShows])

  const filteredByTab = allShows.filter(s => {
    const d = extractDate(s.date)
    if (tab === 'tonight')  return d === today
    if (tab === 'upcoming') return d > today
    return true
  })

  const filtered = filteredByTab.filter(s =>
    s.prasanga?.toLowerCase().includes(search.toLowerCase()) ||
    s.melaName?.toLowerCase().includes(search.toLowerCase()) ||
    s.venue?.toLowerCase().includes(search.toLowerCase())
  )

  if (!isLoggedIn) {
    return (
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '8rem 2rem 3rem', textAlign: 'center' }}>
        <div style={{ fontSize: 52, marginBottom: '1.5rem' }}>🎭</div>
        <div style={{ fontFamily: 'var(--font-kannada)', fontSize: 16, color: 'var(--gold)', marginBottom: 6 }}>{t('h_show_schedules','kn')}</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--gold-light)', letterSpacing: '0.05em', marginBottom: 12 }}>
          {t('h_show_schedules','en')}
        </h1>
        <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '2rem', maxWidth: 420, margin: '0 auto 2rem' }}>
          {t('shows_login_desc',lang)}
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/user/login"     {...filledBtn('var(--crimson)', '#A52020')}>{t('btn_login_view_shows',lang)}</Link>
          <Link to="/user/register"  {...outlineBtn('var(--gold)')}>{t('btn_register_free',lang)}</Link>
        </div>
        <p style={{ marginTop: '1.5rem', fontSize: 15, color: 'var(--text-muted)' }}>
          {t('are_you_organiser',lang)} <Link to="/organizer/login" style={{ color: 'var(--gold)' }}>{t('login_here',lang)}</Link>
        </p>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '5rem 2rem 3rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ fontFamily: 'var(--font-kannada)', fontSize: 16, color: 'var(--gold)', marginBottom: 6 }}>{t('h_shows_title','kn')}</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, letterSpacing: '0.06em', color: 'var(--gold-light)', marginBottom: 8 }}>
          {t('h_shows_title','en')}
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>
          {t('live_schedule_today',lang)}: <span style={{ color: 'var(--gold)' }}>{today}</span>
        </p>
      </div>

      <LiveBanner/>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: '0 14px', marginBottom: '1.25rem' }}>
        <span style={{ color: 'var(--text-muted)' }}>🔍</span>
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder={t('search_placeholder',lang)}
          style={{ flex: 1, border: 'none', background: 'transparent', padding: '12px 4px', fontSize: 14, color: 'var(--text-primary)', outline: 'none' }}
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 18, transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
          >×</button>
        )}
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {['all', 'tonight', 'upcoming'].map(tabKey => (
          <button key={tabKey} onClick={() => { setTab(tabKey); setDistrict('All'); setStyle('All') }} {...chipBtn(tab === tabKey)}>
            {tabKey === 'all' ? t('all_shows',lang) : tabKey === 'tonight' ? t('tonight_chip',lang) : t('upcoming',lang)}
          </button>
        ))}
        <span style={{ color: 'var(--border)', alignSelf: 'center', fontSize: 18 }}>|</span>
        {DISTRICTS.map(d => (
          <button key={d} onClick={() => { setDistrict(d); setTab('all') }} {...chipBtn(district === d)}>{d}</button>
        ))}
        <span style={{ color: 'var(--border)', alignSelf: 'center', fontSize: 18 }}>|</span>
        {STYLES.map(s => (
          <button key={s} onClick={() => { setStyle(s); setTab('all') }} {...chipBtn(style === s)}>{s}</button>
        ))}
      </div>

      {loading
        ? <Spinner text={t('fetching_shows',lang)} />
        : filtered.length === 0
          ? <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: 40 }}>🎭</div>
              <p style={{ marginTop: '1rem' }}>{t('no_shows_found',lang)}</p>
            </div>
          : <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 16 }}>
              {filtered.map((s, i) => (
                <div key={s.id} className="card-in" style={{ animationDelay: `${i * 0.04}s` }}>
                  <ShowCard show={s}/>
                </div>
              ))}
            </div>
      }

      {!loading && (
        <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: 15, color: 'var(--text-muted)' }}>
          {t('showing_n_shows',lang)} {filtered.length} {t('shows_word',lang)}{filtered.length !== 1 ? 's' : ''} · {t('live_from_mysql',lang)}
        </p>
      )}
    </div>
  )
}
