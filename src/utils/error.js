import { Notify, Dialog } from 'quasar'

const errors = (err) => {
  if (!err.response) return

  const { response } = err

  const { status, data } = response

  if (status === 402) {
    // for (const value of Object.entries(data.message)) {
    Notify.create({
      color: 'negative',
      textColor: 'white',
      icon: 'error',
      message: 'Verifique los campos obligatorios (*)',
      position: 'center',
      multiLine: true,
      closeBtn: 'OK'
    })
    // }
    return
  }

  if (status === 400) {
    Notify.create({
      type: 'negative',
      message: data.message
    })
    return
  }

  if (status === 401) {
    Dialog.create({
      title: '¡NO AUTORIZADO!',
      message: data.message,
      ok: {
        push: true,
        color: 'negative'
      },
      persistent: true
    })
    return
  }

  Dialog.create({
    title: '¡ERROR!',
    message: 'Error desconocido, ¡Auxilio!',
    ok: {
      push: true,
      color: 'negative'
    },
    persistent: true
  })
}

export default errors
