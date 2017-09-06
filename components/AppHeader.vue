<template>
    <header class="header group p1">

      <div class="logo">
        <img :src="`http://cms-backend.dev/uploads/images/thumbnail/${$store.state.settings.items.logo}`" width="40" />
      </div>

      <h1 id="logo-text" class="m0 pull-left v-align">{{ this.$store.state.settings.items.site_name }}</h1>

      <div class="pull-right">
        <a href="#" id="menu-toggle"><span></span></a>
      </div>

    </header>
</template>