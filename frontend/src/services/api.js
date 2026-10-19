import axios from 'axios'

const configuredApiUrl = import.meta.env.VITE_API_URL || 'https://secofrate.onrender.com/api'
const normalizedApiUrl = configuredApiUrl.replace(/\/+$/, '')
const baseURL = /\/api$/i.test(normalizedApiUrl) ? normalizedApiUrl : `${normalizedApiUrl}/api`

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
