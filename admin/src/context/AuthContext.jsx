import React, { createContext, useState, useContext, useEffect } from 'react'
import toast from 'react-hot-toast'
import api from '../services/api'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => (
    typeof window === 'undefined' ? null : localStorage.getItem('token')
  ))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (token) {
      verifyToken()
    } else {
      setLoading(false)
    }
  }, [token])

  const verifyToken = async () => {
    try {
      const response = await api.post('/auth/verify')
      if (response.data.valid) {
        setUser(response.data.user)
      } else {
        logout()
      }
    } catch {
      logout()
    } finally {
      setLoading(false)
    }
  }

  const login = async (username, password) => {
    try {
      const response = await api.post('/auth/login', { username, password })
      const { token: newToken, user: userData } = response.data
      localStorage.setItem('token', newToken)
      setToken(newToken)
      setUser(userData)
      toast.success('Access granted. Welcome back.')
      return true
    } catch (error) {
      toast.error(error.response?.data?.error || 'Authentication failed')
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
    toast.success('Session terminated. Stay vigilant.')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}
