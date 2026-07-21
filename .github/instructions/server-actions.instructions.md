---
description: Use this guide when implementing or modifying Server Actions, data mutations, or form submissions in this project.
---

# Server Actions Instructions

## Overview

All data mutations in this application must be implemented via Next.js Server Actions. Server Actions provide type-safe, secure server-side operations that are called from client components.

## File Structure & Naming

- Server action files **MUST** be named `actions.ts`
- Files **MUST** be colocated in the same directory as the component that calls them
- Example structure:
  ```
  app/components/
    └── my-component/
        ├── page.tsx (or component.tsx)
        ├── actions.ts        ← Server actions file
        └── client-component.tsx
  ```

## Implementation Requirements

### 1. Type Safety

- Define explicit TypeScript types for all input data
- **DO NOT** use the `FormData` TypeScript type directly
- Define dedicated input types for each server action
- Example:

  ```typescript
  // ❌ Don't do this
  export async function updateLink(formData: FormData) {}

  // ✅ Do this
  interface UpdateLinkInput {
    id: string;
    title: string;
    url: string;
  }
  export async function updateLink(input: UpdateLinkInput) {}
  ```

### 2. Data Validation

- Use `zod` for all input validation
- Validate immediately at the start of each server action
- Return validation errors to the client with meaningful messages
- Example:

  ```typescript
  import { z } from "zod";

  const updateLinkSchema = z.object({
    id: z.string().uuid(),
    title: z.string().min(1),
    url: z.string().url(),
  });

  export async function updateLink(input: unknown) {
    const parsed = updateLinkSchema.safeParse(input);
    if (!parsed.success) {
      return { error: "Invalid input", details: parsed.error.flatten() };
    }
    // Continue with validated data
  }
  ```

### 3. Authentication Check

- **ALWAYS** verify the user is logged in before proceeding with any database operations
- Use Clerk's `auth()` function to check authentication
- Return an error if user is not authenticated
- Example:

  ```typescript
  import { auth } from "@clerk/nextjs/server";

  export async function updateLink(input: UpdateLinkInput) {
    const { userId } = await auth();
    if (!userId) {
      return { error: "Unauthorized" };
    }
    // Proceed with database operations
  }
  ```

### 4. Database Operations

- **DO NOT** use Drizzle queries directly in server actions
- All database operations **MUST** use helper functions from the `/data` directory
- Helper functions wrap Drizzle queries and encapsulate data access logic
- Example:

  ```typescript
  // ❌ Don't do this
  import { db } from "@/db";
  export async function updateLink(input: UpdateLinkInput) {
    await db
      .update(links)
      .set({ title: input.title })
      .where(eq(links.id, input.id));
  }

  // ✅ Do this
  import { updateLinkData } from "@/data/links";
  export async function updateLink(input: UpdateLinkInput) {
    const result = await updateLinkData(input.id, input.title);
  }
  ```

### 5. Error Handling

- **NEVER** throw errors in server actions
- Always catch errors and return them in a consistent response object
- Return an object with either `error` or `success` properties
- Provide meaningful error messages to help with debugging
- Example:

  ```typescript
  // ❌ Don't do this
  export async function updateLink(input: UpdateLinkInput) {
    const result = await updateLinkData(input.id, input.title);
    if (!result) {
      throw new Error("Failed to update link");
    }
  }

  // ✅ Do this
  export async function updateLink(input: UpdateLinkInput) {
    try {
      const result = await updateLinkData(input.id, input.title);
      if (!result) {
        return { error: "Link not found or could not be updated" };
      }
      return { success: true, data: result };
    } catch (error) {
      return { error: "Failed to update link. Please try again." };
    }
  }
  ```

## Complete Example

```typescript
// app/components/edit-link/actions.ts
"use server";

import { z } from "zod";
import { auth } from "@clerk/nextjs/server";
import { updateLinkData } from "@/data/links";

const editLinkSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1, "Title is required"),
  url: z.string().url("Invalid URL"),
});

type EditLinkInput = z.infer<typeof editLinkSchema>;

export async function editLink(input: unknown) {
  // 1. Validate input
  const parsed = editLinkSchema.safeParse(input);
  if (!parsed.success) {
    return { error: "Validation failed", details: parsed.error.flatten() };
  }

  // 2. Check authentication
  const { userId } = await auth();
  if (!userId) {
    return { error: "Unauthorized" };
  }

  // 3. Use data helper function
  try {
    const result = await updateLinkData(parsed.data.id, parsed.data);
    return { success: true, data: result };
  } catch (error) {
    return { error: "Failed to update link" };
  }
}
```

## Calling from Client Components

- Mark client components with `'use client'`
- Import and call server actions directly
- Handle responses with success/error states
- Example:

  ```typescript
  'use client';
  import { editLink } from './actions';

  export function EditLinkForm() {
    async function handleSubmit(formData: FormData) {
      const result = await editLink({
        id: formData.get('id'),
        title: formData.get('title'),
        url: formData.get('url'),
      });
      if (result.error) {
        // Handle error
      }
    }
    return <form action={handleSubmit}>...</form>;
  }
  ```
