# UI Components Guidelines

All UI elements in this application must use **shadcn/ui** components. No custom components are permitted.

## Core Rules

1. **Shadcn/ui Only**: All UI components must be sourced from the shadcn/ui library
2. **No Custom Components**: Do not create custom UI components; extend or compose shadcn/ui components instead
3. **Component Library**: Components are located in `components/ui/` directory (pre-installed via `components.json`)
4. **Tailwind CSS**: All styling is done through Tailwind CSS classes; maintain consistency with Tailwind 4

## Available Components

Shadcn/ui components are pre-configured and available in `components/ui/`. Before implementing any UI element:

1. Check [shadcn/ui docs](https://ui.shadcn.com) for available components
2. Use the existing component if available in `components/ui/`
3. Install new components using `npx shadcn-ui@latest add <component-name>` if needed
4. Never duplicate functionality already provided by shadcn/ui

## Component Usage Patterns

**Always import from the local components/ui directory:**

```typescript
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
```

**Compose components for complex layouts:**

```typescript
export function UserForm() {
  return (
    <Card>
      <form>
        <Input placeholder="Enter name" />
        <Button type="submit">Submit</Button>
      </form>
    </Card>
  );
}
```

**Extend shadcn/ui with Tailwind CSS:**

```typescript
// Customize through className, not by creating new components
<Button className="w-full rounded-lg">Click me</Button>
```

## Styling Standards

- Use Tailwind CSS utility classes for all styling
- Leverage shadcn/ui's built-in theme variables (colors, spacing, etc.)
- Maintain visual consistency across the app
- Do not use inline styles or CSS-in-JS (except for dynamic values via Tailwind's class system)

## When to Extend vs. Create

| Scenario                           | Action                                                                |
| ---------------------------------- | --------------------------------------------------------------------- |
| Need a button with custom styling  | Use `<Button>` with className prop                                    |
| Need a dialog/modal behavior       | Use shadcn/ui `<Dialog>` component                                    |
| Need a form with validation        | Compose `<Input>`, `<Label>`, `<Button>` from shadcn/ui               |
| Need custom business logic wrapper | Create a wrapper component that composes shadcn/ui components         |
| Need a completely new UI concept   | Check shadcn/ui library first; if not available, open issue to add it |

## Implementation Checklist

- [ ] All UI elements use shadcn/ui components
- [ ] No custom CSS components created
- [ ] All styling done through Tailwind CSS classes
- [ ] Components imported from `@/components/ui/`
- [ ] Code follows shadcn/ui best practices
- [ ] Visual consistency maintained across pages

## Common Components

**Frequently used shadcn/ui components in this project:**

- `Button` - All interactive buttons
- `Input` - Text input fields
- `Card` - Content containers
- `Dialog` - Modal dialogs
- `Form` - Form wrapper with validation support
- `Select` - Dropdown selections
- `Alert` - Alert/notification messages

For additional components, refer to [shadcn/ui documentation](https://ui.shadcn.com).
