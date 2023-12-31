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
      '/api': 'https://localhost:5000',
      '/uploads': 'https://localhost:5000',
    },
  },

  build: {
    outDir: 'frontend/dist', // Specify the correct output directory path
    assetsDir: 'assets', // Relative path to the root of your project
    manifest: true,
  },
});
