<template>
  <div id="login-panel" class="px4 py3 group">
    <div class="text-center">
      <h1 class="mb0">Bye bye.</h1>
      <nuxt-link to="/auth/login" class="btn-sm mt2" role="button">Log back in</nuxt-link>
    </div>
  </div>
</template>

<script>
  export default {
    middleware: 'auth',
    layout: 'auth',
    data () {
      return {
        // 
      }
    },

    created () {
      this.logout()
    },

    methods: {
      logout () {
        this.$store.dispatch('auth/logout', { endpoint: 'oauth/tokens/', appendToken: true })
      }
    }
  }
</script>