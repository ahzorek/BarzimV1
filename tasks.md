# Upgrade Barzim Dependencies to Latest Versions

## Overview
Upgrade all project dependencies to their latest stable versions while maintaining app functionality.

## Tasks

### Phase 1: Foundation Upgrades (Critical Path)
- [ ] **Next.js 14 → 15**: Core framework upgrade
  - [ ] Update React 18 → 19 (required for Next 15)
  - [ ] Update react-dom 18 → 19
  - [ ] Handle async APIs (`cookies`, `headers`, `params`)
  - [ ] Update caching behavior (now opt-in)
  - [ ] Migrate `next.config.js` to ESM format
  - [ ] Run `@next/codemod` for automated fixes

### Phase 2: Database Layer
- [ ] **Prisma 5 → 6**: Database ORM upgrade
  - [ ] Update Node.js to 20.x (confirmed available)
  - [ ] Update to Prisma 6 (6.19.1)
  - [ ] Handle `Uint8Array` replacing `Buffer` for Bytes
  - [ ] Migrate to new `prisma-client` provider
  - [ ] Configure explicit `output` in generator
  - [ ] Add `prisma.config.ts` for CLI configuration

### Phase 3: Authentication
- [ ] **next-auth beta → stable v5**: Auth library upgrade
  - [ ] Update `@auth/prisma-adapter` to latest
  - [ ] Update environment variable prefixes (`NEXTAUTH_` → `AUTH_`)
  - [ ] Handle cookie name change (session migration)

### Phase 4: UI Components
- [ ] **Headless UI 1.x → 2.x**: Component library
  - [ ] Handle `Transition` component changes
- [ ] **Radix UI components**: Update all primitives
  - [ ] Consider migrating to unified `radix-ui` package

### Phase 5: Other Dependencies
- [ ] TypeScript 5.x updates
- [ ] ESLint 9 compatibility
- [ ] Update remaining dev dependencies

### Phase 6: Verification
- [ ] Build verification (`pnpm build`)
- [ ] Dev server verification (`pnpm dev`)
- [ ] Authentication flow testing
- [ ] Database operations testing
- [ ] UI component verification
