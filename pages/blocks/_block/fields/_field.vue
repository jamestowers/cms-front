<template>
  <div class="block-edit flex">
    <div class="content-body p3 bg-white">
      <h1 class="page-title">Edit field: {{ field.label }}</h1>

      <div class="form-group">
        <label for="label">Label</label>
        <input @keyup.stop="updateField('label', $event.target.value)" :value="field.label" placeholder="Enter a title for this field" type="text" name="label" id="label" />
      </div>

      <div class="form-group">
        <label for="name">Key</label>
        <input @keyup.stop="updateField('name', $event.target.value)" :value="field.name" type="text" name="name" id="name" />
        <div class="help-block">Make this what you want, it is used to reference the field in the component template and is usually a lowercase version of the title, without spaces</div>
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
        <label for="containerClass">Container class</label>
        <input @keyup.stop="updateField('container_class', $event.target.value)" :value="field.container_class" type="text" name="container_class" id="container_class" />
        <div class="help-block">Optionally add classes to the container div in the edit windows</div>
      </div>

      <div class="form-group">
        <checkbox @input="updateField('required', $event)" :is-checked="field.required" label="Field is required" id="is-required"></checkbox>
      </div>

      <div class="form-group text-right">
        <button @click="save" class="mr2">Save field</button>
        <button @click="deleteField" class="btn-clear">Delete field</button>
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
      fieldRequiresOptions: false,
      emptyField: {
        content_block_id: Number(this.$route.params.block),
        label: '',
        name: '',
        type: '',
        description: '',
        container_class: '',
        required: false
      }
    }
  },
  created () {
    this.setFieldRequiresOptions()
  },

  watch: {
    '$route': function (val) {
      this.setFieldRequiresOptions()
    }
  },

  computed: {
    field () {
      if (isNaN(this.$route.params.field)) {
        return this.emptyField
      } else {
        return this.$store.state['content-blocks']
          .items.find(x => x.id === Number(this.$route.params.block))
          .fields.find(x => x.id === Number(this.$route.params.field))
      }
    },
    editing () {
      return this.field.id !== undefined
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
      if (this.field.options) {
        this.renderChoices()
      }
    },
    renderChoices () {
      let options = ''
      for (let opt in this.field.options) {
        options += `${this.field.options[opt].key}:${this.field.options[opt].value}\n`
      }
      this.editedFields.options = options
    },
    parseChoices () {
      let choices = []
      let parts = this.editedFields.options.replace(/^\s+|,\s*$/g, '').split('\n').filter(n => n)
      for (var i = 0, len = parts.length; i < len; i++) {
        var match = parts[i].match(/^\s*"?([^":]*)"?\s*:\s*"?([^"]*)\s*$/)
        choices.push({
          key: match[1],
          value: match[2]
        })
      }
      return choices
    },
    prepareParams () {
      this.editedFields['content_block_id'] = this.$route.params.block
      if (this.fieldRequiresOptions) {
        this.editedFields.options = this.parseChoices()
        // delete this.editedFields.options
      }
    },
    save () {
      this.prepareParams()
      let action = this.editing ? 'updateField' : 'createField'
      this.$store.dispatch(`content-blocks/${action}`, { id: this.field.id, fields: this.editedFields })
    },
    deleteField () {
      this.$store.dispatch(`content-blocks/deleteField`, this.field)
      this.$nuxt.$router.replace({ name: 'blocks-block', params: {block: this.field.content_block_id} })
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
