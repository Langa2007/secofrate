import '../styles/globals.css'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '../src/context/AuthContext'

export default function AdminApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1a1a1a',
            color: '#ffffff',
            border: '1px solid #4b2e24',
          },
        }}
      />
      <Component {...pageProps} />
    </AuthProvider>
  )
}
