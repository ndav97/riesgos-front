<template>
  <q-page class="riesgos">
    <div class="row justify-center">
      <q-btn color="secondary" label="Descargar Lista de Riesgos Predeterminados" @click="descargarArchivo()"/>
    </div>
    <div class="row justify-center q-pa-sm">
      <div class="col-12 col-md-4 col-xl-3 q-pa-sm">
        <q-card class="my-card">
          <q-card-section class="text-center cabecera">
            <span>Riesgos de Primer Nivel</span> <br>
            <q-btn label='Nuevo' color='primary' @click="newRiesgoPrimerNivel()"/>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <q-list bordered separator>
              <q-item :class="riesgo === riesgoPrimerNivelSelect ? 'selected' : ''"  clickable v-ripple v-for="(riesgo, index) in riesgosPrimerNivel" :key="riesgo.codigo + '-' + index" @click="selectRiesgoPrimerNivel(riesgo)">
                <q-popup-proxy context-menu>
                  <q-list>
                    <q-item class="row">
                      <div class="col-12">
                        <q-btn label="Editar" color="primary" @click="editRiesgoPrimerNivel(riesgo)"/>
                      </div>
                    </q-item>
                  </q-list>
                </q-popup-proxy>
                <q-item-section avatar>
                  <q-avatar color="primary" text-color="white">
                    {{ riesgo.codigo }}
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ riesgo.c_nombre }}</q-item-label>
                  <!-- <q-item-label caption lines="1">{{ contact.email }}</q-item-label> -->
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-md-4 col-xl-3 q-pa-sm" v-if="riesgoPrimerNivelSelect">
        <q-card class="my-card">
          <q-card-section class="text-center cabecera">
            <span>Riesgos de Segundo Nivel</span> <br>
            <q-btn label='Nuevo' color='primary' @click="newRiesgoSegundoNivel()" />
          </q-card-section>
          <q-separator />
          <q-card-section>
            <q-list bordered separator>
              <q-item :class="riesgo === riesgoSegundoNivelSelect ? 'selected' : ''" clickable v-ripple v-for="(riesgo, index) in riesgosSegundoNivel" :key="riesgo.codigo + '-' + index" @click="selectRiesgoSegundoNivel(riesgo)">
                <q-popup-proxy context-menu>
                  <q-list>
                    <q-item class="row">
                      <div class="col-12">
                        <q-btn label="Editar" color="primary" @click="editRiesgoSegundoNivel(riesgo)"/>
                      </div>
                    </q-item>
                  </q-list>
                </q-popup-proxy>

                <q-item-section>
                  <q-item-label>{{ riesgo.c_nombre }}</q-item-label>
                  <!-- <q-item-label caption lines="1">{{ contact.email }}</q-item-label> -->
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-md-4 col-xl-3 q-pa-sm" v-if="riesgoSegundoNivelSelect">
        <q-card class="my-card">
          <q-card-section class="text-center cabecera">
            <span>Riesgos de Tercer Nivel</span> <br>
            <q-btn label='Nuevo' color='primary' @click="newRiesgoTercerNivel()" />
          </q-card-section>
          <q-separator />
          <q-card-section>
            <q-list bordered separator>
              <q-item clickable v-ripple v-for="(riesgo, index) in riesgosTercerNivel" :key="riesgo.codigo + '-' + index">
                <q-popup-proxy context-menu>
                  <q-list>
                    <q-item class="row">
                      <div class="col-12">
                        <q-btn label="Editar" color="primary" @click="editRiesgoTercerNivel(riesgo)"/>
                      </div>
                    </q-item>
                  </q-list>
                </q-popup-proxy>

                <q-item-section>
                  <q-item-label>{{ riesgo.c_nombre }}</q-item-label>
                  <!-- <q-item-label caption lines="1">{{ contact.email }}</q-item-label> -->
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <q-dialog v-model="dialog.riesgoPrimerNivelAdmin.show">
      <riesgo-primer-nivel-admin
          v-if="dialog.riesgoPrimerNivelAdmin.show"
          :riesgoProp="dialog.riesgoPrimerNivelAdmin.riesgo"
          @close="dialog.riesgoPrimerNivelAdmin.show = false"
          @update="getRiesgosPrimerNivel()"
      />
    </q-dialog>

    <q-dialog v-model="dialog.riesgoSegundoNivelAdmin.show">
      <riesgo-segundo-nivel-admin
          v-if="dialog.riesgoSegundoNivelAdmin.show"
          :riesgoProp="dialog.riesgoSegundoNivelAdmin.riesgo"
          :riesgoPrimerNivelId="riesgoPrimerNivelSelect.id"
          @close="dialog.riesgoSegundoNivelAdmin.show = false"
          @update="getRiesgosSegundoNivel()"
      />
    </q-dialog>

    <q-dialog v-model="dialog.riesgoTercerNivelAdmin.show">
      <riesgo-tercer-nivel-admin
          v-if="dialog.riesgoTercerNivelAdmin.show"
          :riesgoProp="dialog.riesgoTercerNivelAdmin.riesgo"
          :riesgoSegundoNivelId="riesgoSegundoNivelSelect.id"
          @close="dialog.riesgoTercerNivelAdmin.show = false"
          @update="getRiesgosTercerNivel()"
      />
    </q-dialog>
  </q-page>
