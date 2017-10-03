// import axios from '~/plugins/axios'

export const state = () => ({
  items: [],
  fieldTypes: []
})

export const mutations = {
  load (state, data) {
    state.items = data
  },

  loadFieldTypes (state, data) {
    state.fieldTypes = data
  },

  addBlock (state, data) {
    state.items.push({
      key: data.key,
      value: data.value
    })
  },

  updateBlock (state, block) {
    let index = state.items.findIndex((x) => x.id === block.id)
    state.items.splice(index, 1, block)
  },

  addField (state, field) {
    state.items.find((x) => x.id === field.content_block_id).fields.push(field)
  },

  updateField (state, field) {
    let blockIndex = state.items.findIndex((x) => x.id === field.content_block_id)
    let index = state.items[blockIndex].fields.findIndex((x) => x.id === field.id)
    state.items[blockIndex].fields.splice(index, 1, field)
  },

  deleteBlock (state, { setting }) {
    state.items.splice(state.items.indexOf(setting), 1)
  },

  deleteField (state, { setting }) {
    state.items.splice(state.items.indexOf(setting), 1)
  }

}

export const actions = {

  /* async saveBlock (context) {
    const data = await this.$axios.$put('/admin/content-blocks')
    context.commit('load', data)
  }, */

  async createField ({ commit, state }, data) {
    const res = await this.$axios.$post(`/admin/content-blocks/${data.fields.content_block_id}/fields`, data.fields)
    commit('addField', res.entity)
  },

  async updateField ({ commit, state }, data) {
    const res = await this.$axios.$put(`/admin/content-blocks/fields/${data.id}`, data.fields)
    commit('updateField', res.entity)
  },

  async createBlock ({ commit, state }, data) {
    const res = await this.$axios.$post(`/admin/content-blocks`, data.block)
    commit('addBlock', res.entity)
  },

  async updateBlock ({ commit, state }, data) {
    const res = await this.$axios.$put(`/admin/content-blocks/${data.id}`, data.block)
    commit('updateBlock', res.entity)
  }
  /* async fetch (context) {
    const data = await this.$axios.$get('/admin/content-blocks')
    context.commit('load', data)
  } */
}
