# Grocery Delivery App

A mobile-first grocery delivery web application built with React, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework**: React 18 with TypeScript (strict mode)
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **Routing**: React Router v6
- **Testing**: Vitest, React Testing Library, fast-check (property-based testing)

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Run Tests

```bash
npm test
```

## Project Structure

The project follows Atomic Design architecture:

```
src/
├── components/
│   ├── atoms/       # Basic UI elements (Button, Input, etc.)
│   ├── molecules/   # Composed components (ProductCard, SearchBar, etc.)
│   ├── organisms/   # Complex sections (ProductGrid, Navigation, etc.)
│   └── templates/   # Page layouts (MainLayout, AuthLayout, etc.)
├── pages/           # Route-level page components
├── stores/          # Zustand state stores
├── services/        # Mock API service layer
├── data/            # Mock product data
├── types/           # TypeScript interfaces and enums
├── hooks/           # Custom React hooks
└── utils/           # Utility functions
```
