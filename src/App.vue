<template>
  <div id="app" class="app">
    <navigation class="navbar" />
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
    <LoginModal v-if="loginModal" />
  </div>
</template>

<script>
import navigation from '@/components/navigation/Navbar.vue'
import LoginModal from '@/components/modals/LoginModal.vue'
export default {
  components: {
    navigation,
    LoginModal
  },
  mounted () {
    // this.$auth.getTokenSilently()
    //   .then((token) => {
    //     console.log(token)
    //   })
    //   .catch((err) => {
    //     console.log('errrrrooooorrr:' + err)
    //   })
  },
  computed: {
    loginModal () {
      return this.$store.state.login_modal
    },
    authenticated () {
      if (this.$auth.isAuthenticated) return true
      if (!window.navigator.onLine) return true
      return false
    }
  },
  watch: {
    authenticated (val) {
      if (val  && window.navigator.onLine) {
        this.$auth.getTokenSilently()
          .then((token) => {
            this.$store.dispatch('setAuthHeader', token)
          })
          .catch((err) => {
            console.log(err)
          })
        setInterval(() => {
          this.$auth.getTokenSilently()
            .then((token) => {
              this.$store.dispatch('setAuthHeader', token)
            })
            .catch((err) => {
              console.log(err)
            })
        }, 36000)
      } else if (window.navigator.onLine) {
          this.$auth.loginWithRedirect()
      }
    }
  }
}
</script>

<style lang="scss">
@import './assets/styles/variables.scss';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  margin-bottom: 7.5rem;
}
body {
  background-color: $mainBackground;
}
</style>
