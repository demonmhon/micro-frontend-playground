import React, { useState, useEffect } from 'react';
import { useLocale, useMfeConfig } from './context/MfeContext';
import { getDashboardTranslations } from './locales';
import { eventBus, OrderPayload } from './eventBus';
import './mfe-styles.css';

interface ActivityItem {
  id: string;
  text: string;
  time: string;
  type: 'order' | 'system';
}

export default function DashboardRoutes() {
  const { locale } = useLocale();
  const { config } = useMfeConfig();
  const t = getDashboardTranslations(locale);

  const [revenue, setRevenue] = useState(148250);
  const [ordersCount, setOrdersCount] = useState(1284);
  const [activeUsers, setActiveUsers] = useState(3420);
  const [activities, setActivities] = useState<ActivityItem[]>([
    { id: '1', text: t.feed.initItem, time: t.feed.justNow, type: 'system' }
  ]);
  const [shouldCrash, setShouldCrash] = useState(false);

  // Demonstrate Fault Isolation / Error Boundary
  if (shouldCrash) {
    throw new Error(t.outageError);
  }

  // Subscribe to Cross-MFE Events
  useEffect(() => {
    const unsubscribe = eventBus.onOrder((payload: OrderPayload) => {
      setRevenue((prev) => prev + payload.amount);
      setOrdersCount((prev) => prev + 1);
      setActivities((prev) => [
        {
          id: `act-${Date.now()}`,
          text: `${t.feed.eventReceived} ${payload.customer} ${t.feed.placedOrder} #${payload.orderId} (+${locale === 'th' ? '฿' : '$'}${payload.amount.toFixed(2)})`,
          time: new Date().toLocaleTimeString(locale === 'th' ? 'th-TH' : 'en-US'),
          type: 'order'
        },
        ...prev.slice(0, 4)
      ]);
    });

    return () => unsubscribe();
  }, [t, locale]);

  const currencyPrefix = locale === 'th' ? '฿' : '$';
  const displayRevenue = locale === 'th' ? revenue * 35 : revenue;

  return (
    <div className="mfe-boundary mfe-boundary-dashboard" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <span className="mfe-boundary-tag mfe-tag-dashboard">{t.tag}</span>

      {/* Header Bar */}
      <div className="mfe-flex-between" style={{ paddingBottom: '12px', borderBottom: '1px solid var(--border-color)' }}>
        <div>
          <div className="mfe-flex-gap" style={{ flexWrap: 'wrap' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700 }}>{t.title}</h2>
            <span className="mfe-badge mfe-badge-success">
              <span className="mfe-badge-dot"></span>
              {t.statusLive}
            </span>
            <span className="mfe-badge mfe-badge-neutral" style={{ fontSize: '11px' }}>
              <span className="mfe-badge-dot"></span>
              {t.config.endpointLabel} <code>{config.apiBaseUrl}/analytics</code> ({config.mockMode ? t.config.mockActive : t.config.liveActive})
            </span>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            {t.subtitle}
          </p>
        </div>

        <div className="mfe-flex-gap">
          <button
            type="button"
            className="mfe-btn mfe-btn-secondary mfe-btn-sm"
            onClick={() => setActiveUsers((prev) => prev + 25)}
            title="Local Remote State Update"
          >
            {t.btnUsers}
          </button>
          <button
            type="button"
            className="mfe-btn mfe-btn-danger mfe-btn-sm"
            onClick={() => setShouldCrash(true)}
            title="Test Fault Isolation"
          >
            {t.btnOutage}
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="mfe-grid-3">
        <div className="mfe-stat-card">
          <div className="mfe-stat-header">
            <span className="mfe-stat-title">{t.stats.revenueTitle}</span>
            <span className="mfe-stat-icon">💰</span>
          </div>
          <div className="mfe-stat-value" style={{ color: '#34d399' }}>
            {currencyPrefix}{displayRevenue.toLocaleString(locale === 'th' ? 'th-TH' : 'en-US')}
          </div>
          <div className="mfe-stat-sub">{t.stats.revenueSub}</div>
        </div>

        <div className="mfe-stat-card">
          <div className="mfe-stat-header">
            <span className="mfe-stat-title">{t.stats.ordersTitle}</span>
            <span className="mfe-stat-icon">📦</span>
          </div>
          <div className="mfe-stat-value" style={{ color: '#38bdf8' }}>
            {ordersCount.toLocaleString(locale === 'th' ? 'th-TH' : 'en-US')}
          </div>
          <div className="mfe-stat-sub">{t.stats.ordersSub}</div>
        </div>

        <div className="mfe-stat-card">
          <div className="mfe-stat-header">
            <span className="mfe-stat-title">{t.stats.usersTitle}</span>
            <span className="mfe-stat-icon">🚀</span>
          </div>
          <div className="mfe-stat-value" style={{ color: '#c084fc' }}>
            {activeUsers.toLocaleString(locale === 'th' ? 'th-TH' : 'en-US')}
          </div>
          <div className="mfe-stat-sub">{t.stats.usersSub}</div>
        </div>
      </div>

      {/* Real-Time Activity Feed */}
      <div className="mfe-card">
        <div className="mfe-card-header">
          <div>
            <div className="mfe-card-title">{t.feed.title}</div>
            <div className="mfe-card-subtitle">{t.feed.subtitle}</div>
          </div>
          <span className="mfe-badge mfe-badge-info">{t.feed.badge}</span>
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