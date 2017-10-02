<template>
  <div class="quill-editor" 
    :content="value"
    :options="editorOptions"
    @change="onEditorChange($event)"
    v-quill:quillEditor="editorOptions">
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      // value: this.value,
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
    },
    onEditorFocus (editor) {
      // console.log('editor focus!', editor)
    },
    onEditorReady (editor) {
      // console.log('editor ready!', editor)
    },
    onEditorChange ({ editor, html, text }) {
      // console.log('editor change!', editor, html, text)
      this.$emit('input', html)
    }
  },

  computed: {
    editor () {
      return this.quillEditor
    }
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
