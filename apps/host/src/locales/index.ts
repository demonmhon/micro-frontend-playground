import { SupportedLocale } from '../context/MfeContext';

export const hostTranslations = {
  en: {
    brandTitle: 'MFE Playground',
    brandSubtitle: 'Vite + Module Federation',
    nav: {
      overview: 'Overview',
      dashboard: 'Dashboard (:3001)',
      orders: 'Orders (:3002)',
      docs: 'Architecture Docs'
    },
    actions: {
      inspectMfe: '🔍 Inspect MFEs',
      inspectActive: '🔍 Inspect Active',
      emitEvent: '📡 Emit Event',
      clear: 'Clear',
      eventStream: 'Event Stream',
      langLabel: 'Language',
      themeDark: '🌙 Dark',
      themeLight: '☀️ Light',
      configBtn: '⚙️ Config'
    },
    config: {
      modalTitle: 'Global Configuration (Host Control)',
      modalSubtitle: 'Centrally configure API Gateway Base URL, Environment, and Mock Mode across all federated remotes via React useContext.',
      apiBaseUrlLabel: 'Backend API Base URL',
      apiBaseUrlPlaceholder: 'e.g. http://localhost:8080/api/v1',
      envLabel: 'Target Environment',
      envDev: 'Development (:8080)',
      envStaging: 'Staging (staging-api)',
      envProd: 'Production (api.live)',
      mockLabel: 'Mock Simulation Mode',
      mockSub: 'Simulate instant API responses and offline-friendly mock payloads.',
      quickPresets: 'Quick Presets:',
      saveBtn: 'Save & Propagate',
      closeBtn: 'Close',
      activeEndpoint: 'Active Target:'
    },
    banner: {
      title: 'Micro-Frontend Architecture Playground',
      tag: 'Vite + Module Federation',
      description:
        'The Host Shell (:3000) dynamically aggregates autonomous remote micro-apps over HTTP with zero shared package dependencies. Try switching Theme, Language, and API Base URL above to see all remotes adapt reactively via React useContext!',
      standaloneDashboard: '↗ Standalone :3001',
      standaloneOrders: '↗ Standalone :3002'
    },
    sections: {
      loadingDashboard: 'Loading Dashboard Remote (:3001)...',
      loadingOrders: 'Loading Orders Remote (:3002)...',
      loadingModule: 'Loading micro-frontend module...'
    },
    ticker: {
      label: 'Cross-MFE Bus:',
      listening: 'Listening for real-time cross-MFE events...'
    },
    notifications: {
      initTitle: 'Host Shell Initialized',
      initMessage: 'Connected to Module Federation runtime on port 3000',
      broadcastTitle: 'Broadcast from Host Shell',
      broadcastMessage: 'Host Shell (:3000) broadcasted an event across all federated remotes.',
      newOrderPrefix: 'New Order:',
      placedOrder: 'placed order for'
    },
    notFound: {
      title: '404 - Route Not Found',
      message: 'The requested micro-frontend route does not exist.',
      returnBtn: 'Return to Overview'
    }
  },
  th: {
    brandTitle: 'MFE เพลย์กราวด์',
    brandSubtitle: 'Vite + Module Federation',
    nav: {
      overview: 'ภาพรวม',
      dashboard: 'แดชบอร์ด (:3001)',
      orders: 'คำสั่งซื้อ (:3002)',
      docs: 'เอกสารสถาปัตยกรรม'
    },
    actions: {
      inspectMfe: '🔍 ตรวจสอบ MFE',
      inspectActive: '🔍 โหมดตรวจสอบทำงาน',
      emitEvent: '📡 ส่งอีเวนต์ทดสอบ',
      clear: 'ล้างข้อมูล',
      eventStream: 'สตรีมข้อความอีเวนต์',
      langLabel: 'ภาษา',
      themeDark: '🌙 โหมดมืด',
      themeLight: '☀️ โหมดสว่าง',
      configBtn: '⚙️ การตั้งค่า'
    },
    config: {
      modalTitle: 'การตั้งค่าส่วนกลาง (ควบคุมโดย Host)',
      modalSubtitle: 'กำหนดค่า API Gateway Base URL, สภาพแวดล้อม และโหมดจำลอง Mock API สำหรับทุกไมโครแอปผ่าน React useContext',
      apiBaseUrlLabel: 'Backend API Base URL',
      apiBaseUrlPlaceholder: 'เช่น http://localhost:8080/api/v1',
      envLabel: 'สภาพแวดล้อมเป้าหมาย',
      envDev: 'สภาพแวดล้อมพัฒนา (:8080)',
      envStaging: 'สภาพแวดล้อมทดสอบ (staging-api)',
      envProd: 'สภาพแวดล้อมจริง (api.live)',
      mockLabel: 'โหมดจำลอง Mock API',
      mockSub: 'จำลองการตอบกลับข้อมูลและทำงานแบบออฟไลน์ได้โดยไม่ต้องต่อเน็ตเวิร์กจริง',
      quickPresets: 'ชุดค่าเริ่มต้น:',
      saveBtn: 'บันทึกและส่งผล',
      closeBtn: 'ปิด',
      activeEndpoint: 'ปลายทางที่ใช้งาน:'
    },
    banner: {
      title: 'สนามทดลองสถาปัตยกรรม Micro-Frontend',
      tag: 'Vite + Module Federation',
      description:
        'Host Shell (:3000) รวมไมโครแอปจากระยะไกลแบบไดนามิกผ่าน HTTP โดยไม่ต้องผูกมัดโค้ดร่วมกัน ลองปรับเปลี่ยน ธีม ภาษา และ API Base URL ด้านบนเพื่อดูทุกไมโครแอปตอบสนองพร้อมกันผ่าน React useContext!',
      standaloneDashboard: '↗ แยกทำงาน :3001',
      standaloneOrders: '↗ แยกทำงาน :3002'
    },
    sections: {
      loadingDashboard: 'กำลังโหลดแดชบอร์ด (:3001)...',
      loadingOrders: 'กำลังโหลดคำสั่งซื้อ (:3002)...',
      loadingModule: 'กำลังโหลดโมดูล micro-frontend...'
    },
    ticker: {
      label: 'บัสสื่อสาร MFE:',
      listening: 'กำลังรอรับอีเวนต์เรียลไทม์ระหว่างไมโครแอป...'
    },
    notifications: {
      initTitle: 'เริ่มการทำงาน Host Shell สำเร็จ',
      initMessage: 'เชื่อมต่อกับ Module Federation runtime บนพอร์ต 3000',
      broadcastTitle: 'ประกาศข่าวสารจาก Host Shell',
      broadcastMessage: 'Host Shell (:3000) ส่งสัญญาณประกาศไปยังไมโครแอปทั้งหมด',
      newOrderPrefix: 'คำสั่งซื้อใหม่:',
      placedOrder: 'สั่งซื้อสินค้ามูลค่า'
    },
    notFound: {
      title: '404 - ไม่พบหน้านี้',
      message: 'เส้นทางไมโครฟรอนต์เอนด์ที่เรียกไม่มีอยู่ในระบบ',
      returnBtn: 'กลับสู่หน้าภาพรวม'
    }
  }
};

export const getHostTranslations = (locale: SupportedLocale) => hostTranslations[locale] || hostTranslations.en;
