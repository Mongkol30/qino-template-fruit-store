# 🚀 Qino Template

A production-ready React template with enterprise-grade architecture, featuring 95+ reusable components, comprehensive state management, and full TypeScript support.

![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind-4.1-06B6D4?logo=tailwindcss)
![Tests](https://img.shields.io/badge/Tests-246%20passed-success)

## ✨ Features

- ⚡ **Vite + SWC** - Lightning-fast HMR and build times
- 🎨 **Tailwind CSS 4** - Utility-first styling with custom theme
- 🔒 **Authentication Ready** - Guards, protected routes, and session management
- 🌐 **i18n Support** - Multi-language support (EN/TH) with i18next
- 📦 **95+ Components** - Comprehensive UI library (Button, Modal, DataGrid, etc.)
- 🧪 **Full Test Coverage** - 246 tests with Vitest + Testing Library
- 📚 **Storybook** - Component documentation and visual testing
- 🐳 **Docker Ready** - Multi-stage build with Nginx

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React 19.2 |
| Build Tool | Vite 7.2 + SWC |
| Language | TypeScript 5.9 |
| Styling | Tailwind CSS 4.1 |
| State Management | Redux Toolkit + Redux Persist |
| Routing | React Router DOM 7.12 |
| Form Handling | Formik + Yup |
| Internationalization | i18next |
| Testing | Vitest + Testing Library + Playwright |
| Documentation | Storybook 10.1 |
| Containerization | Docker + Nginx |

## 📁 Project Structure

```
src/
├── assets/              # Static assets (images, fonts)
├── components/
│   └── core/            # 95+ reusable UI components
│       ├── button/
│       ├── modal/
│       ├── data-grid/
│       └── ...
├── config/              # App configuration & environment
├── contexts/            # React Context providers
│   ├── config-context.tsx
│   ├── modal-context.tsx
│   └── toast-context.tsx
├── features/            # Feature modules
│   ├── auth/
│   ├── dashboard/
│   └── home/
├── guards/              # Route guards
│   ├── auth-guard.tsx   # Protected routes
│   └── guest-guard.tsx  # Public only routes
├── hooks/               # Custom hooks
│   ├── use-debounce.ts
│   ├── use-toggle.ts
│   └── ...
├── layouts/             # Page layouts
│   ├── main-layout.tsx
│   ├── auth-layout.tsx
│   └── dashboard-layout.tsx
├── locales/             # i18n translations
│   └── translations/
│       ├── en.ts
│       └── th.ts
├── pages/               # Page components
├── routes/              # Router configuration
├── services/            # API services (RTK Query)
├── slices/              # Redux slices
├── stores/              # Redux store configuration
├── theme/               # Tailwind theme & utilities
└── utils/               # Utility functions
```

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/qino-template.git
cd qino-template

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
# Development
npm run dev          # Start dev server at http://localhost:5173

# Build
npm run build        # Build for production
npm run preview      # Preview production build

# Testing
npm run test         # Run tests in watch mode
npm run test:run     # Run tests once
npm run test:coverage # Run tests with coverage report
npm run test:ui      # Open Vitest UI

# Linting
npm run lint         # Run ESLint

# Storybook
npm run storybook    # Start Storybook at http://localhost:6006
npm run build-storybook # Build static Storybook
```

## 🐳 Docker / Podman

### Local Development (Hot Reload + Storybook)

```bash
# Start dev server + storybook (auto setup env)
make dev

# Build & start
make dev-build

# Stop
make dev-down

# Reset (reinstall node_modules)
make dev-reset
```

### Build & Deploy for Environments

```bash
# Build for specific environment
make build-dev       # Development
make build-staging   # Staging
make build-sit       # SIT
make build-uat       # UAT
make build-prod      # Production

# Deploy (run container)
make deploy-dev      # Port 8081
make deploy-staging  # Port 8082
make deploy-sit      # Port 8083
make deploy-uat      # Port 8084
make deploy-prod     # Port 8080

# Stop deployed containers
make stop-dev
make stop-prod
```

### Utilities

```bash
make logs ENV=dev    # View logs
make shell ENV=prod  # Enter container shell
make clean           # Remove all containers & images
make help            # Show all commands
```

## 🔐 Authentication Flow

```
Routes:
├── /                  → Public (MainLayout)
├── /auth/login        → Guest Only (GuestGuard → AuthLayout)
├── /dashboard         → Protected (AuthGuard → DashboardLayout)
├── /about             → Protected
└── /blank             → Protected
```

- **AuthGuard**: Redirects to `/auth/login` if not authenticated
- **GuestGuard**: Redirects to `/dashboard` if already authenticated
- Uses **Redux Persist** for session management

## 🎨 Component Usage

### Button

```tsx
import { Button } from '@components/core';

<Button variant="primary" size="md" isLoading={false}>
  Click Me
</Button>
```

### Toast

```tsx
import { useToast } from '@contexts';

const { success, error } = useToast();

success('Operation completed!');
error('Something went wrong');
```

### Modal

```tsx
import { useModal } from '@contexts';

const { openModal, closeModal } = useModal();

openModal({
  title: 'Confirm Action',
  content: <p>Are you sure?</p>,
});
```

## 🌐 Internationalization

```tsx
import { useTranslation } from 'react-i18next';
import { tokens } from '@locales';

function MyComponent() {
  const { t } = useTranslation();

  return <h1>{t(tokens.common.welcome)}</h1>;
}
```

Supported languages:
- 🇺🇸 English (en)
- 🇹🇭 Thai (th)

## 🧪 Testing

```bash
# Run all tests
npm run test:run

# Run with coverage
npm run test:coverage

# Run specific test file
npm run test -- src/hooks/use-debounce.test.ts
```

Test stats: **246 tests passing** ✅

## 📝 Path Aliases

```typescript
// Available aliases in tsconfig & vite.config
import { Button } from '@components/core';
import { useDebounce } from '@hooks';
import { useAppDispatch } from '@stores';
import { login } from '@slices/auth-slice';
import { tokens } from '@locales';
import { AuthGuard } from '@guards';
import { MainLayout } from '@layouts';
import { config } from '@config';
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

---

Made with ❤️ by Qino Team
