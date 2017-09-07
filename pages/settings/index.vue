<template>
    <div class="py3 px2">
        <page-title>Settings</page-title>

        <div class="group mb2">
          <form @submit.prevent="save" action="">
            
            <custom-field v-model="editedFields[setting.key]" v-for="setting in settings" :key="setting.id" :field="setting"></custom-field>

            <button type="submit">Save settings</button>
          </form>
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
        console.log(resp)
      },

      async create () {
        const resp = await this.$axios.$post('/admin/settings', this.newSetting)
        console.log(resp)
      }
    },

    components: {
      CustomField
    }
  }
</script>