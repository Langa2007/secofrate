import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import { FaFingerprint, FaUser, FaLock } from 'react-icons/fa'

const AdminLogin = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const success = await login(username, password)
    setLoading(false)
    if (success) {
      navigate('/admin/dashboard')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-tactical">
      <div className="absolute inset-0 bg-gradient-radial pointer-events-none"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="text-center mb-8">
          {/* Logo Placeholder */}
          <div className="w-20 h-20 bg-gradient-to-br from-sic-red to-[#32164a] rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-sic-gold">
            <FaFingerprint className="text-3xl text-sic-gold" />
          </div>
          <h1 className="text-2xl font-bold">Secofrate Access Portal</h1>
          <p className="text-sic-silver text-sm mt-2">Authorized Personnel Only</p>
          <div className="w-12 h-px bg-sic-red mx-auto mt-4"></div>
        </div>

        <form onSubmit={handleSubmit} className="bg-sic-charcoal/50 backdrop-blur-sm border border-sic-gray p-8">
          <div className="mb-6">
            <label className="block text-xs font-bold tracking-wide mb-2 text-sic-silver">
              OPERATOR ID / EMAIL
            </label>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-sic-gray" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-black border border-sic-gray text-white focus:border-sic-red focus:outline-none"
                placeholder="Enter credentials"
                required
              />
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-xs font-bold tracking-wide mb-2 text-sic-silver">
              ACCESS KEY
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-sic-gray" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-black border border-sic-gray text-white focus:border-sic-red focus:outline-none"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-sic-red to-[#32164a] py-3 font-bold tracking-wider flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-sic-red/20 transition-all disabled:opacity-50"
          >
            <FaFingerprint />
            {loading ? 'VERIFYING...' : 'AUTHENTICATE'}
          </button>

          <div className="mt-6 text-center">
            <div className="flex items-center justify-center gap-2 text-[10px] text-sic-silver">
              <span className="inline-block w-1 h-1 bg-sic-red rounded-full"></span>
              SECURE CONNECTION
              <span className="inline-block w-1 h-1 bg-sic-red rounded-full"></span>
              AES-256 ENCRYPTED
            </div>
          </div>
        </form>

        <div className="text-center mt-6">
          <p className="text-[10px] text-sic-silver tracking-wider">
            UNAUTHORIZED ACCESS IS PROHIBITED AND MONITORED
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default AdminLogin