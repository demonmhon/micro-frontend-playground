# --- Stage 1: Build all Micro-Frontends ---
FROM node:20-alpine AS builder

WORKDIR /app

# Copy root and package manifests for efficient layer caching
COPY package.json package-lock.json tsconfig.json ./
COPY apps/host/package.json ./apps/host/
COPY apps/remote-dashboard/package.json ./apps/remote-dashboard/
COPY apps/remote-orders/package.json ./apps/remote-orders/

# Install dependencies across all workspaces
RUN npm ci

# Copy entire source tree
COPY . .

# Build all micro-frontends and assemble into ./dist
RUN npm run build

# --- Stage 2: Serve with High-Performance Nginx ---
FROM nginx:alpine

# Copy custom Nginx configuration with CORS and SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy assembled unified build output
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
