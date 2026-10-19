import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/router'
import api from '../services/api'
import { motion } from 'framer-motion'
import { FaPlus, FaEye, FaEdit, FaArrowLeft } from 'react-icons/fa'
import StatusBadge from '../components/ui/StatusBadge'

const AdminCases = () => {
  const { isAuthenticated, token } = useAuth()
  const router = useRouter()
  const [cases, setCases] = useState([])
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [clients, setClients] = useState([])

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    } else {
      fetchCases()
      fetchClients()
    }
  }, [isAuthenticated, router])

  const fetchCases = async () => {
    try {
      const response = await api.get('/cases')
      setCases(response.data.cases || [])
    } catch (error) {
      console.error('Failed to fetch cases:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchClients = async () => {
    try {
      const response = await api.get('/clients')
      setClients(response.data.clients || [])
    } catch (error) {
      console.error('Failed to fetch clients:', error)
    }
  }

  const getStatusColor = (status) => {
    const colors = {
      'Open': 'bg-green-500/20 text-green-500',
      'In Progress': 'bg-blue-500/20 text-blue-500',
      'Pending Review': 'bg-yellow-500/20 text-yellow-500',
      'Closed': 'bg-sic-gray text-sic-silver',
      'Archived': 'bg-sic-gray text-sic-silver'
    }
    return colors[status] || colors['Open']
  }

  return (
    <div className="min-h-screen bg-sic-dark">
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/dashboard')}
              className="flex items-center gap-2 text-sic-silver hover:text-sic-red transition"
            >
              <FaArrowLeft />
              <span>Back</span>
            </button>
            <h1 className="text-2xl font-bold">Case Management</h1>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-sic-red hover:bg-red-800 transition"
          >
            <FaPlus />
            <span>New Case</span>
          </button>
        </div>

        {/* Cases Table */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-2 border-sic-red border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-3 text-sic-silver">Loading case files...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-sic-gray">
                  <th className="text-left py-3 px-4 text-xs font-bold tracking-wide text-sic-silver">CASE NUMBER</th>
                  <th className="text-left py-3 px-4 text-xs font-bold tracking-wide text-sic-silver">TITLE</th>
                  <th className="text-left py-3 px-4 text-xs font-bold tracking-wide text-sic-silver">CLIENT</th>
                  <th className="text-left py-3 px-4 text-xs font-bold tracking-wide text-sic-silver">TYPE</th>
                  <th className="text-left py-3 px-4 text-xs font-bold tracking-wide text-sic-silver">STATUS</th>
                  <th className="text-left py-3 px-4 text-xs font-bold tracking-wide text-sic-silver">PRIORITY</th>
                  <th className="text-left py-3 px-4 text-xs font-bold tracking-wide text-sic-silver">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {cases.map((caseItem, index) => (
                  <motion.tr
                    key={caseItem.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-sic-gray/50 hover:bg-sic-charcoal/30 transition"
                  >
                    <td className="py-3 px-4 font-mono text-sm">{caseItem.case_number}</td>
                    <td className="py-3 px-4">{caseItem.title}</td>
                    <td className="py-3 px-4 text-sic-silver text-sm">{caseItem.client_name || '—'}</td>
                    <td className="py-3 px-4 text-sm">{caseItem.case_type}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs rounded ${getStatusColor(caseItem.status)}`}>
                        {caseItem.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-xs ${
                        caseItem.priority === 'Critical' ? 'text-sic-red' :
                        caseItem.priority === 'High' ? 'text-orange-500' : 'text-sic-gold'
                      }`}>
                        {caseItem.priority}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button className="text-sic-silver hover:text-sic-red transition">
                          <FaEye />
                        </button>
                        <button className="text-sic-silver hover:text-sic-gold transition">
                          <FaEdit />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {cases.length === 0 && !loading && (
          <div className="text-center py-12 border border-sic-gray">
            <p className="text-sic-silver">No cases found. Create your first case.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminCases