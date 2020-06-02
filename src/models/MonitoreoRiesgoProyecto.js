/* eslint-disable camelcase */
import Axios from '../utils/axios'

export default class MonitoreoRiesgoProyecto {
  constructor (
    id = 0,
    c_monitoreo_control = '',
    c_estado = '',
    tercer_nivel_proyecto_id = '',
    c_observaciones = '',
    f_fecha_revision = ''
  ) {
    this.id = id
    this.c_monitoreo_control = c_monitoreo_control
    this.c_estado = c_estado
    this.tercer_nivel_proyecto_id = tercer_nivel_proyecto_id
    this.c_observaciones = c_observaciones
    this.f_fecha_revision = f_fecha_revision
  }

  static fromJson (json) {
    const res = new MonitoreoRiesgoProyecto(
      json.id,
      json.c_monitoreo_control,
      json.c_estado,
      json.tercer_nivel_proyecto_id,
      json.c_observaciones,
      json.f_fecha_revision
    )
    return res
  }

  async update () {
    const { status, data } = await Axios.put(`1/monitoreo-riesgo/${this.id}`, this)
    if (status === 201) {
      return data
    }
    return false
  }
}
