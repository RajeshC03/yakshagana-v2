import React from 'react'
import {Navigate} from 'react-router-dom'
import {useAuth} from '../context/AuthContext'
export default function ProtectedRoute({children,role}){
  const {authUser,authOrg,loading}=useAuth()
  if(loading) return(
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'var(--bg-dark)'}}>
      <div className="spinner"/>
    </div>)
  if(role==='ORGANIZER'&&!authOrg) return <Navigate to="/organizer/login" replace/>
  if(role==='USER'&&!authUser) return <Navigate to="/user/login" replace/>
  return children
}
