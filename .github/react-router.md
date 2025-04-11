# React Router v7 Usage Guide for VS Code

## Setup

### Installation

```bash
npx create-react-router@latest my-react-router-app
```

### Basic Configuration for Framework Mode

React Router v7 provides built-in support for frameworks like Next.js, Remix, and others. For framework mode:

1. Set up your routes directly in your framework's routing system
2. Use React Router's hooks and components within your application

## Key Components and Hooks

### Components

- `<Link>`: Navigate between routes
- `<NavLink>`: Special version of Link that adds active styling
- `<Outlet>`: Renders child routes
- `<Navigate>`: Programmatic navigation component

### Hooks

- `useParams()`: Access route parameters
- `useNavigate()`: Programmatic navigation
- `useLocation()`: Access current location
- `useRoutes()`: Programmatically define routes
- `useSearchParams()`: Access and modify query parameters
- `useMatch()`: Check if a route matches the current URL

## Basic Usage Examples

### Creating Links

```jsx
import { Link } from "react-router-dom";

function Navigation() {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/users/123">User Profile</Link>
        </nav>
    );
}
```

### Using Route Parameters

```jsx
import { useParams } from "react-router-dom";

function UserProfile() {
    const { userId } = useParams();
    return <div>User ID: {userId}</div>;
}
```

### Programmatic Navigation

```jsx
import { useNavigate } from "react-router-dom";

function LoginButton() {
    const navigate = useNavigate();
    
    const handleLogin = () => {
        // Perform login logic
        navigate("/dashboard");
    };
    
    return <button onClick={handleLogin}>Login</button>;
}
```

## Framework Mode Specifics

When using React Router with a framework:

1. The framework handles the route definitions
2. React Router provides the navigation and routing utilities
3. Data fetching is often handled by the framework's mechanisms
4. Layouts can be defined according to the framework's conventions

## Best Practices

1. Use relative paths with `to="."` or `to=".."` for easier route management
2. Leverage `<Outlet>` for nested routes
3. Use `useNavigate()` for programmatic navigation after form submissions
4. Implement loading states with framework-specific features

## VS Code Tips

1. Install the "ES7+ React/Redux/React-Native snippets" extension for quick component creation
2. Use TypeScript for better type checking with React Router hooks
3. Configure path aliases in `tsconfig.json` for cleaner imports

## Common Pitfalls

1. Not wrapping your app with the appropriate router provider
2. Mixing absolute and relative paths incorrectly
3. Using `window.location` instead of React Router's navigation methods