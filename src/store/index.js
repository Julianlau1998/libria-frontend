import Vue from 'vue'
import Vuex from 'vuex'
import topicModule from './topicModule'
import answerModule from './answerModule'
import votesModule from './votesModule'
import commentModule from './commentModule'
import reportModule from './reportModule'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login_modal: false,
  },
  mutations: {
  },
  actions: {
    setAuthHeader(commit, token) {
      axios.defaults.headers.common['authorization'] = `bearer ${token}`
    }
  },
  modules: {
    topicModule,
    answerModule,
    votesModule,
    commentModule,
    reportModule
  }
})
