<template>
  <Login v-if="!isLogged" />
  <q-page class="flex flex-center" v-else>
  </q-page>
</template>

<script>
import Login from './Login'

import Init from '../mixin/Init'

export default {
  name: 'PageIndex',

  mixins: [ Init ],

  components: { Login }
}
</script>
