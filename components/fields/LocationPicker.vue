<template>
  <div class="location-picker">
    <loading v-if="loading"></loading>
    <div id="map" ref="mapElement"></div>
  </div>
</template>

<script>
  import Loading from '~/components/Loading'
  import helpers from '~/assets/js/mixins/methods.js'

  export default {
    mixins: [ helpers ],

    props: ['value'],

    data () {
      return {
        loading: false,
        map: null,
        marker: null,
        markerIcon: {
          path: 'M22.402,0C10.03,0,0,10.03,0,22.402c0,5.592,2.048,10.703,5.435,14.629C9.543,41.791,22.402,54,22.402,54s12.648-12.105,16.752-16.723c3.516-3.957,5.65-9.166,5.65-14.875C44.805,10.03,34.775,0,22.402,0z M22.57,29.09c-3.601,0-6.521-2.919-6.521-6.52c0-3.601,2.919-6.521,6.521-6.521c3.6,0,6.52,2.919,6.52,6.521C29.09,26.17,26.17,29.09,22.57,29.09z',
          fillColor: '#4DC0FF',
          fillOpacity: 1,
          scale: 1,
          anchor: {x: 22, y: 55},
          strokeColor: '#35A2D1',
          strokeWeight: 1
        },
        latlng: {},
        options: {
          center: this.getDefaultCenter(),
          zoom: 15
        }
      }
    },

    mounted () {
      if (process.browser) {
        this.loading = true
        if (typeof window !== 'undefined' && typeof google === 'undefined') {
          this.loadScript(`https://maps.googleapis.com/maps/api/js?key=${this.$store.state.settings.items.google_maps_api_key}`, this.mapInit)
        } else {
          this.mapInit()
        }
      }
    },

    watch: {
      value (val) {
        this.marker.setPosition(val)
        this.map.setCenter(val)
      }
    },

    methods: {
      getDefaultCenter () {
        return {
          lat: this.value && this.value.lat ? this.value.lat : Number(this.$store.state.settings.items.default_map_latitude),
          lng: this.value && this.value.lng ? this.value.lng : Number(this.$store.state.settings.items.default_map_longitude)
        }
      },

      mapInit () {
        const vm = this
        this.loading = false

        this.map = new window.google.maps.Map(this.$refs.mapElement, this.options)

        this.marker = new window.google.maps.Marker({
          position: this.value,
          map: this.map,
          icon: this.markerIcon,
          draggable: true
        })

        window.google.maps.event.addListener(this.marker, 'dragend', function (event) {
          vm.latlng = event.latLng

          vm.marker.setPosition(vm.latlng)
          vm.setMarkerLocation()
        })

        window.google.maps.event.addListener(this.marker, 'dragstart', function (event) {
          vm.marker.setAnimation(3) // raise
        })

        window.google.maps.event.addListener(this.marker, 'dragend', function (event) {
          vm.marker.setAnimation(4) // fall
        })

        window.google.maps.event.addListener(this.map, 'click', function (event) {
          vm.latlng = event.latLng

          vm.marker.setPosition(vm.latlng)

          vm.setMarkerLocation()
        })
      },

      setMarkerLocation () {
        /* var currentLocation = this.marker.getPosition()
        this.location.latitude = currentLocation.lat()
        this.location.longitude = currentLocation.lng() */

        this.$emit('input', {
          lat: this.latlng.lat(),
          lng: this.latlng.lng()
        })
      }
    },

    components: {
      Loading
    }
  }
</script>

<style lang="scss">
  #map{ 
    width:100%; 
    height: 500px; 
    * {
      overflow:visible;
    }
  }
</style>
