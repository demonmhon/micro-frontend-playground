import React, { useState, useEffect } from 'react';
import { eventBus, OrderPayload } from './eventBus';
import './mfe-styles.css';

interface ActivityItem {
  id: string;
  text: string;
  time: string;
  type: 'order' | 'system';
}

export default function DashboardRoutes() {
  const [revenue, setRevenue] = useState(148250);
  const [ordersCount, setOrdersCount] = useState(1284);
  const [activeUsers, setActiveUsers] = useState(3420);
  const [activities, setActivities] = useState<ActivityItem[]>([
    { id: '1', text: 'System connected to Module Federation runtime', time: 'Just now', type: 'system' }
  ]);
  const [shouldCrash, setShouldCrash] = useState(false);

  // Demonstrate Fault Isolation / Error Boundary
  if (shouldCrash) {
    throw new Error('Simulated outage in Dashboard Remote (Port 3001) to verify Host ErrorBoundary.');
  }

  // Subscribe to Cross-MFE Events
  useEffect(() => {
    const unsubscribe = eventBus.onOrder((payload: OrderPayload) => {
      setRevenue((prev) => prev + payload.amount);
      setOrdersCount((prev) => prev + 1);
      setActivities((prev) => [
        {
          id: `act-${Date.now()}`,
          text: `⚡ Event Received: ${payload.customer} placed order #${payload.orderId} (+$${payload.amount.toFixed(2)})`,
          time: new Date().toLocaleTimeString(),
          type: 'order'
        },
        ...prev.slice(0, 4)
      ]);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="mfe-boundary mfe-boundary-dashboard" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <span className="mfe-boundary-tag mfe-tag-dashboard">Team Alpha: Dashboard Remote (:3001)</span>

      {/* Header Bar */}
      <div className="mfe-flex-between" style={{ paddingBottom: '12px', borderBottom: '1px solid var(--border-color)' }}>
        <div>
          <div className="mfe-flex-gap">
            <h2 style={{ fontSize: '18px', fontWeight: 700 }}>Analytics & Overview</h2>
            <span className="mfe-badge mfe-badge-success">
              <span className="mfe-badge-dot"></span>
              Port 3001 Live
            </span>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Maintained autonomously by <strong>Team Alpha</strong>. Listens to real-time events across the MFE network.
          </p>
        </div>

        <div className="mfe-flex-gap">
          <button
            type="button"
            className="mfe-btn mfe-btn-secondary mfe-btn-sm"
            onClick={() => setActiveUsers((prev) => prev + 25)}
            title="Local Remote State Update"
          >
            👥 +25 Users
          </button>
          <button
            type="button"
            className="mfe-btn mfe-btn-danger mfe-btn-sm"
            onClick={() => setShouldCrash(true)}
            title="Test Fault Isolation"
          >
            💥 Simulate Outage
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="mfe-grid-3">
        <div className="mfe-stat-card">
          <div className="mfe-stat-header">
            <span className="mfe-stat-title">Total Revenue</span>
            <span className="mfe-stat-icon">💰</span>
          </div>
          <div className="mfe-stat-value" style={{ color: '#34d399' }}>
            ${revenue.toLocaleString()}
          </div>
          <div className="mfe-stat-sub">⚡ Live updates on cross-app orders</div>
        </div>

        <div className="mfe-stat-card">
          <div className="mfe-stat-header">
            <span className="mfe-stat-title">Processed Orders</span>
            <span className="mfe-stat-icon">📦</span>
          </div>
          <div className="mfe-stat-value" style={{ color: '#38bdf8' }}>
            {ordersCount.toLocaleString()}
          </div>
          <div className="mfe-stat-sub">Synced via window EventBus</div>
        </div>

        <div className="mfe-stat-card">
          <div className="mfe-stat-header">
            <span className="mfe-stat-title">Active Users</span>
            <span className="mfe-stat-icon">🚀</span>
          </div>
          <div className="mfe-stat-value" style={{ color: '#c084fc' }}>
            {activeUsers.toLocaleString()}
          </div>
          <div className="mfe-stat-sub">Autonomous local state</div>
        </div>
      </div>

      {/* Real-Time Activity Feed */}
      <div className="mfe-card">
        <div className="mfe-card-header">
          <div>
            <div className="mfe-card-title">📡 Live Activity Feed (Event Subscriber)</div>
            <div className="mfe-card-subtitle">Subscribed to <code>mfe:order:created</code> events dispatched by Remote Orders (:3002)</div>
          </div>
          <span className="mfe-badge mfe-badge-info">Real-time</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {activities.map((act) => (
            <div
              key={act.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 14px',
                background: act.type === 'order' ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                border: act.type === 'order' ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid var(--border-color)',
                borderRadius: '8px',
                fontSize: '13px'
              }}
            >
              <span>{act.text}</span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{act.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}