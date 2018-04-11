/*!
 * Vue Clazy Load
 * Component-based lazy (CLazy) load images in Vue.js 2
 * @author Matheus Grieger
 * @version 0.4.2
 */
const ClazyLoadComponent = {
  name: 'ClazyLoad',
  props: {
    /**
     * HTML/Component tag name to be used in place of the component
     * @type {String}
     * @default div
     */
    tag: {
      type: String,
      default: 'div'
    },
    /**
     * Image source URL
     * @type {String}
     * @required
     */
    src: {
      type: String,
      required: true
    },
    /**
     * IntersectionObserver root element
     * @type {String}
     */
    element: String,
    /**
     * IntersectionObserver threshold
     * @type {Array, Number}
     */
    threshold: {
      type: [Array, Number],
      default: () => {
        return [0, 0.5, 1]
      }
    },
    /**
     * InserectionObserver visibility ratio
     * @type {Number}
     */
    ratio: {
      type: Number,
      default: 0.4,
      validator(value) {
        // can't be less or equal to 0 and greater than 1
        return value > 0 && value <= 1
      }
    },
    /**
     * IntersectionObserver root margin
     * @type {String}
     */
    margin: {
      type: String,
      default: '0px'
    },
    /**
     * Optional CORS mode ("anonymous" | "use-credentials")
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-crossorigin
     * @type {String}
     */
    crossorigin: {
      type: String,
      default: null,
      validator(value) {
        return value === 'anonymous' || value === 'use-credentials'
      }
    },
    /**
     * Class added to element when it finishes loading
     * @type {String}
     * @default loaded
     */
    loadedClass: {
      type: String,
      default: 'loaded'
    },
    /**
     * Class added to element while it is loading
     * @type {String}
     */
    loadingClass: {
      type: String,
      default: 'loading'
    },
    /**
     * Class added to element if loading failed
     * @type {String}
     */
    errorClass: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      loaded: false,
      observer: null,
      errored: false
    }
  },
  methods: {
    /**
     * Start loading image
     */
    load() {
      // emits 'loading' event upwards
      this.$emit('loading')

      // disconnect observer
      // so it doesn't load more than once
      this.observer.disconnect()

      if (!this.loaded) {
        // fake image
        let img = new Image

        img.addEventListener('load', () => {
          this.loaded = true
          // emits 'load' event upwards
          this.$emit('load')

          clear()
        })

        img.addEventListener('error', (event) => {
          this.errored = true
          // emits 'error' event upwards
          // adds the original event as argument
          this.$emit('error', event)

          clear()
        })

        // function used to clear variables from memory
        const clear = () => {
          // discard fake image
          img = null
          // remove observer from memory
          this.observer = null
        }

        // CORS mode configuration
        if (this.crossorigin !== null) {
          img.crossOrigin = this.crossorigin
        }

        img.src = this.src
      }
    },

    /**
     * Creates IntersectionObserver instance and observe current element
     */
    observe() {
      const options = {
        threshold: this.threshold,
        root: this.element ? document.querySelector(this.element) : null,
        rootMargin: this.margin
      }

      // creates IO instance
      this.observer = new IntersectionObserver((entries) => {
        // as we instantiated one for each component
        // we can directly access the first index
        if (entries[0].intersectionRatio >= this.ratio) {
          this.load()
        }
      }, options)

      // start observing main component
      this.observer.observe(this.$el)
    }
  },
  render(h) {
    // class to be added to element indicating load state
    const elementClass = this.loaded ? this.loadedClass : this.loadingClass

    return h(this.tag, {
      // if loading failed adds error class if exists,
      // otherwhise adds elementClass defined above
      class: this.errored && this.errorClass ? this.errorClass : elementClass
    }, [
      this.loaded
        ? this.$slots.default || this.$slots.image // allows for "default" slot
        : this.$slots.placeholder
    ])
  },
  mounted() {
    // start observing the element visibility
    this.$nextTick(this.observe)
  }
}

// Export install function for CDN embeds
export const install = (Vue) => {
  Vue.component('clazy-load', ClazyLoadComponent)
}

// Component object
export const VueClazyLoad = ClazyLoadComponent

// Exports default object for ES6 modules
export default {
  install
}
