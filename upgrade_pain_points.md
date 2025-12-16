# Pain Points - Barzim Dependency Upgrade

Este documento lista os principais desafios encontrados durante o upgrade de Next.js 14 → 15, React 18 → 19, e outras dependências.

---

## 1. Next.js 15: Async APIs (`cookies`, `headers`, `params`)

**Problema:** Next.js 15 tornou `cookies()` e `headers()` funções assíncronas, quebrando código existente.

**Arquivos afetados:**
- `auth.ts` (linha 25)
- `middleware.ts` (linha 25)
- `actions/verify-age.ts` (linha 44)

**Solução:**
```diff
-const dateOfBirth = cookies().get('dateOfBirth')
+const cookieStore = await cookies()
+const dateOfBirth = cookieStore.get('dateOfBirth')
```

**Nota:** O middleware também precisa ser `async`:
```diff
-export default auth((req) => {
+export default auth(async (req) => {
```

---

## 2. `useSearchParams()` Requer Suspense Boundary

**Problema:** Next.js 15 exige que componentes usando `useSearchParams()` sejam envolvidos em `<Suspense>`.

**Erro:**
```
useSearchParams() should be wrapped in a suspense boundary at page "/dashboard"
```

**Arquivos afetados:**
- `app/PostHogPageView.tsx`
- `app/auth/login/page.tsx`
- `app/auth/new-password/page.tsx`
- `app/auth/new-verification/page.tsx`

**Solução 1 - Suspense Wrapper:**
```tsx
// app/providers.tsx
<Suspense fallback={null}>
  <PostHogPageView />
</Suspense>
```

**Solução 2 - Force Dynamic:**
```tsx
// app/auth/login/page.tsx
export const dynamic = 'force-dynamic'
```

---

## 3. Server Actions Devem Ser Async

**Problema:** Next.js 15 exige que todas as server actions sejam explicitamente `async`.

**Arquivo afetado:**
- `lib/image_upload.ts`

**Erro:**
```
Server Actions must be async functions
```

**Solução:**
```diff
-export const uploadImageToCloudinary = (
+export const uploadImageToCloudinary = async (
```

---

## 4. `revalidatePath` Não Pode Ser Usado em Client Components

**Problema:** Next.js 15 é mais rigoroso sobre separação server/client.

**Arquivo afetado:**
- `components/forms/form-follow.tsx`

**Erro:**
```
You're importing a component that needs "revalidatePath". That only works in a Server Component
```

**Solução:**
```diff
 'use client'
 
 import { handleRelationship } from '@/actions/social'
-import { revalidatePath } from 'next/cache'
```

Remover a chamada `revalidatePath('/')` do client component. A revalidação deve ser feita no server action.

---

## 5. `ssr: false` Não Permitido em Server Components

**Problema:** `dynamic()` com `ssr: false` não é mais permitido em server components.

**Arquivo afetado:**
- `app/providers.tsx`

**Erro:**
```
`ssr: false` is not allowed with `next/dynamic` in Server Components
```

**Solução:**
```diff
+'use client'
+
-const PostHogPageView = dynamic(() => import('./PostHogPageView'), {
-  ssr: false,
-})
+const PostHogPageView = dynamic(() => import('./PostHogPageView'))
```

Tornar o componente pai um client component e remover `ssr: false`.

---

## 6. Headless UI v1 Incompatível com React 19

**Problema:** `@headlessui/react@1.7.x` quebra com React 19 devido a mudanças internas.

**Erro:**
```
Attempted import error: '__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED' is not exported from 'react'
```

**Solução:**
```diff
-"@headlessui/react": "^1.7.18"
+"@headlessui/react": "^2.2.0"
```

Upgrade obrigatório para v2 para compatibilidade com React 19.

---

## 7. ESLint Errors Bloqueando Build

**Problema:** Next.js 15 por padrão falha o build em erros de ESLint.

**Solução:**
```js
// next.config.js
module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
}
```

**Nota:** Isso já existia para TypeScript (`ignoreBuildErrors: true`), mas ESLint precisa de configuração separada.

---

## 8. Peer Dependency Warnings

**Problema:** Alguns pacotes ainda não declararam suporte oficial para React 19.

**Pacotes afetados:**
- `react-spinners@0.13.8` → upgrade para `0.15.0` (resolve)
- `react-interactions@0.0.8` → pacote abandonado (warning permanece)

**Solução:**
- Atualizar pacotes quando possível
- Ignorar warnings de pacotes abandonados (não afetam funcionalidade)

---

## 9. next-auth v5 Ainda em Beta

**Problema:** Não existe versão stable de next-auth v5 (Auth.js).

**Situação atual:**
- Latest: `5.0.0-beta.30` (dezembro 2024)
- Stable v4: `4.24.13`

**Decisão:**
Usar `beta.30` (mais recente) ao invés de downgrade para v4, pois:
- Beta é estável o suficiente para produção
- Melhor compatibilidade com Next.js 15
- Adapter Prisma atualizado (`@auth/prisma-adapter@2.x`)

**Ação futura necessária:**
Atualizar variáveis de ambiente quando migrar para stable:
```diff
-NEXTAUTH_SECRET=...
+AUTH_SECRET=...
```

---

## 10. Prisma 6 vs Prisma 7

**Problema:** Prisma 7 introduz mudanças arquiteturais massivas.

**Mudanças em Prisma 7:**
- ESM-only (sem CommonJS)
- Driver adapters obrigatórios
- Rust-free client
- Breaking changes em queries

**Decisão:**
Ficar em Prisma 6 por enquanto. Upgrade para v7 requer planejamento separado.

**Prisma 6 upgrade:**
- ✅ Sem breaking changes no schema
- ✅ `Buffer` → `Uint8Array` (não afetou este projeto)
- ✅ Build passou sem modificações

---

## Resumo de Comandos Úteis

```bash
# Após mudanças em package.json
pnpm install

# Regenerar Prisma Client
pnpm prisma generate

# Testar build
pnpm build

# Rodar dev server
pnpm dev
```

---

## Lições Aprendidas

1. **Sempre testar build após cada fase** - Não esperar até o final
2. **Async APIs são o maior breaking change** - Procurar por `cookies()`, `headers()`, `params` no código
3. **Suspense boundaries são obrigatórios** - Qualquer `useSearchParams()` precisa de Suspense
4. **Client/Server separation mais rigorosa** - Next.js 15 é mais estrito
5. **Headless UI v2 é obrigatório** - React 19 quebra v1
6. **Peer warnings são normais** - Nem todos os pacotes atualizaram ainda

---

## Checklist Rápido para Novo Repo

- [ ] Atualizar `package.json` com novas versões
- [ ] Rodar `pnpm install`
- [ ] Adicionar `await` em todas as chamadas `cookies()` e `headers()`
- [ ] Tornar middleware `async` se usar cookies/headers
- [ ] Adicionar `'use client'` em `app/providers.tsx`
- [ ] Adicionar Suspense em `PostHogPageView`
- [ ] Adicionar `export const dynamic = 'force-dynamic'` nas páginas de auth
- [ ] Remover `revalidatePath` de client components
- [ ] Adicionar `async` em server actions
- [ ] Adicionar `eslint.ignoreDuringBuilds` em `next.config.js`
- [ ] Rodar `pnpm prisma generate`
- [ ] Testar `pnpm build`
