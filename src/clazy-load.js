/*!
 * Vue Clazy Load
 * Component-based lazy (CLazy) load images in Vue.js 2
 * @author Matheus Grieger
 * @version 0.0.1
 */
function ClazyLoad(Vue) {
  Vue.component('clazy-load', {
    name: 'ClazyLoad',
    props: {
      /**
       * HTML/Component tag name to be used in place of the component
       * @type {Object}
       * @default div
       */
      tag: {
        type: String,
        default: 'div'
      },
      /**
       * Image source URL
       * @type {Object}
       * @required
       */
      src: {
        type: String,
        required: true
      },
      /**
       * IntersectionObserver root element
       * @type {Object}
       */
      element: {
        type: String
      },
      /**
       * IntersectionObserver threshold
       * @type {Object}
       */
      threshold: {
        type: [Array, Number],
        default: () => {
          return [0, 0.5, 1]
        }
      }
    },
    data() {
      return {
        loaded: false,
        observer: null
      }
    },
    methods: {
      /**
       * Start loading image
       */
      load() {
        if (!this.loaded) {
          // fake image
          let img = new Image
          // with this function we can use it in multiple places
          // like the two listeners below
          const fn = () => {
            this.loaded = true
            // emits 'load' event upwards
            this.$emit('load')
            // discard fake image
            img = null

            // erases observer
            this.observer.disconnect()
            this.observer = null
          }

          img.addEventListener('load', fn)
          // TODO: configurable error function and/or slot
          img.addEventListener('error', fn)

          img.src = this.src
        }
      },

      /**
       * Creates IntersectionObserver instance and observe current element
       */
      observe() {
        let options = {
          threshold: this.threshold,
          root: this.element ? document.querySelector(this.element) : null,
          rootMargin: '0px'
        }

        // creates IO instance
        this.observer = new IntersectionObserver((entries) => {
          // as we instantiated one for each component
          // we can directly access the first index
          // TODO: configurable intersectionRatio
          if (entries[0].intersectionRatio >= 0.4) {
            this.load()
          }
        }, options)

        // start observing main component
        this.observer.observe(this.$refs.component)
      }
    },
    render(h) {
      return h(this.tag, {
        // adds 'loaded' class if finished loading
        // or 'loading' class if still loading
        // TODO: allow custom class naming
        class: this.loaded ? 'loaded' : 'loading',
        ref: 'component'
      }, [
        this.loaded ? this.$slots.image : this.$slots.placeholder
      ])
    },
    mounted() {
      // start observing the element visibility
      // need to request animation frame to ensure the element is in the DOM
      requestAnimationFrame(this.observe)
    }
  })
}

export const install = ClazyLoad
