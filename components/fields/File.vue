<template>
  <div class="file-upload" :class="computedClasses">
    <div 
      @dragstart.stop.prevent="onDragStart"
      @dragenter.stop.prevent="onDragStart"
      @dragend.stop.prevent="onDragStop"
      @dragleave.stop.prevent="onDragStop"
      @drop.stop.prevent="onFileDrop"
      >

      <input 
        @change="onFileChange"
        ref="fileInput"
        type="file" 
        :name="name"
        :id="name"
        />
      
      <label :for="name" :class="btnClass">{{ buttonLabel }}</label>

      <div v-if="uploadErrors.length" class="is-error">
        <ul>
          <li v-for="error in uploadErrors" :key="error">{{ error }}</li>
        </ul>
      </div>

      <div v-if="isUploading" class="progress">
        <div ref="progressBar" class="progress-bar"></div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {

    props: {
      value: {
        type: Object
      },
      label: {
        type: String,
        default: 'Choose file'
      },
      name: {
        type: String,
        default: 'file'
      },
      action: {
        type: String,
        required: true
      },
      accept: {
        type: String,
        default: ''
      },
      maxSize: {
        type: Number,
        default: Number.MAX_SAFE_INTEGER
      },
      btnClass: {
        type: String,
        default: 'btn btn-primary'
      }
    },

    data () {
      return {
        files: [],
        fileTypes: [],
        isUploading: false,
        buttonLabel: this.label,
        draggingOver: false,
        uploadedFile: null,
        uploadErrors: []
      }
    },

    computed: {
      supportsDragAndDrop () {
        const div = document.createElement('div')
        return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && !('ontouchstart' in window || navigator.msMaxTouchPoints)
      },
      computedClasses () {
        return {
          'dragging-over': this.draggingOver
        }
      }
    },

    mounted () {
      if (this.accept !== 'image/*') {
        this.fileTypes = this.accept.split(',')
        this.fileTypes = this.fileTypes.map(s => s.trim())
      }
    },

    methods: {
      onDragStart () {
        if (!this.supportsDragAndDrop) {
          return
        }
        this.draggingOver = true
      },
      onDragStop () {
        if (!this.supportsDragAndDrop) {
          return
        }
        this.draggingOver = false
      },
      onFileDrop (e) {
        this.onDragStop()
        this.onFileChange(e)
      },
      onFileChange (e) {
        let files = e.target.files || e.dataTransfer.files
        if (files.length === 0) {
          this.buttonLabel = this.label
          return
        }

        // Size limit check
        if (files[0].size <= 0 || files[0].size > this.maxSize * 1024 * 1024) {
          this.uploadErrors.push('The file size exceeds the ' + this.maxSize + 'MB limit.')
          return
        }

        // File type check
        if (this.accept === 'image/*') {
          if (files[0].type.substr(0, 6) !== 'image/') {
            this.uploadErrors.push('This file type is not supported, images only please')
            return
          }
        } else {
          if (this.fileTypes.indexOf(files[0].type) === -1) {
            this.uploadErrors.push('This file type is not supported.')
            return
          }
        }

        if (files.length > 1) {
          this.buttonLabel = files.length + ' files selected'
        } else {
          this.buttonLabel = files[0].name // || this.$refs.fileInput.value.split('\\').pop()
        }

        this.files = files
        this.uploadFile()
      },

      uploadFile () {
        this.isUploading = true
        this.$emit('uploadStart')
        let self = this
        let data = new FormData()
        data.append('file', this.files[0])

        this.$axios.$post(this.action, data, {
          progress (e) {
            if (e.lengthComputable) {
              self.$refs.progressBar.style.width = Math.ceil((e.loaded / e.total) * 100) + '%'
            }
          }
        }).then(this.onUploadSuccess, this.onUploadError)
      },

      onUploadSuccess (response) {
        this.uploadedFile = response
        this.onUploadComplete()
        this.$emit('input', response)
      },

      onUploadError (response) {
        // console.error(error);
        let resp = {
          error: true,
          data: {
            message: response.error
          }
        }
        this.onUploadComplete()
        this.$emit('uploadError', resp)
      },

      onUploadComplete () {
        this.isUploading = false
        this.$emit('uploadComplete')
      }
    }
  }
</script>

<style lang="scss">
  @import "~assets/scss/global/variables";

  .file-upload {
    &.dragging-over {
      background: $grey7;
    }
  }

  .progress {
    background: $grey7;
    border-radius: 20px;
    overflow: hidden;
    height: 4px;
    position: relative;
  }

  .progress-bar {
    width: 0%;
    background: $color-primary;
    height: 100%;
    position: absolute;
    transition: width 0.4s ease-in-out;
    top: 0;
    left: 0;
  }

  input[type="file"]{
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
    -webkit-appearance: none;
  }
  input[type="file"] + label {
      background-color: $color-primary;
      color:$white;
      border-radius: 4px;
      font: 16px $font-header;
      text-transform: uppercase;
      padding: 10px 20px;
      display: inline-block;
      cursor: pointer;
      &:before{
        font-size: 1em;
        vertical-align: middle;
      }
      &.btn-sm{
        padding: 4px 10px;
        font-size: 1rem;
        border-radius: 30px;
        &:after{
          border-radius: 30px;
        }
        i{
          font-size: 1.8rem;
        }
      }
  }
  input[type="file"]:focus + label,
  input[type="file"] + label:hover {
      background-color: lighten($color-primary, 7);
      transition: transform 0.1s ease-in;
      transform: scale(1.05);
  }
  input[type="file"]:focus + label {
    outline: 1px dotted #000;
    outline: -webkit-focus-ring-color auto 5px;
    * {
      pointer-events: none;
    }
  }
</style>