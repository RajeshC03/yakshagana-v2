import React,{useState,useEffect} from 'react'
import {Link,useLocation,useNavigate} from 'react-router-dom'
import {useAuth} from '../context/AuthContext'
import {useLanguage} from '../context/LanguageContext'
import {t} from '../data/translations'
import {smallOutlineBtn, smallFilledBtn, ghostBtn, textLink} from '../utils/buttonStyles'
import styles from './Navbar.module.css'

export default function Navbar(){
  const location=useLocation(),navigate=useNavigate()
  const {authUser,authOrg,logout}=useAuth()
  const {lang,setLang}=useLanguage()
  const [scrolled,setScrolled]=useState(false)
  const [open,setOpen]=useState(false)
  useEffect(()=>{const f=()=>setScrolled(window.scrollY>40);window.addEventListener('scroll',f);return()=>window.removeEventListener('scroll',f)},[])
  const isLoggedIn = !!(authUser || authOrg)
  const links=[
    {to:'/',label:t('nav_home',lang)},
    {to:'/shows',label:t('nav_shows',lang)},
    {to:'/melas',label:t('nav_melas',lang)},
    {to:'/prasangas',label:t('nav_prasangas',lang)},
    {to:'/styles',label:t('nav_styles',lang)},
  ]
  const doLogout=()=>{logout();navigate('/');setOpen(false)}

  return(
    <nav className={`${styles.nav} ${scrolled?styles.scrolled:''}`}>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand} onClick={()=>setOpen(false)}>
          <span className={styles.brandKannada}>ಯಕ್ಷಗಾನ</span>
          <span className={`${styles.brandEn} shimmer-text`}>Yakshagana</span>
        </Link>

        <div className={`${styles.links} ${open?styles.open:''}`}>
          {links.map(l=>(
            <Link key={l.to} to={l.to} className={`${styles.link} ${location.pathname===l.to?styles.active:''}`} onClick={()=>setOpen(false)}>{l.label}</Link>
          ))}

          {/* Language toggle */}
          <div style={{display:'flex',border:'1px solid var(--border)',borderRadius:6,overflow:'hidden',flexShrink:0}}>
            <button
              onClick={()=>setLang('en')}
              style={{
                padding:'4px 10px',fontSize:13,cursor:'pointer',border:'none',
                background: lang==='en' ? 'var(--gold)' : 'transparent',
                color: lang==='en' ? 'var(--bg-dark)' : 'var(--text-muted)',
                fontFamily:'var(--font-display)',transition:'all 0.2s',
              }}
            >EN</button>
            <button
              onClick={()=>setLang('kn')}
              style={{
                padding:'4px 10px',fontSize:13,cursor:'pointer',border:'none',
                background: lang==='kn' ? 'var(--gold)' : 'transparent',
                color: lang==='kn' ? 'var(--bg-dark)' : 'var(--text-muted)',
                fontFamily:'var(--font-kannada)',transition:'all 0.2s',
              }}
            >ಕನ್ನಡ</button>
          </div>

          {authOrg ? (
            <>
              {/* <Link
                to="/organizer/dashboard"
                onClick={()=>setOpen(false)}
                {...textLink('var(--gold)', 'var(--gold-light)', {fontFamily:'var(--font-body)'})}
              >
                🎭 {authOrg.melaName}
              </Link> */}

                <Link
                  to="/organizer/dashboard"
                  onClick={() => setOpen(false)}
                  {...textLink('var(--gold)', 'var(--gold-light)', { fontFamily: 'var(--font-body)' })}
                >
                  🎭 {lang === "kn" && authOrg?.melaNameKn
                      ? authOrg.melaNameKn
                      : authOrg?.melaName}
                </Link>
              <Link
                to="/organizer/add-show"
                onClick={()=>setOpen(false)}
                {...smallFilledBtn('var(--crimson)', '#A52020', 'var(--gold-pale)')}
              >
                {t('nav_add_show',lang)}
              </Link>
              <button onClick={doLogout} {...ghostBtn({padding:'5px 12px',fontSize: 15})}>
                {t('nav_logout',lang)}
              </button>
            </>
          ) : authUser ? (
            <>
              <span style={{fontSize: 15,color:'var(--gold)'}}>👤 {authUser.name}</span>
              <button onClick={doLogout} {...ghostBtn({padding:'5px 12px',fontSize: 15})}>
                {t('nav_logout',lang)}
              </button>
            </>
          ) : (
            <>
              <Link
                to="/user/login"
                onClick={()=>setOpen(false)}
                {...smallOutlineBtn('var(--text-secondary)', 'var(--border)')}
              >
                {t('nav_user_login',lang)}
              </Link>
              <Link
                to="/organizer/login"
                onClick={()=>setOpen(false)}
                {...smallFilledBtn('var(--crimson)', '#A52020', 'var(--gold-pale)')}
              >
                {t('nav_org_login',lang)}
              </Link>
            </>
          )}
        </div>

        <button className={styles.menuBtn} onClick={()=>setOpen(!open)}><span/><span/><span/></button>
      </div>
    </nav>
  )
}
