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
      }
    },
    data() {
      return {
        loaded: false
      }
    },
    methods: {
      /**
       * Start loading image
       */
      load() {
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
        }

        img.addEventListener('load', fn)
        img.addEventListener('error', fn)

        img.src = this.src
      }
    },
    render(h) {
      return h(this.tag, {
        // adds 'loaded' class if finished loading
        // or 'loading' class if still loading
        // TODO: allow custom class naming
        class: this.loaded ? 'loaded' : 'loading'
      }, [
        this.loaded ? this.$slots.image : this.$slots.placeholder
      ])
    },
    created() {
      // starts loading right away
      // TODO: load only when visible onscreen
      this.load()
    }
  })
}

export const install = ClazyLoad
