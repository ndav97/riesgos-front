import Proyectos from 'pages/Proyectos.vue'
import Riesgos from 'pages/Riesgos.vue'
import RiesgosProyecto from 'pages/RiesgosProyecto.vue'
import RespuestaRiesgosProyecto from 'pages/RespuestaRiesgosProyecto.vue'
import MonitoreoRiesgosProyecto from 'pages/MonitoreoRiesgosProyecto.vue'
import ReporteProyecto from 'pages/ReporteProyecto.vue'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/Index.vue') },
      { path: '/registro', component: () => import('pages/Registro.vue') },
      { path: '/proyectos', component: Proyectos },
      { path: '/riesgos', component: Riesgos },
      { path: '/proyectos-riesgos', component: RiesgosProyecto },
      { path: '/respuesta-riesgos', component: RespuestaRiesgosProyecto },
      { path: '/monitoreo-riesgos', component: MonitoreoRiesgosProyecto },
      { path: '/reporte', component: ReporteProyecto }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
