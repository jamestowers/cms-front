<template>
  <div class="form-group">

      <label :for="field.key">{{ field.label }}</label>

      <!-- SELECT -->
      <multiselect
        v-if="field.field_type === 'select'"
        @input="updateValue" 
        :options="field.options"
        select-label="Click to select"
        deselect-label="Click to deselect"
        ></multiselect>

      <!-- FILE -->
      <file
        v-if="field.field_type === 'file'"
        @input="getFileUrl"
        action="/media/upload"
        :label="field.value || 'Choose File'"
        accept="image/*"
        ></file>

      <!-- TEXTAREA -->
      <textarea 
        v-else-if="field.field_type === 'textarea'" 
        v-model="field.value"
        @input="updateValue" 
        value="field.value" 
        :id="field.key" 
        cols="30" rows="10"
        ></textarea>
      
      <!-- TEXT/EMAIL/PASSWORD -->
      <input 
        v-else
        @input="updateValue" 
        :id="field.key" 
        :value="field.value" 
        :type="field.field_type"
        >

        <div v-if="field.description" class="help-block">
          {{ field.description }}
        </div>

  </div>
</template>

<script>
  import Multiselect from 'vue-multiselect'
  import File from '~/components/fields/File'

  export default {
    props: {
      field: {
        type: Object,
        required: true
      }
    },

    methods: {
      updateValue (e) {
        let value = e.currentTarget ? e.currentTarget.value : e
        this.$emit('input', value)
      },
      getFileUrl (e) {
        this.$emit('input', e.url)
      }
    },

    components: {
      Multiselect,
      File
    }
  }
</script>
