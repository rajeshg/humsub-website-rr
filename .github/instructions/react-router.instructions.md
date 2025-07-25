---
description: React Router v7 Usage Guide
applyTo: "**/*.tsx,**/*.jsx,**/*.ts,**/*.js"
---

# React Router v7 Usage Guide

This project uses React Router v7, which provides roughly the same functionality as Remix.
The module name is "react-router".

## Directory Structure for Routes

- All routes should be placed in the `app/routes` directory
- API routes should be placed in the `app/routes/api` directory
- Components should be in the `app/components` directory
- Common logic should be in the `app/lib` directory

## Key Components and Hooks

### Essential Components

- `<Link>`: Navigate between routes declaratively
- `<NavLink>`: Special Link with active state styling
- `<Outlet>`: Renders child routes in nested layouts
- `<Navigate>`: Programmatic navigation component

### Essential Hooks

- `useParams()`: Access route parameters
- `useNavigate()`: Programmatic navigation function
- `useLocation()`: Access current location object
- `useSearchParams()`: Access and modify URL search parameters
- `useRouteLoaderData()`: Access loader data from any route
- `useActionData()`: Access action data from forms

## Route Conventions

### File-based Routing

```typescript
// app/routes/_index.tsx - renders at "/"
export default function Index() {
  return <h1>Home Page</h1>;
}

// app/routes/about.tsx - renders at "/about"
export default function About() {
  return <h1>About Page</h1>;
}

// app/routes/users.$userId.tsx - renders at "/users/:userId"
export default function UserProfile() {
  const { userId } = useParams();
  return <h1>User: {userId}</h1>;
}
```

### Nested Routes with Layouts

```typescript
// app/routes/dashboard.tsx - layout for /dashboard/*
import { Outlet } from "react-router";

export default function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <nav>Dashboard Navigation</nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

// app/routes/dashboard._index.tsx - renders at "/dashboard"
export default function DashboardIndex() {
  return <h1>Dashboard Home</h1>;
}

// app/routes/dashboard.settings.tsx - renders at "/dashboard/settings"
export default function DashboardSettings() {
  return <h1>Dashboard Settings</h1>;
}
```

## Data Loading Patterns

### Route Loaders

```typescript
// app/routes/users.$userId.tsx
import type { LoaderFunctionArgs } from "react-router";
import { useLoaderData } from "react-router";

export async function loader({ params }: LoaderFunctionArgs) {
  const user = await getUserById(params.userId);
  if (!user) {
    throw new Response("Not Found", { status: 404 });
  }
  return { user };
}

export default function UserProfile() {
  const { user } = useLoaderData<typeof loader>();
  return <h1>{user.name}</h1>;
}
```

### Form Actions

```typescript
// app/routes/contact.tsx
import type { ActionFunctionArgs } from "react-router";
import { Form, useActionData, redirect } from "react-router";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  
  if (!email) {
    return { error: "Email is required" };
  }
  
  await sendContactEmail(email);
  return redirect("/thank-you");
}

export default function Contact() {
  const actionData = useActionData<typeof action>();
  
  return (
    <Form method="post">
      <input name="email" type="email" required />
      {actionData?.error && (
        <p className="text-red-500">{actionData.error}</p>
      )}
      <button type="submit">Submit</button>
    </Form>
  );
}
```

## Navigation Best Practices

### Using Link Components

```typescript
import { Link, NavLink } from "react-router";

function Navigation() {
  return (
    <nav className="flex space-x-4">
      <Link 
        to="/" 
        className="text-blue-600 hover:text-blue-800"
      >
        Home
      </Link>
      <NavLink 
        to="/about"
        className={({ isActive }) => 
          isActive ? "text-blue-800 font-bold" : "text-blue-600"
        }
      >
        About
      </NavLink>
    </nav>
  );
}
```

### Programmatic Navigation

```typescript
import { useNavigate } from "react-router";

function LoginForm() {
  const navigate = useNavigate();
  
  const handleSubmit = async (formData: FormData) => {
    try {
      await login(formData);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      // Handle error
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
    </form>
  );
}
```

## Error Handling

### Route Error Boundaries

```typescript
// app/routes/users.$userId.tsx
import { useRouteError, isRouteErrorResponse } from "react-router";

export function ErrorBoundary() {
  const error = useRouteError();
  
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>{error.status} {error.statusText}</h1>
        <p>{error.data}</p>
      </div>
    );
  }
  
  return (
    <div>
      <h1>Oops!</h1>
      <p>Something went wrong.</p>
    </div>
  );
}
```

## TypeScript Integration

### Typed Route Parameters

```typescript
interface UserParams {
  userId: string;
}

export default function UserProfile() {
  const { userId } = useParams() as UserParams;
  // userId is now typed as string
}
```

### Typed Loader Data

```typescript
interface User {
  id: string;
  name: string;
  email: string;
}

export async function loader({ params }: LoaderFunctionArgs) {
  const user: User = await getUserById(params.userId);
  return { user };
}

export default function UserProfile() {
  const { user } = useLoaderData<typeof loader>();
  // user is properly typed
}
```

## Common Patterns

### Search Parameters

```typescript
import { useSearchParams } from "react-router";

function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  
  const updateSearch = (newQuery: string) => {
    setSearchParams(prev => {
      if (newQuery) {
        prev.set("q", newQuery);
      } else {
        prev.delete("q");
      }
      return prev;
    });
  };
  
  return (
    <div>
      <input 
        value={query}
        onChange={(e) => updateSearch(e.target.value)}
        placeholder="Search products..."
      />
      {/* render products based on query */}
    </div>
  );
}
```

### Protected Routes

```typescript
// app/components/ProtectedRoute.tsx
import { Navigate, useLocation } from "react-router";

interface ProtectedRouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
}

export function ProtectedRoute({ children, isAuthenticated }: ProtectedRouteProps) {
  const location = useLocation();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return <>{children}</>;
}
```

## Best Practices

1. **Use relative navigation** when possible with `to=".."` or `to="."`
2. **Leverage file-based routing** for better organization
3. **Use loaders for data fetching** instead of useEffect
4. **Handle loading states** with proper UI feedback
5. **Use Forms** for mutations instead of manual fetch calls
6. **Implement proper error boundaries** for each route
7. **Type your route parameters and loader data** with TypeScript
8. **Use NavLink** for navigation items that need active states
9. **Prefer `replace: true`** for redirects after successful actions
10. **Keep route components focused** on presentation, move logic to loaders/actions

## Avoid These Patterns

❌ **Don't use useEffect for data fetching in routes**
```typescript
// Bad
function UserProfile() {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);
}
```

✅ **Use route loaders instead**
```typescript
// Good
export async function loader({ params }: LoaderFunctionArgs) {
  return { user: await fetchUser(params.userId) };
}
```

❌ **Don't use window.location for navigation**
```typescript
// Bad
window.location.href = "/dashboard";
```

✅ **Use React Router's navigation**
```typescript
// Good
const navigate = useNavigate();
navigate("/dashboard");
```
