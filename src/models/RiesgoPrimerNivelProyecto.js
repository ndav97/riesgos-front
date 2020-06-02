/* eslint-disable camelcase */
import Axios from '../utils/axios'

export default class RiesgoPrimerNivelProyecto {
  constructor (
    id = 0,
    c_codigo = '',
    n_orden = 1,
    riesgo_primer_nivel_id = '',
    proyecto_id = ''
  ) {
    this.id = id
    this.c_codigo = c_codigo
    this.n_orden = n_orden
    this.riesgo_primer_nivel_id = riesgo_primer_nivel_id
    this.proyecto_id = proyecto_id
  }

  static fromJson (json) {
    const riesgo = new RiesgoPrimerNivelProyecto(
      json.id,
      json.codigo,
      json.n_orden,
      json.riesgo_primer_nivel_id,
      json.proyecto_id
    )
    return riesgo
  }

  static async byProyectoId (id) {
    const { status, data } = await Axios.get('1/riesgo-primer-nivel-proyecto/by/proyectoId', { params: { id } })
    if (status === 200) {
      return data
    }
    return false
  }

  async store () {
    const { status, data } = await Axios.post('1/riesgo-primer-nivel-proyecto', this)
    if (status === 201) {
      return data
    }
    return false
  }

  async delete () {
    const id = this.id
    const { status, data } = await Axios.delete(`1/riesgo-primer-nivel-proyecto/${this.id}`, { params: { id } })
    if (status === 201) {
      return data
    }
    return false
  }
}
