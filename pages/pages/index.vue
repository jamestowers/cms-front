<template>
  <div class="clearfix">
    <div class="py3 px2">
      <page-title>Pages</page-title>

      <nuxt-link :to="{ path: 'pages/new' }" class="btn-sm" role="button">Add new</nuxt-link>

      <div class="container pages-list table">
        <div class="group p1 th border-bottom">
          <div class="td sm-col-12 md-col-3 lg-col-4">Title</div>
          <div class="td sm-col-12 md-col-3 lg-col-3">URL</div>
          <div class="td sm-col-12 md-col-3 lg-col-3">Template</div>
          <div class="td sm-col-12 md-col-3 lg-col-2">Edit</div>
        </div>
        <ul v-if="pages.length > 0" class="m0">
          <draggable v-model="pages" :options="{handle:'.drag-handle', draggable:'.tr'}" @start="dragging=true" @over="onDragOver" @end="onDragEnd" @sort="onSort">
            <li v-for="page in pages" :key="page.id" class="group tr p1">
              <div class="td sm-col-12 md-col-3 lg-col-4">
                <span class="drag-handle p1">:::</span>
                <nuxt-link :to="{ name: 'pages-id', params: { id: page.id }}" :style="{ paddingLeft: page.depth*15 +'px'}">{{ page.title }}</nuxt-link>
              </div>
              <div class="td sm-col-12 md-col-3 lg-col-3">{{  page.slug }}</div>
              <div class="td sm-col-12 md-col-3 lg-col-3">{{  page.template }}</div>
              <div class="td sm-col-12 md-col-3 lg-col-2">Edit</div>
            </li>
          </draggable>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import Draggable from 'vuedraggable'

  export default {

    async asyncData ({ params, app }) {
      const data = await app.$axios.$get('/admin/pages')
      return { pages: data.data }
    },

    data () {
      return {
        loading: false,
        dragging: false,
        pages: []
      }
    },

    methods: {
      onDragOver (event) {
        console.log(event)
      },
      onDragEnd (event) {
        console.log(event)
        this.dragging = false
      },
      onSort (event) {
        console.log(event)
      }
    },

    components: {
      Draggable
    }
  }
</script>