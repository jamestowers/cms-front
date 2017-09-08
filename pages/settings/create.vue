<template>
  <div class="py3 px2">
    <page-title>Add a new setting</page-title>

    <div class="mb2 pt2 border-top group">
          
      <h2>Create a new setting</h2>
      
      <form @submit.prevent="create" action="">

        <div class="form-group">
          <label for="setting_name">Name</label>
          <input @change="updateKey" v-model="label" type="text" id="setting_name">
          <div class="help-block">The name of the setting, as you want it displayed on the settings page</div>
        </div>

        <div class="form-group">
          <label for="setting_key">Key</label>
          <input v-model="key" type="text" id="setting_key">
          <div class="help-block">Unique key to use to store this setting, All lowercase, alpha-numeric and _ - characters only</div>
        </div>
        
        <div class="form-group">
          <label for="description">Description</label>
          <input v-model="description" type="text" id="description">
          <div class="help-block">Add a description to the setting field, like this...</div>
        </div>

        <div class="form-group">
          <label for="field_type">Field Type</label>
          <multiselect
            v-model="field_type"
            :options="fieldTypes"
            label="value"
            track-by="value"
            select-label="Click to select"
            deselect-label="Click to deselect">
          </multiselect>
          <div class="help-block">What type of field to us ein the settings page</div>
        </div>
        
        <div v-if="optionsVisible" class="form-group">
          <label for="options">Options</label>
          <textarea v-model="options" id="options"></textarea>
          <div class="help-block">Add options, one per line, for the field above</div>
        </div>

        <button type="submit">Create setting</button>

      </form>
    </div>
  </div>
</template>

<script>
  import Multiselect from 'vue-multiselect'
  import _ from 'lodash'

  export default {
    data () {
      return {
        key: null,
        value: null,
        label: null,
        description: null,
        field_type: null,
        options: null,
        fieldTypes: [
          { key: 'text', value: 'Text' },
          { key: 'email', value: 'Email' },
          { key: 'textarea', value: 'Textarea' },
          { key: 'select', value: 'Select' },
          { key: 'checkbox', value: 'Checkbox' },
          { key: 'radio', value: 'Radio' }
        ]
      }
    },

    computed: {
      optionsVisible () {
        return this.field_type && ['select', 'checkbox', 'radio'].includes(this.field_type.key)
      }
    },

    methods: {
      updateKey (name) {
        console.log(name.target.value)
        if (this.key === null || this.key === '') {
          this.key = _.snakeCase(name.target.value)
        }
      },
      async create () {
        const resp = await this.$axios.$post('/admin/settings', {
          key: this.key,
          value: this.value,
          label: this.label,
          description: this.description,
          field_type: this.field_type.key,
          options: this.options.replace(/^\s+|\s+$/g, '').split('\n')
        })
        console.log(resp)
      }
    },

    components: {
      Multiselect
    }
  }
</script>
