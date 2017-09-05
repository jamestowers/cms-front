export const state = () => ({
  message: null
})

export const mutations = {
  set (state, data) {
    state.message = data
  },
  clear (state) {
    state.message = null
  }
}
