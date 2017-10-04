<template>
  <div class="p2 mb2  bg-grey7">
    <h2>{{ editor.title }}</h2>
    <div class="content-block-editor mb2" :class="field.container_class" v-for="field in editor.fields" :key="field.id">
      <component @input="setValue(field.name, $event)" :is="`field_${field.type}`" :field="field" :value="block.fields[field.name]"></component>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    block: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },

  data () {
    return {
      values: {}
    }
  },

  methods: {
    setValue (key, value) {
      this.values[key] = value
      this.$nextTick(() => this.$emit('input', { blockIndex: this.index, values: this.values }))
    }
  },

  computed: {
    editor () {
      return this.$store.state['content-blocks'].items.find(x => x.type === this.block.type)
    }
  },

  components: {
    field_text: () => import('~/components/content-blocks/Text.vue'),
    field_textarea: () => import('~/components/content-blocks/Textarea.vue'),
    field_wysiwyg: () => import('~/components/content-blocks/Wysiwyg.vue'),
    field_select: () => import('~/components/content-blocks/Select.vue'),
    field_radio: () => import('~/components/content-blocks/Radio.vue'),
    field_align: () => import('~/components/content-blocks/Align.vue')
  }
}
</script>

<style lang="scss">

</style>
