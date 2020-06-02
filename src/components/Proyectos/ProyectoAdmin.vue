<template>
  <q-card style="max-width: 900px; min-width: 300px">
    <q-bar class="bg-primary text-white">
      <q-toolbar-title> {{isEdit ? 'EDITAR ' : 'CREAR '}} PROYECTO</q-toolbar-title>
      <q-space />
      <q-btn flat icon="fas fa-times" v-close-popup>
        <q-tooltip>Cerrar</q-tooltip>
      </q-btn>
    </q-bar>
    <q-card-section>
      <q-form class="row justify-center">
        <div class="col-sm-12 col-md-4 q-ma-sm">
          <q-input
            outlined
            hide-bottom-space
            dense
            v-model="proyecto.c_codigo_proyecto"
            label="Código"
          />
        </div>
        <div class="col-sm-12 col-md-4 q-ma-sm">
          <q-input
            outlined
            hide-bottom-space
            dense
            v-model="proyecto.c_nombre_proyecto"
            label="Nombre del proyecto"
          />
        </div>
        <div class="col-sm-12 col-md-4 q-ma-sm">
          <q-input
            outlined
            hide-bottom-space
            dense
            v-model="proyecto.c_responsable"
            label="Responsable"
          />
        </div>
        <div class="col-sm-12 col-md-4 q-ma-sm">
          <q-input
            outlined
            hide-bottom-space
            dense
            v-model="proyecto.c_cliente"
            label="Entidad o Cliente"
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
<script>
import Init from '../../mixin/Init'
import Proyecto from '../../models/Proyecto'
export default {
  name: 'ProyectoAdmin',
  mixins: [ Init ],
  props: {
    proyectoProp: {
      default: function () {
        return null
      }
    }
  },
  data () {
    return {
      proyecto: new Proyecto(),
      isEdit: false
    }
  },
  mounted () {
    if (this.proyectoProp !== null) {
      this.isEdit = true
      this.proyecto = Proyecto.fromJson(this.proyectoProp)
    }
  },
  methods: {
    async store () {
      try {
        this.proyecto.user_id = this.identity.id
        const res = await this.proyecto.store()
        if (res) {
          this.$q.notify({
            type: 'positive',
            message: 'Proyecto creado satisfactoriamente'
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
        const res = await this.proyecto.update()
        if (res) {
          this.$q.notify({
            type: 'positive',
            message: 'Proyecto actualizado satisfactoriamente'
          })
          this.$emit('update')
          this.$emit('close')
        }
      } catch (error) {

      }
    }
  }
}
</script>
<style lang="scss">

</style>
