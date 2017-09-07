// import axios from '~/plugins/axios'

export const state = () => ({
  items: []
})

export const mutations = {
  load (state, data) {
    state.items = data
  },
  add (state, data) {
    state.items.push({
      key: data.key,
      value: data.value
    })
  },
  remove (state, { setting }) {
    state.items.splice(state.items.indexOf(setting), 1)
  }
}

export const actions = {
  async fetch (context) {
    const data = await this.$axios.$get('/admin/settings')
    context.commit('load', data)
  }
}
