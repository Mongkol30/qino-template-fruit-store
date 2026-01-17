# ============================================
# Stage 1: Build
# ============================================
FROM node:24-alpine AS builder

# Build arguments for environment
ARG BUILD_ENV=production
ARG VITE_ENVIRONMENT=production
ARG VITE_API_URL=https://api.example.com/api
ARG VITE_API_TIMEOUT=30000
ARG VITE_APP_NAME="Qino App"
ARG VITE_APP_VERSION=1.0.0

# Set environment variables for build
ENV VITE_ENVIRONMENT=${VITE_ENVIRONMENT}
ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_API_TIMEOUT=${VITE_API_TIMEOUT}
ENV VITE_APP_NAME=${VITE_APP_NAME}
ENV VITE_APP_VERSION=${VITE_APP_VERSION}

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application with the specified mode
RUN npm run build -- --mode ${BUILD_ENV}

# ============================================
# Stage 2: Production
# ============================================
FROM nginx:alpine AS production

# Copy nginx configuration
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Add non-root user for security
RUN addgroup -g 1001 -S appgroup && \
    adduser -u 1001 -S appuser -G appgroup && \
    chown -R appuser:appgroup /usr/share/nginx/html && \
    chown -R appuser:appgroup /var/cache/nginx && \
    chown -R appuser:appgroup /var/log/nginx && \
    touch /var/run/nginx.pid && \
    chown -R appuser:appgroup /var/run/nginx.pid

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:80/health || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
