import Axios from '../utils/axios'

export default class Proyecto {
  constructor (
    id = 0,
    codigoProyecto = '',
    nombreProyecto = '',
    responsable = '',
    cliente = '',
    observaciones = '',
    userId = 0
  ) {
    this.id = id
    this.c_codigo_proyecto = codigoProyecto
    this.c_nombre_proyecto = nombreProyecto
    this.c_responsable = responsable
    this.c_cliente = cliente
    this.c_observaciones = observaciones
    this.user_id = userId
  }

  static fromJson (json) {
    const proyecto = new Proyecto(
      json.id,
      json.c_codigo_proyecto,
      json.c_nombre_proyecto,
      json.c_responsable,
      json.c_cliente,
      json.c_observaciones,
      json.user_id
    )
    return proyecto
  }

  static async byUserId (id) {
    const { status, data } = await Axios.get('1/proyecto/by/userId', { params: { id } })
    if (status === 200) {
      return data
    }
    return false
  }

  async store () {
    const { status, data } = await Axios.post('1/proyecto', this)
    if (status === 201) {
      return data
    }
    return false
  }

  async update () {
    const { status, data } = await Axios.put(`1/proyecto/${this.id}`, this)
    if (status === 201) {
      return data
    }
    return false
  }
}
