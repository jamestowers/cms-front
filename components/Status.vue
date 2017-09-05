<template>
  <div v-if="status" class="alert message mxn2">
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