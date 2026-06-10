import React from 'react'

const StatusBadge = ({ status }) => {
  const variants = {
    active: 'bg-green-500/20 text-green-500 border-green-500',
    pending: 'bg-yellow-500/20 text-yellow-500 border-yellow-500',
    closed: 'bg-sic-gray text-sic-silver border-sic-gray',
    critical: 'bg-sic-red/20 text-sic-red border-sic-red animate-pulse'
  }

  const statusMap = {
    active: 'ACTIVE',
    pending: 'PENDING REVIEW',
    closed: 'CLOSED',
    critical: 'CRITICAL'
  }

  return (
    <span className={`px-3 py-1 text-xs font-bold tracking-wide border ${variants[status] || variants.pending}`}>
      {statusMap[status] || status.toUpperCase()}
    </span>
  )
}

export default StatusBadge