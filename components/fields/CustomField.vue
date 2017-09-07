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

      <!-- TEXTAREA -->
      <textarea 
        v-else-if="field.field_type === 'textarea'" 
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

  </div>
</template>

<script>
  import Multiselect from 'vue-multiselect'

  export default {
    props: {
      field: {
        type: Object,
        required: true
      }
    },

    methods: {
      updateValue (e) {
        this.$emit('input', e.currentTarget.value)
      }
    },

    components: {
      Multiselect
    }
  }
</script>
