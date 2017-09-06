<template>
  <div id="app">
    <app-header/>
    <div id="main">
      <Navigation />
      <div id="content" class="px2">
        <status />
        <nuxt/>
      </div>
    </div>
  </div>
</template>

<script>
  import AppHeader from '../components/AppHeader.vue'
  import Navigation from '../components/Navigation.vue'
  import Status from '../components/Status.vue'

  export default {
    components: {
      AppHeader,
      Navigation,
      Status
    }
  }
</script>

<style>
  
</style>
