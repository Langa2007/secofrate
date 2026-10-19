import React from 'react'
import { motion } from 'framer-motion'
import { FaSearch, FaShieldAlt, FaUserSecret } from 'react-icons/fa'

const focusAreas = [
  {
    icon: FaShieldAlt,
    title: 'Security services',
    description: 'Practical security support for individuals, businesses and events.'
  },
  {
    icon: FaSearch,
    title: 'Investigations',
    description: 'Discreet fact-finding to help clients understand complex situations.'
  },
  {
    icon: FaUserSecret,
    title: 'Intelligence and forensics',
    description: 'Research and forensic insight to inform clear, considered decisions.'
  }
]

const CompanyOverview = () => (
  <section className="relative overflow-hidden bg-white px-4 py-20 md:py-24">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sic-red/5 via-transparent to-transparent" />

    <div className="relative z-10 mx-auto max-w-[1200px]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mx-auto mb-12 max-w-3xl text-center"
      >
        <div className="mb-3 text-xs font-bold tracking-[3px] text-sic-red">ABOUT SECOFRATE</div>
        <h2 className="mb-5 text-3xl font-bold text-sic-black md:text-4xl">
          Security and investigations, guided by insight.
        </h2>
        <p className="text-base leading-relaxed text-sic-silver md:text-lg">
          Secofrate Investigations Bureau is a security and investigations company serving clients who need protection, reliable information and a clear way forward. We bring security services together with investigative, intelligence and forensic capabilities to respond to each client’s needs with discretion and professionalism.
        </p>
      </motion.div>

      <div className="grid gap-5 md:grid-cols-3">
        {focusAreas.map(({ icon: Icon, title, description }, index) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="border border-sic-gray bg-white p-6 md:p-7"
          >
            <Icon className="mb-4 text-2xl text-sic-red" />
            <h3 className="mb-2 text-lg font-bold text-sic-black">{title}</h3>
            <p className="text-sm leading-relaxed text-sic-silver">{description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

export default CompanyOverview
