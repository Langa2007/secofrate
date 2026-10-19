import axios from 'axios'

const configuredApiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://secofrate.onrender.com/api'
const normalizedApiUrl = configuredApiUrl.replace(/\/+$/, '')
const baseURL = /\/api$/i.test(normalizedApiUrl) ? normalizedApiUrl : `${normalizedApiUrl}/api`

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    const token = typeof window === 'undefined' ? null : localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api
