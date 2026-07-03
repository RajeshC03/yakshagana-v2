import axios from 'axios'

const API = axios.create({ baseURL: '/api' })

API.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export const showsAPI = {
  getAll:      (params) => API.get('/shows', { params }),
  getTonight:  ()       => API.get('/shows/tonight'),
  getUpcoming: ()       => API.get('/shows/upcoming'),
  getById:     (id)     => API.get(`/shows/${id}`),
  create:      (data)   => API.post('/shows', data),
  update:      (id, d)  => API.put(`/shows/${id}`, d),
  delete:      (id)     => API.delete(`/shows/${id}`),
}

export const melasAPI = {
  getAll:   (params) => API.get('/melas', { params }),
  getById:  (id)     => API.get(`/melas/${id}`),
  getShows: (id)     => API.get(`/melas/${id}/shows`),
  create:   (data)   => API.post('/melas', data),
  update:   (id, d)  => API.put(`/melas/${id}`, d),
  delete:   (id)     => API.delete(`/melas/${id}`),
}

export const prasangasAPI = {
  getAll: (params) => API.get('/prasangas', { params }),
}

export const authAPI = {
  userRegister: (d) => API.post('/auth/user/register', d),
  userLogin:    (d) => API.post('/auth/user/login', d),
  orgRegister:  (d) => API.post('/auth/organizer/register', d),
  orgLogin:     (d) => API.post('/auth/organizer/login', d),
}

export function getLocalToday() {
  const d = new Date()
  const y  = d.getFullYear()
  const m  = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${dd}`
}

export function extractDate(dateVal) {
  if (!dateVal) return ''
  if (Array.isArray(dateVal)) {
    const [y, mo, d] = dateVal
    return `${y}-${String(mo).padStart(2,'0')}-${String(d).padStart(2,'0')}`
  }
  return String(dateVal).split('T')[0]
}

export default API
