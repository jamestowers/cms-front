<template>
  <div class="field-editor border-bottom p3 bg-white">

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
        <checkbox @input="updateField('required', $event)" :value="field.required" label="Field is required" id="is-required"></checkbox>
      </div>
      
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import Checkbox from '~/components/fields/Checkbox.vue'

export default {
  props: {
    field: {
      type: Object,
      default: {
        content_block_id: this.blockId,
        label: '',
        name: '',
        type: '',
        description: '',
        container_class: '',
        required: false
      }
    },
    blockId: {
      type: Number,
      required: true
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
    // this.renderChoices()
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
      if (key === 'type') {
        this.fieldRequiresOptions = ['select', 'radio', 'checkbox'].includes(value)
      }
      this.$store.commit('content-blocks/updateField', this.updatedField) // Updates store only
      // this.$store.dispatch('content-blocks/updateField', this.updatedField) // Updates store and persists to DB
    },

    parseChoicesThenUpdateField (key, value) {
      let options = this.parseChoices(value)
      this.updateField(key, options)
    },

    setFieldRequiresOptions () {
      this.fieldRequiresOptions = ['select', 'radio', 'checkbox'].includes(this.field.type)
      /* if (this.field.options) {
        this.renderChoices()
      } */
    },

    /* renderChoices () {
      let options = ''
      for (let opt in this.field.options) {
        options += `${this.field.options[opt].key}:${this.field.options[opt].value}\n`
      }
      this.updatedField.options = options
    },

    parseChoices (options) {
      let choices = []
      let parts = options.replace(/^\s+|,\s*$/g, '').split('\n').filter(n => n)
      for (var i = 0, len = parts.length; i < len; i++) {
        var match = parts[i].match(/^\s*"?([^":]*)"?\s*:\s*"?([^"]*)\s*$/)
        choices.push({
          key: match[1],
          value: match[2]
        })
      }
      return choices
    }, */

    /* prepareParams () {
      this.updatedField['content_block_id'] = this.$route.params.block
      if (this.fieldRequiresOptions) {
        this.updatedField.options = this.parseChoices()
        // delete this.updatedField.options
      }
    },

    save () {
      this.prepareParams()
      let action = this.editing ? 'updateField' : 'createField'
      this.$store.dispatch(`content-blocks/${action}`, { id: this.field.id, fields: this.updatedField })
    }, */

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
