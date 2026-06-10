import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { motion } from 'framer-motion'
import { FaFolderOpen, FaUsers, FaFileAlt, FaSignOutAlt, FaChartLine } from 'react-icons/fa'
import axios from 'axios'

const AdminDashboard = () => {
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    totalCases: 0,
    activeCases: 0,
    totalClients: 0,
    pendingReports: 0
  })

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login')
    } else {
      fetchStats()
    }
  }, [isAuthenticated, navigate])

  const fetchStats = async () => {
    try {
      const [casesRes, clientsRes] = await Promise.all([
        axios.get('/api/cases'),
        axios.get('/api/clients')
      ])
      setStats({
        totalCases: casesRes.data.total || 0,
        activeCases: casesRes.data.cases?.filter(c => c.status === 'Open').length || 0,
        totalClients: clientsRes.data.total || 0,
        pendingReports: 0
      })
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    }
  }

  const menuItems = [
    { icon: FaFolderOpen, label: 'Case Management', path: '/admin/cases', color: 'text-sic-red' },
    { icon: FaUsers, label: 'Client Registry', path: '/admin/clients', color: 'text-sic-gold' },
    { icon: FaFileAlt, label: 'Reports', path: '/admin/reports', color: 'text-sic-silver' },
    { icon: FaChartLine, label: 'Analytics', path: '/admin/analytics', color: 'text-sic-red' },
  ]

  return (
    <div className="min-h-screen bg-sic-dark">
      {/* Admin Navbar */}
      <nav className="bg-black border-b border-sic-red/30 px-6 py-4">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-sic-red rounded flex items-center justify-center">
              <span className="font-space font-bold text-sm">SIC</span>
            </div>
            <div>
              <div className="font-bold text-sm tracking-wide">SECOFRATE ADMIN</div>
              <div className="text-xs text-sic-silver">Secure Operations Portal</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm font-bold">{user?.full_name || user?.username}</div>
              <div className="text-xs text-sic-silver">Badge: {user?.badge_number || 'SIC-001'}</div>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 border border-sic-red text-sic-red hover:bg-sic-red/10 transition"
            >
              <FaSignOutAlt />
              <span className="text-sm">EXIT</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-sic-charcoal/50 border border-sic-gray p-6"
          >
            <div className="text-sic-red text-2xl mb-2"><FaFolderOpen /></div>
            <div className="text-3xl font-bold text-sic-gold">{stats.totalCases}</div>
            <div className="text-xs text-sic-silver tracking-wide mt-1">TOTAL CASES</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-sic-charcoal/50 border border-sic-gray p-6"
          >
            <div className="text-sic-red text-2xl mb-2"><FaChartLine /></div>
            <div className="text-3xl font-bold text-sic-gold">{stats.activeCases}</div>
            <div className="text-xs text-sic-silver tracking-wide mt-1">ACTIVE OPERATIONS</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-sic-charcoal/50 border border-sic-gray p-6"
          >
            <div className="text-sic-red text-2xl mb-2"><FaUsers /></div>
            <div className="text-3xl font-bold text-sic-gold">{stats.totalClients}</div>
            <div className="text-xs text-sic-silver tracking-wide mt-1">REGISTERED CLIENTS</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-sic-charcoal/50 border border-sic-gray p-6"
          >
            <div className="text-sic-red text-2xl mb-2"><FaFileAlt /></div>
            <div className="text-3xl font-bold text-sic-gold">{stats.pendingReports}</div>
            <div className="text-xs text-sic-silver tracking-wide mt-1">PENDING REPORTS</div>
          </motion.div>
        </div>

        {/* Menu Grid */}
        <h2 className="text-xl font-bold mb-4">Operations Console</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {menuItems.map((item, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              onClick={() => navigate(item.path)}
              className="bg-sic-charcoal/30 border border-sic-gray p-6 text-center hover:border-sic-red transition-all group"
            >
              <item.icon className={`text-3xl mx-auto mb-3 ${item.color} group-hover:scale-110 transition`} />
              <div className="font-bold text-sm tracking-wide">{item.label}</div>
              <div className="text-xs text-sic-silver mt-1">ACCESS →</div>
            </motion.button>
          ))}
        </div>

        {/* Security Notice */}
        <div className="mt-8 bg-sic-red/5 border border-sic-red/30 p-4 text-center">
          <p className="text-xs text-sic-silver tracking-wide">
            ALL ACTIONS ARE LOGGED AND AUDITED. UNAUTHORIZED ACCESS IS PROHIBITED.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard