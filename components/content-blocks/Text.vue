<template>
  <div class="block-text">
    <label>{{ field.label }}</label>
    <input @change="onChange" type="text" :value="defaultValue" ref="input" />
  </div>
</template>

<script>
export default {
  props: ['value', 'field'],

  computed: {
    defaultValue () {
      return this.value ? this.value : this.field.default
    }
  },

  methods: {
    onChange () {
      this.$emit('input', this.$refs.input.value)
    }
  }
}
</script>

<style lang="scss">

</style>
