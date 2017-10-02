<template>
  <nav class="sub-nav sm-col-12 md-col-4">
    <ul class="bg-grey7 text-center">
      <li class="nav-header p2 text-center bg-grey4 text-white">Blocks</li>
      <li v-for="block in blocks" :key="block.id">
        <nuxt-link :to="{ name: 'blocks-block', params: { block: block.id } }" class="px3 py2">{{ block.title }}</nuxt-link>
        <ul class="bg-grey8">
          <li class="nav-header p2 bg-grey5 text-white">Fields</li>
          <span v-if="block.fields.length">
            <li v-for="field in block.fields" :key="field.id">
              <nuxt-link :to="{ name: 'blocks-block-fields-field', params: { block: block.id, field: field.id } }" class="px3 py2">{{ field.label }}</nuxt-link>
            </li>
          </span>
          <button class="btn-sm m2">New field</button>
        </ul>
      </li>
      <button class="btn-sm m2">New block type</button>
    </ul>
  </nav>
</template>

<script>
export default {
  computed: {
    blocks () {
      return this.$store.state['content-blocks'].items
    }
  }
}
</script>

<style lang="scss">
  @import "~assets/scss/global/variables";

  nav.sub-nav{
    max-width:380px;
    ul{
      position: relative;
      height: 100%;
      width:50%;
      li{
        font-size: 1rem;
        font-family: $font-subheader;
        text-transform: uppercase;
        text-align: center;
        a.active-ancestor,
        a.active{
          background: $grey6;
          & + ul{
            display: block
          }
        }
        ul{
          display: none;
          position: absolute;
          left: 100%;
          top:0;
          width:100%;
        }
      }
    }
    a{
      color: $grey2;
      display: block;
      font-weight: $font-weight-normal;
    }
  }
</style>
