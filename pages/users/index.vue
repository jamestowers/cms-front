<template>
  <div class="clearfix">
    <div class="py3 px2">
      <page-title>Users</page-title>

      <nuxt-link :to="{ name: 'users' }" class="btn-sm" role="button">Add new</nuxt-link>

      <div class="container users-list table">
        <div class="group p1 th border-bottom">
          <div class="td sm-col-12 md-col-4 lg-col-4">Name</div>
          <div class="td sm-col-12 md-col-4 lg-col-3">Email</div>
          <div class="td sm-col-12 md-col-4 lg-col-3">Last login</div>
          <div class="td sm-col-12 md-col-4 lg-col-2">Edit</div>
        </div>
        <ul v-if="users.length > 0" class="m0">
          <li v-for="user in users" :key="user.id" class="group tr p1">
            <div class="td sm-col-12 md-col-4 lg-col-4">
              <nuxt-link :to="{ name: 'users-id', params: { id: user.id }}">{{ user.name }}</nuxt-link>
            </div>
            <div class="td sm-col-12 md-col-4 lg-col-3">{{  user.email }}</div>
            <div class="td sm-col-12 md-col-4 lg-col-3">{{  user.lastLoginDifference }}</div>
            <div class="td sm-col-12 md-col-4 lg-col-2">Edit</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import Draggable from 'vuedraggable'

  export default {

    async asyncData ({ params, app }) {
      const data = await app.$axios.$get('/admin/users')
      return { users: data.data }
    },

    data () {
      return {
        loading: false,
        dragging: false,
        users: []
      }
    },

    components: {
      Draggable
    }
  }
</script>