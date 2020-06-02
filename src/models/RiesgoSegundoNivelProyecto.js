/* eslint-disable camelcase */
import Axios from '../utils/axios'

export default class RiesgoSegundoNivelProyecto {
  constructor (
    id = 0,
    c_codigo = '',
    n_orden = 1,
    riesgo_segundo_nivel_id = 0,
    primer_nivel_proyecto_id = 0
  ) {
    this.id = id
    this.c_codigo = c_codigo
    this.n_orden = n_orden
    this.riesgo_segundo_nivel_id = riesgo_segundo_nivel_id
    this.primer_nivel_proyecto_id = primer_nivel_proyecto_id
  }

  static fromJson (json) {
    const riesgo = new RiesgoSegundoNivelProyecto(
      json.id,
      json.codigo,
      json.n_orden,
      json.riesgo_segundo_nivel_id,
      json.primer_nivel_proyecto_id
    )
    return riesgo
  }

  async store () {
    const { status, data } = await Axios.post('1/riesgo-segundo-nivel-proyecto', this)
    if (status === 201) {
      return data
    }
    return false
  }

  async delete () {
    const id = this.id
    const { status, data } = await Axios.delete(`1/riesgo-segundo-nivel-proyecto/${this.id}`, { params: { id } })
    if (status === 201) {
      return data
    }
    return false
  }
}
