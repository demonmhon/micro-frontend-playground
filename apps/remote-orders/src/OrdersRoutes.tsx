import React, { useState } from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { useLocale } from './context/MfeContext';
import { getOrdersTranslations } from './locales';
import { eventBus, OrderPayload } from './eventBus';
import './mfe-styles.css';

const INITIAL_ORDERS: OrderPayload[] = [
  { orderId: 'ORD-1001', customer: 'Sarah Connor', items: 'Cybernetic Sensors (x2)', amount: 249.99, status: 'delivered', timestamp: Date.now() - 600000 },
  { orderId: 'ORD-1002', customer: 'Bruce Wayne', items: 'Graphite Armor Plating', amount: 890.00, status: 'shipped', timestamp: Date.now() - 1500000 },
  { orderId: 'ORD-1003', customer: 'Peter Parker', items: 'Synthetic Web Fluid (x4)', amount: 64.50, status: 'processing', timestamp: Date.now() - 2400000 }
];

const SAMPLE_CUSTOMERS = [
  { name: 'Diana Prince', item: 'Aegis Shield Polish', amount: 125.00 },
  { name: 'Tony Stark', item: 'Arc Reactor Micro-Capacitors', amount: 540.00 },
  { name: 'Clark Kent', item: 'Lead-Lined Storage Cask', amount: 89.90 },
  { name: 'Barry Allen', item: 'Tachyon Stabilizer Fluid', amount: 310.00 }
];

