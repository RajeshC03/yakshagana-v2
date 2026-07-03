import React from 'react'

// Original, simple geometric illustrations representing costume categories.
// These are stand-ins (not real performer photographs, which are copyrighted) —
// swap in real images later by editing the `images` arrays in StylesPage.jsx.

function Base({ children, bg }) {
  return (
    <svg viewBox="0 0 200 200" width="100%" height="100%" style={{ display: 'block', background: bg }}>
      {children}
    </svg>
  )
}

export function CostumeIcon({ type, primary = '#C9A84C', secondary = '#8B1A1A', bg = '#1C1508' }) {
  switch (type) {

    case 'headgear': // front-facing crown / pagade
      return (
        <Base bg={bg}>
          <path d="M40 140 L60 60 L80 100 L100 40 L120 100 L140 60 L160 140 Z" fill={secondary} stroke={primary} strokeWidth="3"/>
          <circle cx="100" cy="95" r="10" fill={primary}/>
          <circle cx="65" cy="110" r="6" fill={primary}/>
          <circle cx="135" cy="110" r="6" fill={primary}/>
          <rect x="40" y="140" width="120" height="14" fill={primary}/>
        </Base>
      )

    case 'headgear-alt': // side profile
      return (
        <Base bg={bg}>
          <path d="M60 150 Q50 90 90 50 Q130 40 150 80 Q140 120 150 150 Z" fill={secondary} stroke={primary} strokeWidth="3"/>
          <circle cx="100" cy="80" r="8" fill={primary}/>
          <circle cx="120" cy="105" r="6" fill={primary}/>
          <rect x="55" y="148" width="100" height="12" fill={primary}/>
        </Base>
      )

    case 'armor': // kavacha chest plate
      return (
        <Base bg={bg}>
          <path d="M100 35 L150 60 L140 150 L100 170 L60 150 L50 60 Z" fill={secondary} stroke={primary} strokeWidth="3"/>
          <path d="M100 55 L125 70 L118 135 L100 148 L82 135 L75 70 Z" fill="none" stroke={primary} strokeWidth="2.5"/>
          <circle cx="100" cy="100" r="10" fill={primary}/>
        </Base>
      )

    case 'armlet': // bujakeerthi
      return (
        <Base bg={bg}>
          <circle cx="100" cy="100" r="55" fill="none" stroke={secondary} strokeWidth="18"/>
          <circle cx="100" cy="100" r="55" fill="none" stroke={primary} strokeWidth="4"/>
          <circle cx="100" cy="45" r="9" fill={primary}/>
          <circle cx="100" cy="155" r="9" fill={primary}/>
        </Base>
      )

    case 'belt': // dabu
      return (
        <Base bg={bg}>
          <rect x="30" y="85" width="140" height="30" rx="6" fill={secondary} stroke={primary} strokeWidth="3"/>
          <circle cx="100" cy="100" r="16" fill={primary}/>
          <circle cx="100" cy="100" r="7" fill={bg}/>
        </Base>
      )

    case 'lowergarment': // kachche draped
      return (
        <Base bg={bg}>
          <path d="M60 50 L140 50 L155 170 L130 150 L100 170 L70 150 L45 170 Z" fill={secondary} stroke={primary} strokeWidth="3"/>
          <line x1="75" y1="60" x2="60" y2="160" stroke={primary} strokeWidth="2"/>
          <line x1="100" y1="60" x2="100" y2="165" stroke={primary} strokeWidth="2"/>
          <line x1="125" y1="60" x2="140" y2="160" stroke={primary} strokeWidth="2"/>
        </Base>
      )

    case 'lowergarment-alt': // checked pattern swatch
      return (
        <Base bg={bg}>
          {Array.from({ length: 6 }).map((_, r) =>
            Array.from({ length: 6 }).map((_, c) => (
              <rect key={`${r}-${c}`} x={20 + c * 27} y={20 + r * 27} width="27" height="27"
                fill={(r + c) % 2 === 0 ? secondary : primary} opacity={(r + c) % 2 === 0 ? 1 : 0.85}/>
            ))
          )}
        </Base>
      )

    case 'mask': // bannada vesha face makeup
      return (
        <Base bg={bg}>
          <ellipse cx="100" cy="105" rx="55" ry="65" fill={secondary} stroke={primary} strokeWidth="3"/>
          <path d="M55 85 Q100 60 145 85" stroke={primary} strokeWidth="5" fill="none"/>
          <circle cx="78" cy="100" r="8" fill={bg}/>
          <circle cx="122" cy="100" r="8" fill={bg}/>
          <path d="M75 135 Q100 150 125 135" stroke={primary} strokeWidth="4" fill="none"/>
          <path d="M70 70 L60 40 M130 70 L140 40 M100 55 L100 30" stroke={primary} strokeWidth="4"/>
        </Base>
      )

    case 'mask-alt': // bannada / large demon headdress
      return (
        <Base bg={bg}>
          <path d="M100 170 L60 80 L75 100 L80 50 L100 90 L120 50 L125 100 L140 80 Z" fill={secondary} stroke={primary} strokeWidth="3"/>
          <circle cx="100" cy="120" r="9" fill={primary}/>
          <circle cx="80" cy="135" r="6" fill={primary}/>
          <circle cx="120" cy="135" r="6" fill={primary}/>
        </Base>
      )

    case 'female': // stree vesha
      return (
        <Base bg={bg}>
          <path d="M100 40 Q70 60 75 100 Q60 130 70 165 L130 165 Q140 130 125 100 Q130 60 100 40 Z" fill={secondary} stroke={primary} strokeWidth="3"/>
          <circle cx="100" cy="65" r="5" fill={primary}/>
          <path d="M80 100 Q100 110 120 100" stroke={primary} strokeWidth="2.5" fill="none"/>
        </Base>
      )

    case 'crown-king': // raja kirita
      return (
        <Base bg={bg}>
          <path d="M45 130 L60 70 L80 100 L100 55 L120 100 L140 70 L155 130 Z" fill={secondary} stroke={primary} strokeWidth="3"/>
          <rect x="45" y="130" width="110" height="16" fill={primary}/>
          <circle cx="100" cy="75" r="11" fill={primary}/>
          <circle cx="70" cy="95" r="6" fill={primary}/>
          <circle cx="130" cy="95" r="6" fill={primary}/>
        </Base>
      )

    case 'crown-monkey': // hanuman kirita
      return (
        <Base bg={bg}>
          <path d="M55 140 Q55 90 100 80 Q145 90 145 140 Z" fill={secondary} stroke={primary} strokeWidth="3"/>
          <circle cx="60" cy="85" r="14" fill={secondary} stroke={primary} strokeWidth="3"/>
          <circle cx="140" cy="85" r="14" fill={secondary} stroke={primary} strokeWidth="3"/>
          <circle cx="100" cy="105" r="8" fill={primary}/>
        </Base>
      )

    case 'crown-demon': // bannada kirita
      return (
        <Base bg={bg}>
          <path d="M100 165 L50 100 L65 115 L60 60 L85 95 L100 45 L115 95 L140 60 L135 115 L150 100 Z" fill={secondary} stroke={primary} strokeWidth="3"/>
          <circle cx="100" cy="125" r="9" fill={primary}/>
        </Base>
      )

    case 'turban': // kore mundasu
      return (
        <Base bg={bg}>
          <path d="M55 130 Q55 70 100 65 Q150 70 145 130 Q120 145 100 140 Q75 148 55 130 Z" fill={secondary} stroke={primary} strokeWidth="3"/>
          <path d="M70 90 Q100 100 135 88" stroke={primary} strokeWidth="3" fill="none"/>
          <circle cx="135 " cy="80" r="7" fill={primary}/>
        </Base>
      )

    case 'drum-chande': // upright chande drum with sticks
      return (
        <Base bg={bg}>
          <ellipse cx="100" cy="70" rx="42" ry="14" fill={primary}/>
          <rect x="58" y="70" width="84" height="90" fill={secondary} stroke={primary} strokeWidth="3"/>
          <ellipse cx="100" cy="160" rx="42" ry="14" fill={primary}/>
          <line x1="70" y1="78" x2="130" y2="152" stroke={primary} strokeWidth="2"/>
          <line x1="130" y1="78" x2="70" y2="152" stroke={primary} strokeWidth="2"/>
          <line x1="85" y1="40" x2="105" y2="68" stroke={primary} strokeWidth="4"/>
          <line x1="120" y1="35" x2="100" y2="68" stroke={primary} strokeWidth="4"/>
        </Base>
      )

    case 'drum-maddale': // horizontal barrel drum
      return (
        <Base bg={bg}>
          <ellipse cx="45" cy="100" rx="16" ry="40" fill={primary}/>
          <path d="M45 65 Q100 50 155 65 L155 135 Q100 150 45 135 Z" fill={secondary} stroke={primary} strokeWidth="3"/>
          <ellipse cx="155" cy="100" rx="14" ry="35" fill={primary}/>
          <line x1="65" y1="72" x2="65" y2="128" stroke={primary} strokeWidth="2"/>
          <line x1="135" y1="72" x2="135" y2="128" stroke={primary} strokeWidth="2"/>
        </Base>
      )

    case 'cymbals-tala': // pair of hand cymbals/bells
      return (
        <Base bg={bg}>
          <ellipse cx="75" cy="100" rx="38" ry="30" fill={secondary} stroke={primary} strokeWidth="3"/>
          <ellipse cx="125" cy="100" rx="38" ry="30" fill={secondary} stroke={primary} strokeWidth="3" opacity="0.85"/>
          <circle cx="75" cy="100" r="7" fill={primary}/>
          <circle cx="125" cy="100" r="7" fill={primary}/>
        </Base>
      )

    case 'cymbals-gubbi': // small finger cymbals (gubbitaala)
      return (
        <Base bg={bg}>
          <circle cx="80" cy="100" r="32" fill={secondary} stroke={primary} strokeWidth="3"/>
          <circle cx="120" cy="100" r="32" fill={secondary} stroke={primary} strokeWidth="3" opacity="0.85"/>
          <circle cx="80" cy="100" r="6" fill={primary}/>
          <circle cx="120" cy="100" r="6" fill={primary}/>
          <path d="M80 68 L80 60 M120 68 L120 60" stroke={primary} strokeWidth="3"/>
        </Base>
      )

    case 'harmonium': // harmonium / shruti box
      return (
        <Base bg={bg}>
          <rect x="35" y="80" width="130" height="55" rx="4" fill={secondary} stroke={primary} strokeWidth="3"/>
          {Array.from({ length: 11 }).map((_, i) => (
            <rect key={i} x={42 + i * 11} y={86} width="9" height="40" fill={i % 2 === 0 ? primary : bg} stroke={primary} strokeWidth="1"/>
          ))}
          <path d="M35 80 Q100 60 165 80" stroke={primary} strokeWidth="3" fill="none"/>
        </Base>
      )

    default:
      return (
        <Base bg={bg}>
          <circle cx="100" cy="100" r="60" fill={secondary} stroke={primary} strokeWidth="3"/>
        </Base>
      )
  }
}
