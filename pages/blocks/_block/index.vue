<template>
  <div class="block-edit content-body p3 bg-white">
    <h1 class="page-title">Edit block: {{ block.title }}</h1>
    
    <div class="form-group">
      <label for="block-title">Block title</label>
      <input @keyup.stop="updateBlock('title', $event.target.value)" :value="block.title" type="text" id="block-title">
    </div>

    <div class="form-group">
      <label for="block-name">Name</label>
      <input @keyup.stop="updateBlock('key', $event.target.value)" :value="block.key" type="text" id="block-name">
    </div>

    <div class="form-group">
      <label for="description">Description</label>
      <textarea @keyup.stop="updateBlock('description', $event.target.value)" :value="block.description" name="description" id="description"></textarea>
      <div class="help-block">Enter any helpful instructions here</div>
    </div>

    <div class="form-group text-right">
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
    updateBlock (key, value) {
      this.editedBlock[key] = value
    },
    save () {
      let action = this.editing ? 'updateBlock' : 'createBlock'
      this.$store.dispatch(`content-blocks/${action}`, { id: this.block.id, block: this.editedBlock })
    },
    deleteBlock () {
      this.$axios.delete(`admin/content-blocks/${this.block.id}`)
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
</style>
