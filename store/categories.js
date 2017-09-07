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
      title: data.title,
      slug: data.slug,
      id: data.id
    })
  },
  remove (state, { category }) {
    state.items.splice(state.items.indexOf(category), 1)
  }
}

export const actions = {
  async fetch ({ commit }) {
    const data = await this.$axios.$get('/admin/categories')
    commit('load', data)
  }
}
