import React, { useState } from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Action Header */}
      <div className="mfe-flex-between">
        <div>
          <div className="mfe-flex-gap">
            <h2 style={{ fontSize: '18px', fontWeight: 700 }}>Orders List</h2>
            <span className="mfe-badge mfe-badge-purple">
              <span className="mfe-badge-dot"></span>
              Port 3002
            </span>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Internal MFE Routing: <code>/orders</code> &bull; <code>/orders/create</code> &bull; <code>/orders/view/:id</code>
          </p>
        </div>

        <div className="mfe-flex-gap">
          <button
            type="button"
            className="mfe-btn mfe-btn-primary mfe-btn-sm"
            onClick={() => navigate('create')}
          >
            ➕ New Order Form
          </button>
          <button
            type="button"
            className="mfe-btn mfe-btn-secondary mfe-btn-sm"
            onClick={onQuickCreate}
            title="Emit instant cross-MFE event"
          >
            ⚡ 1-Click Order
          </button>
          <button
            type="button"
            className="mfe-btn mfe-btn-danger mfe-btn-sm"
            onClick={onSimulateCrash}
            title="Test Fault Isolation"
          >
            💥 Simulate Outage
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="mfe-card" style={{ padding: 0 }}>
        <div className="mfe-table-container" style={{ border: 'none' }}>
          <table className="mfe-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Purchased Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
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
                  <td style={{ fontWeight: 700, color: '#34d399' }}>${o.amount.toFixed(2)}</td>
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
                      {o.status}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="mfe-btn mfe-btn-outline mfe-btn-sm"
                      onClick={() => navigate(`view/${o.orderId}`)}
                    >
                      View Details ↗
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
  const [customer, setCustomer] = useState('');
  const [items, setItems] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState<'processing' | 'shipped' | 'delivered'>('processing');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.trim() || !items.trim() || !amount) return;

    const newOrder: OrderPayload = {
      orderId: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customer: customer.trim(),
      items: items.trim(),
      amount: parseFloat(amount),
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
          <h2 style={{ fontSize: '18px', fontWeight: 700 }}>Create New Order</h2>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Internal Route: <code>/orders/create</code></p>
        </div>
        <button
          type="button"
          className="mfe-btn mfe-btn-secondary mfe-btn-sm"
          onClick={() => navigate('..')}
        >
          ← Back to Orders
        </button>
      </div>

      <div className="mfe-card">
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="mfe-form-group">
            <label className="mfe-label">Customer Name</label>
            <input
              type="text"
              className="mfe-input"
              placeholder="e.g. Tony Stark"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              required
            />
          </div>

          <div className="mfe-form-group">
            <label className="mfe-label">Purchased Items</label>
            <input
              type="text"
              className="mfe-input"
              placeholder="e.g. Titanium Flight Thrusters (x2)"
              value={items}
              onChange={(e) => setItems(e.target.value)}
              required
            />
          </div>

          <div className="mfe-grid-2">
            <div className="mfe-form-group">
              <label className="mfe-label">Amount ($ USD)</label>
              <input
                type="number"
                step="0.01"
                min="1"
                className="mfe-input"
                placeholder="499.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>

            <div className="mfe-form-group">
              <label className="mfe-label">Initial Status</label>
              <select
                className="mfe-select"
                value={status}
                onChange={(e) => setStatus(e.target.value as OrderPayload['status'])}
              >
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
          </div>

          <div className="mfe-flex-gap" style={{ marginTop: '8px' }}>
            <button type="submit" className="mfe-btn mfe-btn-primary">
              🚀 Submit Order & Broadcast Event
            </button>
            <button
              type="button"
              className="mfe-btn mfe-btn-secondary"
              onClick={() => navigate('..')}
            >
              Cancel
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

  const order = orders.find((o) => o.orderId === orderId);

  if (!order) {
    return (
      <div className="mfe-card" style={{ textAlign: 'center', padding: '40px 20px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#f87171' }}>Order Not Found</h3>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '8px 0 16px' }}>
          No order exists with ID: <code>{orderId}</code>
        </p>
        <button
          type="button"
          className="mfe-btn mfe-btn-secondary mfe-btn-sm"
          onClick={() => navigate('..')}
        >
          ← Back to Orders List
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '650px' }}>
      <div className="mfe-flex-between">
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 700 }}>Order Details: {order.orderId}</h2>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Internal Route: <code>/orders/view/{order.orderId}</code></p>
        </div>
        <button
          type="button"
          className="mfe-btn mfe-btn-secondary mfe-btn-sm"
          onClick={() => navigate('..')}
        >
          ← Back to Orders List
        </button>
      </div>

      <div className="mfe-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div className="mfe-flex-between" style={{ paddingBottom: '12px', borderBottom: '1px solid var(--border-color)' }}>
          <div>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Customer</span>
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
            {order.status}
          </span>
        </div>

        <div className="mfe-grid-2">
          <div>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Purchased Items</span>
            <div style={{ fontSize: '14px', fontWeight: 600, marginTop: '2px' }}>{order.items}</div>
          </div>
          <div>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Total Amount</span>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#34d399', marginTop: '2px' }}>
              ${order.amount.toFixed(2)}
            </div>
          </div>
        </div>

        <div style={{ fontSize: '12px', color: 'var(--text-muted)', paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
          Created: {new Date(order.timestamp).toLocaleString()} &bull; Dispatched via MFE Event Bus
        </div>
      </div>
    </div>
  );
}

// --- Main Remote Router ---
export default function OrdersRoutes() {
  const [orders, setOrders] = useState<OrderPayload[]>(INITIAL_ORDERS);
  const [shouldCrash, setShouldCrash] = useState(false);

  // Fault isolation simulation
  if (shouldCrash) {
    throw new Error('Simulated outage in Orders Remote (Port 3002) to verify Host ErrorBoundary.');
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
      <span className="mfe-boundary-tag mfe-tag-orders">Team Beta: Orders Remote (:3002)</span>

      <Routes>
        <Route index element={<OrdersList orders={orders} onQuickCreate={handleQuickCreate} onSimulateCrash={() => setShouldCrash(true)} />} />
        <Route path="create" element={<CreateOrder onAddOrder={handleAddOrder} />} />
        <Route path="view/:orderId" element={<OrderDetails orders={orders} />} />
      </Routes>
    </div>
  );
}