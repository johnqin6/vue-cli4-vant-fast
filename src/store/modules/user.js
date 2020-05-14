const user = {
  namespaced: true,
  state: {
    token: ''
  },
  mutations: {
    SETTOKEN(state, token) {
      state.token = token
    },
    DELTOKEN(state) {
      state.token = ''
    }
  },
  actions: {
    setToken({ commit }, token) {
      localStorage.setItem('token', token)
      commit('SETTOKEN', token)
    },
    removeToken({ commit }) {
      localStorage.removeItem('token')
      commit('DELTOKEN')
    }
  }
}

export default user
