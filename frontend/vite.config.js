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
      '/api': 'https://shop-star-ecommerce.vercel.app/',
      '/uploads': 'https://shop-star-ecommerce.vercel.app/',
    },
  },

  build: {
    outDir: 'dist', // Specify the correct output directory path
    assetsDir: 'assets', // Relative path to the root of your project
    manifest: true,
  },
});
