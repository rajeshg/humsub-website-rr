# CI/CD Pipeline Documentation

This document describes the continuous integration and deployment pipeline for the Hum Sub website.

## Overview

The project uses GitHub Actions for CI/CD with multiple workflows that ensure code quality, run tests, and deploy the application to Cloudflare Workers.

## Workflows

### 1. CI Workflow (`.github/workflows/ci.yml`)

**Triggers:**
- Push to `main` branch
- Pull requests (opened, synchronized)

**Jobs:**
1. **Lint & Format** - Runs `biome check .` to ensure code quality
2. **Tests** - Runs the full test suite with Vitest
3. **Typechecker** - Validates TypeScript types
4. **Build** - Ensures the application builds successfully (runs after all other jobs pass)

### 2. Test Workflow (`.github/workflows/test.yml`)

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests (opened, synchronized)  
- Scheduled runs (daily at 2 AM UTC)

**Jobs:**
1. **Unit Tests with Coverage** - Runs all tests and generates coverage reports
2. **Component Tests** - Specifically tests React components including event dashboard

### 3. Deploy Workflow (`.github/workflows/deploy.yml`)

**Triggers:**
- Manual workflow dispatch
- Push to `main` branch

**Dependencies:**
- Waits for CI workflow to pass before deploying

**Jobs:**
1. **CI Check** - Calls the CI workflow to ensure all checks pass
2. **Deploy** - Deploys to Cloudflare Workers (requires secrets)

## Test Configuration

### Test Scripts Available

```bash
# Basic test commands
bun run test              # Run all tests once
bun run test:watch        # Run tests in watch mode
bun run test:coverage     # Run tests with coverage report
bun run test:ui           # Run tests with UI interface

# Specific test commands
bun run test:components   # Run only component tests
bun run test:event-dashboard  # Run only event dashboard tests
```

### Coverage Configuration

- **Provider**: V8
- **Reporters**: Text, JSON, HTML, LCOV
- **Output**: `./coverage/` directory
- **Exclusions**: Node modules, test files, build artifacts, config files

### Test Results

- **JUnit XML**: `test-results.xml` (for CI integration)
- **Coverage Reports**: Multiple formats in `coverage/` folder

## Current Test Coverage

As of the latest run:
- **Total Coverage**: 5.35% (will improve as more components get tested)
- **Tested Modules**:
  - Event Dashboard Components: 28.87% coverage
  - DateTime utilities: 83.33% coverage
  - Utils: 100% coverage

**Well-tested components:**
- ✅ StateBadge (100% coverage)
- ✅ CountdownDisplay (100% coverage)  
- ✅ CompactEventCard (95% coverage)
- ✅ Event Constants (100% coverage)

## Secrets Required

For deployment to work, the following secrets must be configured in GitHub:

- `CLOUDFLARE_API_TOKEN` - Cloudflare API token with Workers edit permissions
- `CLOUDFLARE_ACCOUNT_ID` - Cloudflare account ID

## Status Badges

Add these to your README to show build status:

```markdown
[![CI](https://github.com/rajeshg/humsub-website-rr/actions/workflows/ci.yml/badge.svg)](https://github.com/rajeshg/humsub-website-rr/actions/workflows/ci.yml)
[![Tests](https://github.com/rajeshg/humsub-website-rr/actions/workflows/test.yml/badge.svg)](https://github.com/rajeshg/humsub-website-rr/actions/workflows/test.yml)
[![Deploy](https://github.com/rajeshg/humsub-website-rr/actions/workflows/deploy.yml/badge.svg)](https://github.com/rajeshg/humsub-website-rr/actions/workflows/deploy.yml)
```

## Quality Gates

### For Pull Requests
- ✅ Lint checks must pass
- ✅ All tests must pass
- ✅ TypeScript compilation must succeed
- ✅ Build must complete successfully

### For Deployments  
- ✅ All CI checks must pass
- ✅ Manual approval for deployments (via workflow_dispatch)
- ✅ Automatic deployment on main branch pushes

## Local Development

### Running Tests Locally

```bash
# Install dependencies
bun install

# Run tests (recommended - uses vitest directly)
bun run test

# Run with coverage
bun run test:coverage

# Watch mode for development
bun run test:watch
```

### Pre-commit Checks

Before pushing, ensure:

```bash
# Check code quality
bun run check

# Run type checking  
bun run typecheck

# Run tests
bun run test

# Build the project
bun run build
```

## Debugging CI Issues

### Common Issues

1. **Test failures**: Check the test output in Actions tab
2. **Build failures**: Usually TypeScript or dependency issues
3. **Deployment failures**: Check Cloudflare credentials and quotas

### Getting Detailed Logs

- All workflows include detailed logging
- Coverage reports are uploaded as artifacts
- Test results are available in the Actions summary

## Future Improvements

### Planned Enhancements
- [ ] Add visual regression tests with Playwright
- [ ] Implement end-to-end testing for critical user flows
- [ ] Add performance testing and budgets
- [ ] Set up automatic dependency updates with Dependabot
- [ ] Add security scanning with CodeQL
- [ ] Implement canary deployments for staging environment

### Test Coverage Goals
- [ ] Increase overall coverage to >80%
- [ ] Add integration tests for WebSocket functionality
- [ ] Add tests for all major user interaction flows
- [ ] Component visual testing with Storybook

## Contact

For questions about the CI/CD pipeline, check the GitHub Actions logs or review this documentation.
