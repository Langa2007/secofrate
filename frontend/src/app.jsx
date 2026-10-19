import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/layout/navbar'
import Footer from './components/layout/Footer'
import SecurityOverlay from './components/layout/Securityoverlay'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import SurveillanceServices from './pages/SurveillanceServices'
import Contact from './pages/Contact'
import AdminLogin from './pages/admin/Login'
import AdminDashboard from './pages/admin/Dashboard'
import AdminCases from './pages/admin/Cases'
import AdminClients from './pages/admin/Clients'

function App() {
  return (
    <AuthProvider>
      <SecurityOverlay />
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#1a1a1a',
            color: '#e0e0e0',
            border: '1px solid #4b2e24',
          },
        }}
      />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          <>
            <Navbar />
            <Home />
            <Footer />
          </>
        } />
        <Route path="/about" element={
          <>
            <Navbar />
            <About />
            <Footer />
          </>
        } />
        <Route path="/services" element={
          <>
            <Navbar />
            <Services />
            <Footer />
          </>
        } />
        <Route path="/services/surveillance" element={
          <>
            <Navbar />
            <SurveillanceServices />
            <Footer />
          </>
        } />
        <Route path="/contact" element={
          <>
            <Navbar />
            <Contact />
            <Footer />
          </>
        } />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/cases" element={<AdminCases />} />
        <Route path="/admin/clients" element={<AdminClients />} />
      </Routes>
    </AuthProvider>
  )
}

export default App