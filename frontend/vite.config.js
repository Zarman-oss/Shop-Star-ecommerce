import { defineConfig } from 'vite';
import { imagetools } from 'vite-imagetools';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    imagetools(),
  ],

  server: {
    proxy: {

      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      },
      '/uploads': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    },
  },

  build: {
    outDir: 'dist', // Specify the correct output directory path
    assetsDir: 'assets', // Relative path to the root of your project
  
  },
});
