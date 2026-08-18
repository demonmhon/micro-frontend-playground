import { SupportedLocale } from '../context/MfeContext';

export const dashboardTranslations = {
  en: {
    tag: 'Team Alpha: Dashboard Remote (:3001)',
    title: 'Analytics & Overview',
    statusLive: 'Port 3001 Live',
    subtitle: 'Maintained autonomously by Team Alpha. Listens to real-time events across the MFE network.',
    btnUsers: '👥 +25 Users',
    btnOutage: '💥 Simulate Outage',
    stats: {
      revenueTitle: 'Total Revenue',
      revenueSub: '⚡ Live updates on cross-app orders',
      ordersTitle: 'Processed Orders',
      ordersSub: 'Synced via window EventBus',
      usersTitle: 'Active Users',
      usersSub: 'Autonomous local state'
    },
    feed: {
      title: '📡 Live Activity Feed (Event Subscriber)',
      subtitle: 'Subscribed to mfe:order:created events dispatched by Remote Orders (:3002)',
      badge: 'Real-time',
      initItem: 'System connected to Module Federation runtime',
      eventReceived: '⚡ Event Received:',
      placedOrder: 'placed order',
      justNow: 'Just now'
    },
    outageError: 'Simulated outage in Dashboard Remote (Port 3001) to verify Host ErrorBoundary.'
  },
  th: {
    tag: 'ทีมแอลฟ่า: แดชบอร์ด MFE (:3001)',
    title: 'ข้อมูลการวิเคราะห์และภาพรวม',
    statusLive: 'พอร์ต 3001 ใช้งานได้',
    subtitle: 'ดูแลอย่างอิสระโดยทีมแอลฟ่า รับฟังอีเวนต์แบบเรียลไทม์ผ่านเครือข่าย MFE',
    btnUsers: '👥 +25 ผู้ใช้',
    btnOutage: '💥 จำลองระบบล่ม',
    stats: {
      revenueTitle: 'รายได้รวมทั้งหมด',
      revenueSub: '⚡ อัปเดตสดเมื่อมีคำสั่งซื้อข้ามแอป',
      ordersTitle: 'คำสั่งซื้อที่ดำเนินการแล้ว',
      ordersSub: 'ซิงก์ผ่าน window EventBus',
      usersTitle: 'ผู้ใช้งานที่กำลังออนไลน์',
      usersSub: 'จัดการสถานะอิสระภายในไมโครแอป'
    },
    feed: {
      title: '📡 ฟีดกิจกรรมสด (ผู้รับฟังอีเวนต์)',
      subtitle: 'ติดตามอีเวนต์ mfe:order:created ที่ส่งมาจาก Remote Orders (:3002)',
      badge: 'เรียลไทม์',
      initItem: 'ระบบเชื่อมต่อกับ Module Federation runtime เรียบร้อย',
      eventReceived: '⚡ ได้รับอีเวนต์:',
      placedOrder: 'สร้างคำสั่งซื้อ',
      justNow: 'เมื่อสักครู่'
    },
    outageError: 'จำลองการหยุดทำงานใน Dashboard Remote (พอร์ต 3001) เพื่อทดสอบ ErrorBoundary ของ Host'
  }
};

export const getDashboardTranslations = (locale: SupportedLocale) =>
  dashboardTranslations[locale] || dashboardTranslations.en;
