<template>
    
  <form action="" method="post" class="flex-row">

    <div class="clearfix mxn2 flex">

      <div class="sm-col-12 md-col-12 lg-col-8 p3">

        <page-title>{{ this.editing ? `Edit ${this.page.title}` : 'Add a new page' }}</page-title>

        <div class="form-group mb0">
          <label for="title">Title</label>
          <input @change="updateSlug" v-model="page.title" id="title" type="text">
        </div>
        <div class="form-group mt1">
          <label for="slug">URL</label>
          <div class="input-group">
            <span class="input-group-addon"><small>http://site-url.com/</small></span>
            <input v-model="page.slug" id="slug" type="text" class="slug-input small sm-col-12 md-col-4 lg-col-4">
          </div>
        </div>

        <content-block-composer v-model="page.blocks"></content-block-composer>
        
      </div>

      <div class="sm-col-12 md-col-12 lg-col-4 bg-grey7 p3">
      
        <div class="form-group border-top py2">
          <button @click.prevent="updatepage" type="submit" class="btn-primary">{{ this.editing ? 'Update page' : 'Create page' }}</button>
          <loading v-show="loading" class="pull-right"></loading>
        </div>

      </div>

    </div>

  </form>

</template>

<script>
  import Loading from '~/components/Loading'
  import ContentBlockComposer from '~/components/content-blocks/ContentBlockComposer'

  export default {

    async asyncData ({ params, app }) {
      if (params.id !== 'new') {
        const page = await app.$axios.$get(`/admin/pages/${params.id}`)
        return { page, editing: true }
      }
    },

    data () {
      return {
        loading: false,
        editing: false,
        page: {
          title: null,
          slug: null,
          content: null,
          template: null,
          blocks: null
        }
      }
    },

    methods: {
      updateSlug (title) {
        if (this.page.slug === null || this.page.slug === '') {
          this.page.slug = this.slugify(title.target.value)
        }
      },
      updateBody (content) {
        this.page.body = content
      },
      slugify (text) {
        return text.toLowerCase().replace(/-+/g, '').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      },
      updatepage () {
        let vm = this
        this.loading = true

        this.$axios.put(`/admin/pages/${this.$route.params.id}`, this.page)
          .then(function (response) {
            if (response.data.status === 'success') {
              vm.$store.commit('status/set', response.data.message)
              vm.page = response.data.entity
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
      ContentBlockComposer
    }
  }
</script>

<style lang="scss">

  @import "~assets/scss/global/variables";

  input.slug-input{
    border: none;
  }

</style>