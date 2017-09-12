<template>
    
  <form action="" method="post">

    <div class="clearfix mxn2 flex">

      <div class="sm-col-12 md-col-12 lg-col-8 p3">

        <page-title>{{ this.editing ? `Edit ${this.event.title}` : 'Add a new event' }}</page-title>

        <div class="form-group mb0">
          <label for="title">Title</label>
          <input v-model="event.title" id="title" type="text">
        </div>
    
        <div class="form-group">
          <label for="description">Description</label>
          <wysiwyg v-model="event.description"></wysiwyg>
        </div>
      </div>

      <div class="sm-col-12 md-col-12 lg-col-4 bg-grey p3">
        
        <div class="form-group">
          <label for="title">Event Start Time</label>
          <flat-pickr 
            v-model="event.start_at"
            placeholder="Select date"
            :config="datePickerConfig"
            ></flat-pickr>
        </div>

        <div class="form-group">
          <label for="title">Event End Time</label>
          <flat-pickr 
            v-model="event.end_at"
            placeholder="Select date"
            :config="datePickerConfig"
            ></flat-pickr>
        </div>
        
        <div class="form-group border-top py2">
          <loading v-if="loading"></loading>
          <button @click.prevent="updateEvent" type="submit" class="btn-primary">{{ this.editing ? 'Update event' : 'Create event' }}</button>
        </div>

      </div>

    </div>

  </form>

</template>

<script>
  import Loading from '~/components/Loading'
  import NoSSR from 'vue-no-ssr'

  export default {

    async asyncData ({ params, app }) {
      if (params.id !== 'new') {
        const event = await app.$axios.$get(`/admin/events/${params.id}`)
        return { event, editing: true }
      }
    },

    data () {
      return {
        loading: false,
        editing: false,
        event: {
          title: null,
          description: null,
          start_at: null,
          end_at: null
        },
        datePickerConfig: {
          enableTime: true,
          dateFormat: 'Y-m-d H:i:S',
          altInput: true,
          altFormat: 'd M Y at H:i'
        }
      }
    },

    methods: {
      updateBody (content) {
        this.event.description = content
      },
      slugify (text) {
        return text.toLowerCase().replace(/-+/g, '').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      },
      updateEvent () {
        let vm = this
        this.loading = true

        this.$axios.put(`/admin/events/${this.$route.params.id}`, this.event)
          .then(function (response) {
            if (response.data.success) {
              vm.$store.commit('status/set', response.data.message)
              vm.event = response.data.event
              vm.loading = false
            }
          })
          .catch(function (error) {
            console.error(error)
            vm.$store.commit('status/set', error.response.data.message)
            vm.loading = false
          })
      }
    },

    components: {
      Loading,
      NoSSR
    }
  }
</script>

<style lang="scss">

  @import "~assets/scss/global/variables";

</style>