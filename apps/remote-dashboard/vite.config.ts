import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'remote_dashboard',
      filename: 'remoteEntry.js',
      exposes: {
        './DashboardRoutes': './src/DashboardRoutes.tsx'
      },
      shared: ['react', 'react-dom', 'react-router-dom']
    })
  ],
  server: {
    port: 3001,
    strictPort: true,
    cors: true,
    host: '0.0.0.0'
  },
  preview: {
    port: 3001,
    strictPort: true,
    cors: true,
    host: '0.0.0.0'
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  }
});
