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
              <div class="row justify-center">
                <img src="statics/tablaRiesgos.jpg" alt="">
              </div>
              <div class="text-h6">Registro de Riesgos</div>
              <q-markup-table separator='cell' flat>
                <tbody>
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
                    <tr :key="index+'-T1'+riesgo.c_codigo">
                      <td :rowspan="(riesgo.riesgosSegundoNivelProyecto.length*2) + (sumRiesgosTierTres(riesgo.riesgosSegundoNivelProyecto)) + 2" style="background-color: #0054ff82;">
                        {{(index+1) + '.' + riesgo.riesgoPrimerNivel.c_nombre + '(' + riesgo.riesgoPrimerNivel.codigo + ')'}}
                        <q-popup-proxy context-menu>
                            <q-banner>
                              <template v-slot:avatar>
                                <q-icon name="delete" color="primary" @click="deleteRiesgoPrimerNivel(riesgo)"/>
                              </template>
                              Eliminar 1
                            </q-banner>
                          </q-popup-proxy>
                      </td>
                    </tr>
                    <template v-for="(riesgoDos, index2) in riesgo.riesgosSegundoNivelProyecto">
                      <tr :key="index2 + '-T11'+riesgoDos.riesgoSegundoNivel.c_nombre">
                        <td colspan="2" style="background-color: #cccccc;">
                          {{riesgo.c_codigo + (index2+1) + '.' + riesgoDos.riesgoSegundoNivel.c_nombre}}
                          <q-popup-proxy context-menu>
                            <q-banner>
                              <template v-slot:avatar>
                                <q-icon name="delete" color="primary" @click="deleteRiesgoSegundoNivel(riesgoDos, riesgo)"/>
                              </template>
                              Eliminar
                            </q-banner>
                          </q-popup-proxy>
                        </td>
                        <td colspan="11" style="background-color: #cccccc;"></td>
                      </tr>
                      <template v-for="(riesgoTres, index3) in riesgoDos.riesgosTercerNivelProyecto">
                        <tr :key="index3 + riesgoTres.id + 'T111'">
                          <td>
                            {{riesgo.c_codigo + (index2+1) + '-' + (index3+1)}}
                            <q-popup-proxy context-menu>
                              <q-banner>
                                <template v-slot:avatar>
                                  <q-icon name="delete" color="primary" @click="deleteRiesgoTercerNivel(riesgoTres, riesgoDos, riesgo)"/>
                                </template>
                                Eliminar
                              </q-banner>
                            </q-popup-proxy>
                          </td>
                          <td>
                            {{riesgoTres.riesgoTercerNivel.c_nombre}}
                            <q-popup-proxy context-menu>
                              <q-banner>
                                <template v-slot:avatar>
                                  <q-icon name="delete" color="primary" />
                                </template>
                                Eliminar
                              </q-banner>
                            </q-popup-proxy>
                          </td>
                          <td><q-input outlined v-model="riesgoTres.c_descripcion_riesgo" label="Descripcion" dense @blur="saveRiesgo(riesgoTres)" /></td>
                          <td><q-input outlined v-model="riesgoTres.f_fecha_ingreso" label="Fecha de ingreso" mask="date" dense disabled/></td>
                          <td>
                              <q-select
                                filled
                                dense
                                v-model="riesgoTres.c_escala_probabilidad"
                                label="Probalididad - Escala"
                                :options="['MUY BAJA', 'BAJA', 'MEDIANA', 'ALTA', 'MUY ALTA']"
                                style="width: 250px"
                                class="selectInCell"
                                @input="changeEscalaProbabilidad(riesgoTres)"
                              />
                          </td>
                          <td>
                            <q-select
                              filled
                              dense
                              v-model="riesgoTres.n_valoracion_probabilidad"
                              label="Probalididad - Valoracion"
                              :options="[0.1, 0.3, 0.5, 0.7, 0.9]"
                              style="width: 250px"
                              class="selectInCell"
                              @input="changeValoracionProbabilidad(riesgoTres)"
                            />
                          </td>
                          <td><q-input outlined v-model="riesgoTres.c_objetivo_afectado" label="Objetivo Afectado" dense @blur="saveRiesgo(riesgoTres)" /></td>
                          <td>
                            <q-select
                              filled
                              dense
                              v-model="riesgoTres.c_escala_impacto"
                              label="Impacto - Escala"
                              :options="['MUY BAJA', 'BAJA', 'MEDIANA', 'ALTA', 'MUY ALTA']"
                              style="width: 250px"
                              class="selectInCell"
                              @input="changeImpactoEscala(riesgoTres)"
                            />
                          </td>
                          <td>
                            <q-select
                              filled
                              dense
                              v-model="riesgoTres.n_valoracion_impacto"
                              label="Impacto - Valoracion"
                              :options="[0.05, 0.1, 0.2, 0.4, 0.8]"
                              style="width: 250px"
                              class="selectInCell"
                              @input="changeImpactoValoracion(riesgoTres)"
                            />
                          </td>
                          <td>
                            <q-input outlined v-model="riesgoTres.n_valoracion_calificacion_riesgo" label="Calificacion de riesgo - Valoración" dense disable/>
                          </td>
                          <td>
                            <q-input outlined v-model="riesgoTres.c_calificacion_calificacion_riesgo" label="Calificacion de riesgo - Calificación" dense disable/>
                          </td>
                        </tr>
                      </template>
                      <tr :key="index2 + 'T13' + riesgoDos.riesgoSegundoNivel.c_nombre">
                        <td colspan="11">
                          <q-select
                            filled
                            dense
                            v-model="riesgoDos.newRiesgoNivelTresSelect"
                            use-input
                            input-debounce="0"
                            label="Riesgo nivel 3"
                            :options="getRiesgosTres(riesgo, riesgoDos)"
                            option-label="c_nombre"
                            emit-value
                            map-options
                            style="width: 250px"
                            class="selectInCell"
                          >
                            <template v-slot:no-option>
                              <q-item>
                                <q-item-section class="text-grey">
                                  No results
                                </q-item-section>
                              </q-item>
                            </template>
                          </q-select>
                          <q-btn label='Añadir Riesgo' color='primary' dense @click="addRiesgoNivelTres(riesgoDos)"/>
                        </td>
                      </tr>
                    </template>
                    <tr :key="index+'-T2'">
                      <td colspan="11">
                        <q-select
                          filled
                          dense
                          v-model="riesgo.newRiesgoNivelDosSelect"
                          use-input
                          input-debounce="0"
                          label="Riesgo nivel 2"
                          :options="getRiesgosDos(riesgo)"
                          option-label="c_nombre"
                          emit-value
                          map-options
                          style="width: 250px"
                          class="selectInCell"
                        >
                          <template v-slot:no-option>
                            <q-item>
                              <q-item-section class="text-grey">
                                No results
                              </q-item-section>
                            </q-item>
                          </template>
                        </q-select>
                        <q-btn label='Añadir Riesgo' color='primary' dense @click="addRiesgoNivelDos(riesgo)"/>
                      </td>
                    </tr>
                  </template>
                  <tr>
                    <td colspan="12">
                      <q-select
                        filled
                        dense
                        v-model="newRiesgoNivelUnoSelect"
                        use-input
                        input-debounce="0"
                        label="Riesgo nivel 1"
                        :options="optionsSelectNivelUno"
                        @filter="filterRiesgosNivelUno"
                        option-label="c_nombre"
                        emit-value
                        map-options
                        style="width: 250px"
                        class="selectInCell"
                      >
                        <template v-slot:no-option>
                          <q-item>
                            <q-item-section class="text-grey">
                              No results
                            </q-item-section>
                          </q-item>
                        </template>
                      </q-select>
                      <q-btn label='Añadir Riesgo' color='primary' dense @click="addRiesgoToTable()"/>
                    </td>
                  </tr>
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
import RiesgoPrimerNivel from '../models/RiesgoPrimerNivel'
import Proyecto from '../models/Proyecto'
import RiesgoPrimerNivelProyecto from '../models/RiesgoPrimerNivelProyecto'
import RiesgoSegundoNivelProyecto from '../models/RiesgoSegundoNivelProyecto'
import RiesgoTercerNivelProyecto from '../models/RiesgoTercerNivelProyecto'
// import RiesgoSegundoNivel from '../models/RiesgoSegundoNivel'
// import RiesgoTercerNivel from '../models/RiesgoTercerNivel'

