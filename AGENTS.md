# Agent Instructions for Link Shortener Project

This document provides comprehensive coding standards and guidelines for AI agents working on this Next.js 16.2.10 Link Shortener project.

## Key Technologies

- **Framework**: Next.js 16.2.10 (App Router)
- **Language**: TypeScript 5 (strict mode)
- **Authentication**: Clerk
- **Database**: Drizzle ORM with Neon PostgreSQL
- **UI Library**: Shadcn UI with Base UI components
- **Styling**: Tailwind CSS 4
- **Linting**: ESLint 9 with Next.js config

## Critical Warnings

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

⚠️ **CRITICAL**: Before generating ANY code, you MUST read the relevant individual instructions files in the `/docs` directory. These files contain feature-specific requirements, patterns, and implementation details that are essential for maintaining consistency and correctness across the project.

## General Principles

1. **TypeScript First**: All code must be written in TypeScript with strict mode enabled
2. **Type Safety**: Avoid `any` types; use generics and proper type inference
3. **Server/Client Components**: Default to Server Components; use `"use client"` only when necessary
4. **Path Aliases**: Use `@/` prefix for all relative imports (configured in `tsconfig.json`)
5. **Component Composition**: Keep components small, focused, and reusable
6. **No Direct DOM Access**: Use React APIs instead of direct DOM manipulation
7. **Accessible by Default**: Follow WCAG guidelines in all UI components
8. **Error Handling**: Always handle errors gracefully; provide meaningful error messages

## Documentation Reference

- **[Authentication](/docs/auth.md)**: Clerk integration, protected routes, sign-in/sign-up modals
- **[UI Components](/docs/ui-components.md)**: Shadcn/ui component standards, no custom components
- Additional feature docs in `/docs` directory

## Before Writing Code

**✅ ALWAYS FOLLOW THESE STEPS IN ORDER:**

1. **READ THE RELEVANT `/docs` FILES FIRST** — This is non-negotiable. For any feature you're implementing, identify and read the corresponding file(s) in the `/docs` directory (e.g., `auth.md` for authentication, `ui-components.md` for UI work). These files contain critical requirements and patterns.
2. Verify the current file structure in your target directory
3. Review existing similar implementations in the codebase
4. Ensure all TypeScript types are explicitly defined
5. Run `npm run lint` to verify code quality before completion

**Available Documentation Files:**

- `/docs/auth.md` — Clerk authentication integration, protected routes, sign-in/sign-up flows
- `/docs/ui-components.md` — Shadcn/ui component standards and patterns
- Check `/docs/` for additional feature-specific documentation
