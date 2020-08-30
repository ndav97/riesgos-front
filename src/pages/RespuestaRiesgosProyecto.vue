<template>
  <q-page class="RiesgosProyecto">
    <div class="row justify-center">
      <q-card class="col-11">
        <q-tabs
          v-model="tab"
          dense
          class="bg-primary text-white"
          active-color="primary"
          indicator-color="white"
          align="justify"
        >
          <q-tab name="proyecto" label="Proyecto" />
          <q-tab name="tabla" label="Visualizar tabla" />
        </q-tabs>
        <q-tab-panels v-model="tab" animated class="bg-grey-200 text-black">
          <q-tab-panel name="proyecto">
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
                        <q-btn @click="selectProject(props.row)" color="primary" size="sm">
                          <i class="fas fa-edit"></i>
                          Seleccionar
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
          </q-tab-panel>
          <q-tab-panel name="tabla">
            <div v-if="proyectoSelect">
              <div class="text-h6">Respuesta de Riesgos</div>
              <div class="row justify-center">
                <q-btn color="secondary" label="Descargar Lista de Respuestas de Riesgo" @click="descargarArchivo()"/>
              </div>
              <q-markup-table separator='cell' flat>
                <tbody>
                  <tr>
                    <td colspan="3">TIPO DE RIESGO</td>
                    <td class="cellHeader">ESTRATEGIA</td>
                    <td class="cellHeader">RESPUESTA</td>
                    <td class="cellHeader">RESPONSABLE</td>
                  </tr>
                  <template v-for="(riesgo, index) in riesgosProyecto">
                    <tr :key="index+'-T1'">
                      <td :rowspan="(riesgo.riesgosSegundoNivelProyecto.length+1) + (sumRiesgosTierTres(riesgo.riesgosSegundoNivelProyecto))" style="background-color: #0054ff82;">
                        {{(index+1) + '.' + riesgo.riesgoPrimerNivel.c_nombre + '(' + riesgo.riesgoPrimerNivel.codigo + ')'}}
                      </td>
                    </tr>
                    <template v-for="(riesgoDos, index2) in riesgo.riesgosSegundoNivelProyecto">
                      <tr :key="index2 + '-T11'">
                        <td colspan="4" style="background-color: #cccccc;">
                          {{riesgo.c_codigo + (index2+1) + '.' + riesgoDos.riesgoSegundoNivel.c_nombre}}
                        </td>
                      </tr>
                      <template v-for="(riesgoTres, index3) in riesgoDos.riesgosTercerNivelProyecto">
                        <tr :key="index3 + riesgoTres.id + 'T111'">
                          <td>
                            {{riesgo.c_codigo + '-' + riesgo.c_codigo + (index2+1) + '-' + (index3+1)}}
                          </td>
                          <td>
                            {{riesgoTres.riesgoTercerNivel.c_nombre}}
                          </td>
                          <td>
                            <q-select
                              filled
                              dense
                              v-model="riesgoTres.respuesta.c_estrategia"
                              label="Estrategia"
                              :options="['ESCALAR', 'EVITAR', 'TRANSFERIR', 'MITIGAR', 'ACEPTAR']"
                              style="width: 250px"
                              class="selectInCell"
                              @input="actualizarResp(riesgoTres)"
                            />
                          </td>
                          <td>
                            <q-input outlined v-model="riesgoTres.respuesta.c_respuesta" @keypress.enter="actualizarResp(riesgoTres)" label="Respuesta" dense>
                              <template v-slot:append>
                                <q-icon name="save" @click="actualizarResp(riesgoTres)" class="cursor-pointer"/>
                              </template>
                            </q-input>
                          </td>
                          <td>
                            <q-input outlined v-model="riesgoTres.respuesta.c_responsable" @keypress.enter="actualizarResp(riesgoTres)" label="Responsable" dense>
                              <template v-slot:append>
                                <q-icon name="save" @click="actualizarResp(riesgoTres)" class="cursor-pointer"/>
                              </template>
                            </q-input>
                          </td>
                        </tr>
                      </template>
                    </template>
                  </template>
                </tbody>
              </q-markup-table>
            </div>
            <div v-else>
              <h3>Seleccione un proyecto</h3>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
    </q-page>
</template>
<script lang="ts">
import Init from '../mixin/Init'

// Models
// import RiesgoPrimerNivel from '../models/RiesgoPrimerNivel'
import Proyecto from '../models/Proyecto'
import RiesgoPrimerNivelProyecto from '../models/RiesgoPrimerNivelProyecto'
import RespuestaRiesgoProyecto from '../models/RespuestaRiesgoProyecto'
// import RiesgoSegundoNivelProyecto from '../models/RiesgoSegundoNivelProyecto'
// import RiesgoTercerNivelProyecto from '../models/RiesgoTercerNivelProyecto'

// Dialogs
export default ({
  name: 'RespuestaRiesgosProyecto',
  mixins: [ Init ],
  data () {
    return {
      // Proyectos
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

      tab: 'proyecto',
      proyectos: [],
      proyectoSelect: null,

      riesgosProyecto: [],
      responsables: []
    }
  },
  mounted () {
    this.loadProyectos()
  },
  computed: {
    options: function () {
      let arr = []
      this.riesgosProyecto.foreach(
        r => r.riesgosSegundoNivelProyecto.foreach(
          r2 => r2.riesgosTercerNivelProyecto.foreach(
            r3 => arr.push(r3.respuesta.c_responsable)
          )
        )
      )
      return arr
    }
  },
  methods: {

    async getRiesgosProyecto () {
      try {
        const res = await RiesgoPrimerNivelProyecto.byProyectoId(this.proyectoSelect.id)
        if (res) {
          this.riesgosProyecto = res.riesgos
        }
      } catch (error) {
        return false
      }
    },

    async loadProyectos () {
      try {
        const res = await Proyecto.byUserId(this.identity.id)
        if (res) {
          this.projects = res.proyectos
        }
      } catch (error) {
        return false
      }
    },

    selectProject (proyecto) {
      this.proyectoSelect = proyecto
      this.getRiesgosProyecto()
      this.tab = 'tabla'
    },

    async actualizarResp (riesgo) {
      try {
        const risk = RespuestaRiesgoProyecto.fromJson(riesgo.respuesta)
        const res = await risk.update()
        if (res) {
          this.$q.notify({
            type: 'positive',
            message: `Respuesta Actualizada.`
          })
        }
      } catch (error) {
        return false
      }
    },

    descargarArchivo () {
      window.open('https://mega.nz/file/Xdol2LYK#Gs6kwRhgvenr60ilxj9yKFUDZtyY2IAmTQU1hlifwDs', '_blank')
    },

    sumRiesgosTierTres (riesgo) {
      let cant = 0
      for (var i = 0; i < riesgo.length; i++) {
        cant += riesgo[i].riesgosTercerNivelProyecto.length
      }
      return cant
    },

    filterFn (val, update, abort) {
      update(() => {
        const needle = val.toLocaleLowerCase()
        this.responsables = this.options.filter(v => v.toLocaleLowerCase().indexOf(needle) > -1)
      })
    },

    setModel ({ v }, riesgo) {
      riesgo.respuesta.c_responsable = v
    }
  }
})
</script>
<style lang="scss">
.RiesgosProyecto {
  .q-table tbody td {
    position: relative;
    border: solid 0.5px;
    border-color: #d4d4d4;
  }
  .q-table{
    tbody {
      td:before {
        background: none !important;
      }
    }
  }
  .selectInCell{
    display: inline-flex !important;
  }
  .cellHeader{
    background-color: #b9cfe2;
  }
}
</style>
