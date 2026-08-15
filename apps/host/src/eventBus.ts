export interface OrderPayload {
  orderId: string;
  customer: string;
  items: string;
  amount: number;
  status: 'processing' | 'shipped' | 'delivered';
  timestamp: number;
}

export interface NotificationPayload {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'danger';
  timestamp: number;
}

export const eventBus = {
  emitOrder(payload: OrderPayload) {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('mfe:order:created', { detail: payload }));
    }
  },
  onOrder(handler: (payload: OrderPayload) => void) {
    if (typeof window === 'undefined') return () => {};
    const listener = (e: Event) => handler((e as CustomEvent<OrderPayload>).detail);
    window.addEventListener('mfe:order:created', listener);
    return () => window.removeEventListener('mfe:order:created', listener);
  },
  emitNotification(payload: NotificationPayload) {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('mfe:notification:new', { detail: payload }));
    }
  },
  onNotification(handler: (payload: NotificationPayload) => void) {
    if (typeof window === 'undefined') return () => {};
    const listener = (e: Event) => handler((e as CustomEvent<NotificationPayload>).detail);
    window.addEventListener('mfe:notification:new', listener);
    return () => window.removeEventListener('mfe:notification:new', listener);
  }
};