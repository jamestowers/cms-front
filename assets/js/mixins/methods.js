export default {
  methods: {
    loadScript (src, callback) {
      var script = document.createElement('script')
      script.type = 'text/javascript'
      if (callback)script.onload = callback
      document.getElementsByTagName('head')[0].appendChild(script)
      script.src = src
    }
  }
}
