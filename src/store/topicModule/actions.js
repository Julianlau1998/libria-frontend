import axios from 'axios'
const host = 'https://api.libria-app.com'
// const host = ''

// const getAuth = () => {
//   const token = window.localStorage.getItem('token')
//   console.log(token)
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

export async function getAll ({ commit }, {limit = 10, offset = 0, searchText = '', creating = false}) {
  commit('GET_TOPICS')
  axios
    .get(`${host}/api/topics?limit=${limit}&offset=${offset}&searchText=${searchText}`)
    .then(response => {
      commit('RECEIVE_TOPICS', response.data, creating)
    })
    .catch(err => {
      console.log(err)
    })
}

export async function getReported ({ commit }) {
  commit('GET_TOPICS')
  axios
    .get(`${host}/api/reported/topics?contentType=topic`)
    .then(response => {
      commit('RECEIVE_TOPICS', response.data)
    })
    .catch(err => {
      console.log(err)
    })
}

export function getOne ({ commit }, id) {
  commit('GET_TOPIC')
  axios
    .get(`${host}/api/topic/${id}`)
    .then(response => {
      commit('RECEIVE_TOPIC', response.data)
    })
    .catch(err => {
      console.log(err)
    })
}
export function getRandom ({ commit }) {
  commit('GET_RANDOM_TOPIC')
  axios
    .get(`${host}/api/randomTopic`)
    .then(response => {
      commit('RECEIVE_RANDOM_TOPIC', response.data)
    })
    .catch(err => {
      console.log(err)
    })
}
export function post ({ commit }, topic) {
  commit('POST_TOPIC', topic)
  axios
    .post(`${host}/api/topic`, topic, getUserId())
    .then(response => {
      topic.id = response.data
      commit('TOPIC_POSTED', topic)
    })
    .catch(function (error) {
      console.log(error)
    })
}
export function deleteOne ({ commit }, topic) {
  commit('DELETE_TOPIC', topic.id)
  axios
    .delete(`${host}/api/topic/${topic.id}`, getUserId())
    .then(function () {
      commit('TOPIC_DELETED')
    })
    .catch(function (error) {
      console.log(error)
    })
}
export function put ({ commit }, topic) {
  commit('PUT_TOPIC')
  axios
    .put(`${host}/api/topic/${topic.id}`, topic, getUserId())
    .then(function () {
      commit('TOPIC_PUT')
    })
    .catch(function (error) {
      console.log(error)
    })
}
export function updateBestAnswer ({ commit }, topic) {
  commit('PUT_TOPIC')
  axios
    .put(`${host}/api/topicBestAnswer/${topic.id}`, getUserId())
    .then(function () {
      commit('TOPIC_PUT')
    })
    .catch(function (error) {
      console.log(error)
    })
}