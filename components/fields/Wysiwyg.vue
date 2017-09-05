<template>

  <div class="wysiwyg">

    <quill-editor ref="quillEditor"
        v-model="htmlContent"
        :options="editorOptions"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)"
        @change="onEditorChange($event)">
    </quill-editor>

    <textarea v-model="htmlContent" class="hide"></textarea>
  </div>
  
</template>

<script>
  import { quillEditor } from 'vue-quill-editor'

  export default {
    props: {
      default: {
        type: String,
        default: ''
      }
    },

    data () {
      return {
        htmlContent: this.default,
        editorOptions: {
          theme: false,
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'align': [] }],
              ['link', 'image'],
              ['clean']
            ]
          }
        }
      }
    },

    methods: {
      onEditorBlur (editor) {
        // console.log('editor blur!', editor)
        // console.log(this.$refs.quillOutput)
        this.$emit('updated', this.htmlContent)
        // this.$refs.quillOutput.value = this.htmlContent
      },
      onEditorFocus (editor) {
        // console.log('editor focus!', editor)
      },
      onEditorReady (editor) {
        // console.log('editor ready!', editor)
      },
      onEditorChange ({ editor, html, text }) {
        // console.log('editor change!', editor, html, text)
        this.htmlContent = html
      }
    },

    computed: {
      editor () {
        return this.$refs.quillEditor.quill
      }
    },

    components: {
      quillEditor
    }
  }
</script>


<style lang="scss">
    
  @import "~assets/scss/global/variables";

  .ql-toolbar{
    button{
      margin: 0;
    }
  }
  .ql-toolbar{
    background: $grey7;
  }
  .ql-editor{
    background: $white;
  }

</style>