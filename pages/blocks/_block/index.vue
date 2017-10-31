<template>
  <div class="content-body bg-white">
    <div class="block-editor border-bottom p3 bg-grey3 text-white">
      <h1 class="page-title m0">Edit block: {{ block.title }}</h1>
      
      <div class="form-group pull-right text-right mt1">
        <button @click="save" class="mr2">Save block</button>
        <loading v-show="loading" class="pull-right"></loading>
      </div>

      <div class="actions mb2">
        <ul class="inline small m0">
          <li><a href="" class="pr2 is-error">Delete block</a></li>
          <li><a href="" class="pr2 text-white">Add field group</a></li>
        </ul>
      </div>
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

    <content-block-field-repeater 
      class="content-block-field-editor"
      v-model="block.fields"
      :block-id="block.id"
      :index-from-root="`[${blockIndex}].fields`"
      ></content-block-field-repeater>

    <div class="form-group text-right mt1">
      <button @click="save" class="mr2">Save block</button>
      <loading v-show="loading" class="pull-right"></loading>
      <button @click="deleteBlock" class="btn-clear">Delete block</button>
    </div>

  </div>
</template>

<script>
import Loading from '~/components/Loading'

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
    blockIndex () {
      if (!isNaN(this.$route.params.block)) {
        return this.$store.state['content-blocks'].items.findIndex((x) => x.id === Number(this.$route.params.block))
      }
    },
    block () {
      if (isNaN(this.$route.params.block)) {
        return this.emptyBlock
      } else {
        return this.$store.state['content-blocks'].items[this.blockIndex]
        // .items.find(x => x.id === Number(this.$route.params.block))
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
      this.$store.dispatch(`content-blocks/${action}`, { id: this.block.id, block: this.block })
    },
    deleteBlock () {
      this.$store.dispatch('content-blocks/deleteBlock', { id: this.block.id })
      this.$nuxt.$router.replace({ name: 'blocks' })
    }
  },

  components: {
    Loading
  }
}
</script>

<style lang="scss">
  .block-edit{
    flex: 1;
  }
  .content-block-field-editor{
    .accordion{
      margin-bottom: 4px;
    }
  }
</style>
