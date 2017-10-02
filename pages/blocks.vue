<template>
  <div class="flex">
    <content-block-navigation></content-block-navigation>
    <nuxt-child/>
  </div>
</template>

<script>
import ContentBlockNavigation from '~/components/ContentBlockNavigation'

export default {
  async fetch ({store, app: {$axios}}) {
    const [blocks, fieldTypes] = await Promise.all([
      $axios.$get('/admin/content-blocks'),
      $axios.$get('/admin/content-blocks/field-types')
    ])
    store.commit('content-blocks/load', blocks)
    store.commit('content-blocks/loadFieldTypes', fieldTypes)
  },

  components: {
    ContentBlockNavigation
  }
}
</script>

<style lang="scss">

</style>
