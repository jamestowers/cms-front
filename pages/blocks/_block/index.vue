<template>
  <div class="block-edit content-body p3 bg-white">
    <h1 class="page-title">Edit block: {{ block.title }}</h1>
    
    <div class="form-group">
      <label for="block-name">Block name</label>
      <input @keyup.stop="updateField('title', $event.target.value)" :value="block.title" type="text">
    </div>

    <div class="form-group">
      <label for="description">Description</label>
      <textarea @keyup.stop="updateField('description', $event.target.value)" :value="block.description" name="description" id="description"></textarea>
      <div class="help-block">Enter any helpful instructions here</div>
    </div>

    <div class="form-group text-right">
      <button @click="save" class="mr2">Save block</button>
      <button @click="deleteBlock" class="btn-clear">Delete block</button>
    </div>
    
  </div>
</template>

<script>

export default {
  data () {
    return {
      //
    }
  },

  computed: {
    block () {
      return this.$store.state['content-blocks']
        .items.find(x => x.id === Number(this.$route.params.block))
    }
  },

  methods: {
    updateField (key, value) {
      this.editedFields[key] = value
      if (key === 'type') {
        this.fieldRequiresOptions = ['select', 'radio', 'checkbox'].includes(value)
      }
    }
  }
}
</script>

<style lang="scss">
  .block-edit{
    flex: 1;
  }
</style>