// --- 1. Orders List Component ---
function OrdersList({
  orders,
  onQuickCreate,
  onSimulateCrash
}: {
  orders: OrderPayload[];
  onQuickCreate: () => void;
  onSimulateCrash: () => void;
}) {
  const navigate = useNavigate();
  const { locale } = useLocale();
  const t = getOrdersTranslations(locale);

  const currencySymbol = t.currencySymbol;
  const formatAmount = (usdAmount: number) => {
    if (locale === 'th') {
      return `${currencySymbol}${(usdAmount * 35).toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `${currencySymbol}${usdAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const getStatusLabel = (status: OrderPayload['status']) => {
    return t.statuses[status] || status;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Action Header */}
      <div className="mfe-flex-between">
        <div>
          <div className="mfe-flex-gap">
            <h2 style={{ fontSize: '18px', fontWeight: 700 }}>{t.list.title}</h2>
            <span className="mfe-badge mfe-badge-purple">
              <span className="mfe-badge-dot"></span>
              {t.list.portBadge}
            </span>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            {t.list.subRoutes}
          </p>
        </div>

        <div className="mfe-flex-gap">
          <button
            type="button"
            className="mfe-btn mfe-btn-primary mfe-btn-sm"
            onClick={() => navigate('create')}
          >
            {t.list.btnNewOrder}
          </button>
          <button
            type="button"
            className="mfe-btn mfe-btn-secondary mfe-btn-sm"
            onClick={onQuickCreate}
            title="Emit instant cross-MFE event"
          >
            {t.list.btnQuickOrder}
          </button>
          <button
            type="button"
            className="mfe-btn mfe-btn-danger mfe-btn-sm"
            onClick={onSimulateCrash}
            title="Test Fault Isolation"
          >
            {t.list.btnOutage}
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="mfe-card" style={{ padding: 0 }}>
        <div className="mfe-table-container" style={{ border: 'none' }}>
          <table className="mfe-table">
            <thead>
              <tr>
                <th>{t.list.table.orderId}</th>
                <th>{t.list.table.customer}</th>
                <th>{t.list.table.items}</th>
                <th>{t.list.table.total}</th>
                <th>{t.list.table.status}</th>
                <th>{t.list.table.action}</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.orderId}>
                  <td>
                    <code style={{ color: 'var(--color-primary)', fontWeight: 600 }}>{o.orderId}</code>
                  </td>
                  <td style={{ fontWeight: 600 }}>{o.customer}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{o.items}</td>
                  <td style={{ fontWeight: 700, color: '#34d399' }}>{formatAmount(o.amount)}</td>
                  <td>
                    <span
                      className={`mfe-badge ${
                        o.status === 'delivered'
                          ? 'mfe-badge-success'
                          : o.status === 'shipped'
                          ? 'mfe-badge-info'
                          : 'mfe-badge-warning'
                      }`}
                    >
                      <span className="mfe-badge-dot"></span>
                      {getStatusLabel(o.status)}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="mfe-btn mfe-btn-outline mfe-btn-sm"
                      onClick={() => navigate(`view/${o.orderId}`)}
                    >
                      {t.list.table.viewDetails}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// --- 2. Create Order Component (/orders/create) ---
function CreateOrder({ onAddOrder }: { onAddOrder: (order: OrderPayload) => void }) {
  const navigate = useNavigate();
  const { locale } = useLocale();
  const t = getOrdersTranslations(locale);

  const [customer, setCustomer] = useState('');
  const [items, setItems] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState<'processing' | 'shipped' | 'delivered'>('processing');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.trim() || !items.trim() || !amount) return;

    const rawAmount = parseFloat(amount);
    // Standardize to USD if input is in THB
    const normalizedAmount = locale === 'th' ? rawAmount / 35 : rawAmount;

    const newOrder: OrderPayload = {
      orderId: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customer: customer.trim(),
      items: items.trim(),
      amount: normalizedAmount,
      status,
      timestamp: Date.now()
    };

    onAddOrder(newOrder);
    navigate(`../view/${newOrder.orderId}`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
      <div className="mfe-flex-between">
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 700 }}>{t.create.title}</h2>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{t.create.internalRoute}</p>
        </div>
        <button
          type="button"
          className="mfe-btn mfe-btn-secondary mfe-btn-sm"
          onClick={() => navigate('..')}
        >
          {t.create.backBtn}
        </button>
      </div>

      <div className="mfe-card">
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="mfe-form-group">
            <label className="mfe-label">{t.create.customerLabel}</label>
            <input
              type="text"
              className="mfe-input"
              placeholder={t.create.customerPlaceholder}
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              required
            />
          </div>

          <div className="mfe-form-group">
            <label className="mfe-label">{t.create.itemsLabel}</label>
            <input
              type="text"
              className="mfe-input"
              placeholder={t.create.itemsPlaceholder}
              value={items}
              onChange={(e) => setItems(e.target.value)}
              required
            />
          </div>

          <div className="mfe-grid-2">
            <div className="mfe-form-group">
              <label className="mfe-label">{t.create.amountLabel}</label>
              <input
                type="number"
                step="0.01"
                min="1"
                className="mfe-input"
                placeholder={locale === 'th' ? '15000.00' : '499.00'}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>

            <div className="mfe-form-group">
              <label className="mfe-label">{t.create.statusLabel}</label>
              <select
                className="mfe-select"
                value={status}
                onChange={(e) => setStatus(e.target.value as OrderPayload['status'])}
              >
                <option value="processing">{t.statuses.processing}</option>
                <option value="shipped">{t.statuses.shipped}</option>
                <option value="delivered">{t.statuses.delivered}</option>
              </select>
            </div>
          </div>

          <div className="mfe-flex-gap" style={{ marginTop: '8px' }}>
            <button type="submit" className="mfe-btn mfe-btn-primary">
              {t.create.submitBtn}
            </button>
            <button
              type="button"
              className="mfe-btn mfe-btn-secondary"
              onClick={() => navigate('..')}
            >
              {t.create.cancelBtn}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// --- 3. Order Details Component (/orders/view/:orderId) ---
function OrderDetails({ orders }: { orders: OrderPayload[] }) {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const { locale } = useLocale();
  const t = getOrdersTranslations(locale);

  const order = orders.find((o) => o.orderId === orderId);

  if (!order) {
    return (
      <div className="mfe-card" style={{ textAlign: 'center', padding: '40px 20px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#f87171' }}>{t.details.notFoundTitle}</h3>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '8px 0 16px' }}>
          {t.details.notFoundMsg} <code>{orderId}</code>
        </p>
        <button
          type="button"
          className="mfe-btn mfe-btn-secondary mfe-btn-sm"
          onClick={() => navigate('..')}
        >
          {t.details.backBtn}
        </button>
      </div>
    );
  }

  const currencySymbol = t.currencySymbol;
  const displayAmount = locale === 'th'
    ? `${currencySymbol}${(order.amount * 35).toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : `${currencySymbol}${order.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const getStatusLabel = (status: OrderPayload['status']) => {
    return t.statuses[status] || status;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '650px' }}>
      <div className="mfe-flex-between">
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 700 }}>{t.details.titlePrefix} {order.orderId}</h2>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{t.details.internalRoute}{order.orderId}</p>
        </div>
        <button
          type="button"
          className="mfe-btn mfe-btn-secondary mfe-btn-sm"
          onClick={() => navigate('..')}
        >
          {t.details.backBtn}
        </button>
      </div>

      <div className="mfe-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div className="mfe-flex-between" style={{ paddingBottom: '12px', borderBottom: '1px solid var(--border-color)' }}>
          <div>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{t.details.customer}</span>
            <div style={{ fontSize: '16px', fontWeight: 700 }}>{order.customer}</div>
          </div>
          <span
            className={`mfe-badge ${
              order.status === 'delivered'
                ? 'mfe-badge-success'
                : order.status === 'shipped'
                ? 'mfe-badge-info'
                : 'mfe-badge-warning'
            }`}
          >
            <span className="mfe-badge-dot"></span>
            {getStatusLabel(order.status)}
          </span>
        </div>

        <div className="mfe-grid-2">
          <div>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{t.details.items}</span>
            <div style={{ fontSize: '14px', fontWeight: 600, marginTop: '2px' }}>{order.items}</div>
          </div>
          <div>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{t.details.totalAmount}</span>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#34d399', marginTop: '2px' }}>
              {displayAmount}
            </div>
          </div>
        </div>

        <div style={{ fontSize: '12px', color: 'var(--text-muted)', paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
          {t.details.created} {new Date(order.timestamp).toLocaleString(locale === 'th' ? 'th-TH' : 'en-US')} &bull; {t.details.dispatchedNote}
        </div>
      </div>
    </div>
  );
}

