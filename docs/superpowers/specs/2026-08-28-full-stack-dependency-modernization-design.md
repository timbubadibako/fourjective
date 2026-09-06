# Full-Stack Dependency Modernization Design

## Goal

Modernize the frontend and backend dependency stacks to their latest compatible stable releases while preserving the existing product behavior.

## Scope

- Frontend: Node runtime policy, React, React DOM, Next.js, TypeScript, ESLint, MUI, Radix UI, Tailwind CSS, PostCSS, animation, table, image, and utility dependencies.
- Backend: Node runtime policy, Express ecosystem, Sequelize/MySQL, authentication, uploads, PDF conversion, and development tooling.
- Repository hygiene: adopt npm as the sole package manager and remove the unused pnpm and Yarn lockfiles after npm lockfiles have been regenerated.
- Compatibility repairs that are required by upgraded packages, compiler, or linter; no product redesign and no intentional user-flow changes.

## Non-goals

- Replacing Express, Sequelize, MySQL, or the App Router architecture.
- Changing the public API contract, authentication model, database schema, or visual direction.
- Adding new product features.

## Migration Strategy

1. Pin the supported Node LTS range in both applications and add reproducible npm metadata.
2. Upgrade frontend framework and peer dependencies together: Next.js, React, React DOM, TypeScript, type packages, and ESLint.
3. Migrate Tailwind 3 to Tailwind 4 with its supported PostCSS integration. Convert the existing configuration and global styles only where required by the migration.
4. Upgrade frontend UI and utility packages. Resolve breaking API/type changes in the source code, keeping output behavior unchanged.
5. Upgrade backend dependencies. Retain Express and Sequelize major versions unless their current latest stable major requires source/API changes that cannot be verified without a database; in that case, record the package as an explicit follow-up rather than applying an unverified breaking change.
6. Reinstall from clean lockfiles, run frontend lint/type/build checks, then execute backend startup validation against configured local MySQL.

## Compatibility Boundaries

- React must be a stable release; the existing React release candidate is removed.
- Next.js and ESLint use the current supported integration rather than deprecated Next lint commands.
- Tailwind migration must preserve the project’s existing CSS variables, custom font families, dark-mode tokens, and component utility classes.
- Backend verification depends on a real local MySQL database and `pdftoppm` being available for PDF processing.

## Risk Controls

- Each application receives its own dependency change and verification checkpoint.
- Major migration failures are addressed at the source level only when directly caused by the dependency upgrade.
- Lockfiles are regenerated only after the package manifest is consistent; no `--force` or `--legacy-peer-deps` workaround is retained as the final installation path.

## Verification

- A clean `npm ci` must install each application without peer-dependency bypasses.
- Frontend: lint/type validation and production build pass.
- Backend: dependency tree is valid and the app starts with valid local environment variables and database connectivity.
- UI smoke checks cover the public pages and dashboard routes at mobile and desktop viewport widths once the local API configuration is available.
