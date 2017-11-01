<template>
  <draggable 
      v-model="value" 
      :options="{draggable:'.drag-handle'}"
      @start="dragging=true" 
      @end="dragging=false">
      <accordion 
        :title="field.label ? `${index+1} - ${field.label}` : `New field`" 
        handle-class="bg-grey6 px3 py1 m0" 
        v-for="(field, index) in value" 
        :key="field.id"
        class=""
        >
        <content-block-field-group 
          :block-id="blockId"
          :field="field"
          :field-index="index"
          :index-from-root="indexFromRoot"
          >
          </content-block-field-group>
      </accordion>
    </draggable>
</template>

<script>
import Draggable from 'vuedraggable'
import ContentBlockFieldGroup from '~/components/content-blocks/ContentBlockFieldGroup'
import Accordion from '~/components/Accordion'

export default {
  name: 'content-block-field-repeater',
  props: {
    value: { // <-- block.fields or field.children
      type: Array,
      required: true
    },
    blockId: {
      type: Number,
      required: true
    },
    indexFromRoot: {
      type: String,
      required: true
    }
  },

  components: {
    ContentBlockFieldGroup,
    Accordion,
    Draggable
  }
}
</script>
