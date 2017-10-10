<template>
  <div class="clearfix">
    <div class="p3">
      <page-title>Posts</page-title>

      <nuxt-link :to="{ path: 'posts/new' }" class="btn-sm" role="button">Add new</nuxt-link>

      <div class="container posts-list table">
        <div class="group p1 th border-bottom">
          <div class="td sm-col-12 md-col-4 lg-col-3">Title</div>
          <div class="td sm-col-12 md-col-4 lg-col-3">Excerpt</div>
        </div>
        <ul v-if="posts.length > 0" class="m0">
          <draggable v-model="posts" :options="{handle:'.drag-handle', draggable:'.tr'}" @start="dragging=true" @end="dragging=false">
            <li v-for="post in posts" :key="post.id" class="group tr p1">
              <div class="td sm-col-12 md-col-4 lg-col-3">
                <span class="drag-handle p1">::</span>
                <nuxt-link :to="{ name: 'posts-id', params: { id: post.id }}">{{ post.title }}</nuxt-link>
              </div>
              <div class="td sm-col-12 md-col-4 lg-col-3" v-html="post.excerpt"></div>
            </li>
          </draggable>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  // import axios from '~/plugins/axios'
  import Draggable from 'vuedraggable'

  export default {

    async asyncData ({ params, app }) {
      const data = await app.$axios.$get('/admin/posts')
      return { posts: data.data }
    },

    data () {
      return {
        loading: false,
        dragging: false,
        posts: []
      }
    },

    components: {
      Draggable
    }
  }
</script>