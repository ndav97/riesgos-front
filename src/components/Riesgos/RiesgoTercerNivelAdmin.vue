<template>
  <q-card style="max-width: 900px; min-width: 500px; width: 50vw">
    <q-bar class="bg-primary text-white">
      <q-toolbar-title> {{isEdit ? 'EDITAR ' : 'CREAR '}} RIESGO DE TERCER NIVEL</q-toolbar-title>
      <q-space />
      <q-btn flat icon="fas fa-times" v-close-popup>
        <q-tooltip>Cerrar</q-tooltip>
      </q-btn>
    </q-bar>
    <q-card-section>
      <q-form class="row justify-center">
        <div class="col-sm-12 col-md-6 q-ma-sm">
          <q-input
            outlined
            hide-bottom-space
            dense
            v-model="riesgo.c_nombre"
            label="Nombre del Riesgo"
          />
        </div>
        <div class="col-sm-12 col-md-6 q-ma-sm">
          <q-select
            filled
            dense
            v-model="riesgo.c_escala_probabilidad"
            label="Probalididad - Escala"
            :options="['MUY BAJA', 'BAJA', 'MEDIANA', 'ALTA', 'MUY ALTA']"
            style="width: 250px"
            class="selectInCell"
            @input="changeEscalaProbabilidad()"
          />
        </div>
        <div class="col-sm-12 col-md-6 q-ma-sm">
          <q-select
            filled
            dense
            v-model="riesgo.n_valoracion_probabilidad"
            label="Probalididad - Valoracion"
            :options="[0.1, 0.3, 0.5, 0.7, 0.9]"
            style="width: 250px"
            class="selectInCell"
            @input="changeValoracionProbabilidad()"
          />
        </div>
        <div class="col-sm-12 col-md-6 q-ma-sm">
          <q-input
            outlined
            hide-bottom-space
            dense
            v-model="riesgo.c_objetivo_afectado"
            label="Objetivo Afectado"
          />
        </div>
        <div class="col-sm-12 col-md-6 q-ma-sm">
          <q-select
            filled
            dense
            v-model="riesgo.c_escala_impacto"
            label="Impacto - Escala"
            :options="['MUY BAJA', 'BAJA', 'MEDIANA', 'ALTA', 'MUY ALTA']"
            style="width: 250px"
            class="selectInCell"
            @input="changeImpactoEscala()"
          />
        </div>
        <div class="col-sm-12 col-md-6 q-ma-sm">
          <q-select
            filled
            dense
            v-model="riesgo.n_valoracion_impacto"
            label="Impacto - Valoracion"
            :options="[0.05, 0.1, 0.2, 0.4, 0.8]"
            style="width: 250px"
            class="selectInCell"
            @input="changeImpactoValoracion()"
          />
        </div>
        <div class="col-sm-12 col-md-6 q-ma-sm">
          <q-input
            outlined
            hide-bottom-space
            dense
            v-model="riesgo.n_valoracion_calificacion_riesgo"
            label="Calificacion de riesgo - Valoración"
            disable
          />
        </div>
        <div class="col-sm-12 col-md-6 q-ma-sm">
          <q-input
            outlined
            hide-bottom-space
            dense
            v-model="riesgo.c_calificacion_calificacion_riesgo"
            label="Calificacion de riesgo - Calificación"
            disable
          />
        </div>
        <div class="col-sm-12 col-md-6 q-ma-sm">
          <q-select
            filled
            dense
            v-model="riesgo.c_estrategia"
            label="Estrategia"
            :options="['ESCALAR', 'EVITAR', 'TRANSFERIR', 'MITIGAR', 'ACEPTAR']"
            style="width: 250px"
            class="selectInCell"
          />
        </div>
        <div class="col-sm-12 col-md-6 q-ma-sm">
          <q-input
            outlined
            hide-bottom-space
            dense
            v-model="riesgo.c_respuesta"
            label="Respuesta"
          />
        </div>

        <div class="col-12 text-center">
          <q-btn
            v-if="!isEdit"
            class="q-mr-sm"
            size="sm"
            @click="store"
            label="Crear"
            color="primary"
          />
          <q-btn
            v-else
            class="q-mr-sm"
            size="sm"
            @click="update"
            label="Actualizar"
            color="primary"
          />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>
<script lang="ts">
import Init from '../../mixin/Init'

import RiesgoTercerNivel from '../../models/RiesgoTercerNivel'