// --- Main Remote Router ---
export default function OrdersRoutes() {
  const [orders, setOrders] = useState<OrderPayload[]>(INITIAL_ORDERS);
  const [shouldCrash, setShouldCrash] = useState(false);
  const { locale } = useLocale();
  const t = getOrdersTranslations(locale);

  // Fault isolation simulation
  if (shouldCrash) {
    throw new Error(t.outageError);
  }

  const handleAddOrder = (newOrder: OrderPayload) => {
    setOrders((prev) => [newOrder, ...prev]);
    // Dispatch Cross-MFE Event
    eventBus.emitOrder(newOrder);
  };

  const handleQuickCreate = () => {
    const sample = SAMPLE_CUSTOMERS[Math.floor(Math.random() * SAMPLE_CUSTOMERS.length)];
    const newOrder: OrderPayload = {
      orderId: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customer: sample.name,
      items: sample.item,
      amount: sample.amount,
      status: 'processing',
      timestamp: Date.now()
    };
    handleAddOrder(newOrder);
  };

  return (
    <div className="mfe-boundary mfe-boundary-orders" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <span className="mfe-boundary-tag mfe-tag-orders">{t.tag}</span>

      <Routes>
        <Route index element={<OrdersList orders={orders} onQuickCreate={handleQuickCreate} onSimulateCrash={() => setShouldCrash(true)} />} />
        <Route path="create" element={<CreateOrder onAddOrder={handleAddOrder} />} />
        <Route path="view/:orderId" element={<OrderDetails orders={orders} />} />
      </Routes>
    </div>
  );
}