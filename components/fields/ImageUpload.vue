<template>
  <div class="image-upload">
    <div v-if="value" :class="thumbnailClass">
      <img :src="value" :width="thumbnailWidth">
    </div>

    <file 
      @input="onImageUploaded"
      accept="image/*" 
      :action="action" 
      :label="label"
      :maxSize="maxSize"
      :name="name"
      :btn-class="btnClass"></file>
  </div>
</template>

<script>
  import File from '~/components/fields/File'

  export default {

    props: {
      value: {
        type: String, Object
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
        required: true
      },
      maxSize: {
        type: Number,
        default: Number.MAX_SAFE_INTEGER
      },
      btnClass: {
        type: String,
        default: 'btn btn-primary'
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
        //
      }
    },

    computed: {
      //
    },

    mounted () {
      // console.log(this.value)
    },

    methods: {
      onImageUploaded (val) {
        this.$emit('input', val)
      }
    },
  
    components: {
      File
    }
  }
</script>

<style lang="scss">
  @import "~assets/scss/global/variables";

  .image-upload{
    background: $grey7;
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