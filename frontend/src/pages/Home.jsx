import React from 'react'
import HeroSection from '../components/layout/HeroSection'
import IntelGrid from '../components/home/IntelGrid'
import CaseTracker from '../components/home/CaseTracker'
import ContactTrigger from '../components/home/ContactTrigger'

const Home = () => {
  return (
    <main>
      <HeroSection />
      <IntelGrid />
      <CaseTracker />
      <ContactTrigger />
    </main>
  )
}

export default Home