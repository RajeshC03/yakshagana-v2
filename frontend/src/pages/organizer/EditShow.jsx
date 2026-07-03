import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { showsAPI } from '../../api'
import { useLanguage } from '../../context/LanguageContext'
import { t } from '../../data/translations'
import { textLink } from '../../utils/buttonStyles'
import ShowForm from './ShowForm'
import Spinner from '../../components/Spinner'

export default function EditShow() {
  const { id }    = useParams()
  const { lang }  = useLanguage()
  const navigate  = useNavigate()
  const [form,    setForm]    = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving,  setSaving]  = useState(false)
  const [error,   setError]   = useState('')

  const today = new Date().toISOString().split('T')[0]

  useEffect(() => {
    showsAPI.getById(id).then(r => {
      const s = r.data
      const showDate  = s.date ? s.date.split('T')[0] : ''
      const isTonight = showDate === today ? true : !!s.isTonight

      setForm({
        prasanga:    s.prasanga    || '',
        melaName:    s.melaName    || '',
        troupeNo:    s.troupeNo    || '',
        venue:       s.venue       || '',
        district:    s.district    || '',
        date:        showDate,
        startTime:   s.startTime   || '',
        endTime:     s.endTime     || '',
        style:       s.style       || '',
        epic:        s.epic        || '',
        isTonight:   isTonight,
        isFeatured:  !!s.isFeatured,
        ticketPrice: s.ticketPrice || 'Free',
        latitude:    s.latitude    || '',
        longitude:   s.longitude   || ''
      })
    })
    .catch(() => setError(t('show_not_found',lang)))
    .finally(() => setLoading(false))
  }, [id])

  const onChange = e => {
    const { name, value, type, checked } = e.target
    let updated = { ...form, [name]: type === 'checkbox' ? checked : value }
    if (name === 'date') updated.isTonight = value === today
    setForm(updated)
    setError('')
  }

  const onSubmit = async e => {
    e.preventDefault()
    if (!form.prasanga || !form.venue || !form.district || !form.date || !form.startTime || !form.endTime || !form.style)
      return setError(t('err_fill_required_plain',lang))

    setSaving(true)
    try {
      await showsAPI.update(id, {
        ...form,
        isTonight:  form.date === today,
        latitude:   form.latitude  ? parseFloat(form.latitude)  : null,
        longitude:  form.longitude ? parseFloat(form.longitude) : null,
      })
      navigate('/organizer/dashboard', { state: { msg: `✅ "${form.prasanga}" ${t('show_updated_success',lang)}` } })
    } catch (err) {
      setError(err.response?.data?.message || t('err_update_show_failed',lang))
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div style={{ paddingTop: '6rem' }}><Spinner text={t('loading_show',lang)} /></div>

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: '5rem 2rem 3rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <button
          onClick={() => navigate('/organizer/dashboard')}
          {...textLink('var(--text-muted)', 'var(--gold)', { background: 'none', border: 'none', cursor: 'pointer', marginBottom: '1rem', padding: 0, display: 'block' })}
        >
          {t('btn_back_dashboard',lang)}
        </button>
        <div style={{ fontFamily: 'var(--font-kannada)', fontSize: 15, color: 'var(--gold)', marginBottom: 4 }}>{t('h_edit_show','kn')}</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--gold-light)', letterSpacing: '0.05em', marginBottom: 6 }}>
          {t('h_edit_show','en')}
        </h1>
        <p style={{ fontSize: 15, color: 'var(--text-muted)' }}>
          {t('updating_show',lang)}: <span style={{ color: 'var(--gold)' }}>{form?.prasanga}</span>
        </p>

        <div style={{
          marginTop: '0.75rem', padding: '0.65rem 1rem',
          background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.25)',
          borderRadius: 8, fontSize: 15, color: 'var(--gold)'
        }}>
          💡 {t('hint_edit_today_tonight',lang)} ({today}) {t('hint_edit_auto_tonight',lang)} ✅
        </div>
      </div>

      {error && (
        <div style={{ background: 'rgba(139,26,26,0.2)', border: '1px solid rgba(139,26,26,0.5)', borderRadius: 8, padding: '0.75rem 1rem', marginBottom: '1rem', fontSize: 15, color: '#FF9090' }}>
          ⚠️ {error}
        </div>
      )}

      {form && (
        <ShowForm form={form} onChange={onChange} onSubmit={onSubmit} loading={saving} submitLabel={t('btn_update_show',lang)}/>
      )}
    </div>
  )
}
