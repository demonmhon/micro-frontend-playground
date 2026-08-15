import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import DashboardRoutes from './DashboardRoutes';
import './mfe-styles.css';

export function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', padding: '24px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Standalone Banner */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '12px',
              padding: '16px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '18px' }}>🟢</span>
                <strong style={{ fontSize: '15px' }}>Team Alpha: Dashboard Remote (Standalone Mode)</strong>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Running independently on <code>http://localhost:3001</code>. Autonomous dev server for Team Alpha engineers.
              </p>
            </div>
            <a
              href="http://localhost:3000/dashboard"
              className="mfe-btn mfe-btn-secondary mfe-btn-sm"
              style={{ textDecoration: 'none' }}
            >
              🔗 Open in Host Shell (:3000)
            </a>
          </div>

          <DashboardRoutes />
        </div>
      </div>
    </BrowserRouter>
  );
}
export default App;