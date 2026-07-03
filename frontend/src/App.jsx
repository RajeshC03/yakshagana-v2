import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import {AuthProvider} from './context/AuthContext'
import {LanguageProvider} from './context/LanguageContext'
import Navbar from './components/Navbar'
import Home           from './pages/Home'
import ShowsPage      from './pages/ShowsPage'
import MelasPage      from './pages/MelasPage'
import MelaDetail     from './pages/MelaDetail'
import PrasangaPage   from './pages/PrasangaPage'
import StylesPage     from './pages/StylesPage'
import UserRegister   from './pages/user/UserRegister'
import UserLogin      from './pages/user/UserLogin'
import OrgRegister    from './pages/organizer/OrgRegister'
import OrgLogin       from './pages/organizer/OrgLogin'
import OrgDashboard   from './pages/organizer/OrgDashboard'
import AddShow        from './pages/organizer/AddShow'
import EditShow       from './pages/organizer/EditShow'
import ProtectedRoute from './components/ProtectedRoute'
import Footer         from './components/Footer'
import ScrollToTopButton from './components/ScrollToTopButton'

export default function App(){
  return(
    <LanguageProvider>
    <AuthProvider>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/"              element={<Home/>}/>
          <Route path="/shows"         element={<ShowsPage/>}/>
          <Route path="/melas"         element={<MelasPage/>}/>
          <Route path="/melas/:id"     element={<MelaDetail/>}/>
          <Route path="/prasangas"     element={<PrasangaPage/>}/>
          <Route path="/styles"        element={<StylesPage/>}/>
          <Route path="/user/register" element={<UserRegister/>}/>
          <Route path="/user/login"    element={<UserLogin/>}/>
          <Route path="/organizer/register" element={<OrgRegister/>}/>
          <Route path="/organizer/login"    element={<OrgLogin/>}/>
          <Route path="/organizer/dashboard" element={<ProtectedRoute role="ORGANIZER"><OrgDashboard/></ProtectedRoute>}/>
          <Route path="/organizer/add-show"  element={<ProtectedRoute role="ORGANIZER"><AddShow/></ProtectedRoute>}/>
          <Route path="/organizer/edit-show/:id" element={<ProtectedRoute role="ORGANIZER"><EditShow/></ProtectedRoute>}/>
        </Routes>
        <Footer/>
        <ScrollToTopButton/>
      </BrowserRouter>
    </AuthProvider>
    </LanguageProvider>
  )
}
