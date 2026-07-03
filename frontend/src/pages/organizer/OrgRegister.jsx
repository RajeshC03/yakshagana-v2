import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {authAPI} from '../../api'
import {useAuth} from '../../context/AuthContext'
import {useLanguage} from '../../context/LanguageContext'
import {t} from '../../data/translations'
import {AuthCard,Field,SelectField,SubmitBtn} from '../../components/AuthForm'
export default function OrgRegister(){
  const navigate=useNavigate(); const {loginOrg}=useAuth(); const {lang}=useLanguage()
  const [form,setForm]=useState({name:'',melaName:'',email:'',password:'',confirmPassword:'',phone:'',region:''})
  const [error,setError]=useState(''); const [loading,setLoading]=useState(false)
  const onChange=e=>{setForm({...form,[e.target.name]:e.target.value});setError('')}
  const onSubmit=async e=>{
    e.preventDefault()
    if(!form.name||!form.melaName||!form.email||!form.password||!form.region) return setError(t('err_fill_required',lang))
    if(form.password!==form.confirmPassword) return setError(t('err_pw_mismatch',lang))
    if(form.password.length<6) return setError(t('err_pw_min6',lang))
    setLoading(true)
    try{const res=await authAPI.orgRegister(form);loginOrg(res.data);navigate('/organizer/dashboard')}
    catch(err){setError(err.response?.data?.message||t('err_registration_failed',lang))}
    finally{setLoading(false)}
  }
  return(
    <AuthCard title={t('h_org_register','en')} titleKn={t('h_org_register','kn')} subtitle={t('org_register_subtitle',lang)} error={error} bottomText={t('already_registered',lang)} bottomLinkTo="/organizer/login" bottomLinkLabel={t('login_here_btn',lang)}>
      <form onSubmit={onSubmit}>
        <Field label={t('field_your_name_req',lang)} name="name" placeholder={t('placeholder_org_name',lang)} value={form.name} onChange={onChange}/>
        <Field label={t('field_mela_name_req',lang)} name="melaName" placeholder={t('placeholder_mela',lang)} value={form.melaName} onChange={onChange}/>
        <Field label={t('field_email_req',lang)} name="email" type="email" placeholder={t('placeholder_email',lang)} value={form.email} onChange={onChange}/>
        <Field label={t('field_phone',lang)} name="phone" placeholder={t('placeholder_phone',lang)} value={form.phone} onChange={onChange}/>
        <SelectField label={t('field_region_req',lang)} name="region" options={['Dakshina Kannada','Udupi','Uttara Kannada','Shivamogga','Other']} value={form.region} onChange={onChange}/>
        <Field label={t('field_password_req',lang)} name="password" type="password" placeholder={t('placeholder_min6',lang)} value={form.password} onChange={onChange}/>
        <Field label={t('field_confirm_pw_req',lang)} name="confirmPassword" type="password" placeholder={t('placeholder_repeat_pw',lang)} value={form.confirmPassword} onChange={onChange}/>
        <SubmitBtn loading={loading} label={t('btn_submit_register',lang)}/>
      </form>
    </AuthCard>
  )
}
