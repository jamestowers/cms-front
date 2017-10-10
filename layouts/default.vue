<template>
  <div id="app">
    <app-header/>
    <status />
    <div id="main">
      <Navigation />
      <div id="content" class="px flex">
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

<style lang="scss">
  
  @import "~assets/scss/global/variables";

  #content{
    & > div {
      flex: 1;
    }
    .content-body{
      flex: 1;
    }
  }
</style>
