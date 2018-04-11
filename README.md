# Vue Clazy Load

> _Claziest_ lazy loader out there!

Component-based image lazy loader for Vue.js 2

[![npm](https://img.shields.io/npm/dm/vue-clazy-load.svg)](https://www.npmjs.com/package/vue-clazy-load)
[![npm](https://img.shields.io/npm/v/vue-clazy-load.svg)](https://www.npmjs.com/package/vue-clazy-load)
[![npm](https://img.shields.io/npm/l/vue-clazy-load.svg)](https://www.npmjs.com/package/vue-clazy-load)
[![GitHub pull requests](https://img.shields.io/badge/PR-welcome-green.svg)]()
[![GitHub stars](https://img.shields.io/github/stars/matheusgrieger/vue-clazy-load.svg?style=social&label=Star)]()

Swaps between your image and another component when loading images, allowing you to use loaders from [component frameworks](https://github.com/vuejs/awesome-vue#frameworks) such as spinners and progress bars. This method also allows transitioning between the two components.

## Demo

Check out the [example page](https://matheusgrieger.github.io/vue-clazy-load/example/index.html).

## Installation

Install with npm or yarn:

```sh
npm install vue-clazy-load
yarn add vue-clazy-load
```

Then simply import it to your project through the method that suits you best

* ES6+
  ```js
  import VueClazyLoad from 'vue-clazy-load'
  ```

* Common/Require
  ```js
  var VueClazyLoad = require('vue-clazy-load')
  ```

And install into your Vue instance

```js
Vue.use(VueClazyLoad)
```

You can import it into specific components if you don't want to register Clazy Load globally

```js
import { VueClazyLoad } from 'vue-clazy-load'

export default {
  components: {
    VueClazyLoad
  }
}
```

Also available through Unpkg CDN

```html
<script src="https://unpkg.com/vue-clazy-load/dist/vue-clazy-load.min.js"></script>
```

## Documentation

Clazy Load works without any JS configuration as is, all you need is the basic HTML markup:

```html
<clazy-load src="https://unsplash.it/500">
  <img src="https://unsplash.it/500">
  <div class="preloader" slot="placeholder">
    Loading message
  </div>
</clazy-load>
```
The only required prop you must set is `src` that must correspond to your image's.

### Props

All props supported by Clazy Load are listed below with their types and explanation.

#### `src`

* Type: string
* Default: none
* _Required_

Source of the image to be loaded. Must match your `<img>` tag src.

#### `tag`

* Type: string
* Default: `"div"`

What tag the component should render to.

#### `element`

* Type: string
* Default: `null`

Selector for Intersecion Observer's root element. Leave blank/null to use _viewport_.

#### `threshold`

* Type: Array | number
* Default: `[0, 0.5, 1]`

Values for Intersection Observer's threshold option.

#### `ratio`

* Type: number
* Default: `0.4`

Percent of the element that needs to be visible to trigger loading. Must be > 0 and <= 1.

#### `margin`

* Type: string
* Default: `"0px"`

Intersection Observer's margin option.

You can read more on [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) about every Intersection Observer-specific prop and what they do.

#### `crossorigin`

* Type: string
* Default: `null`
* Valid options: `"anonymous"` | `"use-credentials"`

Sets image's `crossOrigin` option and allows loading external images. Useful for Service Workers and caching.

#### `loadedClass`

* Type: string
* Default: `"loaded"`

#### `loadingClass`

* Type: string
* Default: `"loading"`

#### `errorClass`

* Type: string
* Default: `null`

All classes are added to the **root** element, not the image itself.

### Events

#### `loading`

Image started loading and placeholder is visible.

#### `load`

* Param: native load event

Image finished loading and is now visible.

#### `error`

* Param: native error event

Could not load image. **Image is not shown, placeholder still visible.**

### Compatibility

Vue Clazy Load uses the Intersection Observer API to watch for the element visibility on screen. The advantages are native optimization from each browser and no need to implement a custom solution that may be buggy and increase file size. The only caveat to this approach is that this API is quite new, so older browsers do not support it.

If your application needs to be backwards compatible with IE and others, there are polyfills available. I personally recommend [Polyfill.io](https://polyfill.io/). You can check their documentation on how to add it to your website, or simply include the following tag if you're not using any other polyfills:

```html
<script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=IntersectionObserver"></script>
```

## Changelog

Check out [changelog](CHANGELOG.md) file.

## Roadmap

Check [roadmap](ROADMAP.md) file.

## Contributing

Issues, questions and feature requests are welcome. If you can cover some problem, pull requests are also very welcome!

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2017-2018, Matheus Grieger
