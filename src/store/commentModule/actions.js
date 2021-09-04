import axios from 'axios'

let host = 'https://api.libria-app.com'
if (process.env.VUE_APP_ENV === "DEV") {
  host = ''
}
// const getAuth = () => {
//   const token = window.localStorage.getItem('token')
//   return {
//     headers: {
//       authorization: `Bearer ${token}`
//     }
//   }
// }

const getUserId = () => {
  const userId = window.localStorage.getItem('userId')
  return {
    headers: {
      userId: userId
    }
  }
}

export async function getAll ({ commit }) {
  commit('GET_COMMENTS')
  axios
    .get(`${host}/api/comments`)
    .then(response => {
      commit('RECEIVE_COMMENTS', response.data)
    })
    .catch(err => {
      console.log(err)
    })
}

export async function getReported ({ commit }) {
  commit('GET_COMMENTS')
  axios
    .get(`${host}/api/reported/comments?contentType=topic`)
    .then(response => {
      commit('RECEIVE_COMMENTS', response.data)
    })
    .catch(err => {
      console.log(err)
    })
}

export function getAllByAnswer ({ commit }, payload) {
  commit('GET_COMMENTS')
  axios
    .get(`${host}/api/comments/${payload.answerId}`, {headers: {userId: payload.userId}})
    .then(response => {
      commit('RECEIVE_COMMENTS', response.data)
    })
    .catch(err => {
      console.log(err)
    })
}
export function getOne ({ commit }, id) {
  commit('GET_COMMENT')
  axios
    .get(`${host}/api/comment/${id}`)
    .then(response => {
      commit('RECEIVE_COMMENT', response.data)
    })
    .catch(err => {
      console.log(err)
    })
}
export function post ({ commit }, comment) {
  commit('POST_COMMENT', comment)
  axios
    .post(`${host}/api/comment`, comment, getUserId())
    .then(response => {
      comment.id = response.data
      commit('COMMENT_POSTED', comment)
    })
    .catch(function (error) {
      console.log(error)
    })
}
export function deleteOne ({ commit }, comment) {
  commit('DELETE_COMMENT', comment.id)
  axios
    .delete(`${host}/api/comment/${comment.id}`, getUserId())
    .then(function () {
      commit('COMMENT_DELETED')
    })
    .catch(function (error) {
      console.log(error)
    })
}
export function put ({ commit }, comment) {
  commit('PUT_COMMENT')
  axios
    .put(`${host}/api/comment/${comment.id}`, comment, getUserId())
    .then(function () {
      commit('COMMENT_PUT')
    })
    .catch(function (error) {
      console.log(error)
    })
}
