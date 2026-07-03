import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {authAPI} from '../../api'
import {useAuth} from '../../context/AuthContext'
import {useLanguage} from '../../context/LanguageContext'
import {t} from '../../data/translations'
import {AuthCard,Field,SubmitBtn} from '../../components/AuthForm'
export default function UserLogin(){
  const navigate=useNavigate(); const {loginUser}=useAuth(); const {lang}=useLanguage()
  const [form,setForm]=useState({email:'',password:''}); const [error,setError]=useState(''); const [loading,setLoading]=useState(false)
  const onChange=e=>{setForm({...form,[e.target.name]:e.target.value});setError('')}
  const onSubmit=async e=>{
    e.preventDefault()
    if(!form.email||!form.password) return setError(t('err_enter_email_pw',lang))
    setLoading(true)
    try{const res=await authAPI.userLogin(form);loginUser(res.data);navigate('/')}
    catch(err){setError(err.response?.data?.message||t('err_login_failed',lang))}
    finally{setLoading(false)}
  }
  return(
    <AuthCard title={t('h_user_login','en')} titleKn={t('h_user_login','kn')} subtitle={t('user_login_subtitle',lang)} error={error} bottomText={t('not_registered_yet',lang)} bottomLinkTo="/user/register" bottomLinkLabel={t('register_here_btn',lang)}>
      <form onSubmit={onSubmit}>
        <Field label={t('field_email_req',lang)} name="email" type="email" placeholder={t('placeholder_email',lang)} value={form.email} onChange={onChange}/>
        <Field label={t('field_password_req',lang)} name="password" type="password" placeholder={t('placeholder_your_pw',lang)} value={form.password} onChange={onChange}/>
        <SubmitBtn loading={loading} label={t('btn_submit_login',lang)}/>
      </form>
    </AuthCard>
  )
}
