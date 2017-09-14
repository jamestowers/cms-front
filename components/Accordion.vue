<template>
  <div @click="isOpen = !isOpen" class="accordion" :class="{'open': isOpen}">
    <h1 class="accordion-handle border-bottom py2 px3">{{ title }}</h1>
    <slot></slot>
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
        isOpen: this.default
      }
    },

    methods: {
      toggle () {
        if (this.isOpen) {
          console.log('close')
        } else {
          console.log('open')
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "~assets/scss/global/variables";

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
      content: "";
    }
  }
</style>
