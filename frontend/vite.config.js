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
      '/api': 'http://localhost:5000',
      '/uploads': 'http://localhost:5000',
    },
  },

  build: {
    outDir: 'dist', // Specify the correct output directory path
    assetsDir: 'assets', // Relative path to the root of your project
    manifest: true,
  },
});
