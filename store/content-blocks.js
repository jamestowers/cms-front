// import axios from '~/plugins/axios'

export const state = () => ({
  items: [],
  fieldTypes: [],
  editing: false
})

export const mutations = {
  load (state, data) {
    state.items = data
  },
  loadFieldTypes (state, data) {
    state.fieldTypes = data
  },
  add (state, data) {
    state.items.push({
      key: data.key,
      value: data.value
    })
  },
  remove (state, { setting }) {
    state.items.splice(state.items.indexOf(setting), 1)
  },
  edit (state, block) {
    state.editing = block
  }
}

/* export const actions = {
  async fetch (context) {
    const data = await this.$axios.$get('/admin/content-blocks')
    context.commit('load', data)
  }
} */
