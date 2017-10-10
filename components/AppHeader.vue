<template>
    <header class="header group">

      <div class="logo p1">
        <img :src="logo" width="40" />
      </div>
      <div class="p1">
        <h1 id="logo-text" class="m0 pull-left v-align">{{ site_name }}</h1>

        <a href="#" id="menu-toggle"><span></span></a>
      </div>

    </header>
</template>

<script>
  export default {
    data () {
      return {
        site_name: this.$store.state.settings.items.site_name,
        tagline: this.$store.state.settings.items.tagline,
        logo: `${this.$store.state.settings.items.image_root_path}/uploads/images/thumbnail/${this.$store.state.settings.items.logo}`
      }
    }
  }
</script>

<style lang="scss">
  
  @import "~assets/scss/global/variables";

  header.header{
    background: $white;
    position: relative;
    z-index: 2;
  }
</style>
