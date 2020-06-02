<template>
  <q-drawer
    v-model="leftDrawer"
    bordered
    behavior="mobile"
  >
    <q-scroll-area class="fit">
      <q-toolbar class="GPL__toolbar">
        <q-toolbar-title class="row items-center text-grey-8">
          <span class="q-ml-sm">SGR</span>
        </q-toolbar-title>
      </q-toolbar>

      <q-list padding>
        <q-item v-for="link in links1" :key="link.text" clickable class="GPL__drawer-item" :to="{path: `/${link.url}`}">
          <q-item-section avatar>
            <q-icon :name="link.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ link.text }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator class="q-my-md" />

        <q-item v-for="link in links2" :key="link.text" clickable class="GPL__drawer-item" :to="{path: `/${link.url}`}">
          <q-item-section avatar>
            <q-icon :name="link.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ link.text }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator class="q-my-md" />

        <q-item v-for="link in links3" :key="link.text" clickable class="GPL__drawer-item" :to="{path: `/${link.url}`}">
          <q-item-section avatar>
            <q-icon :name="link.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ link.text }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script>

import Init from '../mixin/Init'

export default {
  name: 'Drawer',

  mixins: [ Init ],

  data () {
    return {
      links1: [
        { icon: 'photo', text: 'Registro de Riesgos de Proyecto', url: 'proyectos-riesgos' },
        { icon: 'photo', text: 'Respuesta de Riesgos de Proyecto', url: 'respuesta-riesgos' },
        { icon: 'photo', text: 'Monitoreo de Riesgos de Proyecto', url: 'monitoreo-riesgos' }
      ],
      links2: [
        { icon: 'photo', text: 'Proyectos', url: 'proyectos' },
        { icon: 'archive', text: 'Riesgos', url: 'riesgos' }
      ]
      // links3: [
      //   { icon: 'settings', text: 'Settings' },
      //   { icon: 'help', text: 'Help & Feedback' }
      // ]
    }
  },

  computed: {
    leftDrawer: {
      get () {
        return this.$store.state.main.leftDrawer
      },

      set (n) {
        this.$store.commit('main/toggleDrawer', n)
      }
    }
  }
}
</script>

<style lang="sass">
.GPL
  &__toolbar
    height: 64px

  &__toolbar-input
    width: 35%

  &__drawer-item
    line-height: 24px
    border-radius: 0 24px 24px 0
    margin-right: 12px

    .q-item__section--avatar
      padding-left: 12px
      .q-icon
        color: #5f6368

    .q-item__label:not(.q-item__label--caption)
      color: #3c4043
      letter-spacing: .01785714em
      font-size: .875rem
      font-weight: 500
      line-height: 1.25rem
</style>
