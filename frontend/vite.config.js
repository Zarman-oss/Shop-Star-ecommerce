import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from 'vite-plugin-legacy';

export default defineConfig({
  plugins: [
    react(),
    legacy({
      // Copy assets during build
      assetsDir: 'src/assets',
      targetDirectory: 'dist/assets',
      // Adjust the paths as per your project structure
    }),
  ],

  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
});
