<template>
  <div class="field-editor border-bottom p3">

      <div class="form-group">
        <label for="label">Label</label>
        <input @blur.stop="updateField('label', $event.target.value)" :value="field.label" placeholder="Enter a title for this field" type="text" name="label" id="label" />
      </div>

      <div class="form-group">
        <label for="name">Key</label>
        <input @blur.stop="updateField('name', $event.target.value)" :value="field.name" type="text" name="name" id="name" />
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
      
      <!-- Handle repeater field -->
      <div class="field-children" v-if="field.type === 'field-group'">
        <label>Fields</label>

        <content-block-field-repeater 
          v-model="field.children" 
          :block-id="blockId"
          :index-from-root="`${indexFromRoot}[${fieldIndex}].children`"
          ></content-block-field-repeater>

      </div>

      <!-- handle field options/choices -->
      <div v-if="fieldRequiresOptions">
        <div class="form-group">
          <label for="description">Choices</label>
          <textarea @blur.stop="choices = $event.target.value" :value="choices" name="options" id="options"></textarea>
          <div class="help-block">Enter possible choices in the format <code>value:label</code>, one per line. eg: <code>m:Male</code> </div>
        </div>

        <div class="form-group">
          <label for="label">Default</label>
          <input @blur.stop="updateField('default', $event.target.value)" :value="field.default" type="text" name="default" id="default" />
        </div>
      </div>

      <div class="form-group">
        <label for="description">Instruction</label>
        <textarea @blur.stop="updateField('description', $event.target.value)" :value="field.description" name="description" id="description"></textarea>
        <div class="help-block">Enter any helpful instructions here</div>
      </div>

      <div class="form-group">
        <label for="containerClass">Container class</label>
        <input @blur.stop="updateField('container_class', $event.target.value)" :value="field.container_class" type="text" name="container_class" id="container_class" />
        <div class="help-block">Optionally add classes to the container div in the edit windows</div>
      </div>

      <div class="form-group">
        <checkbox @change="updateField('required', $event)" :value="field.required" label="Field is required" id="is-required"></checkbox>
      </div>
      
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import Checkbox from '~/components/fields/Checkbox.vue'

export default {
  name: 'content-block-field-group',
  props: {
    field: {
      type: Object,
      default: this.emptyField
    },
    fieldIndex: {
      type: Number,
      required: true
    },
    blockId: {
      type: Number,
      required: true
    },
    indexFromRoot: {
      type: String,
      required: true
    },
    emptyField: {
      content_block_id: this.blockId,
      parent_field_id: '',
      label: '',
      name: '',
      type: '',
      description: '',
      container_class: '',
      required: false,
      children: []
    }
  },

  data () {
    return {
      updatedField: _.clone(this.field),
      fieldRequiresOptions: false
    }
  },

  created () {
    this.setFieldRequiresOptions()
  },

  updated () {
    console.log('updated:', this.field.label)
    this.updatedField = _.clone(this.field)
  },

  computed: {
    editing () {
      return this.field.id !== undefined
    },
    choices: {
      get () {
        let options = ''
        for (let opt in this.updatedField.options) {
          options += `${this.updatedField.options[opt].key}:${this.updatedField.options[opt].value}\n`
        }
        return options
      },
      set (newValue) {
        let choices = []
        let parts = newValue.replace(/^\s+|,\s*$/g, '').split('\n').filter(n => n)
        for (var i = 0, len = parts.length; i < len; i++) {
          var match = parts[i].match(/^\s*"?([^":]*)"?\s*:\s*"?([^"]*)\s*$/)
          choices.push({
            key: match[1],
            value: match[2]
          })
        }
        this.updateField('options', choices)
      }
    }
  },

  methods: {
    updateField (key, value) {
      this.updatedField[key] = value
      // console.log(this.updatedField.label)
      if (key === 'type') {
        this.fieldRequiresOptions = ['select', 'radio', 'checkbox'].includes(value)
      } else if (key === 'field-group') {
        this.field.push(this.emptyField)
      }

      this.$store.commit('content-blocks/updateField', {
        field: this.updatedField,
        parentGroupIndex: this.indexFromRoot,
        fieldIndex: this.fieldIndex
      }) // Updates store only
      // this.$store.dispatch('content-blocks/updateField', this.updatedField) // Updates store and persists to DB
    },

    parseChoicesThenUpdateField (key, value) {
      let options = this.parseChoices(value)
      this.updateField(key, options)
    },

    setFieldRequiresOptions () {
      this.fieldRequiresOptions = ['select', 'radio', 'checkbox'].includes(this.field.type)
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
  @import "~assets/scss/global/variables";
</style>
