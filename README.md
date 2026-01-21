# ProtectionSystem - Power Protection and Coordination System

A comprehensive Next.js frontend application for the PowerProtect power system protection and coordination system.

## Overview

This is a modern, production-ready Next.js application that provides a full-featured interface for managing power protection systems, equipment, and coordination analysis.

## Tech Stack

- **Next.js 16** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **TanStack React Query** - Server state management
- **Axios** - HTTP client
- **Shadcn/UI** - Component library based on Radix UI
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

## Features

### Pages

1. **Dashboard** (`/dashboard`) - Overview with statistics and quick actions
2. **Projects** (`/projects`) - Project management with CRUD operations
3. **Equipments** (`/equipments`) - Equipment management and filtering
4. **Coordination** (`/coordination`) - Coordenograma analysis page
5. **Network** (`/network`) - Network model visualization and management

### Components

- **Layout**: Responsive sidebar navigation with mobile support
- **ProjectSelector**: Reusable component for project selection with localStorage persistence
- **UI Components**: Button, Card, Dialog, Input, Textarea, and other Shadcn/UI components
- **StatCard**: Animated statistics display component

### API Services

- **projectService**: CRUD operations for projects
- **equipmentService**: Equipment management
- **protectionCurveService**: Protection curve operations
- **networkService**: Network model management
- **apiClient**: Axios instance with auth interceptors

### Type Definitions

Complete TypeScript interfaces for:
- Project, Equipment, ProtectionCurve, Simulation, NetworkModel
- Bus, Line, Transformer, Load, ExternalGrid

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

### Environment Variables

Create a `.env` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Development

```bash
# Run development server
npm run dev

# Type check
npm run type-check

# Lint
npm run lint

# Build for production
npm run build

# Start production server
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
.
├── app/
│   ├── layout.tsx              # Root layout with providers
│   ├── page.tsx                # Home page (redirects to dashboard)
│   ├── globals.css             # Global styles and Tailwind config
│   ├── providers.tsx           # React Query provider
│   ├── dashboard/              # Dashboard page
│   ├── projects/               # Projects management page
│   ├── equipments/             # Equipment management page
│   ├── coordination/           # Coordination analysis page
│   └── network/                # Network model page
├── components/
│   ├── Layout.tsx              # Main layout with sidebar
│   ├── ProjectSelector.tsx    # Project selection component
│   ├── StatCard.tsx            # Statistics card component
│   └── ui/                     # Shadcn UI components
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       └── textarea.tsx
├── api/
│   ├── client.ts               # Axios instance configuration
│   └── services/               # API service layer
│       ├── projectService.ts
│       ├── equipmentService.ts
│       ├── protectionCurveService.ts
│       └── networkService.ts
├── hooks/
│   ├── useLocalStorage.ts      # localStorage hook
│   └── useProjectSelector.ts   # Project selection hook
├── types/
│   └── index.ts                # TypeScript type definitions
├── lib/
│   └── utils.ts                # Utility functions
├── next.config.ts              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
├── tailwind.config.ts          # Tailwind CSS configuration
└── package.json                # Dependencies and scripts
```

## Key Features

### Responsive Design

- Mobile-first approach with Tailwind CSS
- Responsive sidebar navigation
- Mobile menu with drawer navigation
- Adaptive grid layouts

### State Management

- React Query for server state and caching
- localStorage for persistent project selection
- Custom hooks for project selection state

### UI/UX

- Smooth animations with Framer Motion
- Loading states and error handling
- Confirmation dialogs for destructive actions
- Dark theme support for Coordination page

### Type Safety

- Full TypeScript support with strict mode
- Typed API services
- Type-safe component props

### API Integration

- Axios with request/response interceptors
- Bearer token authentication support
- Error handling with auto-logout on 401
- Service layer pattern for clean separation

## Deployment

This application is ready for deployment to:
- Vercel
- AWS Amplify
- Netlify
- Google Cloud Run
- Any Node.js hosting service

### Build for Production

```bash
npm run build
```

The output will be in the `.next` directory.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is part of the PowerProtect protection system.
