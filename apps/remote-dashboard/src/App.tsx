import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MfeProvider, useLocale, useTheme } from './context/MfeContext';
import DashboardRoutes from './DashboardRoutes';
import './mfe-styles.css';

function StandaloneDashboardShell() {
  const { locale, setLocale } = useLocale();
  const { theme, setTheme } = useTheme();

  return (
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
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px'
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

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Standalone Theme Switcher */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                background: 'var(--bg-surface)',
                padding: '2px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)',
                gap: '2px'
              }}
            >
              <button
                type="button"
                className={`mfe-btn mfe-btn-sm ${theme === 'dark' ? 'mfe-btn-primary' : 'mfe-btn-outline'}`}
                style={{ padding: '2px 6px', fontSize: '11px', border: 'none' }}
                onClick={() => setTheme('dark')}
              >
                🌙
              </button>
              <button
                type="button"
                className={`mfe-btn mfe-btn-sm ${theme === 'light' ? 'mfe-btn-primary' : 'mfe-btn-outline'}`}
                style={{ padding: '2px 6px', fontSize: '11px', border: 'none' }}
                onClick={() => setTheme('light')}
              >
                ☀️
              </button>
            </div>

            {/* Standalone Locale Switcher */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                background: 'var(--bg-surface)',
                padding: '2px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)',
                gap: '2px'
              }}
            >
              <button
                type="button"
                className={`mfe-btn mfe-btn-sm ${locale === 'en' ? 'mfe-btn-primary' : 'mfe-btn-outline'}`}
                style={{ padding: '2px 6px', fontSize: '11px', border: 'none' }}
                onClick={() => setLocale('en')}
              >
                🇺🇸 EN
              </button>
              <button
                type="button"
                className={`mfe-btn mfe-btn-sm ${locale === 'th' ? 'mfe-btn-primary' : 'mfe-btn-outline'}`}
                style={{ padding: '2px 6px', fontSize: '11px', border: 'none' }}
                onClick={() => setLocale('th')}
              >
                🇹🇭 TH
              </button>
            </div>

            <a
              href="http://localhost:3000/dashboard"
              className="mfe-btn mfe-btn-secondary mfe-btn-sm"
              style={{ textDecoration: 'none' }}
            >
              🔗 Open in Host Shell (:3000)
            </a>
          </div>
        </div>

        <DashboardRoutes />
      </div>
    </div>
  );
}

export function App() {
  return (
    <MfeProvider initialLocale="en" initialTheme="dark">
      <BrowserRouter>
        <StandaloneDashboardShell />
      </BrowserRouter>
    </MfeProvider>
  );
}
export default App;