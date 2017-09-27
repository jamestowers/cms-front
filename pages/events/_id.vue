<template>
    
  <form action="" method="post">

    <div v-if="event && event.images" class="hero sm-col-12 md-col-12 lg-col-12 mxn2 text-center">
      <img :src="`${this.$store.state.settings.items.image_root_path}/${event.images.xlarge}`" alt="Event hero image">
    </div>

    <div class="clearfix mxn2 flex">

      <div class="sm-col-12 md-col-12 lg-col-8 px3 pt3">
        <page-title>{{ editing ? `Edit ${event.title}` : 'Add a new event' }}</page-title>

        <div class="form-group mb0">
          <label for="title">Title</label>
          <input v-model="event.title" v-validate="'required'" id="title" name="title" type="text" placeholder="Event title">
          <span v-show="errors.has('title')" class="field-error is-danger">{{ errors.first('title') }}</span>
        </div>

        <div class="form-group">
          <label for="image">Image</label>
          <image-upload 
            @input="onImageUploaded" 
            :value="this.imageThumbnail" 
            action="/media/upload"
            btn-class="btn btn-sm"
            ></image-upload>
        </div>
    
        <div class="form-group">
          <label for="description">Description</label>
          <wysiwyg v-model="event.description"></wysiwyg>
        </div>

        <accordion 
          title="Location" 
          class="bg-light-grey mxn3" 
          handle-class="border-bottom py2 px3"
          >
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

      <div class="sm-col-12 md-col-12 lg-col-4 bg-grey">

        <div class="p3">
          <h1>Dates</h1>
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
        </div>
        
        <div class="p3 border-top">
          <h1>Guests</h1>
          
          <div class="form-group mb0">
            <label for="price">Ticket price</label>
            <div class="input-group light">
              <span class="input-group-addon">£</span>
              <input v-model="event.price" v-validate="'decimal:2'" name="price" id="price" type="text" placeholder="Free">
            </div>
          </div>
          <span v-show="errors.has('price')" class="field-error is-danger">{{ errors.first('price') }}</span>
          <span class="help-block">Leave blank for free entry</span>

          <div class="form-group mb0">
            <label for="places_total">Places / tickets available</label>
            <input v-model="event.places_total" v-validate="'decimal:0'" name="places_total" id="places_total" type="text" placeholder="Unlimited">
          </div>
          <span v-show="errors.has('places_total')" class="field-error is-danger">{{ errors.first('places_total') }}</span>
          <span class="help-block">Leave blank for unlimited places</span>

          <div class="form-group mb0">
            <label for="min_age">Minimum age</label>
            <input v-model="event.min_age" v-validate="'decimal:0'" name="min_age" id="min_age" type="text" placeholder="All ages">
          </div>
          <span v-show="errors.has('min_age')" class="field-error is-danger">{{ errors.first('min_age') }}</span>
          <span class="help-block">Leave blank for allow all ages</span>

          <div class="form-group mb0">
            
            <checkbox v-model="event.private" label="Make private" id="private"></checkbox>
            <span class="help-block mt1">If set to private, this event won't show up in listings but people with the link will still be able to see it</span>
            <!-- <div class="checkbox">
              <input v-model="event.private" type="checkbox" value="1" id="private" />
              <div></div>
              <label for="private">Make private</label>
              <span class="help-block mt1">If set to private, this event won't show up in listings but people with the link will still be able to see it</span>
            </div> -->
          </div>
          
        </div>
        
        <div class="form-group border-top p3">
          <button @click.prevent="updateEvent" type="submit" class="btn-primary">{{ this.editing ? 'Update event' : 'Create event' }}</button>
          <loading v-show="loading" class="pull-right"></loading>
        </div>

      </div>

    </div>

  </form>

</template>

<script>
  import Loading from '~/components/Loading'
  import Accordion from '~/components/Accordion'
  import Location from '~/components/fields/Location'
  import Checkbox from '~/components/fields/Checkbox'
  import ImageUpload from '~/components/fields/ImageUpload'
  import Multiselect from 'vue-multiselect'
  import _ from 'lodash'

  export default {
    middleware: 'auth',

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
          image: null,
          start_at: null,
          end_at: null,
          location: null,
          private: false,
          places_available: null,
          places_reserved: null
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

    computed: {
      imageThumbnail () {
        if (this.event.image) {
          return `${this.$store.state.settings.items.image_root_path}/${this.event.image.path}/thumbnail/${this.event.image.url}`
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
      onImageUploaded (imageModel) {
        this.event.image = imageModel
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
      Checkbox,
      ImageUpload,
      Accordion,
      Location,
      Multiselect
    }
  }
</script>

<style lang="scss">

  @import "~assets/scss/global/variables";

  .hero{
    height: 400px;
    overflow: hidden;
    position: relative;
    margin-left: -$space-2;
    width: calc(100% + #{$space-3});
    img{
      display: block;
      position: absolute;
      top:50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%)
    }
  }

</style>