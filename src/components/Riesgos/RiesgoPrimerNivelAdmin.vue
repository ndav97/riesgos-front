<template>
  <q-card style="max-width: 900px; min-width: 500px; width: 50vw">
    <q-bar class="bg-primary text-white">
      <q-toolbar-title> {{isEdit ? 'EDITAR ' : 'CREAR '}} RIESGO DE PRIMER NIVEL</q-toolbar-title>
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
            v-model="riesgo.codigo"
            label="Código"
          />
        </div>
        <div class="col-sm-12 col-md-6 q-ma-sm">
          <q-input
            outlined
            hide-bottom-space
            dense
            v-model="riesgo.c_nombre"
            label="Nombre del Riesgo"
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

import RiesgoPrimerNivel from '../../models/RiesgoPrimerNivel'

export default ({
  name: 'RiesgoPrimerNivelAdmin',
  mixins: [ Init ],
  props: {
    riesgoProp: {
      default: function () {
        return null
      }
    }
  },
  data () {
    return {
      riesgo: new RiesgoPrimerNivel(),
      isEdit: false
    }
  },
  watch: {
    'riesgo.codigo': function (n) {
      this.riesgo.codigo = n.toUpperCase()
    },
    'riesgo.c_nombre': function (n) {
      this.riesgo.c_nombre = n.toUpperCase()
    }
  },
  mounted () {
    if (this.riesgoProp !== null) {
      this.isEdit = true
      this.riesgo = RiesgoPrimerNivel.fromJson(this.riesgoProp)
    }
  },
  methods: {
    async store () {
      try {
        this.riesgo.user_id = this.identity.id
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
    }
  }
})
</script>
<style lang="scss">

</style>
