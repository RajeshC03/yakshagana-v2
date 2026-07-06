import React from 'react'
import {useNavigate} from 'react-router-dom'
import {useLanguage} from '../context/LanguageContext'
import {t} from '../data/translations'
export default function MelaCard({mela}){
  const nav=useNavigate()
  const {lang}=useLanguage()
  const sc=mela.style==='Tenkutittu'?'#8B1A1A':'#1A1F5C'
  const desc = (lang==='kn' && mela.descriptionKn) ? mela.descriptionKn : mela.description
  return(
    <div onClick={()=>nav(`/melas/${mela.id}`)} style={{background:'var(--bg-card)',border:'1px solid var(--border)',borderRadius:14,overflow:'hidden',cursor:'pointer',transition:'border-color 0.2s,transform 0.2s'}}
      onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(201,168,76,0.5)';e.currentTarget.style.transform='translateY(-3px)'}}
      onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.transform='translateY(0)'}}>
      <div style={{height:140,background:`linear-gradient(135deg,${mela.colorHex||'#8B1A1A'}CC 0%,${mela.colorHex||'#8B1A1A'}33 100%)`,display:'flex',alignItems:'center',justifyContent:'center',position:'relative',overflow:'hidden'}}>
        <div style={{fontFamily:'var(--font-display)',fontSize:48,opacity:0.1,color:'#fff',position:'absolute',bottom:-8,right:8}}>🎭</div>
        <div style={{textAlign:'center',zIndex:1,padding:'0 1rem'}}>
          {mela.kannadaName && <div style={{fontFamily:'var(--font-kannada)',fontSize:17,color:'rgba(255,255,255,0.9)',marginBottom:4}}>{mela.kannadaName}</div>}
          <div style={{fontFamily:'var(--font-display)',fontSize:14,color:'rgba(255,255,255,0.75)',letterSpacing:'0.06em'}}>{mela.name}</div>
        </div>
      </div>
      <div style={{padding:'1rem 1.25rem'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:8}}>
          <div>
            <div style={{fontSize: 15,color:'var(--text-secondary)'}}>📍 {lang === 'kn'
      ? (mela.locationKn || mela.location)
      : mela.location}</div>
            {/* <div style={{fontSize: 14,color:'var(--text-muted)',marginTop:2}}>{t('est_label',lang)} {mela.foundedYear}</div> */}
          </div>
          <span style={{fontSize: 13,padding:'3px 9px',borderRadius:12,background:sc+'33',color:mela.style==='Tenkutittu'?'#FF9090':'#90A0FF',border:`1px solid ${sc}55`,flexShrink:0}}>{lang === 'kn'
      ? (mela.styleKn || mela.style)
      : mela.style}</span>
      
        </div>
        <p style={{fontSize: 15,color:'var(--text-muted)',lineHeight:1.6,marginBottom:10}}>{(desc||'').slice(0,100)}…</p>
        <div style={{display:'flex',gap:'1.5rem',paddingTop:8,borderTop:'1px solid var(--border)'}}>
          <div style={{textAlign:'center'}}><div style={{fontFamily:'var(--font-display)',fontSize:18,color:'var(--gold)',lineHeight:1}}>{mela.troupeCount}</div><div style={{fontSize: 13,color:'var(--text-muted)',marginTop:2}}>{t('troupes_label',lang)}</div></div>
          <div style={{textAlign:'center'}}><div style={{fontFamily:'var(--font-display)',fontSize:18,color:'var(--gold)',lineHeight:1}}>{mela.showsThisSeason}</div><div style={{fontSize: 13,color:'var(--text-muted)',marginTop:2}}>{t('shows_label',lang)}</div></div>
          <div style={{textAlign:'center'}}><div style={{fontSize:16,lineHeight:1}}>🙏</div><div style={{fontSize: 13,color:'var(--text-muted)',marginTop:2}}>{(mela.deity||'').split(' ').slice(-1)[0]}</div></div>
        </div>
      </div>
    </div>
  )
}
