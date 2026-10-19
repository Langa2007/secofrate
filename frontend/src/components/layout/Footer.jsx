import React from 'react'
import { Link } from 'react-router-dom'
import { FaShieldAlt, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'

const Footer = () => {
  const operations = [
    'Surveillance Services',
    'Forensic Lab',
    'Background Checks',
    'Corporate Security',
  ]

  const quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Secofrate', path: '/about' },
    { label: 'All Capabilities', path: '/services' },
    { label: 'Secure Contact', path: '/contact' },
    { label: 'Admin Access', path: '/admin/login' },
  ]

  return (
    <footer className="bg-white text-sic-black border-t border-sic-red/30 pt-12 pb-6 px-4">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            {/* Footer Logo Placeholder */}
            <div className="w-14 h-14 bg-sic-red flex items-center justify-center mb-4">
              <span className="font-space font-bold text-sm tracking-wider">S.I.C</span>
            </div>
            {/* Uncomment below for actual logo */}
            {/* <img src="/logo.png" alt="Secofrate" className="w-14 h-14 mb-4" /> */}
            <p className="text-sic-silver text-sm italic mb-3">Sheria Kwa Wote - Justice for All</p>
            <div className="flex items-center gap-2 text-xs text-sic-gold">
              <FaShieldAlt />
              <span>LICENSED PRIVATE SECURITY AGENCY</span>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-sm tracking-wider mb-4">OPERATIONS</h4>
            <ul className="space-y-2 text-sm text-sic-silver">
              {operations.map((operation) => (
                <li key={operation}>
                  <Link to="/services" className="hover:text-sic-red transition">
                    {operation}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm tracking-wider mb-4">QUICK LINKS</h4>
            <ul className="space-y-2 text-sm text-sic-silver">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="hover:text-sic-red transition">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm tracking-wider mb-4">CONTACT</h4>
            <ul className="space-y-2 text-sm text-sic-silver">
              <li className="flex items-center gap-2"><FaPhone className="text-sic-red" /> +254 700 000 000</li>
              <li className="flex items-center gap-2"><FaEnvelope className="text-sic-red" /> intel@secofrate.ci</li>
              <li className="flex items-center gap-2"><FaMapMarkerAlt className="text-sic-red" /> Nairobi, Kenya</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-sic-gray pt-6 text-center">
          <div className="font-mono text-xs tracking-[3px] text-sic-red mb-2">
            S E C O F R A T E   I N T E L L I G E N C E   N E T W O R K
          </div>
          <div className="text-xs text-sic-silver">
            &copy; 2026 Secofrate Investigations Bureau. All intelligence proprietary.
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer