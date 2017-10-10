<template>
  <div class="block-image">
    <div v-if="file" :class="thumbnailClass">
      <img :src="thumbnailUrl" :width="thumbnailWidth">
    </div>

    <file 
      @uploadStart="onUploadStart"
      @input="onImageUploaded"
      accept="image/*" 
      :action="action"
      :value="value"
      :label="label"
      :maxSize="maxSize"
      :name="name"
      :btn-class="btnClass"></file>

    <loading v-if="loading"></loading>

    <div v-if="imageErrors.length" class="is-error">
      <ul>
        <li v-for="error in imageErrors" :key="error">{{ error }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import File from '~/components/fields/File'
import Loading from '~/components/Loading'

export default {
  props: {
    field: {
      type: Object,
      required: true
    },
    value: {
      type: [String, Object],
      default: null
    },
    label: {
      type: String,
      default: 'Choose image'
    },
    name: {
      type: String,
      default: 'file'
    },
    action: {
      type: String,
      default: 'media/upload'
    },
    maxSize: {
      type: Number,
      default: Number.MAX_SAFE_INTEGER
    },
    btnClass: {
      type: String,
      default: 'btn btn-sm'
    },
    thumbnailClass: {
      type: String,
      default: 'thumbnail'
    },
    thumbnailWidth: {
      type: String,
      default: '200'
    }
  },

  data () {
    return {
      loading: false,
      file: this.value,
      imageErrors: []
    }
  },

  created () {
    this.checkValue()
    this.getThumbnail()
  },

  computed: {
    thumbnailUrl () {
      return `${this.$store.state.settings.items.image_root_path}/${this.file.path}thumbnail/${this.file.url}`
    }
  },

  methods: {
    onUploadStart () {
      this.loading = true
    },
    onImageUploaded (image) {
      this.loading = false
      this.file = image
      this.$emit('input', { id: image.id, url: this.image.url })
    },
    getThumbnail () {
      if (this.value) {
        this.$axios.$get(`media/${this.value.id}`)
      }
    },
    checkValue () {
      if (this.value && (this.value.path === undefined || this.value.url === undefined)) {
        this.imageErrors.push('Value is missing path or url property')
      }
    }
  },

  components: {
    File,
    Loading
  }
}
</script>

<style lang="scss">
  @import "~assets/scss/global/variables";

  .image-upload{
    height: 200px;
    width: 200px;
    display:flex;
    align-items: center;
    justify-content: center;
    position: relative;
    .thumbnail{
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      z-index: 1;
    }
    .file-upload{
      position: relative;
      height: 100%;
      width: 100%;
      z-index: 2;
      &.dragging-over{
        background: rgba(255,255,255,0.4);
        border: 4px dashed $color-primary;
      }
      .file-upload-errors{
        position: absolute;
        top: 100%;
        font-size: 1rem;
        line-height: 1.2;
      }
    }
    .file-upload,
    .file-upload > div{
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 100%;
    }
  }
</style>
