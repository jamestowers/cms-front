<template>
  <div class="block-radio sm-col-12 md-col6">
    <label>{{ field.label }}</label>
    <ul class="inline">
      <li v-for="option in field.options" :key="option.key" class="radio-button">
        <input type="radio" :id="option.key" :value="option.key" v-model="picked">
        <label :for="option.key" class="p1">{{ option.value }}</label>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['value', 'field'],

  data () {
    return {
      picked: this.field.default
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
