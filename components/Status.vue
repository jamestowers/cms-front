<template>
  <div v-if="status" class="status-bar alert message fixed">
    {{ status }}
    <a @click.prevent="clearStatus" href="#" class="close pull-right" role="button"></a>
  </div>
</template>

<script>
  export default {
    computed: {
      status () { return this.$store.state.status.message }
    },

    methods: {
      clearStatus () {
        this.$store.commit('status/clear')
      }
    }
  }
</script>

<style lang="scss">
  .status-bar {
    position: fixed;
    top:0;
    z-index: 12;
    width:100%;
  }
</style>
