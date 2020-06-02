import Axios from '../utils/axios'

export default class RiesgoPrimerNivel {
  constructor (
    id = 0,
    v0 = '',
    v1 = '',
    v2 = ''
  ) {
    this.id = id
    this.codigo = v0
    this.c_nombre = v1
    this.user_id = v2
  }

  static fromJson (json) {
    const riesgo = new RiesgoPrimerNivel(
      json.id,
      json.codigo,
      json.c_nombre,
      json.user_id
    )
    return riesgo
  }

  static async byUserId (id) {
    const { status, data } = await Axios.get('1/riesgo-primer-nivel/by/userId', { params: { id } })
    if (status === 200) {
      return data
    }
    return false
  }

  async store () {
    const { status, data } = await Axios.post('1/riesgo-primer-nivel', this)
    if (status === 201) {
      return data
    }
    return false
  }

  async update () {
    const { status, data } = await Axios.put(`1/riesgo-primer-nivel/${this.id}`, this)
    if (status === 201) {
      return data
    }
    return false
  }
}
