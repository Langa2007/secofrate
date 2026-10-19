import React from 'react'
import { motion } from 'framer-motion'

const CyberButton = ({ children, variant = 'primary', onClick, className = '' }) => {
  const variants = {
    primary: 'bg-gradient-to-r from-sic-red to-[#32164a] text-white border-none',
    secondary: 'bg-transparent border-2 border-sic-gold text-sic-gold',
    danger: 'bg-transparent border-2 border-sic-red text-sic-red',
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative px-6 py-3 font-bold tracking-[2px] text-sm overflow-hidden group transition-all duration-300 ${variants[variant]} ${className}`}
    >
      <span className="relative z-10 flex items-center">
        {children}
      </span>
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
        />
      )}
      {variant === 'secondary' && (
        <motion.div
          className="absolute inset-0 bg-sic-gold/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
        />
      )}
    </motion.button>
  )
}

export default CyberButton