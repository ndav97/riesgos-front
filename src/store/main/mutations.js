export function toggleDrawer (state, payload) {
  state.leftDrawer = payload
}

export function IDENTITY_UPDATE (state, payload) {
  state.identity = payload
}

export function TOKEN_UPDATE (state, payload) {
  state.token = payload
}

export function ISLOGGED_UPDATE (state, payload) {
  state.isLogged = payload
}
