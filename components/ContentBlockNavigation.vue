<template>
  <nav class="sub-nav sm-col-12 md-col-4">
    <ul class="bg-grey7 text-center">
      <li class="nav-header p2 text-center bg-grey4 text-white">Blocks</li>
      <li v-for="block in blocks" :key="block.id">
        <nuxt-link :to="{ name: 'blocks-block', params: { block: block.id } }" class="px3 py2">{{ block.title }}</nuxt-link>
        <ul class="bg-grey8">
          <li class="nav-header p2 bg-grey5 text-white">Fields</li>
          <span v-if="block.fields.length">
            <draggable v-model="block.fields" @start="dragging=true" @end="dragging=false">
              <li v-for="field in block.fields" :key="field.id">
                <nuxt-link :to="{ name: 'blocks-block-fields-field', params: { block: block.id, field: field.id } }" class="px3 py2"> {{ field.label }} <br /><span class="field-name">{{ field.name }}</span></nuxt-link>
              </li>
            </draggable>
          </span>
          <nuxt-link :to="{ name: 'blocks-block-fields-field', params: { block: block.id, field: 'create' } }" class="m2 btn-sm text-white" role="button">New field</nuxt-link>
        </ul>
      </li>
      <nuxt-link :to="{ name: 'blocks-block', params: { block: 'create' } }" class="m2 btn-sm text-white" role="button">New block type</nuxt-link>
    </ul>
  </nav>
</template>

<script>
import Draggable from 'vuedraggable'

export default {
  computed: {
    blocks () {
      return this.$store.state['content-blocks'].items
    }
  },
  components: {
    Draggable
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
        .field-name{
          text-transform: none;
          color: $grey5;
        }
        a.active-ancestor,
        a.active{
          &:not([role="button"]){
            background: $grey6;
            & + ul{
              display: block
            }
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