export default ({
  name: 'RiesgoTercerNivelAdmin',
  mixins: [ Init ],
  props: {
    riesgoProp: {
      default: function () {
        return null
      }
    },
    riesgoSegundoNivelId: {
      default: function () {
        return 0
      }
    }
  },
  data () {
    return {
      riesgo: new RiesgoTercerNivel(),
      isEdit: false
    }
  },
  mounted () {
    if (this.riesgoProp !== null) {
      this.isEdit = true
      this.riesgo = RiesgoTercerNivel.fromJson(this.riesgoProp)
    }
  },
  methods: {
    async store () {
      try {
        this.riesgo.riesgo_segundo_nivel_id = this.riesgoSegundoNivelId
        const res = await this.riesgo.store()
        if (res) {
          this.$q.notify({
            type: 'positive',
            message: 'Riesgo creado satisfactoriamente'
          })
          this.$emit('update')
          this.$emit('close')
        }
      } catch (error) {
        return false
      }
    },
    async update () {
      try {
        const res = await this.riesgo.update()
        if (res) {
          this.$q.notify({
            type: 'positive',
            message: 'Riesgo actualizado satisfactoriamente'
          })
          this.$emit('update')
          this.$emit('close')
        }
      } catch (error) {
        return false
      }
    },

    changeEscalaProbabilidad () {
      switch (this.riesgo.c_escala_probabilidad) {
        case 'MUY BAJA':
          this.riesgo.n_valoracion_probabilidad = 0.1
          break
        case 'BAJA':
          this.riesgo.n_valoracion_probabilidad = 0.3
          break
        case 'MEDIANA':
          this.riesgo.n_valoracion_probabilidad = 0.5
          break
        case 'ALTA':
          this.riesgo.n_valoracion_probabilidad = 0.7
          break
        case 'MUY ALTA':
          this.riesgo.n_valoracion_probabilidad = 0.9
          break
      }
      this.calcularPuntaje()
    },

    changeValoracionProbabilidad () {
      switch (this.riesgo.n_valoracion_probabilidad) {
        case 0.1:
          this.riesgo.c_escala_probabilidad = 'MUY BAJA'
          break
        case 0.3:
          this.riesgo.c_escala_probabilidad = 'BAJA'
          break
        case 0.5:
          this.riesgo.c_escala_probabilidad = 'MEDIANA'
          break
        case 0.7:
          this.riesgo.c_escala_probabilidad = 'ALTA'
          break
        case 0.9:
          this.riesgo.c_escala_probabilidad = 'MUY ALTA'
          break
      }
      this.calcularPuntaje()
    },

    changeImpactoEscala () {
      switch (this.riesgo.c_escala_impacto) {
        case 'MUY BAJA':
          this.riesgo.n_valoracion_impacto = 0.05
          break
        case 'BAJA':
          this.riesgo.n_valoracion_impacto = 0.1
          break
        case 'MEDIANA':
          this.riesgo.n_valoracion_impacto = 0.2
          break
        case 'ALTA':
          this.riesgo.n_valoracion_impacto = 0.4
          break
        case 'MUY ALTA':
          this.riesgo.n_valoracion_impacto = 0.8
          break
      }
      this.calcularPuntaje()
    },

    changeImpactoValoracion () {
      switch (this.riesgo.n_valoracion_impacto) {
        case 0.05:
          this.riesgo.c_escala_impacto = 'MUY BAJA'
          break
        case 0.1:
          this.riesgo.c_escala_impacto = 'BAJA'
          break
        case 0.2:
          this.riesgo.c_escala_impacto = 'MODERADO'
          break
        case 0.4:
          this.riesgo.c_escala_impacto = 'ALTA'
          break
        case 0.8:
          this.riesgo.c_escala_impacto = 'MUY ALTA'
          break
      }
      this.calcularPuntaje()
    },

    calcularPuntaje () {
      const puntaje = Math.round((this.riesgo.n_valoracion_impacto * this.riesgo.n_valoracion_probabilidad) * 100) / 100
      this.riesgo.n_valoracion_calificacion_riesgo = puntaje
      if (puntaje <= 0.07) {
        this.riesgo.c_calificacion_calificacion_riesgo = 'BAJO'
      } else if (puntaje <= 0.2) {
        this.riesgo.c_calificacion_calificacion_riesgo = 'MEDIO'
      } else {
        this.riesgo.c_calificacion_calificacion_riesgo = 'ALTO'
      }
    }
  }
})
</script>
<style lang="scss">

</style>
