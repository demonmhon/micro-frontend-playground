import { SupportedLocale } from '../context/MfeContext';

export const ordersTranslations = {
  en: {
    tag: 'Team Beta: Orders Remote (:3002)',
    currencySymbol: '$',
    list: {
      title: 'Orders List',
      portBadge: 'Port 3002',
      subRoutes: 'Internal MFE Routing: /orders • /orders/create • /orders/view/:id',
      btnNewOrder: '➕ New Order Form',
      btnQuickOrder: '⚡ 1-Click Order',
      btnOutage: '💥 Simulate Outage',
      table: {
        orderId: 'Order ID',
        customer: 'Customer',
        items: 'Purchased Items',
        total: 'Total',
        status: 'Status',
        action: 'Action',
        viewDetails: 'View Details ↗'
      }
    },
    statuses: {
      processing: 'processing',
      shipped: 'shipped',
      delivered: 'delivered'
    },
    create: {
      title: 'Create New Order',
      internalRoute: 'Internal Route: /orders/create',
      backBtn: '← Back to Orders',
      customerLabel: 'Customer Name',
      customerPlaceholder: 'e.g. Tony Stark',
      itemsLabel: 'Purchased Items',
      itemsPlaceholder: 'e.g. Titanium Flight Thrusters (x2)',
      amountLabel: 'Amount ($ USD)',
      statusLabel: 'Initial Status',
      submitBtn: '🚀 Submit Order & Broadcast Event',
      cancelBtn: 'Cancel'
    },
    details: {
      titlePrefix: 'Order Details:',
      internalRoute: 'Internal Route: /orders/view/',
      notFoundTitle: 'Order Not Found',
      notFoundMsg: 'No order exists with ID:',
      backBtn: '← Back to Orders List',
      customer: 'Customer',
      items: 'Purchased Items',
      totalAmount: 'Total Amount',
      created: 'Created:',
      dispatchedNote: 'Dispatched via MFE Event Bus'
    },
    outageError: 'Simulated outage in Orders Remote (Port 3002) to verify Host ErrorBoundary.'
  },
  th: {
    tag: 'ทีมบีต้า: จัดการคำสั่งซื้อ MFE (:3002)',
    currencySymbol: '฿',
    list: {
      title: 'รายการคำสั่งซื้อ',
      portBadge: 'พอร์ต 3002',
      subRoutes: 'การกำหนดเส้นทางภายใน MFE: /orders • /orders/create • /orders/view/:id',
      btnNewOrder: '➕ ฟอร์มสั่งซื้อใหม่',
      btnQuickOrder: '⚡ สั่งซื้อด่วน 1 คลิก',
      btnOutage: '💥 จำลองระบบล่ม',
      table: {
        orderId: 'รหัสคำสั่งซื้อ',
        customer: 'ชื่อลูกค้า',
        items: 'รายการสินค้า',
        total: 'ยอดเงินรวม',
        status: 'สถานะ',
        action: 'การกระทำ',
        viewDetails: 'ดูรายละเอียด ↗'
      }
    },
    statuses: {
      processing: 'กำลังดำเนินการ',
      shipped: 'จัดส่งแล้ว',
      delivered: 'ส่งมอบสำเร็จ'
    },
    create: {
      title: 'สร้างคำสั่งซื้อใหม่',
      internalRoute: 'เส้นทางภายใน: /orders/create',
      backBtn: '← กลับสู่หน้ารายการ',
      customerLabel: 'ชื่อลูกค้า',
      customerPlaceholder: 'เช่น คุณสมชาย นามสมมุติ',
      itemsLabel: 'รายการสินค้าที่สั่งซื้อ',
      itemsPlaceholder: 'เช่น โมดูลเซ็นเซอร์ความเร็วสูง (x2)',
      amountLabel: 'จำนวนเงิน (฿ THB)',
      statusLabel: 'สถานะเริ่มต้น',
      submitBtn: '🚀 บันทึกคำสั่งซื้อ & ส่งสัญญาณอีเวนต์',
      cancelBtn: 'ยกเลิก'
    },
    details: {
      titlePrefix: 'รายละเอียดคำสั่งซื้อ:',
      internalRoute: 'เส้นทางภายใน: /orders/view/',
      notFoundTitle: 'ไม่พบข้อมูลคำสั่งซื้อ',
      notFoundMsg: 'ไม่พบคำสั่งซื้อหมายเลข:',
      backBtn: '← กลับสู่รายการคำสั่งซื้อ',
      customer: 'ชื่อลูกค้า',
      items: 'รายการสินค้า',
      totalAmount: 'ยอดเงินสุทธิ',
      created: 'วันที่สร้าง:',
      dispatchedNote: 'ส่งข้อมูลผ่าน MFE Event Bus'
    },
    outageError: 'จำลองการหยุดทำงานใน Orders Remote (พอร์ต 3002) เพื่อทดสอบ ErrorBoundary ของ Host'
  }
};

export const getOrdersTranslations = (locale: SupportedLocale) =>
  ordersTranslations[locale] || ordersTranslations.en;
