import React from 'react'
export default function Spinner({text='Loading...'}){
  return(
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'4rem',gap:'1rem'}}>
      <div className="spinner"/>
      <span style={{fontSize: 15,color:'var(--text-muted)'}}>{text}</span>
    </div>
  )
}
