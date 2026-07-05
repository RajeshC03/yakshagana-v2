import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { showsAPI } from '../../api'
import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../context/LanguageContext'
import { t } from '../../data/translations'
import { textLink } from '../../utils/buttonStyles'
import ShowForm from './ShowForm'

export default function AddShow() {
  const { authOrg } = useAuth()
  const { lang } = useLanguage()
  const navigate    = useNavigate()

  const today = new Date().toISOString().split('T')[0]

  // const [form, setForm] = useState({
  //   prasanga: '', melaName: authOrg?.melaName || '', troupeNo: '',
  //   venue: '', district: '', date: '', startTime: '', endTime: '',
  //   style: '', epic: '', isTonight: false, isFeatured: false,
  //   ticketPrice: 'Free', latitude: '', longitude: ''
  // })

  const [form, setForm] = useState({
  // English
  prasanga: '',
  melaName: authOrg?.melaName || '',
  melaNameKn: authOrg?.melaNameKn || '',
  venue: '',
  district: '',
  style: '',
  epic: '',

  // Kannada
  prasangaKn: '',
  melaNameKn: '',
  venueKn: '',
  districtKn: '',
  styleKn: '',
  epicKn: '',

  troupeNo: '',
  date: '',
  startTime: '',
  endTime: '',

  isTonight: false,
  isFeatured: false,

  ticketPrice: 'Free',
  latitude: '',
  longitude: ''
})


  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error,   setError]   = useState('')

  const onChange = e => {
    const { name, value, type, checked } = e.target
    let updated = { ...form, [name]: type === 'checkbox' ? checked : value }
    if (name === 'date') updated.isTonight = value === today
    setForm(updated)
    setSuccess('')
    setError('')
  }

  const onSubmit = async e => {
    e.preventDefault()
    if (
    !form.prasanga ||
    !form.prasangaKn ||

    !form.venue ||
    !form.venueKn ||

    !form.district ||
    !form.districtKn ||

    !form.style ||
    !form.styleKn ||

    !form.epic ||
    !form.epicKn ||

    !form.date ||
    !form.startTime ||
    !form.endTime
)
      return setError(t('err_fill_required_star',lang))

    setLoading(true)
    try {
      await showsAPI.create({
        ...form,
        isTonight:  form.date === today,
        latitude:   form.latitude  ? parseFloat(form.latitude)  : null,
        longitude:  form.longitude ? parseFloat(form.longitude) : null,
      })
      setSuccess(`✅ "${form.prasanga}" added! ${form.date === today ? t('show_added_tonight',lang) : t('show_added_visible',lang)}`)
      // setForm(p => ({
      //   ...p, prasanga: '', troupeNo: '', venue: '', district: '',
      //   date: '', startTime: '', endTime: '', style: '', epic: '',
      //   isTonight: false, isFeatured: false,
      //   ticketPrice: 'Free', latitude: '', longitude: ''
      // }))

      setForm(p => ({
    ...p,

    // English
    prasanga: '',
    venue: '',
    district: '',
    style: '',
    epic: '',

    // Kannada
    prasangaKn: '',
    venueKn: '',
    districtKn: '',
    styleKn: '',
    epicKn: '',

    troupeNo: '',
    date: '',
    startTime: '',
    endTime: '',

    isTonight: false,
    isFeatured: false,

    ticketPrice: 'Free',
    latitude: '',
    longitude: ''
}))


    } catch (err) {
      setError(err.response?.data?.message || t('err_add_show_failed',lang))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: '5rem 2rem 3rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <button
          onClick={() => navigate('/organizer/dashboard')}
          {...textLink('var(--text-muted)', 'var(--gold)', { background: 'none', border: 'none', cursor: 'pointer', marginBottom: '1rem', padding: 0, display: 'block' })}
        >
          {t('btn_back_dashboard',lang)}
        </button>
        <div style={{ fontFamily: 'var(--font-kannada)', fontSize: 15, color: 'var(--gold)', marginBottom: 4 }}>{t('h_add_show','kn')}</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--gold-light)', letterSpacing: '0.05em', marginBottom: 6 }}>
          {t('h_add_show','en')}
        </h1>
        <p style={{ fontSize: 15, color: 'var(--text-muted)' }}>
          {t('posting_as',lang)}: <span style={{ color: 'var(--gold)' }}>{authOrg?.name}</span>
          {' · '}<span style={{ color: 'var(--gold)' }}>{authOrg?.melaName}</span>
        </p>

        <div style={{
          marginTop: '0.75rem', padding: '0.65rem 1rem',
          background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.25)',
          borderRadius: 8, fontSize: 15, color: 'var(--gold)'
        }}>
          💡 {t('hint_today_tonight',lang)} <strong>({today})</strong> {t('hint_auto_tonight',lang)}
        </div>
      </div>

      {success && (
        <div style={{ background: 'rgba(45,106,45,0.2)', border: '1px solid rgba(45,106,45,0.5)', borderRadius: 8, padding: '1rem', marginBottom: '1.5rem', fontSize: 15, color: '#90D090' }}>
          {success}
        </div>
      )}
      {error && (
        <div style={{ background: 'rgba(139,26,26,0.2)', border: '1px solid rgba(139,26,26,0.5)', borderRadius: 8, padding: '0.75rem 1rem', marginBottom: '1rem', fontSize: 15, color: '#FF9090' }}>
          ⚠️ {error}
        </div>
      )}

      <ShowForm form={form} onChange={onChange} onSubmit={onSubmit} loading={loading} submitLabel={t('btn_add_show_to_portal',lang)}/>
    </div>
  )
}
