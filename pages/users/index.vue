<!--USERS-->
<template>
    <div class="container">
        <!--<Disconnect />-->
        <div class="listItems">
            <Navigation/>

            <div class="listItems__actions">
                <Pagination
                        v-on:pageChange="portion"
                />
                <!--searchbar-->
                <div class="searchbar">
                    <input
                        type="text" placeholder="Search"
                        maxlength= "12" class="searchbar__input"
                        v-model="search"
                        v-on:keyup="isFiltered = true"
                    >
                    <img src="~assets/img/searchbar.png" alt="search button" class="searchbar__button">
                </div><!-- end searchbar  -->

                <!-- add user -->
                <nuxt-link class="listItems__actions-addButton"
                    v-if="isCreating === false" to="users/create">Add user</nuxt-link><!-- end add user -->
            </div>

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

                <!--row-->
                <UserOneRow
                    v-for="user in filteredUsers"
                    v-bind:key="user.id"
                    :user="user"
                ></UserOneRow> <!--end row-->

            </table><!-- end list -->
        </div>

    </div>
</template>

<script>
import axios from 'axios'
import login from '../Login'
import Disconnect from '~/components/Disconnect'
import Navigation from '~/components/Navigation'
import UserOneRow from '~/components/UserOneRow'
import Pagination from '~/components/Pagination'

export default {
    components: {
        login,
        Disconnect,
        Navigation,
        UserOneRow,
        Pagination
    },
    data() {
        return {
            token: this.$store.state.token,
            //users: this.$store.state.users,
            isCreating: false,
            search: '',
            isFiltered: true,
            begin: 0,
            end: 0
        }
    },
    // if no token redirect to login page
    middleware: 'authenticated',
    // when component mounted, call api to get all the users from the DB 
    mounted() {
        this.getAllUsers()
    },
    methods: {
        // call api to get all users from DB
        getAllUsers() {
            axios({
                method: 'get',
                url: 'http://ulysse.idequanet.com/ben/web/api/users',
                headers: {
                    Authorization: `BEARER ${this.token}`
                }
            })
            .then(response => {
                this.$store.commit('setUsers', response.data.data.users)
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
        },
        portion(payload) {
            this.begin = payload.begin
            this.end = payload.end
        }
    },
    computed: {
        // filter search locally
        // 1. on filtre d'abord
        // puis on fait les résultats des pages du filtrage
        // d'où le filtre avant le slice
        // tu filtres et ensuite tu me découpes
        filteredUsers() {
            return this.$store.state.users.filter(user => {
                return user.firstname.toLowerCase().indexOf(this.search.toLowerCase()) > -1
            }).slice(this.begin, this.end)
        }
    }
}
</script>




