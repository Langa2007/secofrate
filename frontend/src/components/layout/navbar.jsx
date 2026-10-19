import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FaShieldAlt,
  FaUserSecret,
  FaMicrochip,
  FaEnvelope,
} from 'react-icons/fa'

const Navbar = () => {
  const location = useLocation()

  const navLinks = [
    { path: '/', label: 'OPS CENTER', icon: FaShieldAlt },
    { path: '/about', label: 'DIRECTORY', icon: FaUserSecret },
    { path: '/services', label: 'CAPABILITIES', icon: FaMicrochip },
    { path: '/contact', label: 'COMMS', icon: FaEnvelope },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-lg border-b border-sic-gray transition-all duration-300"
    >
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-3 flex items-center justify-between flex-wrap gap-4">
        {/* Logo Area */}
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="/logo.png"
            alt="Secofrate Logo"
            className="w-12 h-12 object-contain"
          />

          <div className="hidden sm:block">
            <div             className="font-space font-bold text-sm tracking-[3px] text-sic-black">
              SECOFRATE
            </div>
            <div className="font-inter text-[10px] tracking-[2px] text-sic-red">
              INVESTIGATIONS BUREAU
            </div>
          </div>

          <div className="hidden lg:block border-l border-sic-red/50 pl-3 ml-1">
            <div className="font-space text-[10px] font-bold tracking-[2px] text-sic-gold">
              SHERIA KWA WOTE
            </div>
            <div className="font-inter text-[8px] tracking-[1px] text-sic-silver">
              JUSTICE FOR ALL
            </div>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-1 bg-sic-charcoal/50 backdrop-blur rounded-lg p-1">
          {navLinks.map((link) => {
            const Icon = link.icon
            const isActive = location.pathname === link.path

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 text-xs font-bold tracking-[1.5px] transition-all duration-300 flex items-center gap-2 rounded ${
                  isActive
                      ? 'text-sic-red bg-sic-red/10'
                      : 'text-sic-silver hover:text-sic-black'
                }`}
              >
                <Icon className="text-sm" />
                <span className="hidden md:inline">{link.label}</span>

                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-sic-red"
                    transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            )
          })}

        </div>

      </div>
    </motion.nav>
  )
}

export default Navbar
