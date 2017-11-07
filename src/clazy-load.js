/*!
 * Vue Clazy Load
 * Component-based lazy (CLazy) load images in Vue.js 2
 * @author Matheus Grieger
 * @version 0.2.0
 */
const ClazyLoad = {
  install(Vue) {
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
        element: String,
        /**
         * IntersectionObserver threshold
         * @type {Object}
         */
        threshold: {
          type: [Array, Number],
          default: () => {
            return [0, 0.5, 1]
          }
        },
        /**
         * InserectionObserver visibility ratio
         * @type {Object}
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
         * @type {Object}
         */
        margin: {
          type: String,
          default: '0px'
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

            img.src = this.src
          }
        },

        /**
         * Creates IntersectionObserver instance and observe current element
         */
        observe() {
          if (!this.$refs.component) {
            return;          
          }
          
          let options = {
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
          this.loaded
            ? this.$slots.image
            : this.$slots.placeholder
        ])
      },
      mounted() {
        // start observing the element visibility
        // need to request animation frame to ensure the element is in the DOM
        requestAnimationFrame(this.observe)
      }
    })
  }
}

export default ClazyLoad
export const install = ClazyLoad.install
