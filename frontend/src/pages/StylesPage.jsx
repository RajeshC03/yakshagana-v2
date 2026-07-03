																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																										import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { chipBtn, filledBtn, outlineBtn } from '../utils/buttonStyles'
import { CostumeIcon } from '../components/CostumeIcon'
import Lightbox from '../components/Lightbox'

const STYLES = {
  tenkutittu: {
    name: 'Tenkutittu',
    kannada: 'ತೆಂಕುತಿಟ್ಟು',
    tagline: 'The Southern Style',
    region: 'Practiced from Mulki down to Kasaragod — covering southern Dakshina Kannada and parts of Kerala.',
    // videoId: 'UitBloxw-kE',
    videoId: "YjZliKe4Xn8",
    accent: '#8B1A1A',
    overview: `Tenkutittu is the southern variant of Yakshagana, performed across the coastal belt stretching from Mulki to Kasaragod. Its rhythm section is built around the Kerala-style maddalam — a double-headed drum carved from jackfruit wood — paired with a chende close in form to the chenda used in Kathakali. This shared instrumentation, along with elaborate face paint and towering headgear for demon roles, gives Tenkutittu a visual and rhythmic kinship with Kerala's Kathakali tradition. The footwork tends to be sharp and energetic, with vigorous leaps that demand strong stamina from the dancer-actors.`,
     costumes: [
      { name: 'Kirita / Pagade', desc: 'The carved wooden headgear worn by male leads, layered with gold foil and inset with mirror chips that catch torchlight or stage lighting during night-long performances.', icons: [{src:'/costumes/kireeta.jpeg',caption:'Front view'},{src:'/costumes/kireeta_side_view.jpg',caption:'Side profile'}] },
      { name: 'Kavacha', desc: 'A chest plate built from light wood, decorated with mirror work and colour, worn over the costume to represent armour on warrior and king characters.', icons: [{src:'/costumes/kavacha.jpeg',caption:'Chest plate'}] },
      { name: 'Bujakeerthi', desc: 'Ornate armlets fastened around the upper arm, mirroring the chest plate in material and finish, completing the upper-body silhouette.', icons: [{src:'/costumes/bujakeerti.jpeg',caption:'Shoulder armlet'}] },
      { name: 'Dabu', desc: 'A decorative belt worn at the waist, carved and gilded like the rest of the ornaments, marking the transition between the upper and lower costume.', icons: [{src:'/costumes/dabu.webp',caption:'Waist belt'}] },
      { name: 'Kachche', desc: "The lower garment, tied in bold red, yellow and orange checks, padded underneath to exaggerate the actor's frame and silhouette on stage.", icons: [{src:'/costumes/kacche.jpg',caption:'Draped view'},{src:'/costumes/kacche2.jpg',caption:'Draped view'}] },
      { name: 'Bannada Vesha', desc: 'The elaborate make-up and oversized headdress reserved for demon (rakshasa) characters — often the most striking and time-consuming costume to prepare, sometimes taking three to four hours.', icons: [{src:'/costumes/face_makeup.jpg',caption:'Face make-up'},{src:'/costumes/daemon_headdress2.jpeg',caption:'Demon headdress'},{src:'/costumes/daemon_headdress.jpeg',caption:'Demon headdress'},{src:'/costumes/demon_headdress3.jpg',caption:'Demon headdress'}] },
      { name: 'Stree Vesha', desc: 'Female roles, traditionally performed by male artists, dressed in costume and ornaments that echo the grace of the character rather than the bulk of warrior dress.', icons: [{src:'/costumes/stree_vesha_tenku.jpeg',caption:'Female role costume'},{src:'/costumes/stree_vesha2.jpg',caption:'Female role costume'},{src:'/costumes/stree_vesha3.jpg',caption:'Female role costume'},{src:'/costumes/stree_vesha4.jpg',caption:'Female role costume'}] },
    ],
    instruments: [
      { name: 'Chende', desc: 'A high-pitched, loud double-headed drum played standing at the left corner of the bhagavata. Tenkutittu chende closely resembles the chenda used in Kerala\'s Kathakali — its sound is said to carry long distances, signalling to nearby villages that a performance has begun.', icons: [{src:'/instruments/chende_tenku.jpg',caption:'Chende drum'},{src:'/instruments/chende_playing_tenku.jpeg',caption:'Chande drum in use'}] },
      { name: 'Maddale', desc: 'The primary hand-played percussion instrument, seated to the right of the bhagavata. In Tenkutittu the maddale shows Carnatic-music influence in its construction and playing style, working in tandem with the chende to drive the rhythm.', icons: [{src:'/instruments/maddale_tenku.jpg',caption:'Maddale drum'},{src:'/instruments/maddale_playing_tenku.jpg',caption:'Maddale drum in use'}] },
      { name: 'Tala / Chakratala', desc: 'Hand cymbals played by the bhagavata (lead singer-narrator) himself are traditionally cast from a five-metal alloy (panchaloha) and tuned to suit his voice, holding the songs rhythm and meter together, while a separate background musician plays the much larger and heavier Chakra Tala to amplify the booming beats of the Chende drum during high-energy dance sequences.', icons: [{src:'/instruments/tala_tenku.jpg',caption:'Chakra Tala'},{src:'/instruments/tala_tenku2.jpg',caption:'Chakra Tala'},{src:'/instruments/bhagavataru_tenku.jpeg',caption:'Bhagavataru with Tala'},{src:'/instruments/chakra_tala_guy.jpeg',caption:'Chakra Tala in use'}] },
      { name: 'Shruti (Harmonium)', desc: 'A reed organ used in modern performances to hold a steady drone pitch for the bhagavata\'s singing — in many troupes today an electronic shruti box serves the same purpose.', icons: [{src:'/instruments/shruti_tenku.webp',caption:'Shruti box'}] },
    ],
  },
  badagutittu: {
    name: 'Badagutittu',
    kannada: 'ಬಡಗುತಿಟ್ಟು',
    tagline: 'The Northern Style',
    region: 'Practiced from Padubidri and Kundapura up through Byndoor and into Uttara Kannada district.',
    videoId: 'N_sS2nvWECI',
    accent: '#1A1F5C',
    overview: `Badagutittu is the northern variant of Yakshagana, prevalent from the Udupi coastline up to Uttara Kannada district. It is driven by the Karnataka-style chande drum and gubbitaala finger-cymbals rather than the Kerala maddalam used in the south. This style places greater emphasis on facial expression and matugarike (extempore dialogue), and was reshaped into a shorter, more modern format by Shivarama Karanth's Yakshagana Mandira at Saligrama. Keremane Shivarama Hegde, founder of the Idagunji Mahaganapati Yakshagana Mandali and the first Yakshagana artist to receive the Rashtrapati Award, is among its best-known exponents.`,
    costumes: [
      { name: 'Kirita / Pagade', desc: 'Headgear carved from light wood and decorated with mirror pieces and coloured stones; some modern troupes now use lighter materials like thermocol in place of solid wood.', icons: [{src:'/costumes/badagu_kirita.jpg',caption:'Pagade'},{src:'/costumes/badagu_kirita2.jpg',caption:'Kirita'}] },
      { name: 'Raja Kirita', desc: 'The crown-style headgear reserved for king characters, taller and more ornate than the standard pagade worn by other roles.', icons: [{src:'/costumes/raja_kirita.jpg',caption:'Royal crown'}] },
      { name: 'Hanuman Kirita', desc: 'A distinct headdress style used for Hanuman and other celestial or monkey characters, shaped differently from the human warrior headgear.', icons: [{src:'/costumes/hanuman_kirita.jpeg',caption:"Hanuman's headgear"}] },
      { name: 'Bannada Kirita', desc: 'The large, dramatic headdress built for demon (rakshasa) roles — among the most elaborate of the roughly sixty documented headgear types.', icons: [{src:'/costumes/bannada_kirita_badagu.jpg',caption:'Demon crown'}] },
      { name: 'Kore Mundasu', desc: 'A slanted turban style worn by certain kirita-wearing characters; a double-wrapped version, jodu kore mundasu, is used for select roles.', icons: [{src:'/costumes/jodu_mundasu.png',caption:'Slanted turban'}] },
      { name: 'Kavacha & Bujakeerthi', desc: 'The chest plate and armlets, built the same way as in the southern style — light wood, gold foil, and mirror inlay — worn over a vest covering the upper body.', icons: [{src:'/costumes/kavacha_badagu.jpg',caption:'Chest plate'},{src:'/costumes/bujakeerti_badagu.jpg',caption:'Shoulder armlet'}] },
      { name: 'Kachche', desc: 'The padded lower garment in checked red, yellow and orange, identical in spirit to the southern style but often paired with a slightly more restrained upper costume.', icons: [{src:'/costumes/kachche_badagu.jpg',caption:'Draped view'},{src:'/costumes/kachche2_badagu.webp',caption:'Draped view'}] },
    ],
    instruments: [
      { name: 'Chande', desc: 'The Karnataka-style version of this loud double-headed drum, played seated at the right corner of the bhagavata (the opposite arrangement from Tenkutittu, where the player stands at the left).', icons: [{src:'/instruments/chende_badagu.webp',caption:'Chande drum'},{src:'/instruments/chende_playing_badagu.jpg',caption:'Chande drum in use'}] },
      { name: 'Maddale', desc: 'The primary percussion instrument, akin to the mridangam, providing the steady rhythmic base beneath the chande\'s lead beats throughout the night-long performance.', icons: [{src:'/instruments/maddale_tenku.jpg',caption:'Maddale drum'},{src:'/instruments/maddale_playing_badagu.jpeg',caption:'Maddale drum in use'}] },
      { name: 'Gubbitaala', desc: 'Small, thick finger cymbals made from a five-metal alloy, used in place of the larger tala — tuned specifically to match the pitch of the bhagavata\'s singing voice.', icons: [{src:'/instruments/gubbitala.jpg',caption:'Gubbitala-finger cymbals'},{src:'/instruments/jansale_bhagavtr.jpeg',caption:'Bhagavataru'}] },
      { name: 'Shruti (Harmonium)', desc: 'Provides the drone pitch for the bhagavata\'s singing, which in Badagutittu carries a noticeable Hindustani music influence compared to the Carnatic leanings of the south.', icons: [{src:'/instruments/shruti_badagu.jpg',caption:'Shruti box'}] },
    ],
  },
}

