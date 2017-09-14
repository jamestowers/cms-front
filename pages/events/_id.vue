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

        <accordion title="Location" class="bg-light-grey mxn3">
          <div class="form-group px3">
            <label for="">Select a pre-existing location</label>
            <div class="mb2">
              <multiselect
                v-model="event.location" 
                :options="locations"
                track-by="name"
                label="name"
                placeholder="Select or add new location below"
                ></multiselect>
            </div>
            <label for="">Or add a new one</label>
            <location v-model="event.location"></location>
            <button @click.prevent="addNewLocation" class="pull-left btn-sm">Add a new location</button>
          </div>
        </accordion>
      </div>

      <div class="sm-col-12 md-col-12 lg-col-4 bg-grey p3">
        
        <div class="form-group">
          <label for="title">Event Start Time</label>
          <div class="input-group light">
            <span class="input-group-addon"><i class="icon-basic-calendar"></i></span>
            <flat-pickr 
              v-model="event.start_at"
              placeholder="Select date"
              :config="datePickerConfig"
              ></flat-pickr>
          </div>
        </div>

        <div class="form-group">
          <label for="title">Event End Time</label>
          <div class="input-group light">
            <span class="input-group-addon"><i class="icon-basic-calendar"></i></span>
            <flat-pickr 
              v-model="event.end_at"
              placeholder="Select date"
              :config="datePickerConfig"
              ></flat-pickr>
          </div>
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
  import Accordion from '~/components/Accordion'
  import Location from '~/components/fields/Location'
  import Multiselect from 'vue-multiselect'
  import _ from 'lodash'

  export default {
    async asyncData ({ params, app }) {
      let event
      let editing = false

      if (params.id !== 'new') {
        event = await app.$axios.$get(`/admin/events/${params.id}`)
        editing = true
      }
      let locations = await app.$axios.$get(`/admin/locations/list`)
      return { event, locations: _.values(locations), editing }
    },

    data () {
      return {
        loading: false,
        event: {
          title: null,
          description: null,
          start_at: null,
          end_at: null,
          location: null
        },
        locations: [],
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
      addNewLocation () {
        this.event.location = {}
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
      Accordion,
      Location,
      Multiselect
    }
  }
</script>

<style lang="scss">

  // @import "~assets/scss/global/variables";

</style>