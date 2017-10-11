<template>

  <nav class="sub-nav sm-col-12 md-col-4">
    
    <ul class="bg-grey7 text-center">
      <li class="nav-header p2 text-center bg-grey5 text-white">Blocks</li>
      <draggable 
        v-model="block" 
        @start="dragging=true" 
        @end="dragging=false"
        >
        <li v-for="block in blocks" :key="block.id">
          <nuxt-link :to="{ name: 'blocks-block', params: { block: block.id } }" class="px3 py2">{{ block.title }}</nuxt-link>
        </li>
      </draggable>
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
  .nav-header{
    font-weight: $font-weight-bold;
  }
  nav.sub-nav{
    max-width:200px;
    ul{
      position: relative;
      height: 100%;
      width:100%;
      li{
        font-size: 1rem;
        font-family: $font-body;
        text-transform: uppercase;
        text-align: center;
        .field-name{
          text-transform: none;
          color: $grey5;
        }
        a.active-ancestor,
        a.active{
          &:not([role="button"]){
            background: $grey3;
            color: $white;
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
