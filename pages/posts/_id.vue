<template>
    
  <form action="" method="POST">

    <div class="clearfix mxn2 flex">

      <div class="sm-col-12 md-col-12 lg-col-8 p3">

        <page-title>{{ this.editing ? `Edit ${this.post.title}` : 'Add a new post' }}</page-title>

        <div class="form-group mb0">
          <label for="title">Title</label>
          <input @change="updateSlug" v-model="post.title" id="title" type="text">
        </div>
        <div class="form-group mt1">
          <label for="slug">URL</label>
          <div class="input-group">
            <span class="input-group-addon"><small>http://site-url.com/</small></span>
            <input v-model="post.slug" id="slug" type="text" class="slug-input small sm-col-12 md-col-4 lg-col-4">
          </div>
        </div>
        <div class="form-group">
          <label for="body">Content</label>
          <wysiwyg @updated="updateBody" :default="this.post.body"></wysiwyg>
        </div>
        <div class="form-group">
          <label for="excerpt">Excerpt</label>
          <wysiwyg @updated="updateExcerpt" :default="this.post.excerpt"></wysiwyg>
        </div>
        <div class="form-group">
          <label for="files">Files</label>
          <file-upload @file-uploaded="onFileUploaded" :current-files="post.media" :url="mediaUploadUrl"></file-upload>
        </div>
      </div>

      <div class="sm-col-12 md-col-12 lg-col-4 bg-grey p3">
      
        <label for="">Categories</label>
        <category-select @updated="updateCategories" :default="defaultCategoryIds"></category-select>
      
        <div class="form-group border-top py2">
          <div v-if="loading" class="loading">Loading...</div>
          <button @click.prevent="updatePost" type="submit" class="btn-primary">{{ this.editing ? 'Update post' : 'Create post' }}</button>
        </div>

      </div>

    </div>

  </form>

</template>

<script>
  import axios from '~/plugins/axios'
  import CategorySelect from '~/components/fields/Categories'
  import FileUpload from '~/components/fields/Files'

  export default {

    async asyncData ({ params }) {
      if (params.id !== 'new') {
        let { data } = await axios.get(`/admin/posts/${params.id}`)
        return { post: data, editing: true }
      }
    },

    data () {
      return {
        loading: false,
        editing: false,
        post: {
          title: null,
          slug: null,
          body: null,
          excerpt: null,
          categories: [],
          media: []
        },
        categoryIds: [],
        uploadedFiles: [],
        mediaUploadUrl: process.env.baseUrl + '/media/upload'
      }
    },

    methods: {
      updateSlug (title) {
        if (this.post.slug === null || this.post.slug === '') {
          this.post.slug = this.slugify(title.target.value)
        }
      },
      updateBody (content) {
        this.post.body = content
      },
      updateExcerpt (content) {
        this.post.excerpt = content
      },
      updateCategories (categories) {
        this.categoryIds = categories
      },
      slugify (text) {
        return text.toLowerCase().replace(/-+/g, '').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      },
      updatePost () {
        let self = this
        this.loading = true
        // append related file ids to post object before sending
        this.post.related_file_ids = this.fileIds
        this.post.categories = this.allCategoryIds

        axios.put(`/admin/posts/${this.$route.params.id}`, this.post)
          .then(function (response) {
            if (response.data.status === 'success') {
              self.$store.commit('status/set', response.data.message)
              self.post = response.data.entity
              self.loading = false
            }
          })
          .catch(function (error) {
            console.error(error)
            self.$store.commit('status/set', error.response.data.message)
            self.loading = false
          })
      },

      onFileUploaded (file) {
        this.uploadedFiles.push(file)
      }
    },

    mounted () {
      this.categoryIds = this.defaultCategoryIds
    },

    computed: {
      defaultCategoryIds () {
        if (this.post.categories) {
          return this.post.categories.map(function (a) { return a.id })
        }
      },
      // allCategoryIds () { return [...this.defaultCategoryIds, ...this.categoryIds] },
      files () { return [...this.post.media, ...this.uploadedFiles] },
      fileIds () { return this.files.map(function (a) { return a.id }) }
    },

    components: {
      CategorySelect,
      FileUpload
    }
  }
</script>

<style lang="scss">

  @import "~assets/scss/global/variables";

  input.slug-input{
    border: none;
  }

</style>