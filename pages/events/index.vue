<template>
  <div class="clearfix">
    <div class="py3 px2">
      <page-title>Events</page-title>

      <nuxt-link :to="{ path: 'events/new' }" class="btn-sm" role="button">Add new</nuxt-link>

      <div class="container events-list table">
        <div class="group p1 th border-bottom">
          <div class="td sm-col-12 md-col-3 lg-col-4 pr1">Title</div>
          <div class="td sm-col-12 md-col-3 lg-col-3 pr1">Venue</div>
          <div class="td sm-col-12 md-col-2 lg-col-2 pr1">Start at</div>
          <div class="td sm-col-12 md-col-2 lg-col-2 pr1">End at</div>
          <div class="td sm-col-12 md-col-2 lg-col-1 pr1">Edit</div>
        </div>
        <ul v-if="events.length > 0" class="m0">
          <li v-for="event in events" :key="event.id" class="group tr p1">
            <div class="td sm-col-12 md-col-3 lg-col-4 pr1">
              <nuxt-link :to="{ name: 'events-id', params: { id: event.id }}"><i v-if="event.private" class="icon-basic-lock" title="private event" aria-hidden></i> {{ event.title }}</nuxt-link>
            </div>
            <div class="td sm-col-12 md-col-3 lg-col-3 pr1">{{ event.location ? event.location.name : ' ' }}</div>
            <div class="td sm-col-12 md-col-2 lg-col-2 pr1">{{  event.start_at }}</div>
            <div class="td sm-col-12 md-col-2 lg-col-2 pr1">{{  event.end_at }}</div>
            <div class="td sm-col-12 md-col-2 lg-col-1 pr1"><nuxt-link :to="{ name: 'events-id', params: { id: event.id }}">Edit</nuxt-link></div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {

    async asyncData ({ params, app }) {
      const data = await app.$axios.$get('/admin/events')
      return { events: data.data }
    },

    data () {
      return {
        loading: false,
        events: []
      }
    },

    methods: {
      //
    },

    components: {
      // 
    }
  }
</script>