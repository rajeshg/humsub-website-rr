# Plan to Redirect "/" to "/hum-sub-diwali-2025" Temporarily

## Overview
This plan outlines a temporary redirect from the root path ("/") to "/hum-sub-diwali-2025" while ensuring the home button still provides access to the original home content. The redirect will be permanent until manually reverted.

## Key Assumptions and Analysis
- **Current Routing Setup**: Routes are file-based in `app/routes/`. The root ("/") is the index route using `home.tsx`, but there's no separate "/home" route yet. The target is `hum-sub-diwali-2025.tsx`. Home buttons likely link to "/".
- **Redirect Mechanism**: Use React Router v7's `redirect` in the loader of `root.tsx` (which handles the index route).
- **Home Button Behavior**: Add a "/home" route and update home button links to "/home" to bypass the redirect.
- **Temporary Nature**: Changes are straightforward and reversible on request.

## Proposed Steps
1. **Analyze Current Files**:
   - Read `root.tsx`, `home.tsx`, `hum-sub-diwali-2025.tsx`, and navigation components (e.g., `main-layout.tsx`) to confirm setup.

2. **Add "/home" Route**:
   - Update `routes.ts` to include `route("home", "routes/home.tsx")` inside the main layout, so "/home" serves the original home content.

3. **Implement Permanent Redirect for "/"**:
   - Update `root.tsx` to always redirect "/" to "/hum-sub-diwali-2025" via its loader:
     ```typescript
     export function loader() {
       return redirect("/hum-sub-diwali-2025");
     }
     ```
   - This ensures every visit to "/" immediately redirects to the target route.

4. **Adjust Home Button Links**:
   - Change home button links from "/" to "/home" in relevant components to preserve original home access.

5. **Testing and Validation**:
   - Run `vite dev` and test:
     - Accessing "/" should redirect to "/hum-sub-diwali-2025".
     - Home button should load "/home" with original content.
     - Other routes remain unaffected.
   - Run `vitest run` for regressions.
   - Check accessibility and console errors.

6. **Rollback Strategy**:
   - When ready, remove the "/home" route from `routes.ts`, remove the redirect from `root.tsx`, and revert home button links to "/".

## Benefits and Trade-offs
- **Pros**: Minimal changes, easy to implement/revert, maintains home access.
- **Cons**: Requires updating links; bookmarked "/" will redirect.
- **Alternatives**: Client-side redirect or splash page (more complex).

This plan is ready for implementation.