/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
import Axios from '../utils/axios'

export default class RiesgoTercerNivelProyecto {
  constructor (
    id = 0,
    c_codigo = '',
    n_orden = '',
    c_descripcion_riesgo = '',
    f_fecha_ingreso = '',
    c_escala_probabilidad = '',
    n_valoracion_probabilidad = 0,
    c_objetivo_afectado = '',
    c_escala_impacto = '',
    n_valoracion_impacto = 0,
    n_valoracion_calificacion_riesgo = 0,
    c_calificacion_calificacion_riesgo = '',
    riesgo_tercer_nivel_id = 0,
    segundo_nivel_proyecto_id = 0
  ) {
    this.id = id
    this.c_codigo = c_codigo
    this.n_orden = n_orden
    this.c_descripcion_riesgo = c_descripcion_riesgo
    this.f_fecha_ingreso = f_fecha_ingreso
    this.c_escala_probabilidad = c_escala_probabilidad
    this.n_valoracion_probabilidad = n_valoracion_probabilidad
    this.c_objetivo_afectado = c_objetivo_afectado
    this.c_escala_impacto = c_escala_impacto
    this.n_valoracion_impacto = n_valoracion_impacto
    this.n_valoracion_calificacion_riesgo = n_valoracion_calificacion_riesgo
    this.c_calificacion_calificacion_riesgo = c_calificacion_calificacion_riesgo
    this.riesgo_tercer_nivel_id = riesgo_tercer_nivel_id
    this.segundo_nivel_proyecto_id = segundo_nivel_proyecto_id
  }

  static fromJson (json) {
    const riesgo = new RiesgoTercerNivelProyecto(
      json.id,
      json.c_codigo,
      json.n_orden,
      json.c_descripcion_riesgo,
      json.f_fecha_ingreso,
      json.c_escala_probabilidad,
      json.n_valoracion_probabilidad,
      json.c_objetivo_afectado,
      json.c_escala_impacto,
      json.n_valoracion_impacto,
      json.n_valoracion_calificacion_riesgo,
      json.c_calificacion_calificacion_riesgo,
      json.riesgo_tercer_nivel_id,
      json.segundo_nivel_proyecto_id
    )
    return riesgo
  }

  // static async byProyectoId (id) {
  //   const { status, data } = await Axios.get('1/riesgo-primer-nivel-proyecto/by/proyectoId', { params: { id } })
  //   if (status === 200) {
  //     return data
  //   }
  //   return false
  // }

  async store () {
    const { status, data } = await Axios.post('1/riesgo-tercer-nivel-proyecto', this)
    if (status === 201) {
      return data
    }
    throw new Error('adasdas')
  }

  async update () {
    const { status, data } = await Axios.put(`1/riesgo-tercer-nivel-proyecto/${this.id}`, this)
    if (status === 201) {
      return data
    }
    return false
  }

  async delete () {
    const id = this.id
    const { status, data } = await Axios.delete(`1/riesgo-tercer-nivel-proyecto/${this.id}`, { params: { id } })
    if (status === 201) {
      return data
    }
    return false
  }
}
