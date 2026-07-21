---
description: Read this file to understand how to fetch data in the project.
---

# Data Fetching Guidelines

This document provides guidelines for fetching data in the project. It covers best practices, recommended libraries, and common patterns to ensure consistency, performance and maintainability across the codebase.

## 1. Use Server Components for Data Fetching

In Next.js, ALWAYS use Server Components for data fetching. NEVER use Client Components for data fetching.

## 2. Data Fetching Methods

ALWAYS use the helper functions in the /data directory to fetch data. NEVER fetch data directly in the components.

ALL helper functions in the /data directory should use Drizzle ORM for database interactions.
