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
        console.log('je remmmoooove')
          state.users = state.users.filter((user)=> {
              return user.id !== id
          })
      },
      // addUser (state, user) {
      //     state.users.push(user)
      // },
      setHouses (state, houses) {
          state.houses = houses
      },
      // not working
      removeHouse (state, id) {
        console.log('je veux remove')
        state.houses = state.houses.filter((house)=> {
            return house.id !== id
        })
      },
    }
  })
}

export default createStore