import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig(({ command, mode }) => {
  const isProduction = mode === 'production' && !process.env.DEV_MODE;
  const defaultBase = isProduction ? '/remotes/orders/' : 'http://localhost:3002/';
  const base = process.env.BASE_URL || defaultBase;

  return {
    base,
    plugins: [
      react(),
      federation({
        name: 'remote_orders',
        filename: 'remoteEntry.js',
        exposes: {
          './OrdersRoutes': './src/OrdersRoutes.tsx'
        },
        shared: ['react', 'react-dom', 'react-router-dom']
      })
    ],
    server: {
      port: 3002,
      strictPort: true,
      cors: true,
      host: '0.0.0.0'
    },
    preview: {
      port: 3002,
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
