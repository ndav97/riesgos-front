/* eslint-disable camelcase */
import Axios from '../utils/axios'

export default class RespuestaRiesgoProyecto {
  constructor (
    id = 0,
    c_estrategia = '',
    c_respuesta = '',
    tercer_nivel_proyecto_id = '',
    c_responsable = ''
  ) {
    this.id = id
    this.c_estrategia = c_estrategia
    this.c_respuesta = c_respuesta
    this.tercer_nivel_proyecto_id = tercer_nivel_proyecto_id
    this.c_responsable = c_responsable
  }

  static fromJson (json) {
    const res = new RespuestaRiesgoProyecto(
      json.id,
      json.c_estrategia,
      json.c_respuesta,
      json.tercer_nivel_proyecto_id,
      json.c_responsable
    )
    return res
  }

  async update () {
    const { status, data } = await Axios.put(`1/respuesta-riesgo/${this.id}`, this)
    if (status === 201) {
      return data
    }
    return false
  }
}
