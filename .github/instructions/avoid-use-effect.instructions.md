---
description: Avoid useEffect
applyTo: "*.tsx,*.jsx"
---
### Avoid useEffect

[You Might Not Need `useEffect`](https://react.dev/learn/you-might-not-need-an-effect)

Instead of using `useEffect`, use ref callbacks, event handlers with
`flushSync`, css, `useSyncExternalStore`, etc.

```tsx
// This example was ripped from the docs:
// ✅ Good
function ProductPage({ product, addToCart }) {
	function buyProduct() {
		addToCart(product)
		showNotification(`Added ${product.name} to the shopping cart!`)
	}

	function handleBuyClick() {
		buyProduct()
	}

	function handleCheckoutClick() {
		buyProduct()
		navigateTo('/checkout')
	}
	// ...
}

useEffect(() => {
	setCount(count + 1)
}, [count])

// ❌ Avoid
function ProductPage({ product, addToCart }) {
	useEffect(() => {
		if (product.isInCart) {
			showNotification(`Added ${product.name} to the shopping cart!`)
		}
	}, [product])

	function handleBuyClick() {
		addToCart(product)
	}

	function handleCheckoutClick() {
		addToCart(product)
		navigateTo('/checkout')
	}
	// ...
}
```

There are a lot more examples in the docs. `useEffect` is not banned or
anything. There are just better ways to handle most cases.

Here's an example of a situation where `useEffect` is appropriate:

```tsx
// ✅ Good
useEffect(() => {
	const controller = new AbortController()

	window.addEventListener(
		'keydown',
		(event: KeyboardEvent) => {
			if (event.key !== 'Escape') return

			// do something based on escape key being pressed
		},
		{ signal: controller.signal },
	)

	return () => {
		controller.abort()
	}
}, [])
```