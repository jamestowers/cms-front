import axios from '~/plugins/axios'

export const state = () => ({
  //
})

export const mutations = {
  // 
}

export const actions = {
  async nuxtServerInit ({commit}) {
    let {data} = await axios.get('/admin/categories')
    commit('categories/load', data)
  }
}
