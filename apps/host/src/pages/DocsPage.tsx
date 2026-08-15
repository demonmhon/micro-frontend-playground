import React from 'react';

export const DocsPage: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '900px' }}>
      <div className="mfe-card">
        <div className="mfe-card-header">
          <div>
            <h2 className="mfe-card-title" style={{ fontSize: '20px' }}>Pure Micro-Frontend Architecture</h2>
            <p className="mfe-card-subtitle">Autonomous apps, zero package overhead, standard browser communication</p>
          </div>
          <span className="mfe-badge mfe-badge-success">Architecture Guide</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', fontSize: '14px', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
          <p>
            This playground demonstrates the <strong>Micro-Frontend (MFE) pattern</strong> using <strong>Vite</strong> and <strong>Module Federation</strong> with the simplest possible architecture:
          </p>

          <div className="mfe-grid-2" style={{ marginTop: '8px' }}>
            <div style={{ padding: '16px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>1. No Package Overhead</div>
              No shared monorepo UI packages or library wrappers. Each micro-app is fully autonomous and styled with standard, lightweight CSS.
            </div>

            <div style={{ padding: '16px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>2. Internal Sub-Routing</div>
              Remotes can manage their own deep routes (e.g. <code>/orders</code>, <code>/orders/create</code>, <code>/orders/view/:id</code>) that work seamlessly in both Integrated and Standalone modes.
            </div>

            <div style={{ padding: '16px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>3. Standard Browser Event Bus</div>
              Apps communicate asynchronously via standard <code>CustomEvent</code> on <code>window</code> without coupling their codebases.
            </div>

            <div style={{ padding: '16px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>4. Fault Isolation & Resilience</div>
              Each remote is wrapped in a <code>RemoteErrorBoundary</code>. If a remote throws an error, only that remote falls back while Host and other remotes keep running.
            </div>
          </div>
        </div>
      </div>

      {/* Network Overview */}
      <div className="mfe-card">
        <div className="mfe-card-title" style={{ marginBottom: '12px' }}>Network & Port Topology</div>
        <div className="mfe-table-container">
          <table className="mfe-table">
            <thead>
              <tr>
                <th>App / Service</th>
                <th>Port</th>
                <th>Team</th>
                <th>Internal Routes</th>
                <th>Standalone Link</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong style={{ color: '#6366f1' }}>Host Application</strong></td>
                <td><code>:3000</code></td>
                <td>Platform Team</td>
                <td><code>/</code>, <code>/dashboard/*</code>, <code>/orders/*</code>, <code>/docs</code></td>
                <td><span className="mfe-badge mfe-badge-neutral">Shell</span></td>
              </tr>
              <tr>
                <td><strong style={{ color: '#10b981' }}>Dashboard Remote</strong></td>
                <td><code>:3001</code></td>
                <td>Team Alpha</td>
                <td><code>/</code></td>
                <td>
                  <a href="http://localhost:3001" target="_blank" rel="noreferrer" className="mfe-btn mfe-btn-secondary mfe-btn-sm">
                    Open :3001 ↗
                  </a>
                </td>
              </tr>
              <tr>
                <td><strong style={{ color: '#a855f7' }}>Orders Remote</strong></td>
                <td><code>:3002</code></td>
                <td>Team Beta</td>
                <td><code>/</code>, <code>/create</code>, <code>/view/:id</code></td>
                <td>
                  <a href="http://localhost:3002" target="_blank" rel="noreferrer" className="mfe-btn mfe-btn-secondary mfe-btn-sm">
                    Open :3002 ↗
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};