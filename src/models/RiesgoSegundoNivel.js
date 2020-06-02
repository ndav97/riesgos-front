import Axios from '../utils/axios'

export default class RiesgoSegundoNivel {
  constructor (
    id = 0,
    v0 = '',
    v1 = ''
  ) {
    this.id = id
    this.c_nombre = v0
    this.riesgo_primer_nivel_id = v1
  }

  static fromJson (json) {
    const riesgo = new RiesgoSegundoNivel(
      json.id,
      json.c_nombre,
      json.riesgo_primer_nivel_id
    )
    return riesgo
  }

  static async byRiesgoPrimerNivelId (id) {
    const { status, data } = await Axios.get('1/riesgo-segundo-nivel/by/riesgoId', { params: { id } })
    if (status === 200) {
      return data
    }
    return false
  }

  async store () {
    const { status, data } = await Axios.post('1/riesgo-segundo-nivel', this)
    if (status === 201) {
      return data
    }
    return false
  }

  async update () {
    const { status, data } = await Axios.put(`1/riesgo-segundo-nivel/${this.id}`, this)
    if (status === 201) {
      return data
    }
    return false
  }
}
