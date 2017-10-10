<template>
  <div class="block-select sm-col-12 md-col6">
    <label>{{ field.label }}</label>
    <multiselect
        class="border"
        @select="onChange"
        :options="field.options"
        :value="defaultValue"
        label="value"
        track-by="key"
        :hide-selected="true"
        select-label="Click to select"
        deselect-label="Click to deselect">
      </multiselect>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'

export default {
  props: ['value', 'field'],

  methods: {
    onChange (data) {
      this.$emit('input', data.key)
    }
  },

  computed: {
    defaultValue () {
      return this.field.options.find(x => x.key === this.value)
    }
  },

  components: {
    Multiselect
  }
}
</script>

<style lang="scss">

</style>
