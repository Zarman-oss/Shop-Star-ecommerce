import { defineConfig } from 'vite'
// import eslintPlugin from 'vite-plugin-eslint';

import react from '@vitejs/plugin-react'
// https://vitejs.dev/config/

export default defineConfig({


  plugins: [react(),],

  // server: {
  //   proxy: {
  //     '/api': 'http://backend-server-domain-or-ip:backend-port',
  //     '/uploads': 'http://backend-server-domain-or-ip:backend-port',
  //   },
  // },

  server: {
    proxy: {
      '/api': 'http://localhost:5000',
      '/uploads': 'http://localhost:5000',
    },
  },
  // base: '/'
}); 