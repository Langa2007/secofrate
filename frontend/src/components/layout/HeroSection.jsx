import React, { useEffect, useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import { FaArrowRight, FaDatabase, FaSkull } from 'react-icons/fa'
import CyberButton from '../ui/CyberButton'
import AnimatedCounter from '../ui/AnimatedCounter'

const HeroSection = () => {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-12 overflow-hidden bg-gradient-to-br from-sic-black via-[#1b1026] to-[#32164a] text-white">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-radial pointer-events-none opacity-40"></div>
      
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8 w-full" ref={ref}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="max-w-4xl"
        >
          {/* Agency Badge */}
          <motion.div variants={itemVariants} className="inline-flex gap-4 bg-black/50 backdrop-blur-sm px-4 py-2 border-l-3 border-sic-red mb-8">
            <span className="text-[11px] font-bold tracking-[3px] text-sic-silver">CLASSIFIED</span>
            <span className="text-[11px] font-bold tracking-[3px] text-sic-red">LEVEL 3 CLEARANCE REQUIRED</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.1] mb-6">
            <span className="block bg-gradient-to-r from-white to-sic-gold bg-clip-text text-transparent">
              INTELLIGENCE
            </span>
            <span className="block text-sic-red drop-shadow-[0_0_15px_rgba(91,42,134,0.5)]">
              BEYOND BOUNDARIES
            </span>
          </motion.h1>

          {/* Divider */}
          <motion.div variants={itemVariants} className="flex items-center gap-4 my-8">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-sic-red"></div>
            <FaSkull className="text-sic-red text-lg" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-sic-red"></div>
          </motion.div>

          {/* Description */}
          <motion.p variants={itemVariants} className="text-sic-silver text-lg max-w-2xl leading-relaxed mb-8">
            Secofrate Investigations Bureau delivers uncompromised intelligence, 
            forensic excellence, and strategic protection. Operating at the intersection 
            of technology and human intelligence.
          </motion.p>

          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="flex gap-4 mb-12 flex-wrap">
            <CyberButton variant="primary" onClick={() => window.location.href = '/contact'}>
              INITIATE CONTACT <FaArrowRight className="ml-2" />
            </CyberButton>
            <CyberButton variant="secondary" onClick={() => window.location.href = '/services'}>
              VIEW CAPABILITIES <FaDatabase className="ml-2" />
            </CyberButton>
          </motion.div>

          {/* Trust Badges */}
          <motion.div variants={itemVariants} className="flex gap-6 flex-wrap">
            <div className="flex items-center gap-2 text-xs text-sic-silver">
              <div className="w-1 h-1 bg-sic-gold rounded-full"></div>
              <span>LICENSED DETECTIVE AGENCY</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-sic-silver">
              <div className="w-1 h-1 bg-sic-gold rounded-full"></div>
              <span>24/7 SURVEILLANCE READY</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-sic-silver">
              <div className="w-1 h-1 bg-sic-gold rounded-full"></div>
              <span>98% CASE RESOLUTION</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats Panel */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="absolute bottom-0 right-0 bg-black/70 backdrop-blur-md p-6 border-t border-l border-sic-red hidden lg:block"
        >
          <div className="flex gap-8">
            <div className="text-center">
              <AnimatedCounter target={847} className="text-3xl font-bold text-sic-gold font-space" />
              <div className="text-[10px] tracking-[2px] text-sic-silver mt-1">CASES CLOSED</div>
            </div>
            <div className="text-center">
              <AnimatedCounter target={124} className="text-3xl font-bold text-sic-gold font-space" />
              <div className="text-[10px] tracking-[2px] text-sic-silver mt-1">ACTIVE OPS</div>
            </div>
            <div className="text-center">
              <AnimatedCounter target={32} className="text-3xl font-bold text-sic-gold font-space" />
              <div className="text-[10px] tracking-[2px] text-sic-silver mt-1">ELITE AGENTS</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection