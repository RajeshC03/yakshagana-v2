import React,{createContext,useContext,useState,useEffect} from 'react'
const Ctx = createContext(null)
export function AuthProvider({children}){
  const [authUser,setAuthUser] = useState(null)
  const [authOrg,setAuthOrg]   = useState(null)
  const [loading,setLoading]   = useState(true)
  useEffect(()=>{
    const saved = localStorage.getItem('authData')
    if(saved){ const d=JSON.parse(saved); if(d.role==='ORGANIZER') setAuthOrg(d); else setAuthUser(d); }
    setLoading(false)
  },[])
  const loginUser = d => { localStorage.setItem('token',d.token); localStorage.setItem('authData',JSON.stringify(d)); setAuthUser(d); setAuthOrg(null); }
  const loginOrg  = d => { localStorage.setItem('token',d.token); localStorage.setItem('authData',JSON.stringify(d)); setAuthOrg(d); setAuthUser(null); }
  const logout    = () => { localStorage.removeItem('token'); localStorage.removeItem('authData'); setAuthUser(null); setAuthOrg(null); }
  return <Ctx.Provider value={{authUser,authOrg,loginUser,loginOrg,logout,loading}}>{children}</Ctx.Provider>
}
export function useAuth(){ return useContext(Ctx) }
