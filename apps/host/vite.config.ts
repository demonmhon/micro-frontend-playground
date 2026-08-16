import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig(({ command, mode }) => {
  const isBuild = command === 'build' || mode === 'production';
  const defaultDashboardUrl = isBuild
    ? '/remotes/dashboard/assets/remoteEntry.js'
    : 'http://localhost:3001/assets/remoteEntry.js';
  const defaultOrdersUrl = isBuild
    ? '/remotes/orders/assets/remoteEntry.js'
    : 'http://localhost:3002/assets/remoteEntry.js';

  const remoteDashboard = process.env.VITE_REMOTE_DASHBOARD_URL || defaultDashboardUrl;
  const remoteOrders = process.env.VITE_REMOTE_ORDERS_URL || defaultOrdersUrl;

  return {
    plugins: [
      react(),
      federation({
        name: 'host_app',
        remotes: {
          remoteDashboard,
          remoteOrders,
        },
        shared: ['react', 'react-dom', 'react-router-dom']
      })
    ],
    server: {
      port: 3000,
      strictPort: true,
      host: '0.0.0.0'
    },
    preview: {
      port: 3000,
      strictPort: true,
      host: '0.0.0.0'
    },
    build: {
      target: 'esnext',
      minify: false,
      cssCodeSplit: false
    }
  };
});
