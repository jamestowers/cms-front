<template>
  <div class="block-textarea">
    <label>{{ field.label }}</label>
    <textarea @change="onChange" :value="field.default" ref="input"></textarea>
  </div>
</template>

<script>
export default {
  props: ['field'],

  methods: {
    onChange () {
      this.$emit('input', this.$refs.input.value)
    }
  }
}
</script>

<style lang="scss">

</style>
