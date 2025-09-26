# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a Canva App built using the Canva Apps SDK. Canva Apps are React-based applications that integrate directly into the Canva editor, allowing users to extend Canva's functionality with custom features and integrations.

## Common Development Commands

### Development Server
```bash
npm start                    # Start development server on http://localhost:8080
npm start --use-https       # Start with HTTPS (required for Safari)
npm start --preview         # Start server and open app in Canva
npm run start:preview       # Same as above
```

### Building and Testing
```bash
npm run build               # Build production bundle and extract i18n messages
npm test                    # Run Jest tests
npm run test:watch          # Run tests in watch mode
npm run test:update         # Update Jest snapshots
```

### Code Quality
```bash
npm run lint                # Run ESLint
npm run lint:fix            # Fix ESLint issues automatically  
npm run lint:types          # Run TypeScript type checking
npm run format              # Format code with Prettier
npm run format:check        # Check formatting without changing files
```

### Internationalization
```bash
npm run extract             # Extract i18n messages to dist/messages_en.json
```

## Architecture Overview

### Core Structure
- **React + TypeScript**: Built with React 18.3.1 and TypeScript 5.8.2
- **Canva SDK Integration**: Uses multiple Canva SDK packages for platform integration
- **Webpack Bundling**: Custom webpack config optimized for Canva's single-file requirement
- **CSS Modules**: Scoped CSS with PostCSS and cssnano optimization

### Key Directories
- `src/`: Main application source code
  - `app.tsx`: Main app component with Canva integration
  - `index.tsx`: Entry point with providers setup
- `utils/`: Shared utilities for Canva SDK operations
- `styles/`: CSS modules and styling
- `scripts/`: Development and build tooling
- `declarations/`: TypeScript declarations

### Canva SDK Integration
The app integrates with Canva through several SDK packages:
- `@canva/app-ui-kit`: UI components matching Canva's design system
- `@canva/platform`: Core platform APIs (external URLs, etc.)
- `@canva/design`: Design manipulation APIs
- `@canva/app-i18n-kit`: Internationalization support

### Development Server Architecture
- Frontend runs on port 8080 (configurable via `CANVA_FRONTEND_PORT`)
- Backend (if used) runs on port 3001 (configurable via `CANVA_BACKEND_PORT`) 
- Hot Module Replacement (HMR) supported when `CANVA_HMR_ENABLED=TRUE`
- HTTPS support for Safari compatibility

## Environment Configuration

### Required Setup
1. Copy `.env.template` to `.env`
2. Configure app credentials from Canva Developer Portal
3. Set `CANVA_APP_ID` and `CANVA_APP_ORIGIN` for full functionality

### Key Environment Variables
- `CANVA_FRONTEND_PORT`: Development server port (default: 8080)
- `CANVA_BACKEND_PORT`: Backend server port (default: 3001)  
- `CANVA_BACKEND_HOST`: Backend URL (localhost for dev, production URL for builds)
- `CANVA_APP_ORIGIN`: App origin from Developer Portal (enables HMR)
- `CANVA_HMR_ENABLED`: Enable/disable Hot Module Replacement

## Development Workflow

### Running the App
1. Install dependencies: `npm install`
2. Start development server: `npm start`
3. Preview in Canva editor via Developer Portal
4. Edit `src/app.tsx` - changes require app reload in editor (unless HMR enabled)

### Testing Strategy
- Jest configuration with JSDOM environment
- CSS modules transformation via `jest-css-modules-transform`
- React Testing Library integration
- TypeScript support via `ts-jest`

### Code Organization Patterns
- React components use Canva's UI kit for consistency
- CSS modules for scoped styling with path alias `styles/`
- Utility functions for common Canva SDK operations in `utils/`
- Internationalization via `react-intl` with FormatJS

## Build and Deployment

### Production Build
- Single JavaScript bundle (required by Canva platform)
- Source maps and inline sources for debugging
- CSS optimization via cssnano
- Asset inlining for fonts and small images

### Bundle Optimization
- Terser minification with ASCII-only output for emoji/regex support
- Webpack's LimitChunkCountPlugin ensures single bundle
- Tree shaking for optimal bundle size

## Development Notes

### Node.js Requirements
- Node.js v18 or v20.10.0+
- npm v9 or v10+
- Use `.nvmrc` for consistent Node version

### Canva Platform Integration
- Apps preview only within Canva editor, not standalone
- External URLs require `requestOpenExternalUrl` API
- Design elements added via Canva SDK utilities (see `use_add_element.ts`)

### HTTPS Considerations  
- Safari requires HTTPS for development server
- Use `--use-https` flag and bypass certificate warnings
- Production builds should never use localhost URLs