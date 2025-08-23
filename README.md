# Hum Sub Website - React Router with Cloudflare Workers

[![CI](https://github.com/rajeshg/humsub-website-rr/actions/workflows/ci.yml/badge.svg)](https://github.com/rajeshg/humsub-website-rr/actions/workflows/ci.yml)
[![Tests](https://github.com/rajeshg/humsub-website-rr/actions/workflows/test.yml/badge.svg)](https://github.com/rajeshg/humsub-website-rr/actions/workflows/test.yml)
[![Deploy](https://github.com/rajeshg/humsub-website-rr/actions/workflows/deploy.yml/badge.svg)](https://github.com/rajeshg/humsub-website-rr/actions/workflows/deploy.yml)

This is the official website for Hum Sub, built with React Router and deployed on Cloudflare Workers. It features server-side rendering, real-time event management, and a comprehensive test suite.

## Features

- 🚀 **React Router v7** for routing and SSR
- ☁️ **Cloudflare Workers** for edge deployment  
- 🎭 **Event Management** with real-time dashboard
- 🧪 **Comprehensive Testing** with Vitest and Testing Library
- 🎨 **Modern UI** with Tailwind CSS and shadcn/ui
- 📱 **Responsive Design** for all devices
- 🔄 **CI/CD Pipeline** with GitHub Actions

## Getting Started

### Installation

Install the dependencies:

```bash
bun install
```

### Development

Start the development server with HMR:

```bash
bun run dev
```

Your application will be available at `http://localhost:3000`.

### Testing

Run the comprehensive test suite:

```bash
# Run all tests
bun run test

# Run tests with coverage
bun run test:coverage

# Run tests in watch mode
bun run test:watch

# Run specific component tests
bun run test:event-dashboard
```

**Current Test Coverage**: 67 tests covering event dashboard components, utility functions, and more.

### Code Quality

Check code quality and formatting:

```bash
# Run linting and formatting checks
bun run check

# Fix formatting issues automatically
bun run check:fix

# Run TypeScript type checking
bun run typecheck
```

## Building for Production

Create a production build:

```bash
bun run build
```

## Deployment

This template can only be deployed to Cloudflare Workers.

```bash
bun run deploy
```

This will init the deploy script of wrangler and guide you to deploy the application.

### Using GitHub Actions

This project includes automated CI/CD workflows:

**CI Workflow** (runs on every push/PR):
- ✅ Linting and formatting checks
- ✅ Full test suite execution  
- ✅ TypeScript type checking
- ✅ Build verification

**Test Workflow** (runs on push/PR + daily):
- ✅ Unit tests with coverage reporting
- ✅ Component-specific test suites
- ✅ Coverage artifact upload

**Deploy Workflow** (manual trigger + main branch):
- ✅ Waits for CI to pass
- ✅ Builds and deploys to Cloudflare Workers

To use it you need to set the following secrets in your repository:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

You can get the `CLOUDFLARE_API_TOKEN` from the Cloudflare dashboard and the `CLOUDFLARE_ACCOUNT_ID` from the wrangler configuration file.

For detailed CI/CD documentation, see [CI_CD_DOCUMENTATION.md](./CI_CD_DOCUMENTATION.md).

## Styling

This project uses [Tailwind CSS](https://tailwindcss.com/) with [shadcn/ui](https://ui.shadcn.com/) components for a consistent, modern design system.

## Project Structure

```
├── app/
│   ├── components/          # React components
│   │   ├── event-dashboard/ # Event management components
│   │   └── ui/             # shadcn/ui components
│   ├── lib/                # Utility functions
│   ├── routes/             # React Router routes
│   └── hooks/              # Custom React hooks
├── test/                   # Test configuration and fixtures
├── .github/workflows/      # CI/CD GitHub Actions
└── coverage/              # Test coverage reports (generated)
```

## Testing Architecture

The project includes a comprehensive testing strategy:

- **Unit Tests**: Individual functions and utilities (35 tests)
- **Component Tests**: React component behavior and rendering (32 tests)  
- **Coverage Reporting**: Detailed coverage analysis with multiple output formats
- **CI Integration**: Automated testing on every commit and PR

Key tested components:
- Event Dashboard (StateBadge, CompactEventCard, CountdownDisplay)
- DateTime utilities with timezone handling
- UI components and state management

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and add tests
4. Run the test suite: `bun run test`
5. Check code quality: `bun run check`
6. Submit a pull request

The CI pipeline will automatically validate your changes.

---

## Author

- [Sergio Xalambrí](https://sergiodxa.com)

## License

This project is open source and available under the [MIT License](LICENSE).
