import Vuex from 'vuex'

const createStore = () => {
    return new Vuex.Store({
        state: {
            token: '',
            users: [],
            houses: [],
            selectedTab: 1,
            currentPage: 1,
            numberPerPage: 15,
            search: ''
        },

        getters: {
            /**
            * Set the right portion (begin and end)depending on current page and number of item per page
            * @returns {number}
            */
            beginPortion(state) {
                return ((state.currentPage - 1) * state.numberPerPage)
            },
            endPortion(state) {
                return (state.currentPage * state.numberPerPage) -1
            },
            filteredUsers(state, getters) {
            return state.users
                .filter(user => {
                return (
                    user.lastname
                    .toLowerCase()
                    .indexOf(state.search.toLowerCase()) > -1
                );
                });
            },
            filteredHouses(state, getters) {
                return state.houses
                    .filter(house => {
                    return (
                        house.name
                        .toLowerCase()
                        .indexOf(state.search.toLowerCase()) > -1
                    );
                });
            },
            totalPages(state, getters) {
                return Math.ceil(
                getters.filteredUsers.length / state.numberPerPage
                );
            }
        },

        mutations: {
            // get token from login.vue
            setToken (state, token) {
                state.token = token
            },
            // update Tab of navigation (users/houses)
            setTab (state, tab) {
                state.selectedTab = tab
            },
            // get current page
            setCurrentPage (state, page) {
                state.currentPage = page
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
            addHouse (state, house) {
                state.houses.push(house)
            },
            // not working because of no existing call api with specific ID
            removeHouse (state, id) {
                state.houses = state.houses.filter((house)=> {
                    return house.id !== id
                })
            },
            setSearch(state, value) {
                state.search = value;
            }
        }
    });
}

export default createStore
