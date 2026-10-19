import React from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const CaseTracker = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section className="py-20 px-4 bg-gradient-to-r from-white to-[#f0eafa] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sic-red/5 via-transparent to-transparent"></div>
      
      <div ref={ref} className="max-w-[1200px] mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-sic-red text-xs font-bold tracking-[3px] mb-3">ACTIVE CASE MONITOR</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Real-time Case Resolution Metrics</h2>
            
            <div className="mb-8">
              <div className="w-full h-1 bg-sic-gray rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: '78%' } : { width: 0 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-sic-red to-sic-gold rounded-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 }}
                  className="text-3xl font-bold text-sic-gold font-space"
                >
                  78%
                </motion.div>
                <div className="text-xs text-sic-silver mt-1 tracking-wide">RESOLUTION RATE</div>
              </div>
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 }}
                  className="text-3xl font-bold text-sic-gold font-space"
                >
                  14.2
                </motion.div>
                <div className="text-xs text-sic-silver mt-1 tracking-wide">AVG DAYS PER CASE</div>
              </div>
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.7 }}
                  className="text-3xl font-bold text-sic-gold font-space"
                >
                  100%
                </motion.div>
                <div className="text-xs text-sic-silver mt-1 tracking-wide">CONFIDENTIALITY</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="w-full h-64 md:h-80 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-sic-red/20 animate-pulse"></div>
                <div className="absolute w-32 h-32 md:w-40 md:h-40 rounded-full bg-sic-red/40 animate-ping"></div>
                <div className="absolute w-16 h-16 md:w-20 md:h-20 rounded-full bg-sic-red"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CaseTracker