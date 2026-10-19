import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaExclamationTriangle, FaLock } from 'react-icons/fa'
import axios from 'axios'

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      const response = await axios.post('/api/contact/submit', {
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
        is_urgent: data.urgency === 'true'
      })
      
      toast.success(`${response.data.message}\nReference: ${response.data.reference_number}`, {
        duration: 8000,
      })
      reset()
    } catch (error) {
      toast.error(error.response?.data?.error || 'Submission failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen pt-32 pb-16 px-4 bg-white">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 gap-12"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Establish Secure Communication
            </h1>
            <p className="text-sic-silver mb-8">
              All inquiries are encrypted and handled with strict confidentiality protocols.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4 p-4 bg-sic-charcoal/30 border-l-3 border-sic-red">
                <FaPhoneAlt className="text-2xl text-sic-red" />
                <div>
                  <h3 className="font-bold text-sm tracking-wide">EMERGENCY HOTLINE</h3>
                  <p className="text-sic-silver text-sm">+254 726846599 (24/7 Ops Center)</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-sic-charcoal/30 border-l-3 border-sic-red">
                <FaEnvelope className="text-2xl text-sic-red" />
                <div>
                  <h3 className="font-bold text-sm tracking-wide">INTELLIGENCE COMMS</h3>
                  <p className="text-sic-silver text-sm">secofrate551@gmail| PGP Available</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-sic-charcoal/30 border-l-3 border-sic-red">
                <FaMapMarkerAlt className="text-2xl text-sic-red" />
                <div>
                  <h3 className="font-bold text-sm tracking-wide">HEADQUARTERS</h3>
                  <p className="text-sic-silver text-sm">Nairobi, Kenya
                    AGA KHAN WALK - City Square
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-sic-red/10 border border-sic-red p-6 text-center">
              <FaExclamationTriangle className="text-sic-red text-2xl mx-auto mb-3" />
              <p className="text-sm">
                For active threats or immediate danger, contact local authorities first,
                then notify our emergency response team.
              </p>
            </div>
          </div>

          <div className="bg-sic-charcoal/40 backdrop-blur-sm border border-sic-gray p-6 md:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="block text-xs font-bold tracking-wide mb-2 text-sic-silver">
                  FULL NAME *
                </label>
                <input
                  {...register('fullName', { 
                    required: 'Name is required',
                    validate: value => (value && value.trim().split(/\s+/).length >= 2) || 'Please provide at least two names'
                  })}
                  className="w-full px-4 py-2 bg-white border border-sic-gray text-sic-black placeholder:text-sic-silver focus:border-sic-red focus:outline-none transition-colors"
                  placeholder="Your name as it appears in official records"
                />
                {errors.fullName && (
                  <p className="text-sic-red text-xs mt-1">{errors.fullName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold tracking-wide mb-2 text-sic-silver">
                  EMAIL ADDRESS *
                </label>
                <input
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  className="w-full px-4 py-2 bg-white border border-sic-gray text-sic-black placeholder:text-sic-silver focus:border-sic-red focus:outline-none"
                  placeholder="your email"
                />
                {errors.email && (
                  <p className="text-sic-red text-xs mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold tracking-wide mb-2 text-sic-silver">
                  CONTACT NUMBER
                </label>
                <input
                  {...register('phone')}
                  className="w-full px-4 py-2 bg-white border border-sic-gray text-sic-black placeholder:text-sic-silver focus:border-sic-red focus:outline-none"
                  placeholder="+254 XXX XXX XXX"
                />
              </div>

              <div>
                <label className="block text-xs font-bold tracking-wide mb-2 text-sic-silver">
                  SUBJECT *
                </label>
                <input
                  {...register('subject', { required: 'Subject is required' })}
                  className="w-full px-4 py-2 bg-white border border-sic-gray text-sic-black placeholder:text-sic-silver focus:border-sic-red focus:outline-none"
                  placeholder="Investigation Inquiry"
                />
                {errors.subject && (
                  <p className="text-sic-red text-xs mt-1">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold tracking-wide mb-2 text-sic-silver">
                  URGENCY LEVEL
                </label>
                <select
                  {...register('urgency')}
                  className="w-full px-4 py-2 bg-white border border-sic-gray text-sic-black focus:border-sic-red focus:outline-none"
                >
                  <option value="false">Standard Inquiry</option>
                  <option value="true">Urgent Matter</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold tracking-wide mb-2 text-sic-silver">
                  MESSAGE *
                </label>
                <textarea
                  {...register('message', { required: 'Message is required' })}
                  rows={6}
                  className="w-full px-4 py-2 bg-white border border-sic-gray text-sic-black placeholder:text-sic-silver focus:border-sic-red focus:outline-none resize-none"
                  placeholder="Provide detailed information about your inquiry..."
                />
                {errors.message && (
                  <p className="text-sic-red text-xs mt-1">{errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-sic-red text-white py-3 font-bold tracking-wider flex items-center justify-center gap-2 hover:bg-sic-red-glow hover:shadow-lg hover:shadow-sic-red/20 transition-all disabled:opacity-50"
              >
                <FaLock />
                {isSubmitting ? 'ENCRYPTING & TRANSMITTING...' : 'ENCRYPT & SEND'}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Contact