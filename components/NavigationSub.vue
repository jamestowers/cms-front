<template>
  <nav class="sub-nav">
    <ul>
      <li v-if="header" class="nav-header p2 text-center">{{ header }}</li>
      <li v-for="link in links" :key="link.id" :class="{ 'is-active': active === link }">
        <nuxt-link :to="`${endpoint}/${link[linkKey]}`" class="px3 py2">{{ link[label] }}</nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    header: {
      type: String,
      required: false
    },
    links: {
      type: [ Array, Object ],
      required: true
    },
    active: {
      type: Object,
      required: false
    },
    endpoint: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: 'title'
    },
    linkKey: {
      type: String,
      default: 'id'
    }
  }
}
</script>

<style lang="scss">
  @import "~assets/scss/global/variables";

  nav.sub-nav{
    min-width: 160px;
    ul{
      li{
        font-size: 1rem;
        font-family: $font-subheader;
        text-transform: uppercase;
        text-align: center;
        a.active{
          background: $grey6;
        }
      }
    }
    a{
      color: $grey2;
      display: block;
      font-weight: $font-weight-normal;
    }
  }
</style>
