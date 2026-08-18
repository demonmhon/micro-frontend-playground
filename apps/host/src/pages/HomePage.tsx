import React, { Suspense, lazy } from 'react';
import { useLocale } from '../context/MfeContext';
import { getHostTranslations } from '../locales';
import { RemoteErrorBoundary } from '../components/RemoteErrorBoundary';

// Dynamic lazy-loading of remote federated micro-apps
const DashboardRoutes = lazy(() => import('remoteDashboard/DashboardRoutes'));
const OrdersRoutes = lazy(() => import('remoteOrders/OrdersRoutes'));

export const HomePage: React.FC = () => {
  const { locale } = useLocale();
  const t = getHostTranslations(locale);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Welcome Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          borderRadius: '16px',
          padding: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div>
          <div className="mfe-flex-gap" style={{ marginBottom: '6px' }}>
            <h1 style={{ fontSize: '22px', fontWeight: 800 }}>{t.banner.title}</h1>
            <span className="mfe-badge mfe-badge-success">{t.banner.tag}</span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', maxWidth: '720px' }}>
            {t.banner.description}
          </p>
        </div>

        <div className="mfe-flex-gap">
          <a
            href="http://localhost:3001"
            target="_blank"
            rel="noreferrer"
            className="mfe-btn mfe-btn-secondary mfe-btn-sm"
          >
            {t.banner.standaloneDashboard}
          </a>
          <a
            href="http://localhost:3002"
            target="_blank"
            rel="noreferrer"
            className="mfe-btn mfe-btn-secondary mfe-btn-sm"
          >
            {t.banner.standaloneOrders}
          </a>
        </div>
      </div>

      {/* Side-by-side or stacked Remotes */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {/* Remote 1: Dashboard */}
        <section>
          <RemoteErrorBoundary remoteName="Team Alpha: Dashboard Remote" expectedPort={3001} devCommand="npm run dev:dashboard">
            <Suspense
              fallback={
                <div className="mfe-card mfe-spinner-wrapper">
                  <div className="mfe-spinner"></div>
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{t.sections.loadingDashboard}</span>
                </div>
              }
            >
              <DashboardRoutes />
            </Suspense>
          </RemoteErrorBoundary>
        </section>

        {/* Remote 2: Orders */}
        <section>
          <RemoteErrorBoundary remoteName="Team Beta: Orders Remote" expectedPort={3002} devCommand="npm run dev:orders">
            <Suspense
              fallback={
                <div className="mfe-card mfe-spinner-wrapper">
                  <div className="mfe-spinner"></div>
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{t.sections.loadingOrders}</span>
                </div>
              }
            >
              <OrdersRoutes />
            </Suspense>
          </RemoteErrorBoundary>
        </section>
      </div>
    </div>
  );
};