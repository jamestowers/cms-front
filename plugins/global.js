import Vue from 'vue'
import VeeValidate from 'vee-validate'
import PageTitle from '../components/PageTitle.vue'
import FilesUpload from '../components/fields/Files.vue'
import flatPickr from 'vue-flatpickr-component'
import ContentBlockFieldRepeater from '~/components/content-blocks/ContentBlockFieldRepeater'
import 'flatpickr/dist/flatpickr.css'

Vue.component('page-title', PageTitle)
Vue.component('files-upload', FilesUpload)
Vue.component('content-block-field-repeater', ContentBlockFieldRepeater)

Vue.use(VeeValidate)
Vue.use(flatPickr)
