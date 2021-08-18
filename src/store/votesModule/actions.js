import axios from 'axios'
const host = 'https://api.libria-app.com'
// const host = ''

const getUserId = () => {
  const userId = window.localStorage.getItem('userId')
  return {
    headers: {
      userId: userId
    }
  }
}

export function getAllByAnswer ({ commit }, answerId) {
  commit('GET_VOTES')
  axios
    .get(`${host}/api/votes/${answerId}`)
    .then(response => {
      commit('RECEIVE_VOTES', response.data)
    })
    .catch(err => {
      console.log(err)
    })
  }
export function post ({ commit }, vote) {
  commit('POST_VOTE', vote)
  axios
    .post(`${host}/api/vote`, vote, getUserId())
    .then(respnse => {
      vote.id = respnse.data
      commit('VOTE_POSTED', vote)
    })
    .catch(function (error) {
      console.log(error)
    })
}
export function put ({ commit }, vote) {
  commit('PUT_VOTE')
  axios
    .put(`${host}/api/vote/${vote.id}`, vote, getUserId())
    .then(function () {
      commit('VOTE_PUT')
    })
    .catch(function (error) {
      console.log(error)
    })
}
