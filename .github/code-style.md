# Code Style Guide


# Directory structure
- common logic should be kept in `app/lib` directory
- Ensure that all components are organized in a clear and logical manner.
- All components should be placed in the `app/components` directory.
- All routes should be placed in the `app/routes` directory. If it's an API route, it should be placed in the `app/routes/api` directory.
- All assets should be placed in the `public/assets` directory.
- All hooks should be placed in the `app/hooks` directory.
# Typescript

- Always use TypeScript.
- We should avoid using `any` or `as` as much as possible. Prefer `unknown` if we have to do something like this.

# React

- Always use React functional components.
- Always use the latest version of React.

# React Router

This project uses React Router v7.
React Router v7 provides roughly the same functionality as Remix.
The module name is "react-router".

# CSS

- Use Tailwind CSS for styling.
- Do not use inline styles unless necessary
