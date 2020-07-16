<template>
  <q-page>
    <div class="row justify-center">
      <q-btn label="Nuevo" color="primary" @click="newProject"/>
    </div>
    <div class="row justify-center q-pa-sm">
      <q-table
        title="Proyectos"
        :data="projects"
        :columns="columns"
        :pagination.sync="pagination"
        @request="cambiarPage"
        :rows-per-page-options="[10]"
        row-key="name"
        style="width: 100%; max-width: 1500px"
      >
        <template v-slot:top="props">
          <div class="col-2 q-table__title">Proyectos</div>
          <q-space />
          <div class="col-md-4 col-sm-8">
            <q-input label="Busqueda" v-model="search" outlined dense @keypress.enter="loadProyectos"/>
          </div>
          <q-btn
            flat round dense
            :icon="props.inFullscreen ? 'fas fa-compress' : 'fas fa-expand'"
            @click="props.toggleFullscreen"
            class="q-ml-md"
          />
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
              <q-td :props="props" key="index__" :auto-width="false">
                <q-btn @click="editProject(props.row)" color="primary" size="sm">
                  <i class="fas fa-edit"></i>
                  Editar
                </q-btn>
                <q-btn @click="deleteProject(props.row)" color="primary" size="sm">
                  <i class="fas fa-edit"></i>
                  Elimar
                </q-btn>
              </q-td>
              <q-td :props="props" key="c_codigo_proyecto" :style="{width: '200px', whiteSpace: 'normal'}">{{ props.row.c_codigo_proyecto }}</q-td>
              <q-td :props="props" key="c_nombre_proyecto" :style="{width: '300px', whiteSpace: 'normal'}">{{ props.row.c_nombre_proyecto }}</q-td>
              <q-td :props="props" key="c_responsable" :style="{width: '400px', whiteSpace: 'normal'}">{{ props.row.c_responsable }}</q-td>
              <q-td :props="props" key="c_cliente" :style="{width: '400px', whiteSpace: 'normal'}">{{ props.row.c_cliente }}</q-td>
              <q-td :props="props" key="c_observaciones" :style="{width: '500px', whiteSpace: 'normal'}">{{ props.row.c_observaciones }}</q-td>
          </q-tr>
      </template>
      </q-table>
    </div>
    <q-dialog v-model="dialog.proyectoAdmin.show">
      <proyecto-admin
          v-if="dialog.proyectoAdmin.show"
          :proyectoProp="dialog.proyectoAdmin.proyecto"
          @close="dialog.proyectoAdmin.show = false"
          @update="loadProyectos()"
      />
    </q-dialog>
  </q-page>
</template>
<script>
import Init from '../mixin/Init'

import Proyecto from '../models/Proyecto'

import ProyectoAdmin from '../components/Proyectos/ProyectoAdmin.vue'

export default {
  name: 'Proyectos',
  mixins: [ Init ],
  components: { ProyectoAdmin },
  data () {
    return {
      projects: [],
      search: '',
      columns: [
        { name: 'index__', align: 'center', label: 'ID' },
        { name: 'c_codigo_proyecto', align: 'center', label: 'Codigo' },
        { name: 'c_nombre_proyecto', align: 'center', label: 'Nombre' },
        { name: 'c_responsable', align: 'center', label: 'Responsable' },
        { name: 'c_cliente', align: 'center', label: 'Cliente' },
        { name: 'c_observaciones', align: 'center', label: 'Observaciones' }
      ],
      pagination: {
        sortBy: '__index',
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0,
        pagesNumber: 0
      },
      dialog: {
        proyectoAdmin: {
          show: false,
          proyecto: null
        }
      }
    }
  },
  mounted () {
    this.loadProyectos()
  },
  methods: {
    async loadProyectos () {
      try {
        const res = await Proyecto.byUserId(this.identity.id)
        if (res) {
          this.projects = res.proyectos
          return
        }
        this.projects = []
      } catch (error) {
        this.projects = []
        return false
      }
    },
    newProject () {
      this.dialog.proyectoAdmin.proyecto = null
      this.dialog.proyectoAdmin.show = true
    },
    editProject (project) {
      this.dialog.proyectoAdmin.proyecto = project
      this.dialog.proyectoAdmin.show = true
    },

    async deleteProject (project) {
      const proy = Proyecto.fromJson(project)
      await proy.delete()
      this.loadProyectos()
    },

    cambiarPage () {
      //
    }
  }
}
</script>
<style lang="scss">

</style>
