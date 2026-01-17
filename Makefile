# ============================================
# Makefile for Qino Template
# Multi-Environment Support: local, dev, staging, sit, uat, prod
# ============================================

.PHONY: help dev dev-build dev-down dev-reset
.PHONY: build-dev build-staging build-sit build-uat build-prod
.PHONY: deploy-dev deploy-staging deploy-sit deploy-uat deploy-prod
.PHONY: stop-dev stop-staging stop-sit stop-uat stop-prod
.PHONY: prod prod-build prod-down clean logs shell
.PHONY: storybook-static test test-run test-coverage test-watch
.PHONY: setup-env check-env-dev check-env-staging check-env-sit check-env-uat check-env-prod

# ============================================
# Default target
# ============================================
help:
	@echo ""
	@echo "╔════════════════════════════════════════════════════════════════════╗"
	@echo "║              Qino Template - Multi-Environment Commands            ║"
	@echo "╠════════════════════════════════════════════════════════════════════╣"
	@echo "║  Local Development (Hot Reload + Storybook):                       ║"
	@echo "║    make dev           - Start dev + storybook (auto setup env)     ║"
	@echo "║    make dev-build     - Build & start dev + storybook              ║"
	@echo "║    make dev-down      - Stop dev + storybook                       ║"
	@echo "║    make dev-reset     - Reset dev (reinstall node_modules)         ║"
	@echo "║                                                                    ║"
	@echo "║  Build for Environments (requires .env.* file):                    ║"
	@echo "║    make build-dev     - Build image for development                ║"
	@echo "║    make build-staging - Build image for staging                    ║"
	@echo "║    make build-sit     - Build image for SIT                        ║"
	@echo "║    make build-uat     - Build image for UAT                        ║"
	@echo "║    make build-prod    - Build image for production                 ║"
	@echo "║                                                                    ║"
	@echo "║  Deploy (Run Container):                                           ║"
	@echo "║    make deploy-dev    - Deploy development (port 8081)             ║"
	@echo "║    make deploy-staging- Deploy staging (port 8082)                 ║"
	@echo "║    make deploy-sit    - Deploy SIT (port 8083)                     ║"
	@echo "║    make deploy-uat    - Deploy UAT (port 8084)                     ║"
	@echo "║    make deploy-prod   - Deploy production (port 8080)              ║"
	@echo "║                                                                    ║"
	@echo "║  Stop Deployments:                                                 ║"
	@echo "║    make stop-dev      - Stop development container                 ║"
	@echo "║    make stop-staging  - Stop staging container                     ║"
	@echo "║    make stop-sit      - Stop SIT container                         ║"
	@echo "║    make stop-uat      - Stop UAT container                         ║"
	@echo "║    make stop-prod     - Stop production container                  ║"
	@echo "║                                                                    ║"
	@echo "║  Testing:                                                          ║"
	@echo "║    make test          - Run tests (single run)                     ║"
	@echo "║    make test-watch    - Run tests (watch mode)                     ║"
	@echo "║    make test-coverage - Run tests with coverage                    ║"
	@echo "║                                                                    ║"
	@echo "║  Utilities:                                                        ║"
	@echo "║    make logs ENV=xxx  - View container logs for environment        ║"
	@echo "║    make shell ENV=xxx - Enter container shell                      ║"
	@echo "║    make clean         - Remove all containers & images             ║"
	@echo "║    make storybook-static - Build static Storybook                  ║"
	@echo "╚════════════════════════════════════════════════════════════════════╝"
	@echo ""

# ============================================
# Environment Setup Commands
# ============================================
setup-env:
	@if [ -f .env.local ]; then \
		echo "✅ .env.local already exists"; \
	else \
		cp .env.example .env.local; \
		echo "✅ Created .env.local from .env.example"; \
		echo "📝 Edit .env.local to customize your local settings"; \
	fi

