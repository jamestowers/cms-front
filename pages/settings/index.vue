<template>
  <div class="flex mxn2">
    <div class="py3 px3 sm-col-12 md-col-8 lg-col-8">
        <page-title>Settings</page-title>

        <div class="group mb2">
          <form @submit.prevent="save" action="">
            
            <div v-for="setting in settings" :key="setting.id">
              <custom-field v-model="editedFields[setting.key]" :field="setting"></custom-field>
              <nuxt-link to="/settings/create" class="small">Edit setting</nuxt-link>
            </div>
            <button type="submit">Save settings</button>
          </form>
        </div>
    </div>

    <div class="p3 sm-col-12 md-col-4 lg-col-4 bg-grey">
      <h2><i class="big icon-basic-pin2 v-align"></i> Hint</h2>
      <p>Modify various settings for the site here.</p>

      <nuxt-link to="/settings/create" class="btn-sm" role="button">Add new setting</nuxt-link>
    </div>
  </div>
</template>

<script>
  import CustomField from '~/components/Fields/CustomField'
  
  export default {
    async asyncData ({ params, app }) {
      const settings = await app.$axios.$get('/admin/settings/edit')
      return { settings }
    },

    data () {
      return {
        settings: [],
        editedFields: {},
        newSetting: {
          key: null,
          value: null,
          label: null,
          description: null,
          field_type: null,
          options: null
        }
      }
    },

    methods: {
      async save () {
        const resp = await this.$axios.$put('/admin/settings', this.editedFields)
        if (resp.status === 'success') {
          this.$store.commit('status/set', resp.message)
        }
      }
    },

    components: {
      CustomField
    }
  }
</script>