# Barzim Dependency Upgrade Plan

## Summary

This plan outlines a phased approach to upgrade the Barzim codebase from its current dependencies to the latest stable versions. The upgrade is significant and involves breaking changes across multiple major packages.

### Current vs Target Versions

| Package | Current | Target | Breaking Changes |
|---------|---------|--------|------------------|
| Next.js | 14.0.4 | 15.x | Async APIs, caching defaults |
| React | ^18 | ^19 | New JSX transform required |
| Prisma | ^5.7.1 | **6.x** | Uint8Array, new keywords |
| next-auth | 5.0.0-beta.4 | 5.x stable | Cookie names, env vars |
| Tailwind CSS | ^3.3.0 | **3.x** (no upgrade) | N/A |
| @headlessui/react | ^1.7.18 | 2.x | Transition changes |
| Radix UI | various | latest | React 19 compat |
| TypeScript | ^5 | ^5.4+ | Minor updates |
| Node.js | N/A | **20+** confirmed | Required for Prisma 6 |

## User Decisions

- **Prisma**: Upgrade to v6 only (not v7)
- **Tailwind CSS**: Stay at v3.x (no upgrade)
- **Node.js**: Environment is Node 20+ (confirmed compatible)
- **Browser Support**: Modern browsers only (5-6 years support)
- **Testing**: Manual verification (no automated tests needed)

---

## Proposed Changes

### Phase 1: Foundation (Next.js 14 → 15 + React 19)

This is the most impactful phase. Next.js 15 requires React 19.

#### [MODIFY] [package.json](file:///c:/Users/Darkener/Dev/barzim/package.json)
- Update `next` to `^15.x`
- Update `react` and `react-dom` to `^19`
- Update `@types/react` and `@types/react-dom` to `^19`
- Update `eslint-config-next` to `^15.x`

#### [MODIFY] [next.config.js](file:///c:/Users/Darkener/Dev/barzim/next.config.js)
- Add `serverExternalPackages` if needed for bcrypt
- Update config syntax for Next.js 15 compatibility

#### [MODIFY] [auth.ts](file:///c:/Users/Darkener/Dev/barzim/auth.ts)
- Make `cookies()` call async (line 25)
- The `const dateOfBirth = c().get('dateOfBirth')` becomes `const dateOfBirth = (await c()).get('dateOfBirth')`

#### [MODIFY] [middleware.ts](file:///c:/Users/Darkener/Dev/barzim/middleware.ts)
- Update any `headers()` or `cookies()` calls to be async

---

### Phase 2: Database Layer (Prisma 5 → 6)

> [!NOTE]
> **Recommendation**: Upgrade to Prisma 6 only. Prisma 7 has major breaking changes (driver adapters, ESM-only) that may destabilize the app significantly.

#### [MODIFY] [package.json](file:///c:/Users/Darkener/Dev/barzim/package.json)
- Update `@prisma/client` to `^6`
- Update `prisma` devDependency to `^6`

#### [MODIFY] [prisma/schema.prisma](file:///c:/Users/Darkener/Dev/barzim/prisma/schema.prisma)
- No changes needed for Prisma 6 upgrade (schema is compatible)

#### Actions Required
- Run `npx prisma generate` after upgrade
- Check for `Buffer` usage in codebase (replaced with `Uint8Array`)

---

### Phase 3: Authentication (next-auth beta → stable)

#### [MODIFY] [package.json](file:///c:/Users/Darkener/Dev/barzim/package.json)
- Update `next-auth` to `^5.0.0` (stable, not beta)
- Update `@auth/prisma-adapter` to latest

#### [MODIFY] [auth.ts](file:///c:/Users/Darkener/Dev/barzim/auth.ts)
- Update import if API changes
- Session strategy remains `jwt` (no change needed)

#### [MODIFY] [.env](file:///c:/Users/Darkener/Dev/barzim/.env)
- Change `NEXTAUTH_SECRET` → `AUTH_SECRET`
- Change `NEXTAUTH_URL` → `AUTH_URL` (if present)

---

### Phase 4: UI Components

#### [MODIFY] [package.json](file:///c:/Users/Darkener/Dev/barzim/package.json)
- Update `@headlessui/react` to `^2`
- Update all `@radix-ui/*` packages to latest
  - `@radix-ui/react-alert-dialog` → latest
  - `@radix-ui/react-avatar` → latest  
  - `@radix-ui/react-dropdown-menu` → latest
  - `@radix-ui/react-icons` → latest
  - `@radix-ui/react-label` → latest
  - `@radix-ui/react-select` → latest
  - `@radix-ui/react-slot` → latest

#### Components to Review
Files in [components/ui/](file:///c:/Users/Darkener/Dev/barzim/components/ui) use Radix primitives:
- `alert-dialog.tsx` - uses `@radix-ui/react-alert-dialog`
- `avatar.tsx` - uses `@radix-ui/react-avatar`
- `dropdown-menu.tsx` - uses `@radix-ui/react-dropdown-menu`
- `label.tsx` - uses `@radix-ui/react-label`
- `select.tsx` - uses `@radix-ui/react-select`
- `carousel.tsx` - uses `embla-carousel-react`

---

### Phase 5: Other Dependencies

#### [MODIFY] [package.json](file:///c:/Users/Darkener/Dev/barzim/package.json)
- `embla-carousel-react` ^8.0.0-rc22 → stable ^8.x
- `zod` ^3.22.4 → ^3.24.x (minor)
- `sonner` ^1.4.0 → latest stable
- `posthog-js` and `posthog-node` → latest
- `@vercel/analytics` and `@vercel/speed-insights` → latest
- `cloudinary` → latest v2

#### Dev Dependencies
- `@typescript-eslint/eslint-plugin` ^6.20.0 → ^8.x
- `eslint` ^8 → ^9
- `prettier` ^3.2.4 → latest

---

## Verification Plan

Since the project has **no existing tests**, verification will be manual:

### Build Verification
1. Run `pnpm install` after updates
2. Run `pnpm build` - must complete without errors
3. Run `pnpm dev` - dev server must start

### Authentication Flow Testing
Manual steps:
1. Navigate to `/auth/login`
2. Test Google OAuth login
3. Test GitHub OAuth login  
4. Test Discord OAuth login
5. Test credentials login (email/password)
6. Verify session persists after login
7. Test logout functionality

### Database Operations Testing
Manual steps:
1. After login, navigate to beer listing pages
2. Add a new beer review
3. Update user profile
4. Verify data persists after refresh

### UI Component Verification  
Manual steps:
1. Test all dropdown menus work
2. Test avatar display on profile
3. Test carousel on home/beer pages
4. Test alert dialogs
5. Verify dark mode toggle works
6. Check responsive layout on mobile

---

## Recommended Upgrade Order

Due to interdependencies, execute in this order:

1. **Node.js 20+** confirmed available
2. **React 18 → 19** + **Next.js 14 → 15** (together, highest impact)
3. **Prisma 5 → 6** (after React/Next)
4. **next-auth beta → stable** (after Next.js)
5. **UI component updates** (Radix, Headless UI - after React 19)
6. **Remaining dependencies** (low-risk updates)
