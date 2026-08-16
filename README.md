# Micro-Frontend Playground

A React.js Micro-Frontend (MFE) architecture built with **Vite** and **Module Federation** (`@originjs/vite-plugin-federation`).

This playground demonstrates how multiple independent engineering teams can build, test, and deploy decoupled web applications while seamlessly assembling them into a unified App Shell at runtime.

---

## 🏗️ Architecture Summary

- **Zero Monorepo Overhead**: No complicated internal packages, linking steps, or shared library build pipelines.
- **Unified Design Tokens**: Pure CSS variables and components (`mfe-styles.css`) for fast load times and clean UI consistency.
- **Decoupled Cross-MFE Event Bus**: Remotes and Host communicate asynchronously through typed `window.CustomEvent` bindings (`eventBus.ts`) without direct module dependencies.
- **Autonomous Remote Routing**: Remotes declare and manage their own internal sub-routes (e.g. `/orders`, `/orders/create`, `/orders/view/:id`) that work identically in both Integrated and Standalone modes.
- **Resilient Fault Isolation**: Every federated remote is isolated behind an error boundary (`RemoteErrorBoundary`). If one team's remote encounters an outage, other remotes and the Host Shell remain functional.

---

## 📦 Project Structure

```text
micro-frontend-playground/
├── README.md
├── package.json               # Monorepo workspace orchestration
├── tsconfig.json              # Shared TypeScript configuration
├── docs/
│   └── micro-frontend-architecture.md # Full architecture & design guide
└── apps/
    ├── host/                  # App Shell (:3000)
    │   ├── vite.config.ts     # Federation remotes config
    │   └── src/
    │       ├── components/    # AppLayout, RemoteErrorBoundary
    │       ├── pages/         # HomePage, DocsPage
    │       ├── eventBus.ts    # Cross-app event listener
    │       ├── mfe-styles.css # Design system styles & variables
    │       └── App.tsx        # Top-level routing orchestrator
    ├── remote-dashboard/      # Team Alpha Micro-App (:3001)
    │   ├── vite.config.ts     # Exposes ./DashboardRoutes
    │   └── src/
    │       ├── DashboardRoutes.tsx # Federated entry component & sub-routes
    │       ├── eventBus.ts    # Real-time event subscriber
    │       └── App.tsx        # Standalone development shell
    └── remote-orders/         # Team Beta Micro-App (:3002)
        ├── vite.config.ts     # Exposes ./OrdersRoutes
        └── src/
            ├── OrdersRoutes.tsx    # Federated entry & deep sub-routes
            ├── eventBus.ts    # Event dispatcher
            └── App.tsx        # Standalone development shell
```

---

## 🚀 Port Topology & Team Ownership

| App / Service | Port | Team / Owner | Internal Routes | Mode |
| :--- | :--- | :--- | :--- | :--- |
| **Host Application** | `:3000` | Platform Team | `/`, `/dashboard/*`, `/orders/*`, `/docs` | Shell / Container |
| **Dashboard Remote** | `:3001` | Team Alpha | `/` | Integrated + Standalone |
| **Orders Remote** | `:3002` | Team Beta | `/`, `/create`, `/view/:id` | Integrated + Standalone |

---

## 🛠️ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run in Development Mode
Start all applications concurrently (Host in dev mode + Remotes in watch/preview mode):
```bash
npm run dev
```
This enables editing any file in Host (instant HMR) or Remotes (auto-rebuilding in ~150ms) and viewing changes at **http://localhost:3000**.

Or run individual micro-apps independently:
```bash
npm run dev:host                 # Shell on http://localhost:3000
npm run dev:dashboard            # Team Alpha (watch+preview) on http://localhost:3001
npm run dev:orders               # Team Beta (watch+preview) on http://localhost:3002
npm run dev:dashboard:standalone # Team Alpha standalone dev server
npm run dev:orders:standalone    # Team Beta standalone dev server
```

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Builds
```bash
npm run preview
```

---

## 🔍 Key Interactive Features

1. **Integrated Overview (`localhost:3000`)**:
   - Live view aggregating both micro-frontends side-by-side with global shell header and real-time event ticker.
2. **Deep Sub-Routing**:
   - Navigate to **"Orders"** -> Click **"➕ New Order Form"** (`/orders/create`) or view details (`/orders/view/:id`).
3. **Cross-MFE Event Bus**:
   - In Orders Remote, click **"⚡ 1-Click Order"** or submit a new order form.
   - Observe Dashboard Remote immediately updating revenue, processed order counts, and live activity feed.
   - Observe Host Shell receiving notifications in the top-right bell and bottom event ticker.
4. **Fault Isolation Testing**:
   - Click **"💥 Simulate Outage"** on either remote.
   - The crashing remote will be caught by `RemoteErrorBoundary` with a retry option while the rest of the application stays online.
5. **Visual MFE Inspector**:
   - Click **"🔍 Inspect MFEs"** in the Host header to highlight boundaries and ownership tags for each micro-frontend container.
