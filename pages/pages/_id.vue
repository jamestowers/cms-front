<template>
    
  <form action="" method="page">

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
        <div class="form-group">
          <label for="body">Content</label>
          <wysiwyg @updated="updateBody" :default="this.page.body"></wysiwyg>
        </div>
      </div>

      <div class="sm-col-12 md-col-12 lg-col-4 bg-grey p3">
      
        <div class="form-group border-top py2">
          <div v-if="loading" class="loading">Loading...</div>
          <button @click.prevent="updatepage" type="submit" class="btn-primary">{{ this.editing ? 'Update page' : 'Create page' }}</button>
        </div>

      </div>

    </div>

  </form>

</template>

<script>
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
          body: null,
          template: null
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
    }
  }
</script>

<style lang="scss">

  @import "~assets/scss/global/variables";

  input.slug-input{
    border: none;
  }

</style>