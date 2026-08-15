import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import OrdersRoutes from './OrdersRoutes';
import './mfe-styles.css';

export function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', padding: '24px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Standalone Banner */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(236, 72, 153, 0.15) 100%)',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              borderRadius: '12px',
              padding: '16px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '18px' }}>🟣</span>
                <strong style={{ fontSize: '15px' }}>Team Beta: Orders Remote (Standalone Mode)</strong>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Running independently on <code>http://localhost:3002</code> with internal routes: <code>/</code>, <code>/create</code>, <code>/view/:id</code>
              </p>
            </div>
            <a
              href="http://localhost:3000/orders"
              className="mfe-btn mfe-btn-secondary mfe-btn-sm"
              style={{ textDecoration: 'none' }}
            >
              🔗 Open in Host Shell (:3000)
            </a>
          </div>

          <OrdersRoutes />
        </div>
      </div>
    </BrowserRouter>
  );
}
export default App;