import React from 'react'
import { motion } from 'framer-motion'
import { FaShieldAlt, FaAward, FaUsers, FaMapMarkedAlt } from 'react-icons/fa'

const About = () => {
  const stats = [
    { icon: FaShieldAlt, value: '15+', label: 'Years of Service' },
    { icon: FaAward, value: '100%', label: 'Confidentiality Rate' },
    { icon: FaUsers, value: '847', label: 'Cases Solved' },
    { icon: FaMapMarkedAlt, value: '34', label: 'Counties Served' }
  ]

  return (
    <div className="min-h-screen pt-32 pb-16 px-4">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="text-sic-red text-xs font-bold tracking-[3px] mb-3">DIRECTORATE</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Behind the Shield</h1>
          <p className="text-sic-silver max-w-3xl mx-auto">
            Secofrate Investigations Bureau was founded on the principle that justice should be accessible to all.
            Sheria Kwa Wote - Justice for All drives every operation we undertake.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-sic-charcoal/30 border border-sic-gray p-6 text-center"
            >
              <stat.icon className="text-3xl text-sic-red mx-auto mb-3" />
              <div className="text-3xl font-bold text-sic-gold font-space mb-1">{stat.value}</div>
              <div className="text-xs text-sic-silver tracking-wide">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-4">Our Mandate</h2>
            <p className="text-sic-silver leading-relaxed mb-4">
              Operating under strict legal frameworks, Secofrate provides intelligence services 
              that adhere to Kenyan law and applicable local regulations. Every investigation 
              maintains chain-of-custody protocols and evidentiary standards.
            </p>
            <p className="text-sic-silver leading-relaxed">
              Our agents are former intelligence operatives, forensic specialists, and 
              cybersecurity experts who bring decades of combined experience to every case.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-4">Core Values</h2>
            <div className="space-y-3">
              <div className="border-l-3 border-sic-red pl-4">
                <h3 className="font-bold">INTEGRITY</h3>
                <p className="text-sm text-sic-silver">Uncompromised ethical standards in all operations</p>
              </div>
              <div className="border-l-3 border-sic-red pl-4">
                <h3 className="font-bold">CONFIDENTIALITY</h3>
                <p className="text-sm text-sic-silver">Absolute discretion guaranteed for all clients</p>
              </div>
              <div className="border-l-3 border-sic-red pl-4">
                <h3 className="font-bold">EXCELLENCE</h3>
                <p className="text-sm text-sic-silver">Cutting-edge methodology and continuous training</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default About