export default function StylesPage() {
  const { authUser, authOrg } = useAuth()
  const isLoggedIn = !!(authUser || authOrg)

  const [active, setActive] = useState('tenkutittu')
  const [openItem, setOpenItem] = useState(null) // { ...item, kind: 'costume'|'instrument' }
  const s = STYLES[active]

  const lightboxImages = openItem
    ? openItem.icons.map(ic =>
        ic.src
          ? { src: ic.src, caption: ic.caption }
          : { render: () => <CostumeIcon type={ic.type} secondary={s.accent}/>, caption: ic.caption }
      )
    : []

  if (!isLoggedIn) {
    return (
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '8rem 2rem 3rem', textAlign: 'center' }}>
        <div style={{ fontSize: 52, marginBottom: '1.5rem' }}>🎭</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--gold-light)', letterSpacing: '0.05em', marginBottom: 12 }}>
          Yakshagana Styles
        </h1>
        <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '2rem', maxWidth: 420, margin: '0 auto 2rem' }}>
          Login or create a free account to explore Tenkutittu and Badagutittu styles — including costumes, instruments, and performance videos.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/user/login"    {...filledBtn('var(--crimson)', '#A52020')}>Login to Explore</Link>
          <Link to="/user/register" {...outlineBtn('var(--gold)')}>Register Free</Link>
        </div>
        <p style={{ marginTop: '1.5rem', fontSize: 13, color: 'var(--text-muted)' }}>
          Are you a mela organiser? <Link to="/organizer/login" style={{ color: 'var(--gold)' }}>Login here</Link>
        </p>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '5rem 2rem 4rem' }}>

      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, letterSpacing: '0.06em', color: 'var(--gold-light)', marginBottom: 8 }}>
          Yakshagana Styles
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 15, maxWidth: 600 }}>
          The two living traditions of coastal Karnataka's dance-drama — distinguished by music, costume, and region. Click any item below to view it up close.
        </p>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: '2rem' }}>
        <button onClick={() => setActive('tenkutittu')} {...chipBtn(active === 'tenkutittu', { padding: '8px 20px', fontSize: 13 })}>
          ತೆಂಕುತಿಟ್ಟು Tenkutittu
        </button>
        <button onClick={() => setActive('badagutittu')} {...chipBtn(active === 'badagutittu', { padding: '8px 20px', fontSize: 13 })}>
          ಬಡಗುತಿಟ್ಟು Badagutittu
        </button>
      </div>

      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg,rgba(139,26,26,0.18) 0%,rgba(26,31,92,0.18) 100%)',
        border: '1px solid var(--border)', borderRadius: 16, padding: '2rem', marginBottom: '1.5rem'
      }}>
        <div style={{ fontFamily: 'var(--font-kannada)', fontSize: 22, color: 'rgba(255,255,255,0.9)', marginBottom: 6 }}>{s.kannada}</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 26, color: 'var(--gold-pale)', letterSpacing: '0.04em', marginBottom: 4 }}>{s.name}</h2>
        <div style={{ fontSize: 13, color: 'var(--gold)', marginBottom: '1rem' }}>{s.tagline}</div>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)' }}>📍 {s.region}</p>
      </div>

      {/* Video */}
      <div style={{ marginBottom: '1.5rem', borderRadius: 14, overflow: 'hidden', border: '1px solid var(--border)' }}>
        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
          <iframe
            // src={`https://www.youtube.com/embed/${s.videoId}`}
            src={`https://www.youtube.com/embed/${s.videoId}`}
            title={`${s.name} Yakshagana performance`}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>

      {/* Overview */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 13, color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: 10 }}>📜 ABOUT THIS STYLE</h3>
        <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.8 }}>{s.overview}</p>
      </div>

      {/* Costumes */}
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--gold-light)', letterSpacing: '0.05em', marginBottom: '1.25rem' }}>
        🎭 Costume & Ornament Guide
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 16, marginBottom: '2.5rem' }}>
        {s.costumes.map(c => (
          <div
            key={c.name}
            onClick={() => setOpenItem(c)}
            style={{
              background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12,
              padding: '1.25rem', cursor: 'pointer', transition: 'border-color 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 15, color: 'var(--gold)', letterSpacing: '0.04em' }}>
                {c.name}
              </h4>
              <span style={{ fontSize: 11, color: 'var(--text-muted)', flexShrink: 0, whiteSpace: 'nowrap' }}>🔍 View{c.icons.length > 1 ? ` (${c.icons.length})` : ''}</span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.65 }}>{c.desc}</p>
          </div>
        ))}
      </div>

      {/* Instruments */}
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--gold-light)', letterSpacing: '0.05em', marginBottom: '1.25rem' }}>
        🥁 Instruments of the Himmela
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 16 }}>
        {s.instruments.map(ins => (
          <div
            key={ins.name}
            onClick={() => setOpenItem(ins)}
            style={{
              background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12,
              padding: '1.25rem', cursor: 'pointer', transition: 'border-color 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 15, color: 'var(--gold)', letterSpacing: '0.04em' }}>
                {ins.name}
              </h4>
              <span style={{ fontSize: 11, color: 'var(--text-muted)', flexShrink: 0, whiteSpace: 'nowrap' }}>🔍 View{ins.icons.length > 1 ? ` (${ins.icons.length})` : ''}</span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.65 }}>{ins.desc}</p>
          </div>
        ))}
      </div>


      {openItem && (
        <Lightbox
          images={lightboxImages}
          title={openItem.name}
          onClose={() => setOpenItem(null)}
        />
      )}
    </div>
  )
}
