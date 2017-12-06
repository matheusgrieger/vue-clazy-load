# Roadmap

These are planned features for Vue Clazy Load in the future.

---

## 0.x.x

- Improved documentation
- Custom state class naming

## 1.0.0

- Remove global definition from Webpack configuration.
  **Why?** It adds too much to the code. I have already included an additional export so you can import the entire module or just the parts that interest you (install function, component object). By doing this, the package size will be reduced and a simple condition will be made to add `VueClazyLoad` to the `window` object, if needed.
- Remove `image` slot compatibility
- Add optional `error` slot

---

## Feature requests

If you feel the need of some feature that is currently not implemented, please, file an inssue and I'll get on to that.
