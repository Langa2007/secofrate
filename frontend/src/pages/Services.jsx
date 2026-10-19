// src/pages/Services.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { FaSearch, FaShieldVirus, FaUserSecret, FaMicroscope, FaChartLine, FaMapMarkedAlt, FaUserShield, FaBuilding } from 'react-icons/fa'

const services = [
  {
    icon: FaUserShield,
    title: 'Security Personnel',
    description: 'Professional security personnel for personal protection, business needs and events, matched to each assignment.',
    features: ['Personal Protection', 'Business Security', 'Event Security']
  },
  {
    icon: FaBuilding,
    title: 'Guarding Services',
    description: 'On-site guarding to help protect people, premises and property, with coverage planned around your site and requirements.',
    features: ['Premises Guarding', 'Access Awareness', 'Site-Based Coverage']
  },
  {
    icon: FaSearch,
    title: 'Covert Operations',
    description: 'Discreet surveillance and intelligence gathering using advanced methodologies.',
    features: ['24/7 Monitoring', 'Undercover Agents', 'Real-time Reporting']
  },
  {
    icon: FaShieldVirus,
    title: 'Cyber Forensics',
    description: 'Digital evidence recovery, data breach investigation, and cybersecurity audits.',
    features: ['Data Recovery', 'Breach Analysis', 'Expert Testimony']
  },
  {
    icon: FaUserSecret,
    title: 'Background Investigations',
    description: 'Comprehensive due diligence for individuals and corporations.',
    features: ['Employment Screening', 'Asset Tracing', 'Criminal Records']
  },
  {
    icon: FaMicroscope,
    title: 'Forensic Laboratory',
    description: 'State-of-the-art forensic analysis for criminal and civil cases.',
    features: ['DNA Analysis', 'Fingerprint ID', 'Document Examination']
  },
  {
    icon: FaChartLine,
    title: 'Risk Assessment',
    description: 'Threat analysis and security vulnerability assessments.',
    features: ['Security Audits', 'Threat Modeling', 'Crisis Planning']
  },
  {
    icon: FaMapMarkedAlt,
    title: 'Kenya County Coverage',
    description: 'Trusted investigative and security support delivered across Kenya, with operations active in 34 counties so far.',
    features: ['34 Counties Served', 'County-Based Teams', 'Kenya-Wide Coordination']
  }
]

const Services = () => {
  return (
    <div className="min-h-screen pt-32 pb-16 px-4">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="text-sic-red text-xs font-bold tracking-[3px] mb-3">CAPABILITIES</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Operational Divisions</h1>
          <p className="text-sic-silver max-w-2xl mx-auto">
            Specialized units equipped with cutting-edge technology and elite personnel
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-sic-charcoal/30 border border-sic-gray p-6 hover:border-sic-red transition-all"
            >
              <service.icon className="text-3xl text-sic-red mb-4" />
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-sic-silver text-sm mb-4">{service.description}</p>
              <div className="flex flex-wrap gap-2">
                {service.features.map((feature, i) => (
                  <span key={i} className="text-xs text-sic-gold bg-sic-gold/10 px-2 py-1">
                    {feature}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 bg-gradient-to-r from-sic-red/10 to-transparent border border-sic-red/30 p-8 text-center"
        >
          <p className="text-sic-silver italic">
            "All operations are conducted within legal frameworks with admissible evidence protocols."
          </p>
          <div className="mt-4 text-sm text-sic-gold">—— CERTIFIED INVESTIGATIVE BODY ——</div>
        </motion.div>
      </div>
    </div>
  )
}

export default Services
