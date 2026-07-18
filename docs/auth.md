# Authentication Guidelines

All authentication in this application is handled exclusively by **Clerk**. No alternative authentication methods are permitted.

## Core Rules

1. **Clerk Only**: All user authentication, session management, and authorization must use Clerk APIs and components
2. **No Alternative Methods**: Do not implement custom auth, OAuth providers, or any non-Clerk authentication mechanisms
3. **Type Safety**: Always use Clerk's TypeScript types for auth-related operations

## Protected Routes

### Dashboard Route (`/dashboard`)

- **Status**: Protected route
- **Requirement**: Users must be logged in to access
- **Implementation**: Use middleware or `useAuth()` hook to enforce authentication
- **Behavior**: Redirect unauthenticated users to sign-in flow

### Homepage Route (`/`)

- **For Authenticated Users**: Redirect logged-in users to `/dashboard`
- **For Unauthenticated Users**: Show default homepage content
- **Implementation**: Check `useAuth()` in a Server Component or middleware

## Sign-In & Sign-Up Flow

- **Modal Presentation**: Sign-in and sign-up must launch as modal dialogs
- **Configuration**: Use Clerk's `<SignIn />` and `<SignUp />` components with modal appearance
- **Routes**: Place components at `/sign-in/[[...sign-in]]/page.tsx` and `/sign-up/[[...sign-up]]/page.tsx` (already configured)
- **Styling**: Apply modal styles via Clerk's appearance configuration and Tailwind CSS

## Implementation Checklist

- [ ] All auth logic uses Clerk APIs
- [ ] Dashboard route is protected with auth guard
- [ ] Homepage redirects logged-in users to dashboard
- [ ] Sign-in/sign-up flows render as modals
- [ ] No hardcoded credentials or custom auth sessions
- [ ] Error handling for expired sessions

## Common Patterns

**Check if user is authenticated:**

```typescript
import { useAuth } from "@clerk/nextjs";

export default function Component() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) return null;

  return isSignedIn ? <Dashboard /> : <HomePage />;
}
```

**Protected Server Component:**

```typescript
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return <div>Protected Content</div>;
}
```

## Resources

- Refer to Clerk's Next.js integration docs in `node_modules/@clerk/nextjs/docs`
- Check `/docs` folder for additional feature-specific auth patterns
- Review existing auth implementations in `/app/sign-in` and `/app/sign-up`
