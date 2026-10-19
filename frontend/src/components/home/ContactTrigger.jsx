import React from 'react'
import { motion } from 'framer-motion'
import { FaPhoneAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const ContactTrigger = () => {
  const navigate = useNavigate()

  return (
    <section className="py-16 px-4 bg-white text-sic-black border-y border-sic-red/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_20px,rgba(255,255,255,0.03)_20px,rgba(255,255,255,0.03)_40px)]"></div>
      
      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-2">Need Immediate Assistance?</h3>
            <p className="text-sic-silver">Emergency response team available 24/7 for critical situations</p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/contact')}
            className="bg-white text-sic-black px-8 py-4 font-bold tracking-wider flex items-center gap-3 hover:bg-sic-charcoal transition-all"
          >
            <FaPhoneAlt />
            <span>EMERGENCY COMMS</span>
          </motion.button>
        </div>
      </div>
    </section>
  )
}

export default ContactTrigger