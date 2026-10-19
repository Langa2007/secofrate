import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { FaArrowLeft, FaEnvelope, FaExclamationTriangle } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

const ContactSubmissions = () => {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }
    fetchSubmissions()
  }, [isAuthenticated, router])

  const fetchSubmissions = async () => {
    try {
      const response = await api.get('/contact/submissions')
      setSubmissions(response.data.submissions || [])
    } catch (requestError) {
      setError(requestError.response?.data?.error || 'Unable to load contact submissions.')
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/contact/submissions/${id}/status`, { status })
      setSubmissions((current) =>
        current.map((submission) =>
          submission.id === id ? { ...submission, status } : submission
        )
      )
    } catch (requestError) {
      setError(requestError.response?.data?.error || 'Unable to update submission status.')
    }
  }

  return (
    <main className="min-h-screen bg-sic-dark">
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.push('/dashboard')}
            className="flex items-center gap-2 text-sic-silver hover:text-sic-red transition"
          >
            <FaArrowLeft />
            <span>Back</span>
          </button>
          <div>
            <h1 className="text-2xl font-bold">Contact Inbox</h1>
            <p className="text-sm text-sic-silver">Issues raised through the public contact form</p>
          </div>
        </div>

        {error && (
          <div className="mb-6 border border-sic-red/30 bg-sic-red/5 p-4 text-sm text-sic-red">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12 text-sic-silver">Loading contact submissions...</div>
        ) : submissions.length === 0 ? (
          <div className="text-center py-12 border border-sic-gray text-sic-silver">
            No contact submissions found.
          </div>
        ) : (
          <div className="space-y-5">
            {submissions.map((submission) => (
              <article key={submission.id} className="border border-sic-gray bg-white p-6 shadow-sm">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-5">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <FaEnvelope className="text-sic-red" />
                      <h2 className="text-lg font-bold">{submission.subject}</h2>
                      {submission.is_urgent && (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-sic-red">
                          <FaExclamationTriangle />
                          URGENT
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-sic-silver">
                      Ref: <span className="font-mono">{submission.reference_number}</span>
                    </p>
                  </div>
                  <select
                    value={submission.status}
                    onChange={(event) => updateStatus(submission.id, event.target.value)}
                    className="border border-sic-gray bg-white px-3 py-2 text-sm text-sic-black focus:border-sic-red focus:outline-none"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-5 text-sm">
                  <div>
                    <div className="text-xs font-bold tracking-wide text-sic-silver mb-1">FROM</div>
                    <div>{submission.full_name}</div>
                    <div className="text-sic-silver">{submission.email}</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold tracking-wide text-sic-silver mb-1">PHONE</div>
                    <div>{submission.phone || 'Not provided'}</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold tracking-wide text-sic-silver mb-1">RECEIVED</div>
                    <div>{new Date(submission.created_at).toLocaleString()}</div>
                  </div>
                </div>

                <div className="border-t border-sic-gray pt-4 text-sm leading-relaxed whitespace-pre-wrap">
                  {submission.message}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

export default ContactSubmissions
