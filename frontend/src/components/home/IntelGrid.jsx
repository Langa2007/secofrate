import React from 'react'
import { motion } from 'framer-motion'
import { FaEye, FaFingerprint, FaBuilding, FaUserCheck } from 'react-icons/fa'
import GlowCard from '../ui/Glowcard'

const intelItems = [
  {
    icon: FaEye,
    title: 'Covert Surveillance',
    description: 'Advanced monitoring operations using cutting-edge technology and human intelligence networks.',
    tags: ['24/7 Coverage', 'Real-time Intel']
  },
  {
    icon: FaFingerprint,
    title: 'Forensic Analysis',
    description: 'Digital and physical forensics with chain-of-custody protocols admissible in legal proceedings.',
    tags: ['ISO Certified', 'Court Ready']
  },
  {
    icon: FaBuilding,
    title: 'Corporate Espionage',
    description: 'Protecting trade secrets, investigating IP theft, and counter-intelligence operations.',
    tags: ['NDA Protected', 'Global Reach']
  },
  {
    icon: FaUserCheck,
    title: 'Background Operations',
    description: 'Comprehensive due diligence and personnel screening for organizations.',
    tags: ['48hr Turnaround', 'Global Database']
  }
]

const IntelGrid = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-sic-dark to-sic-charcoal">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="text-sic-red text-xs font-bold tracking-[3px] mb-3">CORE OPERATIONS</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Strategic Intelligence Domains</h2>
          <p className="text-sic-silver max-w-2xl mx-auto">
            Specialized divisions operating under the Secofrate mandate
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {intelItems.map((item, index) => (
            <GlowCard key={index} delay={index * 0.1}>
              <item.icon className="text-4xl text-sic-red mb-4" />
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-sic-silver text-sm leading-relaxed mb-4">
                {item.description}
              </p>
              <div className="flex gap-3">
                {item.tags.map((tag, i) => (
                  <span key={i} className="text-xs text-sic-gold tracking-wide">
                    {tag}
                  </span>
                ))}
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  )
}

export default IntelGrid