import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false, // Disable sourcemaps in production for smaller builds
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React runtime - loaded on every page
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // UI components - frequently used
          'vendor-ui': ['lucide-react', 'react-hot-toast', 'clsx', 'tailwind-merge'],
          // Form handling - used in wizard and forms
          'vendor-forms': ['react-hook-form', '@hookform/resolvers', 'zod'],
          // Internationalization - loaded once
          'vendor-i18n': ['i18next', 'react-i18next', 'i18next-browser-languagedetector'],
          // State management
          'vendor-state': ['zustand'],
          // PDF generation - only loaded when downloading
          'vendor-pdf': ['jspdf', 'html2canvas', 'html2pdf.js'],
          // Document parsing - only loaded when uploading files
          'vendor-doc-parser': ['pdfjs-dist', 'mammoth'],
          // Template preview - only loaded in template selection
          'vendor-templates': ['react-live', 'react-frame-component'],
          // Auth
          'vendor-auth': ['@react-oauth/google', 'jwt-decode'],
        }
      }
    }
  },
})
