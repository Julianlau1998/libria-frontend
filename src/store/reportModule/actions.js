import axios from 'axios'

let host = 'https://api.libria-app.com'
if (process.env.VUE_APP_ENV === "DEV") {
  host = ''
}

const getUserId = () => {
    const userId = window.localStorage.getItem('userId')
    return {
      headers: {
        userId: userId
      }
    }
  }

export function report ({commit}, payload) {
    commit('POST_REPORT')
    axios
      .put(`${host}/api/report/${payload.id}?contentType=${payload.contentType}`, getUserId())
      .then(() => {
            commit('REPORT_POSTED')
        })
      .catch(function (error) {
        console.log(error)
      })
  }
  
  export function unreport  ({commit}, payload) {
    commit('POST_REPORT')
    axios
      .put(`${host}/api/unreport/${payload.id}?contentType=${payload.contentType}`, getUserId())
        .then(() => {
            commit('REPORT_POSTED')
        })
      .catch(function (error) {
        console.log(error)
      })
  }