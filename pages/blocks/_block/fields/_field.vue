<template>
  <div class="block-edit flex">
    <div class="content-body p3 bg-white">
      <h1>Edit {{ field.label }}</h1>

      <div class="form-group">
        <label for="label">Label</label>
        <input @keyup.stop="updateField('label', $event.target.value)" :value="field.label" type="text" name="label" id="label" />
      </div>

      <div class="form-group">
        <label for="type">Type</label>
        <multiselect
          class="border"
          @select="updateField('type', $event)" 
          :value="field.type"
          :options="$store.state['content-blocks'].fieldTypes"
          placeholder="Field type"
          select-label="Click to select"
          deselect-label="Click to deselect">
        </multiselect>
      </div>
      
      <div v-if="fieldRequiresOptions">
        <div class="form-group">
          <label for="description">Choices</label>
          <textarea @keyup.stop="updateField('options', $event.target.value)" :value="editedFields.options" name="options" id="options"></textarea>
          <div class="help-block">Enter possible choices in the format <code>value:label</code>, one per line. eg: <code>m:Male</code> </div>
        </div>

        <div class="form-group">
          <label for="label">Default</label>
          <input @keyup.stop="updateField('default', $event.target.value)" :value="field.default" type="text" name="default" id="default" />
        </div>
    </div>

      <div class="form-group">
        <label for="description">Instruction</label>
        <textarea @keyup.stop="updateField('description', $event.target.value)" :value="field.description" name="description" id="description"></textarea>
        <div class="help-block">Enter any helpful instructions here</div>
      </div>

      <div class="form-group">
        <checkbox @input="updateField('required', $event)" :is-checked="field.required" label="Field is required" id="is-required"></checkbox>
      </div>

      <div class="form-group">
        <button @click="save">Save field</button>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import Checkbox from '~/components/fields/Checkbox.vue'

export default {
  data () {
    return {
      editedFields: {},
      fieldRequiresOptions: false
    }
  },
  created () {
    this.setFieldRequiresOptions()
  },
  updated () {
    if (this.field) {
      this.setFieldRequiresOptions()
    }
  },
  computed: {
    field () {
      return this.$store.state['content-blocks']
        .items.find(x => x.id === Number(this.$route.params.block))
        .fields.find(x => x.id === Number(this.$route.params.field))
    }
  },
  methods: {
    updateField (key, value) {
      this.editedFields[key] = value
      if (key === 'type') {
        this.fieldRequiresOptions = ['select', 'radio', 'checkbox'].includes(value)
      }
    },
    setFieldRequiresOptions () {
      this.fieldRequiresOptions = ['select', 'radio', 'checkbox'].includes(this.field.type)
      this.renderChoices()
    },
    renderChoices () {
      let options = ''
      for (let key in this.field.options) {
        options += `${key}:${this.field.options[key]}\n`
      }
      this.editedFields.options = options
    },
    parseChoices () {
      let choices = {}
      let parts = this.editedFields.options.replace(/^\s+|,\s*$/g, '').split('\n').filter(n => n)
      for (var i = 0, len = parts.length; i < len; i++) {
        var match = parts[i].match(/^\s*"?([^":]*)"?\s*:\s*"?([^"]*)\s*$/)
        choices[match[1]] = match[2]
      }
      return choices
    },
    prepareParams () {
      this.editedFields['content_block_id'] = this.$route.params.block
      if (this.fieldRequiresOptions) {
        this.editedFields.options = this.parseChoices()
        delete this.editedFields.options
      }
    },
    save () {
      this.prepareParams()
      this.$axios.put(`admin/content-blocks/fields/${this.field.id}`, this.editedFields)
    }
  },
  components: {
    Checkbox,
    Multiselect
  }
}
</script>

<style lang="scss">
  .block-edit{
    flex: 1;
  }
</style>
