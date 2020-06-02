import Axios from '../utils/axios'

export default class RiesgoTercerNivel {
  constructor (
    id = 0,
    v0 = '',
    v1 = '',
    est = '',
    v2 = '',
    v3 = 0,
    v4 = '',
    v5 = '',
    v6 = 0,
    v7 = 0,
    v8 = '',
    v9 = 0
  ) {
    this.id = id
    this.c_nombre = v0
    this.c_respuesta = v1
    this.c_estrategia = est
    this.c_escala_probabilidad = v2
    this.n_valoracion_probabilidad = v3
    this.c_objetivo_afectado = v4
    this.c_escala_impacto = v5
    this.n_valoracion_impacto = v6
    this.n_valoracion_calificacion_riesgo = v7
    this.c_calificacion_calificacion_riesgo = v8
    this.riesgo_segundo_nivel_id = v9
  }

  static fromJson (json) {
    const riesgo = new RiesgoTercerNivel(
      json.id,
      json.c_nombre,
      json.c_respuesta,
      json.c_estrategia,
      json.c_escala_probabilidad,
      json.n_valoracion_probabilidad,
      json.c_objetivo_afectado,
      json.c_escala_impacto,
      json.n_valoracion_impacto,
      json.n_valoracion_calificacion_riesgo,
      json.c_calificacion_calificacion_riesgo,
      json.riesgo_segundo_nivel_id
    )
    return riesgo
  }

  static async byRiesgoSegundoNivelId (id) {
    const { status, data } = await Axios.get('1/riesgo-tercer-nivel/by/riesgoId', { params: { id } })
    if (status === 200) {
      return data
    }
    return false
  }

  async store () {
    const { status, data } = await Axios.post('1/riesgo-tercer-nivel', this)
    if (status === 201) {
      return data
    }
    return false
  }

  async update () {
    const { status, data } = await Axios.put(`1/riesgo-tercer-nivel/${this.id}`, this)
    if (status === 201) {
      return data
    }
    return false
  }
}
