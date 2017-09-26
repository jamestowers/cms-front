<template>
  <div id="app">
    <div id="main" class="bg-darkest patterned flex-center">
      <status />
      <div class="container">
        <div class="row inner narrow">
          <nuxt/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Status from '../components/Status.vue'

  export default {
    components: {
      Status
    }
  }
</script>

<style lang="scss">
  
</style>
