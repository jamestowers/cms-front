<template>
  <div class="content-body bg-white">
    <div class="block-editor border-bottom p3 bg-grey4 text-white">
      <h1 class="page-title">Edit block: {{ block.title }}</h1>
      
      <div class="form-group">
        <label for="block-title">Block title</label>
        <input @keyup.stop="updateValue('title', $event.target.value)" :value="block.title" type="text" id="block-title">
      </div>

      <div class="form-group">
        <label for="block-name">Name</label>
        <input @keyup.stop="updateValue('type', $event.target.value)" :value="block.type" type="text" id="block-name">
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea @keyup.stop="updateValue('description', $event.target.value)" :value="block.description" name="description" id="description"></textarea>
        <div class="help-block">Enter any helpful instructions here</div>
      </div>
    </div>

    <draggable 
      v-model="block.fields" 
       :options="{draggable:'.drag-handle'}"
      @start="dragging=true" 
      @end="dragging=false">
      <accordion 
        :title="field.label" 
        handle-class="bg-grey7 px3 py2 m0" 
        v-for="field in block.fields" 
        :key="field.id"
        class="mt1"
        >
        <content-block-field-group 
          :block-id="block.id"
          :field="field"
          >
          </content-block-field-group>
      </accordion>
    </draggable>

    <div class="form-group text-right mt1">
      <button @click="save" class="mr2">Save block</button>
      <loading v-show="loading" class="pull-right"></loading>
      <button @click="deleteBlock" class="btn-clear">Delete block</button>
    </div>

  </div>
</template>

<script>
import Loading from '~/components/Loading'
import Draggable from 'vuedraggable'
import ContentBlockFieldGroup from '~/components/content-blocks/ContentBlockFieldGroup'
import Accordion from '~/components/Accordion'

export default {
  data () {
    return {
      editedBlock: {},
      loading: false,
      emptyBlock: {
        title: '',
        name: '',
        description: ''
      }
    }
  },

  computed: {
    block () {
      if (isNaN(this.$route.params.block)) {
        return this.emptyBlock
      } else {
        return this.$store.state['content-blocks']
          .items.find(x => x.id === Number(this.$route.params.block))
      }
    },
    editing () {
      return this.block.id !== undefined
    }
  },

  methods: {
    updateValue (key, value) {
      this.editedBlock[key] = value
    },
    save () {
      let action = this.editing ? 'updateBlock' : 'createBlock'
      this.$store.dispatch(`content-blocks/${action}`, { id: this.block.id, block: this.editedBlock })
    },
    deleteBlock () {
      this.$store.dispatch('content-blocks/deleteBlock', { id: this.block.id })
      this.$nuxt.$router.replace({ name: 'blocks' })
    }
  },

  components: {
    Loading,
    ContentBlockFieldGroup,
    Accordion,
    Draggable
  }
}
</script>

<style lang="scss">
  .block-edit{
    flex: 1;
  }
</style>
