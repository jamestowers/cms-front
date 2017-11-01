<template>
  <div class="field-editor border-bottom p3">

      <div class="form-group">
        <label for="label">Label</label>
        <input @blur.stop="updateLabel($event.target.value)" :value="field.label" placeholder="Enter a title for this field" type="text" name="label" id="label" />
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

        <a @click="addField" href="javascript:void(0)" role="button" class="btn-sm pull-right">Add field</a>

      </div>

      <!-- handle field options/choices -->
      <div v-if="fieldRequiresOptions">
        <div class="form-group">
          <label for="description">Choices</label>
          <textarea @blur.stop="parseChoicesThenUpdateField('options', $event.target.value)" :value="choices" name="options" id="options"></textarea>
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
    // Field Index is used to target the field when updatig it frm the $store actions
    // it is apoended to the end of indexFromRoot
    fieldIndex: {
      type: Number,
      required: true
    },
    blockId: {
      type: Number,
      required: true
    },
    // Index from root tracks the nesting index of each field's parent group
    // so that we can pass it to the $store action in order to update the 
    // field - it is appended to this.$store.state['content-blocks'].items
    // should be string like: [0] or [6].fields[0].children
    indexFromRoot: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      updatedField: _.clone(this.field),

      fieldRequiresOptions: false,

      choices: '',

      emptyField: {
        content_block_id: this.blockId,
        parent_field_id: '',
        label: '',
        name: '',
        type: '',
        description: '',
        container_class: '',
        required: 1,
        children: []
      }
    }
  },

  created () {
    this.reset()
  },

  updated () {
    this.reset()
  },

  computed: {
    /* editing () {
      return this.field.id !== undefined
    }, */
  },

  methods: {
    reset () {
      // Need to re-clone the field as it gets updated whenever 
      // store is updated. This avoids the "Do not mutate vuex 
      // store state outside mutation handlers" error
      this.updatedField = _.clone(this.field)

      this.setFieldRequiresOptions()

      this.renderChoices(this.updatedField)
    },

    updateField (key, value) {
      this.updatedField[key] = value

      this.$store.commit('content-blocks/updateField', {
        field: this.updatedField,
        parentGroupIndex: this.indexFromRoot,
        fieldIndex: this.fieldIndex
      }) // Updates store only
      // this.$store.dispatch('content-blocks/updateField', this.updatedField) // Updates store and persists to DB

      // Do this AFTER the commit above so that the empty field isnt committed
      // until the updated field comes back from store
      if (key === 'type') {
        this.handleTypeChange(key, value)
      }
    },

    addField () {
      this.$store.commit('content-blocks/addField', {
        field: this.emptyField,
        parentGroup: this.indexFromRoot,
        parentIndex: this.fieldIndex
      })
      // this.updatedField.children.push(this.emptyField)
    },

    deleteField () {
      this.$store.dispatch(`content-blocks/deleteField`, this.field)
      this.$nuxt.$router.replace({ name: 'blocks-block', params: {block: this.field.content_block_id} })
    },

    updateLabel (value) {
      this.updateField('label', value)

      // Need to wait until $nextTick here iter wise we get "Do not mutate vuex 
      // store state outside mutation handlers" error because the next updatefield
      // is done before the previous one has finished
      this.$nextTick(() => {
        if (this.updatedField.name === null || this.updatedField.name === '') {
          this.updateField('name', _.snakeCase(value))
        }
      })
    },

    handleTypeChange (key, value) {
      // Add option panel if field type requires it
      // this.fieldRequiresOptions = ['select', 'radio', 'checkbox'].includes(value)
      this.setFieldRequiresOptions(value)

      // If we've switched to a field-group type, then add an empty field to the
      // field children array, but only if there isnt already at least one child field
      if (value === 'field-group' && !this.updatedField.children.length) {
        this.addField()
      }
    },

    renderChoices (field = this.updatedField) {
      //  Parse the data from the server into the format used in the
      // textarea of the edit window - it takes the json and returns key/value pairs
      // one per line and in key:value format
      let options = ''
      if (field.options) {
        for (let opt in field.options) {
          options += `${field.options[opt].key}:${field.options[opt].value}\n`
        }
      }
      this.choices = options
    },

    parseChoices (newValue) {
      // Does the reverse of renderChoices() and takes the value of the textarea, 
      // splits it into key:value pairs and pushes the key value pairs into an 
      // array ready for submitting to the server as json
      let choices = []
      let lines = newValue.replace(/^\s+|,\s*$/g, '').split('\n').filter(n => n)
      for (var i = 0, len = lines.length; i < len; i++) {
        var match = lines[i].match(/^\s*"?([^":]*)"?\s*:\s*"?([^"]*)\s*$/)
        choices.push({
          key: match[1],
          value: match[2]
        })
      }
      return choices
    },

    parseChoicesThenUpdateField (key, value) {
      let options = this.parseChoices(value)
      this.updateField(key, options)
    },

    setFieldRequiresOptions (value = this.field.type) {
      // eslint-disable-next-line
      // value = (typeof value !== 'undefined') ? value : this.field.type
      this.fieldRequiresOptions = ['select', 'radio', 'checkbox'].includes(value)
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
