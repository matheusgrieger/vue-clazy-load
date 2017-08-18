Vue.use(VueClazyLoad)

new Vue({
  el: '#app',
  data() {
    return {
      images: Array(51).fill('https://unsplash.it/500')
    }
  },
  methods: {
    log() {
      console.log('loaded')
    }
  }
})
