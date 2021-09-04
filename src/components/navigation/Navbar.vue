<template>
<nav class="navbar is-fixed-top ml-0" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <h1 class="is-size-2 has-text-black" @click="$router.push('')">
      <router-link class="is-router-link ml-3" to="/">
        <span class="ml-2">
          Libria 
          <i class="fas fa-book-open"></i>
        </span>
      </router-link>
    </h1>
    <a
      @click="openMobileMenu()"
      role="button"
      class="navbar-burger"
      :class="{ 'is-active': isActive }"
      aria-label="menu"
      aria-expanded="false"
    >
      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <i class="fas fa-bars is-bigger is-left has-text-left mt-2"></i>
      </a>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu" :class="{ 'is-active': isActive }">
    <div class="navbar-start">
      <a class="navbar-item" @click="goHome()">
          Home
      </a>
      
      <a class="navbar-item" @click="openInfoPage()" v-if="!$auth.loading">
          Information
      </a>

      <a class="navbar-item" @click="openProfile()" v-if="!$auth.loading">
        <span v-if="$auth.isAuthenticated">
          Profile
        </span>
      </a>

      <a class="navbar-item" @click="openModPage()" v-if="!$auth.loading">
        <span v-if="$auth.isAuthenticated && $auth.user.name[0] === 'admin'">
          Moderation
        </span>
      </a>

      <br>
<!-- 
      <a class="navbar-item">
        Settings
      </a> -->
    </div>

    <div class="navbar-end mb-3">
      <div class="navbar-item">
        <span v-if="!$auth.loading" class="is-log-in-buttons">
          <button
            v-if="!$auth.isAuthenticated"
            @click="login"
            class="button is-log-in-button is-outlined is-dark mr-3"
          >
            Log in
          </button>
          <button
            v-if="!$auth.isAuthenticated"
            @click="register"
            class="button is-log-in-button is-danger"
          >
            Register
          </button>
          <button
            v-if="$auth.isAuthenticated"
            @click="logout"
            class="button is-log-in-button is-outlined is-dark"
          >
            Log out
          </button>
        </span>
      </div>
    </div>
  </div>
</nav>
</template>

<script>
export default {
    name: 'navigation',
    data () {
      return  {
        isActive: false,
      }
    },
    methods: {
      login() {
        this.$auth.loginWithRedirect();
      },
      register() {
        this.$auth.loginWithRedirect({
          screen_hint: 'signup'
        });
      },
      logout() {
        this.$auth.logout({
          returnTo: window.location.origin
        });
      },
      openMobileMenu () {
        this.isActive = !this.isActive
      },
      goHome () {
        this.isActive = false
        this.$router.push('/')
      },
      openProfile () {
        this.isActive = false
        this.$router.push('/profile')
      },
      openModPage () {
        this.isActive = false
        this.$router.push('/admin')
      },
      openInfoPage () {
        this.isActive = false
        this.$router.push('/information')
      }
    },
    created () {
      if (this.$auth.isAuthenticated) {
        window.localStorage.setItem('userId', this.$auth.user.sub)
      } else {
        window.localStorage.setItem('userId', '')
      }
    },
    computed: {
      authenticated () {
        if (this.$auth.isAuthenticated) {
          return this.$auth.user.sub
        } else {
          return ''
        }
      }
    },
    watch: {
      authenticated (val) {
        window.localStorage.setItem('userId', val)
      }
    }
}
</script>

<style>

</style>