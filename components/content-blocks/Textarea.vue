<template>
  <div class="block-textarea">
    <label>{{ field.label }}</label>
    <textarea @change="onChange" :value="defaultValue" ref="input"></textarea>
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
