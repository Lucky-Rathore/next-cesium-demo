# Next.js with Cesium/Resium Demo

A Next.js application demonstrating 3D globe visualization using Cesium and Resium.

## Features

- Next.js 15.3 with App Router
- Cesium/Resium integration for 3D globe visualization
- TailwindCSS styling
- Google Fonts (Geist) integration

## Prerequisites

- Node.js (LTS version recommended)
- npm or yarn

## Setup

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. The Cesium assets will be automatically symlinked to the public directory during installation via the postinstall script.

## Development

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

- `src/app/` - Next.js app router pages and layouts
- `components/` - React components including Cesium viewer
- `public/` - Static assets and Cesium resources

## Environment Variables

The following environment variables are configured in `next.config.mjs`:

- `CESIUM_BASE_URL`: Set to 'cesium' for proper asset loading

## Scripts

- `dev`: Start development server
- `build`: Build for production
- `start`: Run production server
- `lint`: Run ESLint
- `postinstall`: Setup Cesium assets

## Dependencies

- `next`: ^15.3.4
- `react`: ^19.0.0
- `cesium`: ^1.129.0
- `resium`: ^1.19.0-beta.1

## License

This project is MIT licensed.
