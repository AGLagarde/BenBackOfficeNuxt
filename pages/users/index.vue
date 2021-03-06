<!--USERS-->
<template>
    <div class="container">
        <Disconnect />
        <div class="listItems">
            <!--actions-->
            <div class="listItems__actions">
                <div class="searchbar">
                    <input
                        type="text" placeholder="Search"
                        maxlength= "12" class="searchbar__input"
                        v-model="search"
                        @keyup="isFiltered = true"
                    >
                    <img src="~assets/img/searchbar.png" alt="search button" class="searchbar__button">
                </div>
                <Pagination
                    :items="$store.state.filteredUsers"
                    :totalPages="totalPages"
                />
                <nuxt-link class="listItems__actions-addButton"
                    v-if="isCreating === false"
                    to="users/create"
                >Add user</nuxt-link>
            </div> <!--end actions-->

            <!-- list -->
            <table class="listItems__table users">
                <tr class="listItems__table__head">
                    <th>#</th>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Mail</th>
                    <th>House</th>
                    <th>Actions</th>
                </tr>
                <UserOneRow
                    v-for="user in filteredUsers.slice($store.getters.beginPortion, $store.getters.endPortion)"
                    :key="user.id"
                    :user="user"
                ></UserOneRow>

            </table><!-- end list -->
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Disconnect from '~/components/Disconnect'
import UserOneRow from '~/components/UserOneRow'
import Pagination from '~/components/Pagination'

export default {
    components: {
        Disconnect,
        UserOneRow,
        Pagination
    },

    data() {
        return {
            token: this.$store.state.token,
            items: [],
            numberPerPage: this.$store.state.numberPerPage,
            begin: this.$store.state.beginPortion,
            end: this.$store.state.endPortion,
            isCreating: false,
            isFiltered: true
        }
    },

    /**
     * Before page mounted, verification of token otherwise redirect to login page
     */
    middleware: 'authenticated',

    mounted() {
        this.getAllUsers()
    },

    methods: {
        /**
        * Call api to get all the users in DB --token required--
        * and update it in the store
        */
        getAllUsers() {
            axios({
                method: 'get',
                url: '//ulysse.idequanet.com/ben/web/api/users',
                headers: {
                    Authorization: `BEARER ${this.token}`
                }
            })
            .then(response => {
                this.$store.commit('setUsers', response.data.data.users)
                this.items = response.data.data.users
                this.$store.state.users.forEach(user => {
                    if (user.house) {
                        user.house = user.house.name
                    } else {
                        user.house = 'none'
                    }
                });
            })
            .catch(err => {
                console.log(err)
            })
        }
    },

    computed: {
        /**
        * Searchbar filters results of users depending on their firstname 
        * @returns {array} filteredUsers
        */
        filteredUsers() {
            return this.$store.getters.filteredUsers;
        },
        search: {
            get() {
                return this.$store.state.search;
            },
            set(value) {
                this.$store.commit('setSearch', value)
            }
        },
        /**
        * TotalItems is equal to all users from the DB obtained by the getAllUsers method
        * @returns {array} totalItems
        */
        totalItems() {
            return this.items;
        },
        /**
        * Set the number of pages depending on how many items and number items per page
        * @returns {number} totalPages
        */
        totalPages () {
            return this.$store.getters.totalPages;
        },
        /**
        * Dynamically linked to the current page of the store
        * @returns {number} currentPageUpdated
        */
        currentPageUpdated() {
            return this.$store.state.currentPage
        }
    },

    watch: {
        /**
        * Portion is activated as soon as currentPageUpdated changes 
        * Reactive to any change on search 
        * update current page to 1
        * filter re-initialized
        * @params {number, number} newValue, oldValue
        */
        search(newValue, oldValue) {
            this.$store.commit('setCurrentPage', 1)
        }
    }
}
</script>




