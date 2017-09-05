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
