import React, { Suspense, lazy } from 'react';
import { RemoteErrorBoundary } from '../components/RemoteErrorBoundary';

// Dynamic lazy-loading of remote federated micro-apps
const DashboardRoutes = lazy(() => import('remoteDashboard/DashboardRoutes'));
const OrdersRoutes = lazy(() => import('remoteOrders/OrdersRoutes'));

export const HomePage: React.FC = () => {
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
            <h1 style={{ fontSize: '22px', fontWeight: 800 }}>Micro-Frontend Architecture Playground</h1>
            <span className="mfe-badge mfe-badge-success">Vite + Module Federation</span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', maxWidth: '720px' }}>
            The <strong>Host Shell (:3000)</strong> dynamically aggregates autonomous remote micro-apps over HTTP with <strong>zero shared package dependencies</strong> and pure CSS styling.
            Click <strong>&quot;➕ New Order Form&quot;</strong> or <strong>&quot;⚡ 1-Click Order&quot;</strong> in Orders Remote to test internal sub-routing and cross-MFE events!
          </p>
        </div>

        <div className="mfe-flex-gap">
          <a
            href="http://localhost:3001"
            target="_blank"
            rel="noreferrer"
            className="mfe-btn mfe-btn-secondary mfe-btn-sm"
          >
            ↗ Standalone :3001
          </a>
          <a
            href="http://localhost:3002"
            target="_blank"
            rel="noreferrer"
            className="mfe-btn mfe-btn-secondary mfe-btn-sm"
          >
            ↗ Standalone :3002
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
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Loading Dashboard Remote (:3001)...</span>
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
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Loading Orders Remote (:3002)...</span>
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