<template>
  <div class="accordion" :class="{'open': isOpen}" :style="{ height: accordionHeight + 'px' }">
    <h1 @click="toggle" ref="handle" class="accordion-handle border-bottom py2 px3">{{ title }}</h1>
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
      default: {
        type: Boolean,
        default: true
      }
    },

    data () {
      return {
        isOpen: this.default,
        handleHeight: 60,
        contentHeight: 0
      }
    },

    mounted () {
      this.handleHeight = this.$refs.handle.clientHeight
      this.contentHeight = this.$refs.content.clientHeight
    },

    computed: {
      accordionHeight () {
        return this.isOpen ? this.handleHeight + this.contentHeight : this.handleHeight
      }
    },

    methods: {
      toggle () {
        this.isOpen = !this.isOpen
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
