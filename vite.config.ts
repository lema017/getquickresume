import { defineConfig, Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

/**
 * Custom Vite plugin to make CSS non-render-blocking
 * Transforms CSS link tags to use preload pattern for better FCP/LCP
 */
function cssNonBlockingPlugin(): Plugin {
  return {
    name: 'css-non-blocking',
    enforce: 'post',
    transformIndexHtml(html) {
      // Transform render-blocking CSS links to async loading pattern
      return html.replace(
        /<link rel="stylesheet" crossorigin href="(\/assets\/[^"]+\.css)">/g,
        `<link rel="preload" href="$1" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="$1"></noscript>`
      )
    }
  }
}

export default defineConfig({
  plugins: [
    react(),
    cssNonBlockingPlugin(),
  ],
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
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
      },
      mangle: {
        safari10: true,
      },
      format: {
        comments: false,
      },
    },
    // Disable modulepreload polyfill — modern browsers support <link rel="modulepreload"> natively
    modulePreload: { polyfill: false },
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
          // NOTE: Lazy-loaded libraries (jspdf, html2canvas, html2pdf.js, pdfjs-dist,
          // mammoth, react-live, react-frame-component, @react-oauth/google, jwt-decode)
          // are intentionally NOT listed here. They are consumed via dynamic import()
          // or within lazy-loaded routes, so Rollup creates natural async chunks for them.
          // Forcing them into manualChunks caused the __vitePreload helper to be co-located
          // with vendor-pdf, pulling 178 KiB into the critical request chain.
        }
      }
    }
  },
})
