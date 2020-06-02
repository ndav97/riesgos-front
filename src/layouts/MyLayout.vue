<template>
  <q-layout view="lHh Lpr fff" class="bg-grey-1">
    <app-header v-if="isLogged" />

    <drawer v-if="isLogged" />

    <q-page-container class="GPL__page-container">
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>

import Init from '../mixin/Init'

import AppHeader from './AppHeader'
import Drawer from './Drawer'

export default {
  name: 'DefaultLayout',

  mixins: [ Init ],

  components: { AppHeader, Drawer }
}
</script>

<style lang="scss">

</style>
