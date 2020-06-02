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
          <q-tab-panel name="tabla" id="content">
            <div v-if="proyectoSelect">
              <div class="text-h6" @click="getExcel">REPORTE PROYECTO</div>
              <q-markup-table separator='cell' flat>
                <tbody>
                  <tr colspan="12">RIESGOS DEL PROYECTO</tr>
                  <tr>
                    <td colspan="3" rowspan="2">TIPO DE RIESGO</td>
                    <td rowspan="2" class="cellHeader">DESCRIPCIÓN DEL RIESGO</td>
                    <td rowspan="2" class="cellHeader">FECHA DE INGRESO DEL RIESGO</td>
                    <td colspan="2" class="cellHeader">PROBABILIDAD</td>
                    <td colspan="3" class="cellHeader">IMPACTO</td>
                    <td colspan="2" class="cellHeader">CALIFICACIÓN DE RIESGO</td>
                  </tr>
                  <tr>
                    <td class="cellHeader">ESCALA</td>
                    <td class="cellHeader">VALORACIÓN</td>
                    <td class="cellHeader">OBJETIVO AFECTADO</td>
                    <td class="cellHeader">ESCALA</td>
                    <td class="cellHeader">VALORACIÓN</td>
                    <td class="cellHeader">VALORACIÓN</td>
                    <td class="cellHeader">CALIFICACIÓN</td>
                  </tr>
                  <template v-for="(riesgo, index) in riesgosProyecto">
                    <tr :key="index+'-T1'">
                      <td :rowspan="(riesgo.riesgosSegundoNivelProyecto.length) + (sumRiesgosTierTres(riesgo.riesgosSegundoNivelProyecto)) + 1" style="background-color: #0054ff82;">
                        {{(index+1) + '.' + riesgo.riesgoPrimerNivel.c_nombre + '(' + riesgo.riesgoPrimerNivel.codigo + ')'}}
                      </td>
                    </tr>
                    <template v-for="(riesgoDos, index2) in riesgo.riesgosSegundoNivelProyecto">
                      <tr :key="index2 + '-T11'">
                        <td colspan="2" style="background-color: #cccccc;">
                          {{riesgo.c_codigo + (index2+1) + '.' + riesgoDos.riesgoSegundoNivel.c_nombre}}
                        </td>
                        <td colspan="11" style="background-color: #cccccc;"></td>
                      </tr>
                      <template v-for="(riesgoTres, index3) in riesgoDos.riesgosTercerNivelProyecto">
                        <tr :key="index3 + riesgoTres.id + 'T111'">
                          <td>
                            {{riesgo.c_codigo + (index2+1) + '-' + (index3+1)}}
                          </td>
                          <td>
                            {{riesgoTres.riesgoTercerNivel.c_nombre}}
                          </td>
                          <td>{{riesgoTres.c_descripcion_riesgo}}</td>
                          <td>{{riesgoTres.f_fecha_ingreso}}</td>
                          <td>{{riesgoTres.c_escala_probabilidad}}</td>
                          <td>{{riesgoTres.n_valoracion_probabilidad}}</td>
                          <td>{{riesgoTres.c_objetivo_afectado}}</td>
                          <td>{{riesgoTres.c_escala_impacto}}</td>
                          <td>{{riesgoTres.n_valoracion_impacto}}</td>
                          <td>{{riesgoTres.n_valoracion_calificacion_riesgo}}</td>
                          <td>{{riesgoTres.c_calificacion_calificacion_riesgo}}</td>
                        </tr>
                      </template>
                    </template>
                  </template>
                  <tr colspan="12"></tr>
                  <tr colspan="12"></tr>
                  <tr colspan="12"></tr>
                </tbody>
              </q-markup-table>
              <!-- RESPUESTA -->
              <div class="row justify-center">
                <h5>RESPUESTAS</h5>
              </div>
              <q-markup-table separator='cell' flat>
                <tbody>
                  <tr colspan="12">RESPUESTAS DE RIESGOS</tr>
                  <tr>
                    <td colspan="2">TIPO DE RIESGO</td>
                    <td class="cellHeader">ESTRATEGIA</td>
                    <td class="cellHeader">RESPUESTA</td>
                  </tr>
                  <template v-for="(riesgo, index) in riesgosProyecto">
                    <tr :key="index+'-T1'">
                      <td :rowspan="(riesgo.riesgosSegundoNivelProyecto.length+1) + (sumRiesgosTierTres(riesgo.riesgosSegundoNivelProyecto))" style="background-color: #0054ff82;">
                        {{(index+1) + '.' + riesgo.riesgoPrimerNivel.c_nombre + '(' + riesgo.riesgoPrimerNivel.codigo + ')'}}
                      </td>
                    </tr>
                    <template v-for="(riesgoDos, index2) in riesgo.riesgosSegundoNivelProyecto">
                      <tr :key="index2 + '-T11'">
                        <td colspan="3" style="background-color: #cccccc;">
                          {{riesgo.c_codigo + (index2+1) + '.' + riesgoDos.riesgoSegundoNivel.c_nombre}}
                        </td>
                      </tr>
                      <template v-for="(riesgoTres, index3) in riesgoDos.riesgosTercerNivelProyecto">
                        <tr :key="index3 + riesgoTres.id + 'T111'">
                          <td>
                            {{riesgo.c_codigo + '-' + riesgo.c_codigo + (index2+1) + '-' + (index3+1)}}
                          </td>
                          <td>
                            {{riesgoTres.respuesta.c_estrategia}}
                          </td>
                          <td>
                            {{riesgoTres.respuesta.c_respuesta}}
                          </td>
                        </tr>
                      </template>
                    </template>
                  </template>
                  <tr colspan="12"></tr>
                  <tr colspan="12"></tr>
                  <tr colspan="12"></tr>
                </tbody>
              </q-markup-table>
              <!-- MONITOREO -->
              <div class="row justify-center">
                <h5>MONITOREO</h5>
              </div>
              <q-markup-table separator='cell' flat>
                <tbody>
                  <tr colspan="12">MONITOREO DE RIESGOS</tr>
                  <tr>
                    <td colspan="2">TIPO DE RIESGO</td>
                    <td class="cellHeader">MONITOREO Y CONTROL</td>
                    <td class="cellHeader">ESTADO</td>
                  </tr>
                  <template v-for="(riesgo, index) in riesgosProyecto">
                    <tr :key="index+'-T1'">
                      <td :rowspan="(riesgo.riesgosSegundoNivelProyecto.length+1) + (sumRiesgosTierTres(riesgo.riesgosSegundoNivelProyecto))" style="background-color: #0054ff82;">
                        {{(index+1) + '.' + riesgo.riesgoPrimerNivel.c_nombre + '(' + riesgo.riesgoPrimerNivel.codigo + ')'}}
                      </td>
                    </tr>
                    <template v-for="(riesgoDos, index2) in riesgo.riesgosSegundoNivelProyecto">
                      <tr :key="index2 + '-T11'">
                        <td colspan="3" style="background-color: #cccccc;">
                          {{riesgo.c_codigo + (index2+1) + '.' + riesgoDos.riesgoSegundoNivel.c_nombre}}
                        </td>
                      </tr>
                      <template v-for="(riesgoTres, index3) in riesgoDos.riesgosTercerNivelProyecto">
                        <tr :key="index3 + riesgoTres.id + 'T111'">
                          <td>
                            {{riesgo.c_codigo + '-' + riesgo.c_codigo + (index2+1) + '-' + (index3+1)}}
                          </td>
                          <td>
                            {{riesgoTres.monitoreo.c_monitoreo_control}}
                          </td>
                          <td>
                            {{riesgoTres.monitoreo.c_estado}}
                          </td>
                        </tr>
                      </template>
                    </template>
                  </template>
                  <tr colspan="12"></tr>
                  <tr colspan="12"></tr>
                  <tr colspan="12"></tr>
                </tbody>
              </q-markup-table>
            </div>
            <div v-else>
              <h3>Seleccione un royecto</h3>
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
import Proyecto from '../models/Proyecto'
import RiesgoPrimerNivelProyecto from '../models/RiesgoPrimerNivelProyecto'
// import RiesgoSegundoNivel from '../models/RiesgoSegundoNivel'
// import RiesgoTercerNivel from '../models/RiesgoTercerNivel'
import XLSX from 'xlsx'
// Dialogs
export default ({
  name: 'ReporteProyecto',
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

      allRiesgosNivelUno: [],
      newRiesgoNivelUnoSelect: null,
      optionsSelectNivelUno: [],
      riesgosProyecto: []
    }
  },
  computed: {
    riesgosNivelUnoToAdd: function () {
      return this.allRiesgosNivelUno.filter(r => this.riesgosProyecto.findIndex(r1 => r1.riesgo_primer_nivel_id === r.id) < 0)
    }
  },
  mounted () {
    this.loadProyectos()
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

    cambiarPage () {
      //
    },

    sumRiesgosTierTres (riesgo) {
      let cant = 0
      for (var i = 0; i < riesgo.length; i++) {
        cant += riesgo[i].riesgosTercerNivelProyecto.length
      }
      return cant
    },

    getRiesgosDos (riesgo) {
      const i = this.allRiesgosNivelUno.findIndex(r => r.id === riesgo.riesgo_primer_nivel_id)
      return i >= 0 ? this.allRiesgosNivelUno[i].riesgosSegundoNivel : []
    },

    getRiesgosTres (riesgo, riesgoDos) {
      const i = this.allRiesgosNivelUno.findIndex(r => r.id === riesgo.riesgo_primer_nivel_id)
      const i1 = this.allRiesgosNivelUno[i].riesgosSegundoNivel.findIndex(r => r.id === riesgoDos.riesgo_segundo_nivel_id)
      return i >= 0 ? this.allRiesgosNivelUno[i].riesgosSegundoNivel[i1].riesgosTercerNivel : []
    },

    changeEscalaProbabilidad (riesgo) {
      switch (riesgo.c_escala_probabilidad) {
        case 'MUY BAJA':
          riesgo.n_valoracion_probabilidad = 0.1
          break
        case 'BAJA':
          riesgo.n_valoracion_probabilidad = 0.3
          break
        case 'MEDIANA':
          riesgo.n_valoracion_probabilidad = 0.5
          break
        case 'ALTA':
          riesgo.n_valoracion_probabilidad = 0.7
          break
        case 'MUY ALTA':
          riesgo.n_valoracion_probabilidad = 0.9
          break
      }
      this.calcularPuntaje(riesgo)
    },

    changeValoracionProbabilidad (riesgo) {
      switch (riesgo.n_valoracion_probabilidad) {
        case 0.1:
          riesgo.c_escala_probabilidad = 'MUY BAJA'
          break
        case 0.3:
          riesgo.c_escala_probabilidad = 'BAJA'
          break
        case 0.5:
          riesgo.c_escala_probabilidad = 'MEDIANA'
          break
        case 0.7:
          riesgo.c_escala_probabilidad = 'ALTA'
          break
        case 0.9:
          riesgo.c_escala_probabilidad = 'MUY ALTA'
          break
      }
      this.calcularPuntaje(riesgo)
    },

    changeImpactoEscala (riesgo) {
      switch (riesgo.c_escala_impacto) {
        case 'MUY BAJA':
          riesgo.n_valoracion_impacto = 0.05
          break
        case 'BAJA':
          riesgo.n_valoracion_impacto = 0.1
          break
        case 'MEDIANA':
          riesgo.n_valoracion_impacto = 0.2
          break
        case 'ALTA':
          riesgo.n_valoracion_impacto = 0.4
          break
        case 'MUY ALTA':
          riesgo.n_valoracion_impacto = 0.8
          break
      }
      this.calcularPuntaje(riesgo)
    },

    changeImpactoValoracion (riesgo) {
      switch (riesgo.n_valoracion_impacto) {
        case 0.05:
          riesgo.c_escala_impacto = 'MUY BAJA'
          break
        case 0.1:
          riesgo.c_escala_impacto = 'BAJA'
          break
        case 0.2:
          riesgo.c_escala_impacto = 'MODERADO'
          break
        case 0.4:
          riesgo.c_escala_impacto = 'ALTA'
          break
        case 0.8:
          riesgo.c_escala_impacto = 'MUY ALTA'
          break
      }
      this.calcularPuntaje(riesgo)
    },

    calcularPuntaje (riesgo) {
      const puntaje = riesgo.n_valoracion_impacto * riesgo.n_valoracion_probabilidad
      riesgo.n_valoracion_calificacion_riesgo = puntaje
      if (puntaje <= 0.07) {
        riesgo.c_calificacion_calificacion_riesgo = 'BAJO'
      } else if (puntaje <= 0.2) {
        riesgo.c_calificacion_calificacion_riesgo = 'MEDIO'
      } else {
        riesgo.c_calificacion_calificacion_riesgo = 'ALTO'
      }
    },

    // Filtros
    filterRiesgosNivelUno (val, update) {
      if (val === '') {
        update(() => {
          this.optionsSelectNivelUno = this.riesgosNivelUnoToAdd
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.optionsSelectNivelUno = this.riesgosNivelUnoToAdd.filter(v => v.c_nombre.toLowerCase().indexOf(needle) > -1)
      })
    },

    getExcel () {
      const tbl = document.getElementById('content')
      let wb = XLSX.utils.table_to_book(tbl)
      XLSX.writeFile(wb, `Reporte de Riesgos.xlsx`)
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
  // .q-markup-table{
  //   overflow: none;
  // }
  .q-tabs__content{
    @media print {
      display: none;
    }
  }
}
</style>