// Dialogs
export default ({
  name: 'RiesgosProyecto',
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
    async getRiesgosNivelUno () {
      try {
        const res = await RiesgoPrimerNivel.byUserId(this.identity.id)
        if (res) {
          this.allRiesgosNivelUno = res.riesgos
        }
      } catch (error) {
        return false
      }
    },

    returnFecha (fecha) {
      return fecha.subString(0, 9)
    },

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
      this.getRiesgosNivelUno()
      this.getRiesgosProyecto()
      this.tab = 'tabla'
    },

    cambiarPage () {
      //
    },

    async addRiesgoToTable () {
      try {
        let rNU = this.newRiesgoNivelUnoSelect
        this.$set(rNU, 'riesgo_primer_nivel_id', rNU.id)
        rNU.id = null
        rNU.proyecto_id = this.proyectoSelect.id
        const riesgo = RiesgoPrimerNivelProyecto.fromJson(this.newRiesgoNivelUnoSelect)
        const res = await riesgo.store()
        if (res) {
          this.$q.notify({
            type: 'positive',
            message: 'Riesgo registrado'
          })
          this.riesgosProyecto.push(res.riesgo)
          this.getRiesgosNivelUno()
          this.newRiesgoNivelUnoSelect = null
        }
      } catch (e) {
        return false
      }
    },

    async addRiesgoNivelDos (r) {
      try {
        let rNU = r.newRiesgoNivelDosSelect
        let id = rNU.id
        this.$set(rNU, 'riesgo_segundo_nivel_id', id)
        rNU.id = null
        rNU.primer_nivel_proyecto_id = r.id
        const riesgo = RiesgoSegundoNivelProyecto.fromJson(r.newRiesgoNivelDosSelect)
        const res = await riesgo.store()
        if (res) {
          this.$q.notify({
            type: 'positive',
            message: 'Riesgo registrado'
          })
          const i = this.riesgosProyecto.findIndex(risk => risk.id === r.id)
          this.riesgosProyecto[i].riesgosSegundoNivelProyecto.push(res.riesgo)
          this.getRiesgosNivelUno()
          r.newRiesgoNivelDosSelect = null
        }
      } catch (e) {
        return false
      }
    },

    async addRiesgoNivelTres (r) {
      try {
        let date = new Date()

        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()
        const mes = month < 10 ? `0${month}` : month
        r.newRiesgoNivelTresSelect.f_fecha_ingreso = `${year}-${mes}-${day}`

        let rNU = r.newRiesgoNivelTresSelect
        let id = rNU.id
        this.$set(rNU, 'riesgo_tercer_nivel_id', id)
        rNU.id = null
        rNU.segundo_nivel_proyecto_id = r.id

        const riesgo = RiesgoTercerNivelProyecto.fromJson(rNU)
        const res = await riesgo.store()
        this.$q.notify({
          type: 'positive',
          message: 'Riesgo registrado'
        })
        r.riesgosTercerNivelProyecto = [...r.riesgosTercerNivelProyecto, res.riesgo]
        await this.getRiesgosNivelUno()
        r.newRiesgoNivelDosSelect = null
        r.riesgosNivelTres.push(r.newRiesgoNivelTresSelect)
      } catch {}
    },

    sumRiesgosTierTres (riesgo) {
      let cant = 0
      for (var i = 0; i < riesgo.length; i++) {
        cant += riesgo[i].riesgosTercerNivelProyecto.length
      }
      return cant
    },

    async deleteRiesgoPrimerNivel (riesgo) {
      try {
        const ri = RiesgoPrimerNivelProyecto.fromJson(riesgo)
        const res = await ri.delete()
        if (res) {
          const i = this.riesgosProyecto.indexOf(riesgo)
          this.riesgosProyecto.splice(i, 1)
        }
      } catch (e) {
        return false
      }
    },

    async deleteRiesgoSegundoNivel (riesgoDos, riesgo) {
      try {
        const ri = RiesgoSegundoNivelProyecto.fromJson(riesgoDos)
        const res = await ri.delete()
        if (res) {
          // const i = this.riesgosProyecto.indexOf(riesgo)
          riesgo.RiesgoSegundoNivelProyecto.filter(r => r.id !== riesgoDos.id)
        }
      } catch {}
    },

    async deleteRiesgoTercerNivel (riesgoTres, riesgoDos, riesgo) {
      try {
        const ri = RiesgoTercerNivelProyecto.fromJson(riesgoTres)
        await ri.delete()
        const i = riesgoDos.riesgosTercerNivelProyecto.indexOf(riesgoTres)
        riesgoDos.riesgosTercerNivelProyecto.splice(i, 1)
      } catch {}
    },

    getRiesgosDos (riesgo) {
      const i = this.allRiesgosNivelUno.findIndex(r => r.id === riesgo.riesgo_primer_nivel_id)
      let risks = i >= 0 ? this.allRiesgosNivelUno[i].riesgosSegundoNivel : []
      const indexRT1 = this.riesgosProyecto.findIndex(r => r.riesgoPrimerNivel.id === riesgo.riesgoPrimerNivel.id)
      const riesgosP = this.riesgosProyecto[indexRT1]

      risks = risks.filter(r => riesgosP.riesgosSegundoNivelProyecto.findIndex(r1 => r1.riesgoSegundoNivel.id === r.id) < 0)
      // console.log(riesgosP)
      return risks
    },

    getRiesgosTres (riesgo, riesgoDos) {
      const i = this.allRiesgosNivelUno.findIndex(r => r.id === riesgo.riesgo_primer_nivel_id)
      const i1 = this.allRiesgosNivelUno[i].riesgosSegundoNivel.findIndex(r => r.id === riesgoDos.riesgo_segundo_nivel_id)
      let risks = i >= 0 ? this.allRiesgosNivelUno[i].riesgosSegundoNivel[i1].riesgosTercerNivel : []

      risks = risks.filter(r => riesgoDos.riesgosTercerNivelProyecto.findIndex(r1 => r1.riesgoTercerNivel.id === r.id) < 0)

      return risks
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
      this.saveRiesgo(riesgo)
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
      this.saveRiesgo(riesgo)
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
      this.saveRiesgo(riesgo)
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
      this.saveRiesgo(riesgo)
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

    async saveRiesgo (riesgo) {
      try {
        const rT = RiesgoTercerNivelProyecto.fromJson(riesgo)
        await rT.update()
      } catch (e) {
        return false
      }
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
