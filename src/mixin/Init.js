import { mapActions } from 'vuex'

export default {
  created () {
    this.init__()
  },

  methods: {
    ...mapActions({
      getIdentity: 'main/getIdentity',
      getToken: 'main/getToken',
      getIsLogged: 'main/getIsLogged'
    }),

    init__ () {
      this.getIdentity()
      this.getToken()
      this.getIsLogged()

      this.$api.defaults.headers.common = {
        Authorization: 'Bearer ' + this.token
      }
    }
  },

  computed: {
    identity () {
      return this.$store.state.main.identity
    },

    token () {
      return this.$store.state.main.token
    },

    isLogged () {
      return this.$store.state.main.isLogged
    },

    URL_ () {
      return process.env.API
    }
  }
}
