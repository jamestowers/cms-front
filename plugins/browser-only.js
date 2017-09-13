import Vue from 'vue'
import Wysiwyg from '../components/fields/Wysiwyg.vue'
import VueClip from 'vue-clip'

const VueQuillEditor = require('vue-quill-editor/ssr')

Vue.use(VueQuillEditor)
Vue.component('Wysiwyg', Wysiwyg)
Vue.use(VueClip)
