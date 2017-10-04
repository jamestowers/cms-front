export const state = () => ({
  // authUser: null
})

export const mutations = {
  /* SET_USER: function (state, user) {
    state.authUser = user
  } */
}

export const actions = {
  async nuxtServerInit ({ dispatch }, { req }) {
    return Promise.all([
      dispatch('categories/fetch'),
      dispatch('settings/fetch'),
      dispatch('content-blocks/fetch')
    ])
  }
}
