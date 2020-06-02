import { SessionStorage } from 'quasar'

export function getIdentity ({ commit, state }) {
  if (state.identity) return

  let identity = SessionStorage.getItem('identity')

  commit('IDENTITY_UPDATE', identity)
}

export function getToken ({ commit, state }) {
  if (state.token) return

  let token = SessionStorage.getItem('token')

  commit('TOKEN_UPDATE', token)
}

export function getIsLogged ({ commit }) {
  let logged = !SessionStorage.isEmpty()

  commit('ISLOGGED_UPDATE', logged)
}
