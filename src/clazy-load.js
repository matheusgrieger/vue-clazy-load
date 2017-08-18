/*!
 * Component-based lazy (CLazy) load images in Vue.js 2
 * @author Matheus Grieger
 * @version 0.0.1
 */
const ClazyLoad = {
  install(Vue) {
    Vue.component('ClazyLoad', {
      name: 'ClazyLoad',
      props: {
        tag: {
          required: false,
          type: String,
          default: 'div'
        }
      },
      data() {
        return {
          loaded: false
        }
      },
      computed: {
        src() {
          return this.$slots.image[0].data.attrs.src
        }
      },
      methods: {
        load() {
          let img = new Image
          const fn = () => {
            this.loaded = true
            this.$emit('loaded')
            img = null
          }

          img.addEventListener('load', fn)
          img.addEventListener('error', fn)

          img.src = this.src
        }
      },
      render(h) {
        return h(this.tag, {
          class: this.loaded ? 'loaded' : 'loading'
        }, [
          this.loaded ? this.$slots.image : this.$slots.placeholder
        ])
      },
      created() {
        this.load()
      }
    })
  }
}

export default ClazyLoad
