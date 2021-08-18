import axios from 'axios'

const host = 'https://api.libria-app.com'
// const host = ''

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
  commit('GET_ANSWERS')
  axios
    .get(`${host}/api/answers`)
    .then(response => {
      commit('RECEIVE_ANSWERS', response.data)
    })
    .catch(err => {
      console.log(err)
    })
}
export function getAllByTopic ({ commit }, payload) {
  commit('GET_ANSWERS')
  axios
    .get(`${host}/api/answers/${payload.topicId}`, {headers: {userId: payload.userId}})
    .then(response => {
      commit('RECEIVE_ANSWERS', response.data)
    })
    .catch(err => {
      console.log(err)
    })
}
export function getOne ({ commit }, id) {
  commit('GET_ANSWER')
  axios
    .get(`${host}/api/answer/${id}`)
    .then(response => {
      commit('RECEIVE_ANSWER', response.data)
    })
    .catch(err => {
      console.log(err)
    })
}
export function post ({ commit }, answer) {
  commit('POST_ANSWER', answer)
  axios
    .post(`${host}/api/answer`, answer, getUserId())
    .then(respnse => {
      answer.id = respnse.data
      commit('ANSWER_POSTED', answer)
    })
    .catch(function (error) {
      console.log(error)
    })
}
export function deleteOne ({ commit }, answer) {
  commit('DELETE_ANSWER', answer.id)
  axios
    .delete(`${host}/api/answer/${answer.id}`, answer, getUserId())
    .then(function () {
      commit('ANSWER_DELETED')
    })
    .catch(function (error) {
      console.log(error)
    })
}
export function put ({ commit }, answer) {
  commit('PUT_ANSWER')
  axios
    .put(`${host}/api/answer/${answer.id}`, answer, getUserId())
    .then(function () {
      commit('ANSWER_PUT')
    })
    .catch(function (error) {
      console.log(error)
    })
}


// //DEV

// import axios from 'axios'

// // const getAuth = () => {
// //   const token = window.localStorage.getItem('token')
// //   return {
// //     headers: {
// //       authorization: `Bearer ${token}`
// //     }
// //   }
// // }

// const getUserId = () => {
//   const userId = window.localStorage.getItem('userId')
//   return {
//     headers: {
//       userId: userId
//     }
//   }
// }

// export async function getAll ({ commit }) {
//   commit('GET_ANSWERS')
//   axios
//     .get('/api/answers')
//     .then(response => {
//       commit('RECEIVE_ANSWERS', response.data)
//     })
//     .catch(err => {
//       console.log(err)
//     })
// }
// export function getAllByTopic ({ commit }, payload) {
//   commit('GET_ANSWERS')
//   axios
//     .get(`/api/answers/${payload.topicId}`, {headers: {userId: payload.userId}})
//     .then(response => {
//       commit('RECEIVE_ANSWERS', response.data)
//     })
//     .catch(err => {
//       console.log(err)
//     })
// }
// export function getOne ({ commit }, id) {
//   commit('GET_ANSWER')
//   axios
//     .get(`/api/answer/${id}`)
//     .then(response => {
//       commit('RECEIVE_ANSWER', response.data)
//     })
//     .catch(err => {
//       console.log(err)
//     })
// }
// export function post ({ commit }, answer) {
//   commit('POST_ANSWER', answer)
//   axios
//     .post('/api/answer', answer, getUserId())
//     .then(respnse => {
//       answer.id = respnse.data
//       commit('ANSWER_POSTED', answer)
//     })
//     .catch(function (error) {
//       console.log(error)
//     })
// }
// export function deleteOne ({ commit }, answer) {
//   commit('DELETE_ANSWER', answer.id)
//   axios
//     .delete(`/api/answer/${answer.id}`, answer, getUserId())
//     .then(function () {
//       commit('ANSWER_DELETED')
//     })
//     .catch(function (error) {
//       console.log(error)
//     })
// }
// export function put ({ commit }, answer) {
//   commit('PUT_ANSWER')
//   axios
//     .put(`/api/answer/${answer.id}`, answer, getUserId())
//     .then(function () {
//       commit('ANSWER_PUT')
//     })
//     .catch(function (error) {
//       console.log(error)
//     })
// }
