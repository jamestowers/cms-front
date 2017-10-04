<template>
  <div class="block-select sm-col-12 md-col6">
    <label>{{ field.label }}</label>
    <multiselect
        class="border"
        @select="onChange"
        :options="field.options"
        label="value"
        select-label="Click to select"
        deselect-label="Click to deselect">
      </multiselect>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'

export default {
  props: ['field'],

  methods: {
    onChange (data) {
      this.$emit('input', data.key)
    }
  },

  components: {
    Multiselect
  }
}
</script>

<style lang="scss">

</style>
