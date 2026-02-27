import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'
import App from './App'
import './index.css'
import './i18n/config'
import { initMarketingTracking } from './services/marketingAnalytics'

// Initialize marketing tracking after first render (non-blocking)
if ('requestIdleCallback' in window) {
  requestIdleCallback(() => initMarketingTracking());
} else {
  setTimeout(() => initMarketingTracking(), 0);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <App />
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    </BrowserRouter>
  </HelmetProvider>,
)
