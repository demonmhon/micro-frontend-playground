import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { eventBus, NotificationPayload } from '../eventBus';

export interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [inspectMode, setInspectMode] = useState(false);
  const [notifications, setNotifications] = useState<NotificationPayload[]>([
    {
      id: 'init-1',
      title: 'Host Shell Initialized',
      message: 'Connected to Module Federation runtime on port 3000',
      type: 'info',
      timestamp: Date.now()
    }
  ]);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [latestEventMsg, setLatestEventMsg] = useState<string>('Listening for real-time cross-MFE events...');

  const toggleInspectMode = () => {
    const next = !inspectMode;
    setInspectMode(next);
    if (next) {
      document.body.classList.add('inspect-mfe-mode');
    } else {
      document.body.classList.remove('inspect-mfe-mode');
    }
  };

  useEffect(() => {
    const unsubscribeOrder = eventBus.onOrder((order) => {
      const newNotif: NotificationPayload = {
        id: `ord-${order.orderId}-${Date.now()}`,
        title: `New Order: #${order.orderId}`,
        message: `${order.customer} placed order for $${order.amount.toFixed(2)} (${order.items})`,
        type: 'success',
        timestamp: Date.now()
      };
      setNotifications((prev) => [newNotif, ...prev]);
      setLatestEventMsg(`⚡ [mfe:order:created] Remote Orders (:3002) -> ${order.customer} ($${order.amount.toFixed(2)})`);
    });

    const unsubscribeCustomNotif = eventBus.onNotification((notif) => {
      setNotifications((prev) => [notif, ...prev]);
      setLatestEventMsg(`📢 [mfe:notification:new] ${notif.title}`);
    });

    return () => {
      unsubscribeOrder();
      unsubscribeCustomNotif();
    };
  }, []);

  const handleSimulateHostBroadcast = () => {
    eventBus.emitNotification({
      id: `host-${Date.now()}`,
      title: 'Broadcast from Host Shell',
      message: 'Host Shell (:3000) broadcasted an event across all federated remotes.',
      type: 'info',
      timestamp: Date.now()
    });
  };

  return (
    <div className="mfe-boundary mfe-boundary-host app-shell-container">
      <span className="mfe-boundary-tag mfe-tag-host">Host Shell (:3000)</span>

      {/* Header */}
      <header className="shell-header">
        <div className="header-left">
          <NavLink to="/" className="header-brand">
            <span className="brand-icon">⚡</span>
            <div className="brand-text">
              <span className="brand-title">MFE Playground</span>
              <span className="brand-subtitle">Vite + Module Federation</span>
            </div>
          </NavLink>

          <nav className="header-nav">
            <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Overview
            </NavLink>
            <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <span className="nav-dot" style={{ backgroundColor: '#10b981' }}></span>
              Dashboard (:3001)
            </NavLink>
            <NavLink to="/orders" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <span className="nav-dot" style={{ backgroundColor: '#a855f7' }}></span>
              Orders (:3002)
            </NavLink>
            <NavLink to="/docs" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Architecture Docs
            </NavLink>
          </nav>
        </div>

        <div className="header-right">
          {/* Inspect MFE Toggle */}
          <button
            type="button"
            className={`mfe-btn ${inspectMode ? 'mfe-btn-primary' : 'mfe-btn-secondary'} mfe-btn-sm`}
            onClick={toggleInspectMode}
            title="Toggle visual boundary boxes"
          >
            {inspectMode ? '🔍 Inspect Active' : '🔍 Inspect MFEs'}
          </button>

          {/* Test Event Button */}
          <button
            type="button"
            className="mfe-btn mfe-btn-secondary mfe-btn-sm"
            onClick={handleSimulateHostBroadcast}
            title="Dispatch test event"
          >
            📡 Emit Event
          </button>

          {/* Notification Bell */}
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              className="mfe-btn mfe-btn-secondary mfe-btn-sm"
              onClick={() => setShowNotifMenu(!showNotifMenu)}
              style={{ position: 'relative' }}
            >
              🔔 <span className="notif-count-pill">{notifications.length}</span>
            </button>

            {showNotifMenu && (
              <div className="notif-dropdown mfe-card">
                <div className="mfe-flex-between" style={{ paddingBottom: '10px', borderBottom: '1px solid var(--border-color)' }}>
                  <strong>Event Stream ({notifications.length})</strong>
                  <button
                    type="button"
                    className="mfe-btn mfe-btn-outline mfe-btn-sm"
                    onClick={() => setNotifications([])}
                  >
                    Clear
                  </button>
                </div>
                <div className="notif-list">
                  {notifications.map((n) => (
                    <div key={n.id} className="notif-item">
                      <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--text-primary)' }}>{n.title}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>{n.message}</div>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>
                        {new Date(n.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Area */}
      <main className="shell-main">
        {children}
      </main>

      {/* Bottom Live Event Ticker */}
      <footer className="shell-event-bar">
        <div className="event-bar-label">
          <span className="live-pulse"></span>
          <span>Cross-MFE Bus:</span>
        </div>
        <div className="event-bar-content">{latestEventMsg}</div>
        <div className="event-bar-ports">
          <span className="port-tag" style={{ color: '#6366f1' }}>Host :3000</span>
          <span className="port-tag" style={{ color: '#10b981' }}>Team Alpha :3001</span>
          <span className="port-tag" style={{ color: '#a855f7' }}>Team Beta :3002</span>
        </div>
      </footer>
    </div>
  );
};