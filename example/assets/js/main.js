Vue.use(VueClazyLoad)

new Vue({
  el: '#app',
  data() {
    return {
      images: Array(51).fill('https://unsplash.it/500?image=')
    }
  },
  methods: {
    log() {
      console.log('loaded')
    }
  }
})
