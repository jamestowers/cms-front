<template>
    <div class="py3 px2">
        <page-title>Authentication</page-title>

        <div class="sm-col-12 md-col-6 p2">
          <form @submit.prevent="getToken" action="">
              <div class="form-group">
                <label for="email">Email Address</label>
                <input v-model="username" type="email" id="email">
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input v-model="password" type="password" id="password">
              </div>

              <button type="submit">Get Access Token</button>
          </form>
        </div>

        <div class="sm-col-12 md-col-6 p2">
          <h2>Access Token</h2>
          <textarea v-model="access_token" id="" cols="30" rows="10"></textarea>
          <label>Expires in:</label>
          {{ token_expires_in }}
          <h2>Refresh Token</h2>
          <textarea v-model="refresh_token" id="" cols="30" rows="10"></textarea>
        </div>
    </div>
</template>

<script>
    import axios from '~/plugins/axios'

    export default {

      data () {
        return {
          username: null,
          password: null,
          access_token: null,
          refresh_token: null,
          token_expires_in: null
        }
      },

      created () {
        this.getToken()
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
          axios.post('v1/oauth/token', creds)
            .then(response => {
              vm.access_token = response.data.access_token
              vm.refresh_token = response.data.refresh_token
              vm.token_expires_in = response.data.expires_in
              localStorage.setItem('token', response.data.access_token)
            })
            .catch(response => {
              // List errors on response...
            })
        }
      }
    }
</script>