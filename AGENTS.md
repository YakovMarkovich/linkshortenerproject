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

## General Principles

1. **TypeScript First**: All code must be written in TypeScript with strict mode enabled
2. **Type Safety**: Avoid `any` types; use generics and proper type inference
3. **Server/Client Components**: Default to Server Components; use `"use client"` only when necessary
4. **Path Aliases**: Use `@/` prefix for all relative imports (configured in `tsconfig.json`)
5. **Component Composition**: Keep components small, focused, and reusable
6. **No Direct DOM Access**: Use React APIs instead of direct DOM manipulation
7. **Accessible by Default**: Follow WCAG guidelines in all UI components
8. **Error Handling**: Always handle errors gracefully; provide meaningful error messages
