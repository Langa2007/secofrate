import React from 'react'
import { motion } from 'framer-motion'

const GlowCard = ({ children, delay = 0, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className={`relative bg-sic-charcoal/50 backdrop-blur-sm border border-sic-gray p-6 overflow-hidden group cursor-pointer ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-sic-red/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-sic-red to-transparent -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
      {children}
    </motion.div>
  )
}

export default GlowCard