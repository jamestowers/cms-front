<template>
  <div id="login-panel" class="px4 py3 group bg-darkest">
    <div class="text-center">
      <h1 class="mb0">Log in</h1>
    </div>

    <form @submit.prevent="getToken" action="">
      <div class="form-group">
        <label for="email">Email Address</label>
        <input v-model="username" type="email" id="email">
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input v-model="password" type="password" id="password">
      </div>

      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
    export default {
      middleware: 'no-auth',
      layout: 'auth',
      data () {
        return {
          username: null,
          password: null,
          access_token: null,
          refresh_token: null,
          token_expires_in: null
        }
      },

      methods: {
        getToken () {
          let vm = this
          let creds = {
            grant_type: 'password',
            client_id: 5,
            client_secret: 'ZNG51TpnptstHUnbxDk2mLufekPaEOflWD2tRpqg',
            username: vm.username,
            password: vm.password
          }
          vm.$store.dispatch('auth/login', { fields: creds, endpoint: 'oauth/token' })
        }
      }
    }
</script>