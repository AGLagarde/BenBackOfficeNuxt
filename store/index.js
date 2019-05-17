import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
        token: '',
        users: [],
        houses: []
    },
    mutations: {
      // get token from login.vue
      setToken (state, token) {
        console.log('rentré token')
        state.token = token
      },
      // get all users from users/index.vue
      setUsers (state, users) {
          state.users = users
      },
      // update DB with deleted user from UserDelete.vue
      removeUser (state, id) {
          state.users = state.users.filter((user)=> {
              return user.id !== id
          })
      },
      // update DB with new user added from users/create.vue
      addUser (state, user) {
          state.users.push(user)
      },
      // get all houses from houses/index.vue
      setHouses (state, houses) {
          state.houses = houses
      },
      // update DB with new house added from houses/create.vue
      // @todo
      addHouse (state, house) {
        state.houses.push(house)
      },
      // not working because of no call api existing with specific ID
      removeHouse (state, id) {
        state.houses = state.houses.filter((house)=> {
            return house.id !== id
        })
      },
    }
  })
}

export default createStore