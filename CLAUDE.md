# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**is-lite** is a lightweight JavaScript type-checking library (< 2kB) with TypeScript type guards. It provides runtime type validation with automatic type narrowing in conditionals.

## Code Architecture

### Dual Export Strategy

The library provides two export patterns:

1. **Default export** (`src/index.ts`): Main `is` object with all checkers as methods
   - Used as: `is.string(value)` or `is(value)` to get type name
   - Single import, namespaced API

2. **Standalone functions** (`src/standalone.ts`): Individual checker functions
   - Used as: `import { isString } from 'is-lite/standalone'`
   - Tree-shakeable, one function per import
   - Each function is independently defined for optimal tree-shaking

Both entry points are built separately via tsup (dual CJS/ESM).

### Type System

Core types in `src/types.ts`:
- `TypeName`: Union of `ObjectTypes | PrimitiveTypes` - all possible return values from `is(value)`
- `Primitive`: JS primitive types including null
- `ObjectTypes`: Const array of recognized object types ('Array', 'Date', 'Map', etc.)
- `PrimitiveTypes`: Const array of primitive type names ('string', 'number', etc.)

### Helper Functions (`src/helpers.ts`)

Core utilities for type checking:
- `getObjectType()`: Parses `Object.prototype.toString.call()` result to extract type name
- `isObjectOfType<T>(type)`: Returns type guard function checking object type
- `isOfType<T>(type)`: Returns type guard function checking `typeof` result
- `isPrimitiveType(name)`: Checks if name is in `primitiveTypes` array

These helpers create reusable type guard factories used throughout `index.ts`.

### Type Checking Patterns

All checker methods return TypeScript type guards (`value is T`), enabling type narrowing:

```ts
if (is.string(value)) {
  // value is now typed as string
}
```

Special cases:
- `is.number()`: Excludes `NaN` (unlike `typeof`)
- `is.instanceOf()`: Checks direct instance, not inheritance chain
- `is.plainObject()`: Only `{}`, `new Object()`, or `Object.create(null)`
- `is.empty()`: Works with strings, arrays, objects, Maps, and Sets

## Development Commands

### Testing
- `npm test` - Auto-detects CI: runs coverage in CI, watch mode locally
- `npm run test:coverage` - Run tests with coverage report
- `npm run test:watch` - Interactive watch mode
- **Single test**: `TZ=UTC vitest run test/index.spec.ts` (or use `-t "pattern"` to filter)

### Validation
- `npm run validate` - Full validation pipeline (lint → typecheck → test → build → typevalidation → size)
- `npm run lint` - ESLint with auto-fix
- `npm run typecheck` - TypeScript compilation check
- `npm run typevalidation` - Check package exports with `@arethetypeswrong/cli`
- `npm run size` - Verify bundle size limits (main: 1.5kB, standalone: 2kB)

### Build
- `npm run build` - Clean + build dual CJS/ESM bundles
- `npm run watch` - Build in watch mode
- `npm run clean` - Remove dist directory

### Git Hooks (Husky)
- **pre-commit**: Runs `repo-tools check-remote && npm run validate` (ensures branch is up-to-date and all checks pass)
- **post-merge**: Runs `repo-tools install-packages` (auto-installs deps after merge)

## Testing Guidelines

- Test files in `test/` mirror `src/` structure
- Vitest with globals enabled (no need to import `describe`, `it`, `expect`)
- Fixtures in `test/__fixtures.ts`
- Tests must run with `TZ=UTC` environment variable
- Coverage expected for all type checkers

## Bundle Size Constraints

Strict size limits enforced via `size-limit`:
- Main bundle (index): **1.5kB** (both CJS and ESM)
- Standalone bundle: **1.5kB** (both CJS and ESM)

Build fails if bundles exceed limits. Keep implementation minimal.

## TypeScript Configuration

- Extends `@gilbarbara/tsconfig`
- Target: ES2020
- `noEmit: true` (tsup handles compilation)
- ESLint extends `@gilbarbara/eslint-config/base` and `/vitest`

## Adding New Type Checkers

When adding a new checker:

1. Add the standalone `isX` function in `src/standalone.ts` with type guard signature
2. Import and add method to `is` object in `src/index.ts`
3. Add comprehensive tests in `test/index.spec.ts` and `test/standalone.spec.ts`
4. Update README.md API documentation
5. Run full validation before commit (enforced by pre-commit hook)
