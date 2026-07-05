import React from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { t } from '../../data/translations'
import { submitBtn } from '../../utils/buttonStyles'

const DISTRICTS = ['Dakshina Kannada', 'Udupi', 'Uttara Kannada']
const STYLES     = ['Tenkutittu', 'Badagutittu']
const EPICS       = ['Mahabharata', 'Ramayana', 'Devi Bhagavatha', 'Skanda Purana', 'Bhagavatha', 'Other']

function FI({ label, name, type = 'text', placeholder, value, onChange, full }) {
  const [f, setF] = React.useState(false)
  return (
    <div style={{ marginBottom: '1rem', gridColumn: full ? '1/-1' : undefined }}>
      <label style={{ display: 'block', fontSize: 13, color: 'var(--text-muted)', marginBottom: 5, letterSpacing: '0.05em' }}>{label.toUpperCase()}</label>
      <input
        name={name} type={type} placeholder={placeholder} value={value || ''} onChange={onChange}
        onFocus={() => setF(true)} onBlur={() => setF(false)}
        style={{
          width: '100%', padding: '9px 11px', background: 'var(--bg-dark)',
          border: `1px solid ${f ? 'var(--gold)' : 'var(--border)'}`, borderRadius: 7,
          color: 'var(--text-primary)', fontSize: 15, outline: 'none',
          boxSizing: 'border-box', transition: 'border-color 0.2s',
        }}
      />
    </div>
  )
}

function SI({ label, name, value, onChange, options, selectLabel }) {
  const [f, setF] = React.useState(false)
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ display: 'block', fontSize: 13, color: 'var(--text-muted)', marginBottom: 5, letterSpacing: '0.05em' }}>{label.toUpperCase()}</label>
      <select
        name={name} value={value || ''} onChange={onChange}
        onFocus={() => setF(true)} onBlur={() => setF(false)}
        style={{
          width: '100%', padding: '9px 11px', background: 'var(--bg-dark)',
          border: `1px solid ${f ? 'var(--gold)' : 'var(--border)'}`, borderRadius: 7,
          color: value ? 'var(--text-primary)' : 'var(--text-muted)', fontSize: 15,
          outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s',
        }}
      >
        <option value="">{selectLabel}</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  )
}

function Row({ children }) {
  return <div style={{ display: 'grid', gridTemplateColumns: `repeat(${React.Children.count(children)},1fr)`, gap: '1rem' }}>{children}</div>
}

export default function ShowForm({ form, onChange, onSubmit, loading, submitLabel }) {
  const { lang } = useLanguage()
  const selectLabel = t('sf_select',lang)
  return (
    <form onSubmit={onSubmit} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: '2rem' }}>
      <Row>
  <FI
    label="Prasanga (English)"
    name="prasanga"
    value={form.prasanga}
    onChange={onChange}
  />

  <FI
    label="ಪ್ರಸಂಗ (Kannada)"
    name="prasangaKn"
    value={form.prasangaKn}
    onChange={onChange}
  />
</Row>

<Row>
  <FI
    label="Mela Name (English)"
    name="melaName"
    value={form.melaName}
    onChange={onChange}
  />

  <FI
    label="ಮೇಳದ ಹೆಸರು (Kannada)"
    name="melaNameKn"
    value={form.melaNameKn}
    onChange={onChange}
  />
</Row>
      <Row>
        <FI label={t('sf_troupe_no',lang)} name="troupeNo" placeholder="eg: Troupe 3" value={form.troupeNo} onChange={onChange}/>
        <SI
    label="Style (English)"
    name="style"
    options={STYLES}
    value={form.style}
    onChange={onChange}
    selectLabel={selectLabel}
/>

<FI
    label="ಶೈಲಿ (Kannada)"
    name="styleKn"
    value={form.styleKn}
    onChange={onChange}
/>
      </Row>
      <FI
    label="Venue (English)"
    name="venue"
    value={form.venue}
    onChange={onChange}
    full
/>

<FI
    label="ಸ್ಥಳ (Kannada)"
    name="venueKn"
    value={form.venueKn}
    onChange={onChange}
    full
/>
      <Row>
        <SI
    label="District (English)"
    name="district"
    options={DISTRICTS}
    value={form.district}
    onChange={onChange}
    selectLabel={selectLabel}
/>

<FI
    label="ಜಿಲ್ಲೆ (Kannada)"
    name="districtKn"
    value={form.districtKn}
    onChange={onChange}
/>

        <SI
    label="Epic (English)"
    name="epic"
    options={EPICS}
    value={form.epic}
    onChange={onChange}
    selectLabel={selectLabel}
/>

<FI
    label="ಮಹಾಕಾವ್ಯ (Kannada)"
    name="epicKn"
    value={form.epicKn}
    onChange={onChange}
/>
      </Row>
      <Row>
        <FI label={t('sf_date',lang)} name="date" type="date" value={form.date} onChange={onChange}/>
        <FI label={t('sf_start_time',lang)} name="startTime" type="time" value={form.startTime} onChange={onChange}/>
        <FI label={t('sf_end_time',lang)} name="endTime" type="time" value={form.endTime} onChange={onChange}/>
      </Row>
      <Row>
        <FI label={t('sf_ticket_price',lang)} name="ticketPrice" placeholder="Free or Rs.50" value={form.ticketPrice} onChange={onChange}/>
        <FI label={t('sf_latitude',lang)} name="latitude" placeholder="eg: 13.0039" value={form.latitude} onChange={onChange}/>
        <FI label={t('sf_longitude',lang)} name="longitude" placeholder="eg: 74.9742" value={form.longitude} onChange={onChange}/>
      </Row>
      <div style={{ display: 'flex', gap: '2rem', margin: '1rem 0 1.5rem' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 15, color: 'var(--text-secondary)' }}>
          <input type="checkbox" name="isTonight" checked={!!form.isTonight} onChange={onChange} style={{ width: 16, height: 16, accentColor: 'var(--crimson)' }}/>
          {t('sf_tonight_show',lang)}
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 15, color: 'var(--text-secondary)' }}>
          <input type="checkbox" name="isFeatured" checked={!!form.isFeatured} onChange={onChange} style={{ width: 16, height: 16, accentColor: 'var(--gold)' }}/>
          {t('sf_featured_show',lang)}
        </label>
      </div>
      <button type="submit" disabled={loading} {...submitBtn(loading)}>
        {loading ? t('btn_saving',lang) : '🎭 ' + submitLabel}
      </button>
    </form>
  )
}
