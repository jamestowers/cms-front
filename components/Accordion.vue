<template>
  <div class="accordion" :class="{'open': isOpen}">
    <div @click="isOpen = !isOpen" ref="handle" class="accordion-handle" :class="this.handleClass">
      
      <div class="drag-handle">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 64 64"><style>.a{fill:none;stroke-linejoin:bevel;stroke-width:2;stroke:#000;}.b{fill:none;stroke-width:2;stroke:#000;}</style><polyline points="56 39 63 32 56 25 " class="a"/><polyline points="8 25 1 32 8 39 " class="a"/><line x1="1" y1="32" x2="32" y2="32" class="b"/><line x1="32" y1="32" x2="63" y2="32" class="b"/><polyline points="39 8 32 1 25 8 " class="a"/><polyline points="25 56 32 63 39 56 " class="a"/><line x1="32" y1="63" x2="32" y2="32" class="b"/><line x1="32" y1="32" x2="32" y2="1" class="b"/></svg>
      </div>
      
      <h3 class="m0" v-html="title"></h3>
    
    </div>

    <div ref="content" class="accordion-content">
      <slot></slot>
    </div>

  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        required: true
      },
      defaultState: {
        type: Boolean,
        default: true
      },
      handleClass: {
        type: String,
        default: ''
      }
    },

    data () {
      return {
        isOpen: this.defaultState
        // handleHeight: 60,
        // contentHeight: 0
      }
    },

    /* mounted () {
      this.$nextTick(() => {
        this.getHeights()
      })
    },

    computed: {
      accordionHeight () {
        return this.isOpen ? 'auto' : this.handleHeight + 'px'
      }
    }, */

    methods: {
      /* toggle () {
        if (!this.isOpen) {
          this.getHeights()
        }
        this.isOpen = !this.isOpen
      }/* ,
      getHeights () {
        this.handleHeight = this.$refs.handle.scrollHeight
        this.contentHeight = this.$refs.content.scrollHeight
      } */
    }
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/global/variables";

  .accordion{
    overflow: hidden;
    &.open{
      max-height: 9999px;
      .accordion-handle::after{
        transform: rotate(180deg)
      }
      & > .accordion-content{
        max-height: 9999px;
        transition-timing-function: cubic-bezier(1,0,1,0);
      }
    }
  }
  .accordion-handle{
    cursor: pointer;
    position: relative;
    &:after{
      right: $space-3;
      top: 50%;
      color: $grey5;
      margin-top: -2px;
      border-style: solid;
      border-width: 5px 5px 0;
      border-color: $grey5 transparent transparent;
      position: absolute;
      transition: transform 0.3s $ease-in-out;
      content: "";
    }
  }
  .accordion-content{
    transition: max-height 0.3s cubic-bezier(0,1,0,1);
    max-height: 0;
    background: $grey8;
    .accordion-content{
      background: $grey7;
      .accordion-content{
        background: $grey6;
        .accordion-content{
          background: $grey5;
        }
      }
    }
  }
  .drag-handle{
    position: absolute;
    top:50%;
    transform: translateY(-50%) translateX(-27px);
  }
</style>
