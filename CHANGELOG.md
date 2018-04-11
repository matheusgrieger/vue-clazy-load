# Changelog

## v0.4.2

- **FIX** restored install function for ES6 modules

## v0.4.1

- **FIX** accidentaly removed install function

## v0.4.0

- **NEW** custom loading, loaded and error class naming
- **NEW** support for CORS (thanks to @gerardo-rodriguez)
- **FIX** last update was not present on NPM, somehow
- **FIX** improved docs

## v0.3.0

- **NEW** extra `component` export so you can install the component where needed, not only globally
- **NEW** don't need to explicitly add `slot="image"` to your tags, the `default` slot will be used prioritarily, if found
  Note: if both are present, only the `default` will be used.
- **FIX** changed `requestAnimationFrame` to `$nextTick`, which reduces errors of undefined elements
- **FIX** removed main element `ref` to use `this.$el` instead, reducing processing

## v0.2.0

- **NEW** error event for when image fails to load
- **NEW** margin option for IntersectionObserver's `rootMargin`
- **NEW** ratio option for comparing element's visible percentage
- **FIX** (some) bad documentation grammar

## v0.1.5

- **FIX** build error when using Webpack and `import`ing

## v0.1.4

- **FIX** `import` was not working in Babel

## v0.1.3

- **FIX** double loading on fast scrolling and/or slow connections

## v0.1.2

- **FIX** Observer being `null`ified before disconnecting

## v0.1.1

Failed version.

## v0.1.0

Initial release.
