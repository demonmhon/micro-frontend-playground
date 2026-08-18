import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { MfeProvider, useLocale } from './context/MfeContext';
import { getHostTranslations } from './locales';
import { AppLayout } from './components/AppLayout';
import { RemoteErrorBoundary } from './components/RemoteErrorBoundary';
import { HomePage } from './pages/HomePage';
import { DocsPage } from './pages/DocsPage';
import './mfe-styles.css';
import './App.css';

// Lazy-load federated remotes
const DashboardRoutes = lazy(() => import('remoteDashboard/DashboardRoutes'));
const OrdersRoutes = lazy(() => import('remoteOrders/OrdersRoutes'));

function AppRoutes() {
  const { locale } = useLocale();
  const t = getHostTranslations(locale);

  return (
    <AppLayout>
      <Suspense
        fallback={
          <div className="mfe-card mfe-spinner-wrapper">
            <div className="mfe-spinner"></div>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{t.sections.loadingModule}</span>
          </div>
        }
      >
        <Routes>
          {/* Host Overview */}
          <Route path="/" element={<HomePage />} />

          {/* Architecture Docs */}
          <Route path="/docs" element={<DocsPage />} />

          {/* Team Alpha: Dashboard Remote */}
          <Route
            path="/dashboard/*"
            element={
              <RemoteErrorBoundary remoteName="Team Alpha: Dashboard Remote" expectedPort={3001} devCommand="npm run dev:dashboard">
                <DashboardRoutes />
              </RemoteErrorBoundary>
            }
          />

          {/* Team Beta: Orders Remote (Internal Sub-Routes: /, /create, /view/:orderId) */}
          <Route
            path="/orders/*"
            element={
              <RemoteErrorBoundary remoteName="Team Beta: Orders Remote" expectedPort={3002} devCommand="npm run dev:orders">
                <OrdersRoutes />
              </RemoteErrorBoundary>
            }
          />

          {/* 404 Fallback */}
          <Route
            path="*"
            element={
              <div className="mfe-card" style={{ textAlign: 'center', padding: '60px 20px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '8px' }}>{t.notFound.title}</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
                  {t.notFound.message}
                </p>
                <Link to="/" className="mfe-btn mfe-btn-primary">
                  {t.notFound.returnBtn}
                </Link>
              </div>
            }
          />
        </Routes>
      </Suspense>
    </AppLayout>
  );
}

export function App() {
  return (
    <MfeProvider initialLocale="en">
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </MfeProvider>
  );
}
export default App;