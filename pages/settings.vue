<template>
    <div class="py3 px2">
        <page-title>Settings</page-title>

        <form action="">
            <div class="form-group">
                <label for="site-name">Site name</label>
                <input v-model="settings.site_name" type="text" id="site-name">
            </div>
            <div class="form-group">
                <label for="tagline">Tagline</label>
                <input v-model="settings.tagline" type="text" id="tagline">
            </div>
            <div class="form-group">
                <label for="admin-email">Admin Email Address</label>
                <input v-model="settings.admin_email" type="email" id="admin-email">
            </div>
            <div class="form-group">
                <label for="logo">Logo</label>
                <input v-model="settings.logo" type="text" id="logo">
            </div>
        </form>
    </div>
</template>

<script>
    import axios from '~/plugins/axios'

    export default {

      async asyncData ({ params }) {
        let { data } = await axios.get('/admin/settings')
        return { settings: data }
      },

      data () {
        return {
          settings: {
            site_name: null,
            tagline: null,
            admin_email: null,
            logo: null
          }
        }
      }
    }
</script>