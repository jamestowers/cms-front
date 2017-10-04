<template>
  <div class="accordion" :class="{'open': isOpen}" :style="{ height: accordionHeight + 'px' }">
    <h1 @click="toggle" ref="handle" class="accordion-handle" :class="this.handleClass">{{ title }}</h1>
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
        isOpen: this.defaultState,
        handleHeight: 60,
        contentHeight: 0
      }
    },

    mounted () {
      this.$nextTick(() => {
        this.getHeights()
      })
    },

    computed: {
      accordionHeight () {
        return this.isOpen ? this.handleHeight + this.contentHeight : this.handleHeight
      }
    },

    methods: {
      toggle () {
        this.isOpen = !this.isOpen
      },
      getHeights () {
        this.handleHeight = this.$refs.handle.clientHeight
        this.contentHeight = this.$refs.content.clientHeight
      }
    }
  }
</script>

<style lang="scss">
  @import "~assets/scss/global/variables";

  .accordion{
    overflow: hidden;
    transition: height 0.2s $ease-in-out;
    &.open{
      .accordion-handle::after{
        transform: rotate(180deg)
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
      transition: transform 0.2s $ease-out-circle;
      content: "";
    }
  }
</style>
