<template>
  <div class="location">
    <div class="form-group">
      <label for="name">Name</label>
      <input v-model="location.name" id="title" type="text" placeholder="Venue/location name" required>
    </div>

    <div class="sm-col-12 md-col-12 lg-col-6">
      <div class="form-group mt0 mb2">
        <label for="address_line_1">Address Line 1</label>
        <input v-model="location.address_line_1" id="address_line_1" type="text" placeholder="Street name">
      </div>

      <div class="form-group mt0 mb2">
        <label for="address_line_2">Address Line 2</label>
        <input v-model="location.address_line_2" id="address_line_2" type="text">
      </div>

      <div class="form-group mt0 mb2">
        <label for="town">Town</label>
        <input v-model="location.town" id="town" type="text" placeholder="Town or village name">
      </div>
    </div>

    <div class="sm-col-12 md-col-12 lg-col-6 pl2">
      <div class="form-group mt0 mb2">
        <label for="city">City</label>
        <input v-model="location.city" id="city" type="text">
      </div>

      <div class="form-group mt0 mb2">
        <label for="county">County</label>
        <input v-model="location.county" id="county" type="text">
      </div>

      <div class="form-group mt0">
        <label for="postcode">Postcode</label>
        <input v-model="location.postcode" id="postcode" type="text">
      </div>
    </div>

    <location-picker v-model="location.latlng"></location-picker>

    <input type="hidden" v-model="location.id">

  </div>
</template>

<script>
  import Loading from '~/components/Loading'
  import LocationPicker from '~/components/fields/LocationPicker'

  export default {
    props: ['value'],

    data () {
      return {
        location: this.value || {
          name: null,
          image: null,
          description: null,
          address_line_1: null,
          address_line_2: null,
          town: null,
          city: null,
          county: null,
          postcode: null,
          latitude: null,
          longitude: null
        }
      }
    },

    watch: {
      value (val) {
        this.location = val
      },
      location: {
        handler (val) {
          if (val.latlng) {
            this.location.latitude = val.latlng.lat
            this.location.longitude = val.latlng.lng
          }
          this.$emit('input', val)
        },
        deep: true
      }/* ,
      latlng (value) {
        this.location.latitude = value.lat()
        this.location.longitude = value.lng()
      } */
    },

    components: {
      Loading,
      LocationPicker
    }
  }
</script>

<style lang="scss">

</style>

