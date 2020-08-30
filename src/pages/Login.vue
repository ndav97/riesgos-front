<template>
  <q-page class="flex flex-center">
    <div class="text-center">
      <div class="row justify-center aling-center items-center">
        <img src="statics/logo.jpg" alt=""> <h3 style="padding:0px; margin:5px;">RiskmanagerPeru</h3>
      </div>
      <div class="row justify-center">
        <h4>Software de Gestion de Riesgos</h4>
      </div>
      <div class="row justify-center">
        <h3>Elaborado por: Charles Leman Chacon Quinto</h3>
      </div>
      <div class="row justify-center">
        <h3>Teléfono: 980 251 211</h3>
      </div>
      <div class="row justify-center">
        <div class="col-2 q-pa-sm">
          <img src="statics/uncp.jpg" alt="">
        </div>
        <div class="col-xs-12 col-sm-8 col-md-7 contenedor-login q-mx-lg">
          <q-form class="row justify-center">
            <div class="col-12 q-pa-xs">
              <q-input
                outlined
                type="text"
                label="Correo"
                dense
                hide-bottom-space
                v-model="usuario.c_email"
              />
            </div>
            <div class="col-12 q-pa-xs">
              <q-input
                type="password"
                label="Contraseña"
                dense
                hide-bottom-space
                outlined
                v-model="usuario.c_password"
                @keyup.enter="login"
              />
            </div>

            <div class="col-12 q-pa-xs text-center">
              <q-btn color="primary" label="Ingresar" @click="login" />
            </div>

            <div class="col-12 q-pa-xs text-center">
              <router-link
                to="/registro"
              >
                  ¿No tienes cuenta?{{ ' registrate' }}
              </router-link>
            </div>

          </q-form>
        </div>
        <div class="col-2 q-pa-sm">
          <img src="statics/ingciv.jpg" alt="">
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>

import Init from '../mixin/Init'

import Usuario from '../models/Usuario'

export default {
  name: 'Login',

  mixins: [ Init ],

  data () {
    return {
      usuario: new Usuario()
    }
  },

  methods: {
    async login () {
      try {
        const res = await this.usuario.login()

        if (!res) return

        const { data, headers } = res

        this.$q.sessionStorage.set('identity', data.user)
        this.$q.sessionStorage.set('token', headers.token)

        this.$store.commit('main/TOKEN_UPDATE', headers.token)
        this.$store.commit('main/IDENTITY_UPDATE', data.user)
        this.$store.commit('main/ISLOGGED_UPDATE', true)
      } catch (error) {

      }
    }
  }
}
</script>
<style lang="scss">
.contenedor-login{
  background-color: white;
  border-radius: 30px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-box-shadow: 12px 10px 21px 2px rgba(0,0,0,0.75);
  -moz-box-shadow: 12px 10px 21px 2px rgba(0,0,0,0.75);
  box-shadow: 12px 10px 21px 2px rgba(0,0,0,0.75);
}
img{
  height: 180px;
}
</style>
