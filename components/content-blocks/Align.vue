<template>
  <div class="block-align group">
    <label>{{ field.label }}</label>
    <ul>
      <li v-for="option in options" :class="{ 'active': value === option.key }" :key="option.key" class="mr2">
        <a @click.prevent="onChange(option.key)" href="#" v-html="option.icon"></a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['value', 'field'],

  data () {
    return {
      options: [
        { key: 'left', value: 'Left', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 64 64"><style>.a{fill:none;stroke-width:2;stroke:#000;}</style><line y1="7" x2="64" y2="7" class="a"/><line y1="17" x2="46" y2="17" class="a"/><line y1="27" x2="64" y2="27" class="a"/><line y1="37" x2="50" y2="37" class="a"/><line y1="47" x2="64" y2="47" class="a"/><line y1="57" x2="54" y2="57" class="a"/></svg>' },
        { key: 'center', value: 'Center', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 64 64"><style>.a{fill:none;stroke-width:2;stroke:#000;}</style><line y1="7" x2="64" y2="7" class="a"/><line x1="9" y1="17" x2="55" y2="17" class="a"/><line y1="27" x2="64" y2="27" class="a"/><line x1="7" y1="37" x2="57" y2="37" class="a"/><line y1="47" x2="64" y2="47" class="a"/><line x1="5" y1="57" x2="59" y2="57" class="a"/></svg>' },
        { key: 'right', value: 'Right', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 64 64"><style>.a{fill:none;stroke-width:2;stroke:#000;}</style><line x1="64" y1="7" y2="7" class="a"/><line x1="64" y1="17" x2="18" y2="17" class="a"/><line x1="64" y1="27" y2="27" class="a"/><line x1="64" y1="37" x2="14" y2="37" class="a"/><line x1="64" y1="47" y2="47" class="a"/><line x1="64" y1="57" x2="10" y2="57" class="a"/></svg>' }
      ]
    }
  },

  methods: {
    onChange (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~assets/scss/global/variables";
  li{
    border-radius: $border-radius;
    float: left;
    padding: 6px 8px;
    &.active{
      background: $grey8;
    }
    a{
      display: block;
    }
  }
</style>
