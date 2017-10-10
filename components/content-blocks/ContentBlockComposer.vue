<template>
  <div class="content-block-composer">
    
    <draggable v-model="blocks" :options="{ handle:'.drag-handle', draggable:'.content-block-editor' }" @start="dragging=true" @end="dragging=false">
      <content-block-field-group @input="setContent" v-for="(block, index) in blocks" :key="index" :block="block" :index="index"></content-block-field-group>
    </draggable>

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
import ContentBlockFieldGroup from '~/components/content-blocks/ContentBlockFieldGroup.vue'
import Draggable from 'vuedraggable'

export default {
  props: ['value'],

  data () {
    return {
      blocks: this.value,
      dragging: false
    }
  },

  methods: {
    insertBlock (block) {
      this.blocks.push({
        type: block.type,
        fields: {}
      })
    },

    setContent (data) {
      this.blocks[data.blockIndex].fields = data.values
      this.$emit('input', this.blocks)
    }
  },

  components: {
    ContentBlockFieldGroup,
    Draggable
  }
}
</script>

<style lang="scss">

</style>
