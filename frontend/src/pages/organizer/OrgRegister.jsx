import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {authAPI} from '../../api'
import {useAuth} from '../../context/AuthContext'
import {useLanguage} from '../../context/LanguageContext'
import {t} from '../../data/translations'
import {AuthCard,Field,SelectField,SubmitBtn} from '../../components/AuthForm'
export default function OrgRegister(){
  const navigate=useNavigate(); const {loginOrg}=useAuth(); const {lang}=useLanguage()
  // const [form,setForm]=useState({name:'',melaName:'',email:'',password:'',confirmPassword:'',phone:'',region:''})
const [form, setForm] = useState({
    name: "",
    nameKn: "",

    melaName: "",
    melaNameKn: "",

    email: "",
    phone: "",

    region: "",
    regionKn: "",

    password: "",
    confirmPassword: ""
});
  
  const [error,setError]=useState(''); const [loading,setLoading]=useState(false)
  const onChange=e=>{setForm({...form,[e.target.name]:e.target.value});setError('')}
  const onSubmit=async e=>{
    e.preventDefault()

    // if(!form.name||!form.melaName||!form.email||!form.password||!form.region)
    //    return setError(t('err_fill_required',lang))

    if (
    !form.name ||
    !form.nameKn ||
    !form.melaName ||
    !form.melaNameKn ||
    !form.email ||
    !form.phone ||
    !form.region ||
    !form.regionKn ||
    !form.password ||
    !form.confirmPassword
) {
    return setError(t('err_fill_required', lang));
}
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
        <Field label={t('field_your_name_req',lang)} name="name" required placeholder={t('placeholder_org_name',lang)} value={form.name} onChange={onChange}/>

<Field
    label="ಸಂಘಟಕರ ಹೆಸರು (Kannada)"
    name="nameKn"
    placeholder="ಉದಾ: ಮೇಳ ಸಂಘಟಕರ ಹೆಸರು"
    value={form.nameKn}
    onChange={onChange}
    required
/>

        <Field label={t('field_mela_name_req',lang)} required name="melaName" placeholder={t('placeholder_mela',lang)} value={form.melaName} onChange={onChange}/>
        <Field
    label="ಮೇಳದ ಹೆಸರು (Kannada)"
    name="melaNameKn"
    placeholder="ಉದಾ: ಕಟೀಲು ಮೇಳ"
    value={form.melaNameKn}
    onChange={onChange} required

/>
        <Field label={t('field_email_req',lang)} name="email" required type="email" placeholder={t('placeholder_email',lang)} value={form.email} onChange={onChange}/>
        <Field label={t('field_phone',lang)} name="phone" required placeholder={t('placeholder_phone',lang)} value={form.phone} onChange={onChange}/>
        <SelectField label={t('field_region_req',lang)} name="region" required options={['Dakshina Kannada','Udupi','Uttara Kannada','Shivamogga','Other']} value={form.region} onChange={onChange}/>
        <SelectField
    label="ಜಿಲ್ಲೆ (Kannada)"
    name="regionKn" required
    options={[
        'ದಕ್ಷಿಣ ಕನ್ನಡ',
        'ಉಡುಪಿ',
        'ಉತ್ತರ ಕನ್ನಡ',
        'ಶಿವಮೊಗ್ಗ',
        'ಇತರೆ'
    ]}
    value={form.regionKn}
    onChange={onChange}
/>
        <Field label={t('field_password_req',lang)} required name="password" type="password" placeholder={t('placeholder_min6',lang)} value={form.password} onChange={onChange}/>
        <Field label={t('field_confirm_pw_req',lang)} required name="confirmPassword" type="password" placeholder={t('placeholder_repeat_pw',lang)} value={form.confirmPassword} onChange={onChange}/>
        <SubmitBtn loading={loading} label={t('btn_submit_register',lang)}/>
      </form>
    </AuthCard>
  )
}
