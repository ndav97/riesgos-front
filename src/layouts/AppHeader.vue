<template>
  <q-header elevated class="bg-white text-grey-8 no-imp" height-hint="64">
    <q-toolbar class="GPL__toolbar" style="height: 64px">
      <q-btn
        flat
        dense
        round
        @click="openLeftDrawer"
        aria-label="Menu"
        icon="menu"
        class="q-mx-md"
      />

      <q-toolbar-title v-if="$q.screen.gt.sm" shrink class="row items-center no-wrap">
        <span>RiskmanagerPeru</span>
      </q-toolbar-title>

      <q-space />

      <div class="q-gutter-sm row items-center no-wrap">
        <!-- <q-btn round dense flat color="grey-8" icon="notifications">
          <q-badge color="red" text-color="white" floating>
            2
          </q-badge>
          <q-tooltip>Notifications</q-tooltip>
        </q-btn> -->
        <q-btn round flat>
            <q-avatar size="40px">
              <img src="~assets/avatar.png">
            </q-avatar>
            <q-tooltip>Mi Cuenta</q-tooltip>

            <q-menu>
              <q-list style="min-width: 100px">
                <q-separator />
                <q-item @click="logout" clickable v-close-popup>
                  <q-item-section>Cerrar Sesión</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script>

import Init from '../mixin/Init'

export default {
  name: 'AppHeader',

  mixins: [ Init ],

  computed: {
    leftDrawer: {
      get () {
        return this.$store.state.main.leftDrawer
      },

      set (n) {
        this.$store.commit('main/toggleDrawer', n)
      }
    }
  },

  methods: {
    openLeftDrawer () {
      this.$store.commit('main/toggleDrawer', true)
    },

    logout () {
      this.$q.sessionStorage.clear()
      this.$router.push({
        path: '/'
      })
      window.location.reload()
    }
  }
}
</script>

<style lang="sass">
.GPL
  &__toolbar
    height: 64px
</style>

<style lang="scss">
.no-imp {
  @media print  {
    display: none;
  }
}
</style>
