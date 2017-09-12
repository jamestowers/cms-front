import Vue from 'vue'
import PageTitle from '../components/PageTitle.vue'
import FilesUpload from '../components/fields/Files.vue'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'

Vue.component('page-title', PageTitle)
Vue.component('files-upload', FilesUpload)
Vue.use(flatPickr)
