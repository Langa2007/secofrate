import React from 'react'
import { motion } from 'framer-motion'
import {
  FaDog,
  FaEye,
  FaVideo,
  FaNetworkWired,
  FaShieldAlt,
  FaArrowRight,
} from 'react-icons/fa'
import { Link } from 'react-router-dom'

const serviceAreas = [
  {
    icon: FaDog,
    title: 'Canine Security & Detection',
    description:
      'Professionally handled working dogs support perimeter security, access control, search operations, and detection assignments. Every deployment is planned around the site, the risk profile, and the welfare of the animal.',
    features: [
      'Perimeter patrol support',
      'Trained handler teams',
      'Search and detection assignments',
      'Event and property security',
    ],
  },
  {
    icon: FaEye,
    title: 'Discreet Surveillance Operations',
    description:
      'Our surveillance teams combine observation, mobile coverage, documented reporting, and lawful intelligence-gathering methods to help clients understand activity around people, assets, and locations.',
    features: [
      'Static and mobile surveillance',
      'Day and night operations',
      'Evidence-focused reporting',
      'Coordinated field teams',
    ],
  },
  {
    icon: FaVideo,
    title: 'High-End CCTV Installation',
    description:
      'We design and install reliable camera systems for homes, businesses, estates, warehouses, and high-risk sites. Each system is mapped to coverage objectives rather than installed as a collection of disconnected cameras.',
    features: [
      'Site survey and coverage design',
      'Professional mounting and cabling',
      'Secure remote viewing setup',
      'Testing, handover, and training',
    ],
  },
]

const technologies = [
  {
    title: '4K and 8K Ultra-HD Imaging',
    description:
      'High-resolution cameras preserve more detail for entrances, perimeters, vehicle areas, and other locations where identification matters.',
  },
  {
    title: 'Low-Light and Full-Colour Night Vision',
    description:
      'Modern sensors and supplemental lighting help maintain useful colour and detail after dark, reducing reliance on heavily illuminated sites.',
  },
  {
    title: 'Thermal and Dual-Spectrum Cameras',
    description:
      'Thermal imaging can support perimeter monitoring in darkness, glare, dust, and difficult weather when paired with conventional video.',
  },
  {
    title: 'PTZ and Auto-Tracking',
    description:
      'Pan-tilt-zoom cameras extend coverage across large areas and can follow configured activity while operators retain control of the scene.',
  },
  {
    title: 'AI Video Analytics',
    description:
      'People, vehicle, intrusion, line-crossing, loitering, and object-detection rules can reduce alert fatigue when carefully tuned to the environment.',
  },
  {
    title: 'Edge Recording and Secure Networking',
    description:
      'Local recording, redundant storage, PoE infrastructure, encrypted remote access, and ONVIF-compatible equipment support resilient, maintainable systems.',
  },
]

const SurveillanceServices = () => {
  return (
    <main className="min-h-screen bg-white pt-32 pb-16 px-4">
      <div className="max-w-[1400px] mx-auto">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mb-14"
        >
          <div className="text-sic-red text-xs font-bold tracking-[3px] mb-3">
            OPERATIONS / SURVEILLANCE
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-sic-black mb-5">
            Protection you can see. Intelligence you can act on.
          </h1>
          <p className="text-sic-silver text-lg leading-relaxed max-w-3xl">
            Secofrate combines trained canine teams, discreet field surveillance,
            and modern video security systems to protect people, property, and
            critical information.
          </p>
        </motion.header>

        <section className="grid lg:grid-cols-3 gap-6 mb-20">
          {serviceAreas.map((service, index) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-sic-gray p-6 bg-white shadow-sm hover:border-sic-red transition-colors"
            >
              <service.icon className="text-3xl text-sic-red mb-5" />
              <h2 className="text-xl font-bold text-sic-black mb-3">
                {service.title}
              </h2>
              <p className="text-sic-silver text-sm leading-relaxed mb-5">
                {service.description}
              </p>
              <ul className="space-y-2 text-sm text-sic-silver">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="text-sic-gold mt-1">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </section>

        <section className="border-y border-sic-gray py-14 mb-16">
          <div className="flex items-center gap-3 mb-3">
            <FaNetworkWired className="text-sic-red" />
            <div className="text-sic-red text-xs font-bold tracking-[3px]">
              MODERN VIDEO SECURITY
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-sic-black mb-4">
            CCTV built for real-world security
          </h2>
          <p className="text-sic-silver max-w-3xl leading-relaxed mb-8">
            A contemporary CCTV system is more than a camera and a screen. We
            combine the right image sensor, lens, lighting, network, recording,
            analytics, and access controls for the environment being protected.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technologies.map((technology) => (
              <div key={technology.title} className="bg-sic-charcoal/30 border border-sic-gray p-5">
                <h3 className="font-bold text-sic-black mb-2">{technology.title}</h3>
                <p className="text-sm text-sic-silver leading-relaxed">
                  {technology.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-sic-red/5 border border-sic-red/30 p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-sic-red text-xs font-bold tracking-[2px] mb-3">
              <FaShieldAlt />
              SECURITY ASSESSMENT
            </div>
            <h2 className="text-2xl font-bold text-sic-black mb-2">
              Plan your surveillance coverage
            </h2>
            <p className="text-sic-silver max-w-2xl">
              Request a site assessment for canine support, field surveillance,
              or a CCTV design tailored to your property and operating risks.
            </p>
          </div>
          <Link
            to="/contact"
            className="shrink-0 bg-sic-red text-white px-6 py-3 font-bold tracking-wider flex items-center gap-3 hover:bg-sic-red-glow transition-colors"
          >
            REQUEST ASSESSMENT
            <FaArrowRight />
          </Link>
        </section>
      </div>
    </main>
  )
}

export default SurveillanceServices