</template>
<script>
import Init from '../mixin/Init'

// Models
import RiesgoPrimerNivel from '../models/RiesgoPrimerNivel'
import RiesgoSegundoNivel from '../models/RiesgoSegundoNivel'
import RiesgoTercerNivel from '../models/RiesgoTercerNivel'

// Dialogs
import RiesgoPrimerNivelAdmin from '../components/Riesgos/RiesgoPrimerNivelAdmin.vue'
import RiesgoSegundoNivelAdmin from '../components/Riesgos/RiesgoSegundoNivelAdmin.vue'
import RiesgoTercerNivelAdmin from '../components/Riesgos/RiesgoTercerNivelAdmin.vue'

export default {
  name: 'Riesgos',
  mixins: [ Init ],
  components: { RiesgoPrimerNivelAdmin, RiesgoSegundoNivelAdmin, RiesgoTercerNivelAdmin },
  data () {
    return {
      riesgosPrimerNivel: [],
      riesgosSegundoNivel: [],
      riesgosTercerNivel: [],
      riesgoPrimerNivelSelect: null,
      riesgoSegundoNivelSelect: null,
      riesgoTercerNivelSelect: null,
      dialog: {
        riesgoPrimerNivelAdmin: {
          show: false,
          riesgo: null
        },
        riesgoSegundoNivelAdmin: {
          show: false,
          riesgo: null
        },
        riesgoTercerNivelAdmin: {
          show: false,
          riesgo: null
        }
      }
    }
  },
  mounted () {
    this.getRiesgosPrimerNivel()
  },
  methods: {
    descargarArchivo () {
      window.open('https://mega.nz/file/jVoFWapI#qhxhZBgM37pDXYR0Eb0hwqL_AwG9QhR9h8AOQohl7x8', '_blank')
    },

    async getRiesgosPrimerNivel () {
      try {
        const res = await RiesgoPrimerNivel.byUserId(this.identity.id)
        if (res) {
          this.riesgosPrimerNivel = res.riesgos
        }
      } catch (error) {
        return false
      }
    },

    selectRiesgoPrimerNivel (riesgo) {
      this.riesgoPrimerNivelSelect = riesgo
      this.riesgoSegundoNivelSelect = null
      this.riesgosSegundoNivel = []
      this.riesgosTercerNivel = []
      this.getRiesgosSegundoNivel()
    },

    newRiesgoPrimerNivel () {
      this.dialog.riesgoPrimerNivelAdmin.riesgo = null
      this.dialog.riesgoPrimerNivelAdmin.show = true
    },

    editRiesgoPrimerNivel (riesgo) {
      this.dialog.riesgoPrimerNivelAdmin.riesgo = riesgo
      this.dialog.riesgoPrimerNivelAdmin.show = true
    },

    async getRiesgosSegundoNivel () {
      try {
        const res = await RiesgoSegundoNivel.byRiesgoPrimerNivelId(this.riesgoPrimerNivelSelect.id)
        if (res) {
          this.riesgosSegundoNivel = res.riesgos
        }
      } catch (error) {
        return false
      }
    },

    selectRiesgoSegundoNivel (riesgo) {
      this.riesgoSegundoNivelSelect = riesgo
      this.riesgosTercerNivel = []
      this.getRiesgosTercerNivel()
    },

    newRiesgoSegundoNivel () {
      this.dialog.riesgoSegundoNivelAdmin.riesgo = null
      this.dialog.riesgoSegundoNivelAdmin.show = true
    },

    editRiesgoSegundoNivel (riesgo) {
      this.dialog.riesgoSegundoNivelAdmin.riesgo = riesgo
      this.dialog.riesgoSegundoNivelAdmin.show = true
    },

    async getRiesgosTercerNivel () {
      try {
        const res = await RiesgoTercerNivel.byRiesgoSegundoNivelId(this.riesgoSegundoNivelSelect.id)
        if (res) {
          this.riesgosTercerNivel = res.riesgos
        }
      } catch (error) {
        return false
      }
    },

    newRiesgoTercerNivel () {
      this.dialog.riesgoTercerNivelAdmin.riesgo = null
      this.dialog.riesgoTercerNivelAdmin.show = true
    },

    editRiesgoTercerNivel (riesgo) {
      this.dialog.riesgoTercerNivelAdmin.riesgo = riesgo
      this.dialog.riesgoTercerNivelAdmin.show = true
    }
  }
}
</script>
<style lang="scss">
.riesgos{
  .cabecera{
    background-color: #f3f3f3;
  }
  span{
    font-family: monospace;
    font-size: 20px;
  }
  .q-item.q-item-type.selected{
    background-color: #9ae49a;
  }
}
</style>
