<template>
  <div class="content-block-composer">
    
    <content-block-editor @input="setContent" v-for="(block, index) in blocks" :key="index" :block="block" :index="index"></content-block-editor>

    <div class="content-block-composer-buttons mt2 border-top">
      <ul class="inline">
        <li><h3>Insert:</h3> </li>
        <li v-for="block in $store.state['content-blocks'].items" :key="block.id" class="mr1">
          <a @click.prevent="insertBlock(block)" href="#" :title="block.description" role="button" class="btn-sm btn-tertiary">{{ block.title }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ContentBlockEditor from '~/components/content-blocks/ContentBlockEditor.vue'

export default {
  props: ['value'],

  data () {
    return {
      blocks: this.value
    }
  },

  methods: {
    insertBlock (block) {
      // let fields = this.$store.state['content-blocks'].items.find(x => x.key === block.key).fields
      this.blocks.push({
        type: block.type,
        fields: {}
      })
    },
    setContent (data) {
      this.blocks[data.blockIndex].fields = data.values
      this.$emit('input', this.blocks)
    },
    getKeysFromBlockFields (fields) {
      let arr = {}
      for (let field of fields) {
        arr[field.name] = ''
      }
      return arr
    }
  },

  components: {
    ContentBlockEditor
  }
}
</script>

<style lang="scss">

</style>