# ============================================
# Environment Check Commands (for non-local environments)
# These require manual setup - do NOT auto-create for security
# ============================================
check-env-dev:
	@if [ ! -f .env.development ]; then \
		echo ""; \
		echo "❌ ERROR: .env.development not found!"; \
		echo ""; \
		echo "Please create it manually:"; \
		echo "  cp .env.example .env.development"; \
		echo ""; \
		echo "Then update the values for your development environment."; \
		echo ""; \
		exit 1; \
	fi

check-env-staging:
	@if [ ! -f .env.staging ]; then \
		echo ""; \
		echo "❌ ERROR: .env.staging not found!"; \
		echo ""; \
		echo "Please create it manually:"; \
		echo "  cp .env.example .env.staging"; \
		echo ""; \
		echo "Then update the values for your staging environment."; \
		echo ""; \
		exit 1; \
	fi

check-env-sit:
	@if [ ! -f .env.sit ]; then \
		echo ""; \
		echo "❌ ERROR: .env.sit not found!"; \
		echo ""; \
		echo "Please create it manually:"; \
		echo "  cp .env.example .env.sit"; \
		echo ""; \
		echo "Then update the values for your SIT environment."; \
		echo ""; \
		exit 1; \
	fi

check-env-uat:
	@if [ ! -f .env.uat ]; then \
		echo ""; \
		echo "❌ ERROR: .env.uat not found!"; \
		echo ""; \
		echo "Please create it manually:"; \
		echo "  cp .env.example .env.uat"; \
		echo ""; \
		echo "Then update the values for your UAT environment."; \
		echo ""; \
		exit 1; \
	fi

check-env-prod:
	@if [ ! -f .env.production ]; then \
		echo ""; \
		echo "❌ ERROR: .env.production not found!"; \
		echo ""; \
		echo "Please create it manually:"; \
		echo "  cp .env.example .env.production"; \
		echo ""; \
		echo "Then update the values for your production environment."; \
		echo ""; \
		exit 1; \
	fi

# ============================================
# Local Development Commands (using compose.debug.yaml)
# Runs both Vite dev server and Storybook
# ============================================
dev: setup-env
	podman compose -f compose.debug.yaml up

dev-build: setup-env
	podman compose -f compose.debug.yaml up --build

dev-down:
	podman compose -f compose.debug.yaml down

dev-reset: setup-env
	podman compose -f compose.debug.yaml down -v
	podman compose -f compose.debug.yaml up

# ============================================
# Build Commands for Each Environment
# ============================================
build-dev: check-env-dev
	podman build \
		--build-arg BUILD_ENV=development \
		--build-arg VITE_ENVIRONMENT=development \
		--build-arg VITE_API_URL=$$(grep VITE_API_URL .env.development | cut -d '=' -f2) \
		--build-arg VITE_APP_NAME="$$(grep VITE_APP_NAME .env.development | cut -d '=' -f2)" \
		-t qino-templete:development .

build-staging: check-env-staging
	podman build \
		--build-arg BUILD_ENV=staging \
		--build-arg VITE_ENVIRONMENT=staging \
		--build-arg VITE_API_URL=$$(grep VITE_API_URL .env.staging | cut -d '=' -f2) \
		--build-arg VITE_APP_NAME="$$(grep VITE_APP_NAME .env.staging | cut -d '=' -f2)" \
		-t qino-templete:staging .

build-sit: check-env-sit
	podman build \
		--build-arg BUILD_ENV=sit \
		--build-arg VITE_ENVIRONMENT=sit \
		--build-arg VITE_API_URL=$$(grep VITE_API_URL .env.sit | cut -d '=' -f2) \
		--build-arg VITE_APP_NAME="$$(grep VITE_APP_NAME .env.sit | cut -d '=' -f2)" \
		-t qino-templete:sit .

build-uat: check-env-uat
	podman build \
		--build-arg BUILD_ENV=uat \
		--build-arg VITE_ENVIRONMENT=uat \
		--build-arg VITE_API_URL=$$(grep VITE_API_URL .env.uat | cut -d '=' -f2) \
		--build-arg VITE_APP_NAME="$$(grep VITE_APP_NAME .env.uat | cut -d '=' -f2)" \
		-t qino-templete:uat .

