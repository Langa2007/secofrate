import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { motion } from 'framer-motion'
import { FaPlus, FaEye, FaArrowLeft, FaSearch } from 'react-icons/fa'

const AdminClients = () => {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [formData, setFormData] = useState({
    full_name: '',
    national_id: '',
    phone_number: '',
    email: '',
    occupation: '',
    is_corporate: false,
    corporate_name: ''
  })

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login')
    } else {
      fetchClients()
    }
  }, [isAuthenticated, navigate])

  const fetchClients = async () => {
    try {
      const url = search ? `/api/clients?search=${search}` : '/api/clients'
      const response = await axios.get(url)
      setClients(response.data.clients || [])
    } catch (error) {
      console.error('Failed to fetch clients:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (isAuthenticated) fetchClients()
    }, 500)
    return () => clearTimeout(debounce)
  }, [search])

  const handleCreateClient = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/clients', formData)
      setShowCreateModal(false)
      setFormData({
        full_name: '',
        national_id: '',
        phone_number: '',
        email: '',
        occupation: '',
        is_corporate: false,
        corporate_name: ''
      })
      fetchClients()
    } catch (error) {
      console.error('Failed to create client:', error)
      alert(error.response?.data?.error || 'Creation failed')
    }
  }

  return (
    <div className="min-h-screen bg-sic-dark">
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="flex items-center gap-2 text-sic-silver hover:text-sic-red transition"
            >
              <FaArrowLeft />
              <span>Back</span>
            </button>
            <h1 className="text-2xl font-bold">Client Registry</h1>
          </div>
          
          <div className="flex gap-3">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-sic-gray" />
              <input
                type="text"
                placeholder="Search clients..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white border border-sic-gray text-sic-black placeholder:text-sic-silver focus:border-sic-red focus:outline-none"
              />
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-sic-red hover:bg-red-800 transition"
            >
              <FaPlus />
              <span>Add Client</span>
            </button>
          </div>
        </div>

        {/* Clients Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-2 border-sic-red border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {clients.map((client, index) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-sic-charcoal/30 border border-sic-gray p-5 hover:border-sic-red/50 transition"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold">{client.full_name}</h3>
                    <p className="text-xs text-sic-silver font-mono">{client.client_code}</p>
                  </div>
                  <button className="text-sic-silver hover:text-sic-red">
                    <FaEye />
                  </button>
                </div>
                <div className="space-y-1 text-sm">
                  <p className="text-sic-silver">ID: {client.national_id}</p>
                  {client.email && <p className="text-sic-silver">{client.email}</p>}
                  {client.phone_number && <p className="text-sic-silver">{client.phone_number}</p>}
                  {client.is_corporate && (
                    <p className="text-xs text-sic-gold">Corporate: {client.corporate_name}</p>
                  )}
                </div>
                <div className="mt-3 pt-3 border-t border-sic-gray">
                  <p className="text-xs text-sic-silver">Registered: {new Date(client.created_at).toLocaleDateString()}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {clients.length === 0 && !loading && (
          <div className="text-center py-12 border border-sic-gray">
            <p className="text-sic-silver">No clients found.</p>
          </div>
        )}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-sic-charcoal border border-sic-gray w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Register New Client</h2>
              <form onSubmit={handleCreateClient} className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name *"
                  value={formData.full_name}
                  onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                  className="w-full px-4 py-2 bg-white border border-sic-gray text-sic-black placeholder:text-sic-silver focus:border-sic-red focus:outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="National ID *"
                  value={formData.national_id}
                  onChange={(e) => setFormData({...formData, national_id: e.target.value})}
                  className="w-full px-4 py-2 bg-white border border-sic-gray text-sic-black placeholder:text-sic-silver focus:border-sic-red focus:outline-none"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone_number}
                  onChange={(e) => setFormData({...formData, phone_number: e.target.value})}
                  className="w-full px-4 py-2 bg-white border border-sic-gray text-sic-black placeholder:text-sic-silver focus:border-sic-red focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-2 bg-white border border-sic-gray text-sic-black placeholder:text-sic-silver focus:border-sic-red focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Occupation"
                  value={formData.occupation}
                  onChange={(e) => setFormData({...formData, occupation: e.target.value})}
                  className="w-full px-4 py-2 bg-white border border-sic-gray text-sic-black placeholder:text-sic-silver focus:border-sic-red focus:outline-none"
                />
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.is_corporate}
                    onChange={(e) => setFormData({...formData, is_corporate: e.target.checked})}
                  />
                  <span className="text-sm">Corporate Client</span>
                </label>
                {formData.is_corporate && (
                  <input
                    type="text"
                    placeholder="Corporate Name"
                    value={formData.corporate_name}
                    onChange={(e) => setFormData({...formData, corporate_name: e.target.value})}
                    className="w-full px-4 py-2 bg-white border border-sic-gray text-sic-black placeholder:text-sic-silver focus:border-sic-red focus:outline-none"
                  />
                )}
                <div className="flex gap-3 pt-4">
                  <button type="submit" className="flex-1 bg-sic-red py-2 font-bold">REGISTER</button>
                  <button type="button" onClick={() => setShowCreateModal(false)} className="flex-1 border border-sic-gray py-2 font-bold">CANCEL</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminClients