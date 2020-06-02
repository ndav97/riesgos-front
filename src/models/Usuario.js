import Axios from '../utils/axios'

export default class Usuario {
  constructor (
    id = 0,
    nommbreCompleto = '',
    email = '',
    password = ''
  ) {
    this.id = id
    this.c_nombre_completo = nommbreCompleto
    this.c_email = email
    this.c_password = password
  }

  static fromJson (json) {
    const user = new Usuario(json)
    return user
  }

  async login () {
    const { status, data, headers } = await Axios.post(`1/user/login`, this)
    if (status === 200) {
      return { data, headers }
    }
    return false
  }

  async store () {
    const { status, data } = await Axios.post('1/user', this)
    if (status === 201) {
      return data
    }
    return false
  }
}
