# Full-Stack Dependency Modernization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade both applications to current stable dependencies, Tailwind 4, and reproducible npm installations.

**Architecture:** Preserve the existing Next.js App Router and Express/Sequelize architecture. Upgrade framework peers together, migrate Tailwind's PostCSS integration, and make source changes only when required by the upgraded compiler, linter, or package API.

**Tech Stack:** Node 24 LTS, npm 11, Next 16.3.3, React 19.2.8, Tailwind 4.3.3, TypeScript 7.0.2, Express 5.2.1, Sequelize 6.37.8, MySQL2 3.24.2.

---

### Task 1: Normalize the runtime and package manager

**Files:**
- Create: `fourjective-fe-main/.nvmrc`
- Create: `fourjective-be-main/.nvmrc`
- Modify: both `package.json` files
- Delete: `fourjective-fe-main/pnpm-lock.yaml` and `fourjective-fe-main/yarn.lock`

- [ ] Write `24` to both `.nvmrc` files.
- [ ] Add this metadata to both manifests:

```json
"engines": { "node": ">=24 <25", "npm": ">=11 <12" },
"packageManager": "npm@11.16.0"
```

- [ ] Run:

```bash
rtk proxy rm fourjective-fe-main/pnpm-lock.yaml fourjective-fe-main/yarn.lock
```

Expected: only `package-lock.json` remains per application.

- [ ] Commit:

```bash
git add fourjective-fe-main fourjective-be-main
git commit -m "chore: standardize Node and npm metadata"
```

### Task 2: Upgrade Next, React, TypeScript, and ESLint

**Files:**
- Modify: `fourjective-fe-main/package.json`
- Modify: `fourjective-fe-main/package-lock.json`
- Modify: `fourjective-fe-main/next.config.ts`

- [ ] Run from `fourjective-fe-main`:

```bash
rtk proxy npm install next@16.3.3 react@19.2.8 react-dom@19.2.8 typescript@7.0.2 eslint@latest eslint-config-next@16.3.3 @types/node@latest @types/react@latest @types/react-dom@latest
```

Expected: no `ERESOLVE` and no peer-dependency bypass.

- [ ] Replace the `lint` script with `"lint": "eslint ."`.
- [ ] Delete `swcMinify` and `optimizeFonts` from `next.config.ts`.
- [ ] Run:

```bash
rtk proxy npm run lint
rtk proxy npx tsc --noEmit
```

- [ ] Commit:

```bash
git add package.json package-lock.json next.config.ts .eslintrc.json
git commit -m "chore: upgrade Next React and lint tooling"
```

### Task 3: Migrate Tailwind 3 to Tailwind 4

**Files:**
- Modify: `fourjective-fe-main/package.json`
- Modify: `fourjective-fe-main/package-lock.json`
- Modify: `fourjective-fe-main/postcss.config.mjs`
- Modify: `fourjective-fe-main/src/app/globals.css`
- Modify: `fourjective-fe-main/tailwind.config.ts`

- [ ] Install Tailwind 4:

```bash
rtk proxy npm install tailwindcss@4.3.3 @tailwindcss/postcss@4.3.3
```

- [ ] Replace `postcss.config.mjs` with:

```js
export default { plugins: { "@tailwindcss/postcss": {} } };
```

- [ ] Replace the three `@tailwind` directives at the top of `globals.css` with `@import "tailwindcss";`.
- [ ] Add `@config "../../tailwind.config.ts";` immediately after the import as a temporary bridge for the existing custom theme.
- [ ] Run `rtk npm run build`. For each custom token required by the build, migrate it from `tailwind.config.ts` into `@theme inline` in `globals.css`. Delete `tailwind.config.ts` only after no unknown utility errors remain.
- [ ] Commit:

```bash
git add package.json package-lock.json postcss.config.mjs src/app/globals.css tailwind.config.ts
git commit -m "chore: migrate frontend to Tailwind CSS 4"
```

### Task 4: Upgrade remaining frontend packages and repair source compatibility

**Files:**
- Modify: `fourjective-fe-main/package.json`
- Modify: `fourjective-fe-main/package-lock.json`
- Modify: `fourjective-fe-main/src/app/components/landing-page/OurServices.tsx`
- Modify: source files named by lint, type, or build errors only

- [ ] Upgrade all remaining frontend packages:

```bash
rtk proxy npx npm-check-updates --target latest --dep prod,dev,optional --upgrade
rtk proxy npm install
```

- [ ] Extract the card body currently returned by `servicesData.map` in `OurServices.tsx` into a `ServiceCard` component. Put its `useRef` and `useInView` calls inside `ServiceCard`, then map to `<ServiceCard key={service.title} ... />`; this removes the invalid Hook call in `.map()`.
- [ ] Run and repair only reported migration errors:

```bash
rtk proxy npm run lint
rtk proxy npx tsc --noEmit
rtk npm run build
```

- [ ] Commit:

```bash
git add .
git commit -m "chore: modernize frontend dependencies"
```

### Task 5: Upgrade backend dependencies and harden startup order

**Files:**
- Modify: `fourjective-be-main/package.json`
- Modify: `fourjective-be-main/package-lock.json`
- Modify: `fourjective-be-main/server.js`

- [ ] Update all backend packages:

```bash
cd fourjective-be-main
rtk proxy npx npm-check-updates --target latest --dep prod,dev,optional --upgrade
rtk proxy npm install
```

- [ ] Replace the standalone `sequelize.sync()` and immediate `app.listen()` sequence in `server.js` with:

```js
async function startServer() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
```

- [ ] Verify:

```bash
rtk proxy npm ci
rtk proxy node --check server.js
```

- [ ] Commit:

```bash
git add .
git commit -m "chore: modernize backend dependencies"
```

### Task 6: Verify clean installation and production build

**Files:**
- Modify: lockfiles only if clean installation changes them

- [ ] Verify frontend:

```bash
cd fourjective-fe-main
rtk proxy npm ci
rtk proxy npm run lint
rtk proxy npx tsc --noEmit
rtk npm run build
```

- [ ] Verify backend:

```bash
cd ../fourjective-be-main
rtk proxy npm ci
rtk proxy node --check server.js
rtk proxy npm audit --omit=dev
```

- [ ] With valid MySQL environment variables and `pdftoppm` installed, run `rtk proxy npm run dev`; expect database authentication, synchronization, and `Server running on port 5000`.
- [ ] Commit final lockfile changes:

```bash
git add package-lock.json ../fourjective-fe-main/package-lock.json
git commit -m "chore: verify modernized dependency locks"
```

