import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { showsAPI, getLocalToday, extractDate } from '../../api'
import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../context/LanguageContext'
import { t } from '../../data/translations'
import { smallFilledBtn, ghostBtn } from '../../utils/buttonStyles'
import ShowCard from '../../components/ShowCard'
import Spinner from '../../components/Spinner'

export default function OrgDashboard() {
  const { authOrg, logout } = useAuth()
  const { lang } = useLanguage()
  const navigate  = useNavigate()
  const location  = useLocation()

  const [shows,    setShows]    = useState([])
  const [loading,  setLoading]  = useState(true)
  const [msg,      setMsg]      = useState(location.state?.msg || '')
  const [deleting, setDeleting] = useState(null)

  const today = getLocalToday()

  const fetchShows = () => {
    setLoading(true)
    showsAPI.getAll({ melaName: authOrg?.melaName })
      .then(r => setShows(r.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchShows() }, [authOrg?.melaName])
  useEffect(() => {
    if (msg) { const timer = setTimeout(() => setMsg(''), 5000); return () => clearTimeout(timer) }
  }, [msg])

  const handleDelete = async (id) => {
    if (!window.confirm(t('confirm_delete_show',lang))) return
    setDeleting(id)
    try {
      await showsAPI.delete(id)
      setShows(p => p.filter(s => s.id !== id))
      setMsg(t('show_deleted',lang))
    } catch {
      setMsg(t('show_delete_failed',lang))
    } finally { setDeleting(null) }
  }

  const handleEdit = (show) => navigate(`/organizer/edit-show/${show.id}`)

  const tonightShows  = shows.filter(s => extractDate(s.date) === today)
  const upcomingShows = shows.filter(s => extractDate(s.date) > today)
  // const featuredShows = shows.filter(s => s.isFeatured)
  const featuredShows = shows.filter(s => s.isFeatured || s.featured)
  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '5rem 2rem 3rem' }}>

      <div style={{
        background: 'linear-gradient(135deg,rgba(139,26,26,0.2) 0%,rgba(26,31,92,0.2) 100%)',
        border: '1px solid var(--border)', borderRadius: 14,
        padding: '1.75rem 2rem', marginBottom: '1.5rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem'
      }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--gold-light)', letterSpacing: '0.04em', marginBottom: 4 }}>
            {t('h_dashboard_welcome',lang)}, {authOrg?.name}! 🎭
          </div>
          <div style={{ fontSize: 14, color: 'var(--text-muted)' }}>
            {authOrg?.melaName} · {t('dashboard_today',lang)}: <span style={{ color: 'var(--gold)' }}>{today}</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Link to="/organizer/add-show" {...smallFilledBtn('var(--crimson)', '#A52020', 'var(--gold-pale)', { padding: '9px 20px', fontSize: 15 })}>
            {t('nav_add_show',lang)}
          </Link>
          <button onClick={() => fetchShows()} {...ghostBtn({ color: 'var(--gold)' })}>
            {t('btn_refresh',lang)}
          </button>
          <button onClick={() => { logout(); navigate('/') }} {...ghostBtn()}>
            {t('nav_logout',lang)}
          </button>
        </div>
      </div>

      {msg && (
        <div style={{
          background: msg.startsWith('✅') ? 'rgba(45,106,45,0.2)' : 'rgba(139,26,26,0.2)',
          border: `1px solid ${msg.startsWith('✅') ? 'rgba(45,106,45,0.5)' : 'rgba(139,26,26,0.5)'}`,
          borderRadius: 8, padding: '0.75rem 1rem', marginBottom: '1.5rem',
          fontSize: 15, color: msg.startsWith('✅') ? '#90D090' : '#FF9090'
        }}>{msg}</div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 12, marginBottom: '2rem' }}>
        {[
          { label: t('stat_total_shows',lang), value: shows.length,         icon: '🎭' },
          { label: t('stat_tonight',lang),     value: tonightShows.length,  icon: '🔴' },
          { label: t('stat_upcoming',lang),    value: upcomingShows.length, icon: '📅' },
          { label: t('stat_featured',lang),    value: featuredShows.length, icon: '⭐' },
        ].map(s => (
          <div key={s.label} style={{
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: 12, padding: '1.25rem',
            display: 'flex', alignItems: 'center', gap: '0.75rem'
          }}>
            <div style={{ fontSize: 24 }}>{s.icon}</div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--gold)', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: 12, padding: '1.25rem 1.75rem', marginBottom: '2rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem'
      }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, color: 'var(--gold-light)', marginBottom: 3 }}>
            {t('post_tonight_show',lang)}
          </div>
          <div style={{ fontSize: 15, color: 'var(--text-muted)' }}>
            {t('pick_today_date',lang)} ({today}) {t('auto_appears_tonight',lang)}
          </div>
        </div>
        <Link to="/organizer/add-show" {...smallFilledBtn('var(--crimson)', '#A52020', 'var(--gold-pale)', { padding: '9px 20px', fontSize: 15 })}>
          {t('btn_add_show_details',lang)}
        </Link>
      </div>

      {loading ? <Spinner text={t('fetching_your_shows',lang)} /> : (
        <>
          {tonightShows.length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: '#FF9090', letterSpacing: '0.05em', marginBottom: '1rem' }}>
                🔴 {t('stat_tonight',lang)} ({tonightShows.length})
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 14 }}>
                {tonightShows.map((s, i) => (
                  <div key={s.id} className="card-in" style={{ animationDelay: `${i * 0.05}s` }}>
                    <ShowCard show={s} />
                  </div>
                ))}
              </div>
            </div>
          )}

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--gold-light)', letterSpacing: '0.05em', marginBottom: '1rem' }}>
            {t('all_your_shows',lang)} ({shows.length})
          </h2>
          {shows.length === 0 ? (
            <div style={{
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 12, padding: '3rem', textAlign: 'center', color: 'var(--text-muted)'
            }}>
              <div style={{ fontSize: 40, marginBottom: '0.75rem' }}>🎭</div>
              <p>{t('no_shows_yet',lang)}</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 14 }}>
              {shows.map((s, i) => (
                <div key={s.id} className="card-in" style={{ animationDelay: `${i * 0.04}s` }}>
                  <ShowCard show={s} onEdit={handleEdit} onDelete={handleDelete} />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
