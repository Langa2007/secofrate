import React from 'react'
import HeroSection from '../components/layout/HeroSection'
import IntelGrid from '../components/home/IntelGrid'
import CaseTracker from '../components/home/CaseTracker'
import ContactTrigger from '../components/home/ContactTrigger'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FaArrowRight, FaBuilding, FaCalendarCheck, FaUserShield } from 'react-icons/fa'

const Home = () => {
  const navigate = useNavigate()

  return (
    <main>
      <HeroSection />
      <section className="relative overflow-hidden bg-[#f7f5f2] px-4 py-20 md:py-24">
        <div className="mx-auto grid max-w-[1400px] items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mb-4 text-xs font-bold tracking-[3px] text-sic-red">SECURITY PERSONNEL</div>
            <h2 className="mb-5 max-w-2xl text-3xl font-bold leading-tight text-sic-charcoal md:text-5xl">
              Professional protection for people, businesses and events.
            </h2>
            <p className="mb-8 max-w-2xl text-base leading-relaxed text-sic-silver md:text-lg">
              Put a capable, professional security presence where it matters. Our personnel help protect individuals, safeguard business premises and support the safe running of events through attentive on-site security and access control.
            </p>
            <button
              type="button"
              onClick={() => navigate('/contact')}
              className="inline-flex items-center bg-sic-red px-6 py-3 text-sm font-bold tracking-wide text-white transition-colors hover:bg-sic-charcoal"
            >
              DISCUSS YOUR SECURITY NEEDS <FaArrowRight className="ml-3" />
            </button>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {[
              { icon: FaUserShield, title: 'Personal protection', description: 'A discreet, attentive presence tailored to individual security needs.' },
              { icon: FaBuilding, title: 'Business security', description: 'On-site personnel to help protect premises, people and daily operations.' },
              { icon: FaCalendarCheck, title: 'Event security', description: 'Professional coverage to support access control and orderly events.' }
            ].map(({ icon: Icon, title, description }, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-4 border border-[#e5dfd8] bg-white p-5 md:p-6"
              >
                <Icon className="mt-1 shrink-0 text-2xl text-sic-red" />
                <div>
                  <h3 className="mb-1 font-bold text-sic-charcoal">{title}</h3>
                  <p className="text-sm leading-relaxed text-sic-silver">{description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <IntelGrid />
      <CaseTracker />
      <ContactTrigger />
    </main>
  )
}

export default Home
