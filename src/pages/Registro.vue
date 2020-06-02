<template>
  <q-page class="align-center items-center registro-user">
    <div class="row text-center align-center justify-center q-mx-lg q-pa-sm">
      <h2>Registro de usuarios</h2>
    </div>
    <q-form class="row text-center align-center justify-center q-mx-lg q-pa-lg">
      <div class="col-xs-12 col-sm-8 col-md-7 q-pa-xs">
        <q-input
          outlined
          type="text"
          label="Nombre Completo"
          dense
          hide-bottom-space
          v-model="usuario.c_nombre_completo"
        />
      </div>
      <div class="col-xs-12 col-sm-8 col-md-7 q-pa-xs">
        <q-input
          outlined
          type="text"
          label="Correo"
          dense
          hide-bottom-space
          v-model="usuario.c_email"
        />
      </div>
      <div class="col-xs-12 col-sm-8 col-md-7 q-pa-xs">
        <q-input
          type="password"
          label="Contraseña"
          dense
          hide-bottom-space
          outlined
          v-model="usuario.c_password"
        />
      </div>
      <div class="col-xs-12 col-sm-8 col-md-7 q-pa-xs">
        <q-input
          type="password"
          label="Confirmar Contraseña"
          dense
          hide-bottom-space
          outlined
          v-model="password_confirmation"
          @keyup.enter="registro"
        />
      </div>
      <div class="col-12 q-pa-xs">
        <q-btn color="primary" label="Registrarse" @click="registro" />
      </div>
    </q-form>
  </q-page>
</template>
<script>
import Init from '../mixin/Init'

import Usuario from '../models/Usuario'

export default {
  name: 'registro',
  mixins: [ Init ],
  data () {
    return {
      usuario: new Usuario(),
      password_confirmation: ''
    }
  },
  computed: {
    confirmationValid () {
      return this.usuario.c_password === this.password_confirmation
    },
    validData () {
      return (this.usuario.c_nombre_completo !== '') &&
      (this.usuario.c_email.length > 0) &&
      (this.usuario.c_password.length > 5)
    }
  },
  methods: {
    async registro () {
      if (!this.validData) {
        this.$q.notify({
          type: 'negative',
          message: `Datos invalidos.`
        })
        return
      }
      if (!this.confirmationValid) {
        this.$q.notify({
          type: 'negative',
          message: `Las contraseñas no coinciden.`
        })
        return
      }
      const res = await this.usuario.store()
      if (res) {
        this.$q.notify({
          type: 'positive',
          message: `Registro completado`
        })
        this.$router.push('/')
      }
    }
  }
}
</script>
<style lang="scss">
.q-page-container{
  background-color: $fondo;
}
.registro-user{
  h2{
    font-family: fantasy;
    color: white;
  }
  form{
    background-color: white;
    border-radius: 16px;
  }
}
</style>