build-prod: check-env-prod
	podman build \
		--build-arg BUILD_ENV=production \
		--build-arg VITE_ENVIRONMENT=production \
		--build-arg VITE_API_URL=$$(grep VITE_API_URL .env.production | cut -d '=' -f2) \
		--build-arg VITE_APP_NAME="$$(grep VITE_APP_NAME .env.production | cut -d '=' -f2)" \
		-t qino-templete:production .

# ============================================
# Deploy Commands (Run Containers)
# Each environment runs on a different port
# ============================================
deploy-dev: build-dev
	podman run -d --name qino-templete-dev -p 8081:80 --restart unless-stopped qino-templete:development
	@echo "✅ Development deployed at http://localhost:8081"

deploy-staging: build-staging
	podman run -d --name qino-templete-staging -p 8082:80 --restart unless-stopped qino-templete:staging
	@echo "✅ Staging deployed at http://localhost:8082"

deploy-sit: build-sit
	podman run -d --name qino-templete-sit -p 8083:80 --restart unless-stopped qino-templete:sit
	@echo "✅ SIT deployed at http://localhost:8083"

deploy-uat: build-uat
	podman run -d --name qino-templete-uat -p 8084:80 --restart unless-stopped qino-templete:uat
	@echo "✅ UAT deployed at http://localhost:8084"

deploy-prod: build-prod
	podman run -d --name qino-templete-prod -p 8080:80 --restart unless-stopped qino-templete:production
	@echo "✅ Production deployed at http://localhost:8080"

# ============================================
# Stop Deployed Containers
# ============================================
stop-dev:
	podman stop qino-templete-dev && podman rm qino-templete-dev || true

stop-staging:
	podman stop qino-templete-staging && podman rm qino-templete-staging || true

stop-sit:
	podman stop qino-templete-sit && podman rm qino-templete-sit || true

stop-uat:
	podman stop qino-templete-uat && podman rm qino-templete-uat || true

stop-prod:
	podman stop qino-templete-prod && podman rm qino-templete-prod || true

# ============================================
# Build Static Storybook
# ============================================
storybook-static:
	podman run --rm -v $(PWD):/app -w /app node:24-alpine sh -c "npm install && npm run build-storybook"

# ============================================
# Testing Commands
# ============================================
test:
	npm run test:run

test-watch:
	npm run test

test-coverage:
	npm run test:coverage

# ============================================
# Legacy Production Commands (using compose.yaml)
# ============================================
prod:
	BUILD_ENV=production podman compose up -d

prod-build:
	BUILD_ENV=production podman compose up -d --build

prod-down:
	podman compose down

# ============================================
# Utility Commands
# ============================================
logs:
	@if [ -z "$(ENV)" ]; then \
		podman compose logs -f; \
	else \
		podman logs -f qino-templete-$(ENV); \
	fi

logs-dev:
	podman compose -f compose.debug.yaml logs -f

shell:
	@if [ -z "$(ENV)" ]; then \
		podman exec -it qino-templete-prod sh; \
	else \
		podman exec -it qino-templete-$(ENV) sh; \
	fi

shell-dev:
	podman exec -it qino-templete-app-1 sh

# ============================================
# Cleanup Commands
# ============================================
clean:
	podman compose down --rmi all --volumes || true
	podman compose -f compose.debug.yaml down --rmi all --volumes || true
	podman rm -f qino-templete-dev qino-templete-staging qino-templete-sit qino-templete-uat qino-templete-prod 2>/dev/null || true
	podman rmi -f qino-templete:development qino-templete:staging qino-templete:sit qino-templete:uat qino-templete:production 2>/dev/null || true

prune:
	podman system prune -af

# ============================================
# Build Only (no run) - Legacy
# ============================================
build:
	podman build -t qino-templete:latest .

build-local:
	podman build -f Dockerfile.dev -t qino-templete:local .
