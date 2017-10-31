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

  // ------ BLOCKS ------ //

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

  deleteBlock (state, blockId) {
    let index = state.items.findIndex((x) => x.id === blockId)
    state.items.splice(index, 1)
  },

  // ------ FIELDS ------ //
  addField (state, { field, parentGroup, parentIndex }) {
    // eslint-disable-next-line
    const fieldGroup = eval('state.items' + parentGroup)
    console.log(fieldGroup)
    fieldGroup[parentIndex].children.push(field)
  },

  updateField (state, { field, parentGroupIndex, fieldIndex }) {
    // eslint-disable-next-line
    const fieldGroup = eval('state.items' + parentGroupIndex)
    fieldGroup.splice(fieldIndex, 1, field)
  },

  deleteField (state, field) {
    let blockIndex = state.items.findIndex((x) => x.id === field.content_block_id)
    let index = state.items[blockIndex].fields.findIndex((x) => x.id === field.id)
    state.items[blockIndex].fields.splice(index, 1)
  }

}

export const actions = {

  async createField ({ commit, state }, data) {
    const res = await this.$axios.$post(`/admin/content-blocks/${data.fields.content_block_id}/fields`, data.fields)
    if (res.success) {
      commit('addField', res.entity)
      commit('status/set', `${res.entity.label} field created`, { root: true })
    }
  },

  async updateField ({ commit, state }, data) {
    const res = await this.$axios.$put(`/admin/content-blocks/fields/${data.id}`, data)
    if (res.success) {
      commit('updateField', res.entity)
      commit('status/set', `${res.entity.label} field saved`, { root: true })
    }
  },

  async deleteField ({ commit, state }, field) {
    const res = await this.$axios.$delete(`/admin/content-blocks/fields/${field.id}`)
    if (res.success) {
      commit('deleteField', field)
      commit('status/set', `${field.label} field deleted`, { root: true })
    }
  },

  async createBlock ({ commit, state }, data) {
    const res = await this.$axios.$post(`/admin/content-blocks`, data.block)
    if (res.success) {
      commit('addBlock', res.entity)
      commit('status/set', `${res.entity.title} block created`, { root: true })
    }
  },

  async updateBlock ({ commit, state }, data) {
    const res = await this.$axios.$put(`/admin/content-blocks/${data.id}`, data.block)
    if (res.success) {
      commit('updateBlock', res.entity)
      commit('status/set', `${res.entity.title} block saved`, { root: true })
    }
  },

  async deleteBlock ({ commit, state }, data) {
    const res = await this.$axios.$delete(`/admin/content-blocks/${data.id}`)
    if (res.success) {
      commit('deleteBlock', data.id)
      commit('status/set', 'Block deleted', { root: true })
    }
  },

  async fetch (context) {
    const data = await this.$axios.$get('/admin/content-blocks')
    context.commit('load', data)
  }
}
