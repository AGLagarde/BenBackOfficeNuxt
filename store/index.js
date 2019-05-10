// const store = {
//     token:'',
//     users: [], 
//     houses: []
// }

import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
      state: {
          token:'',
          users: [],
          houses: []
      },
      mutations: {
          setToken (state, token) {
              state.token = token
          },
          setUsers (state, users) {
              state.users = users
          },
          removeUser (state, id) {
              state.users = state.users.filter((user)=> {
                  return user.id !== id
              })
          },
          // addUser (state, user) {
          //     state.users.push(user)
          // },
          setHouses (state, houses) {
              state.houses = houses
          }
      }
  })
}

export default createStore