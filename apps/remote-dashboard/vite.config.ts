import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig(({ command, mode }) => {
  const isProduction = mode === 'production' && !process.env.DEV_MODE;
  const defaultBase = isProduction ? '/remotes/dashboard/' : 'http://localhost:3001/';
  const base = process.env.BASE_URL || defaultBase;

  return {
    base,
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
  };
});
