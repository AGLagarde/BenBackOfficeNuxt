<!--USERS-->
<template>
    <div class="container">
        <Disconnect />
        <div class="listItems">
            <Navigation/>

            <div class="listItems__actions">
                <!--searchbar-->
                <div class="searchbar">
                    <input
                        type="text"
                        placeholder="Search"
                        maxlength= "12"
                        class="searchbar__input"
                        v-model="search"
                        v-on:keyup="isFiltered = true"
                    >
                    <img
                        src="~assets/img/searchbar.png"
                        alt="search button"
                        class="searchbar__button"
                    >
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
        <Pagination/>
    </div>
</template>

<script>
import axios from 'axios'
import login from '../Login'
import Disconnect from '~/components/Disconnect'
import Navigation from '~/components/Navigation'
import UserOneRow from '~/components/UserOneRow'

export default {
    components: {
        login,
        Disconnect,
        Navigation,
        UserOneRow
    },
    data() {
        return {
            token: this.$store.state.token,
            users: this.$store.state.users,
            isCreating: false,
            search: '',
            isFiltered: true
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
        }
    },
    computed: {
        // filter search locally
        filteredUsers() {
            return this.$store.state.users.filter(user => {
                return user.firstname.toLowerCase().indexOf(this.search.toLowerCase()) > -1
            })
        }
    }
}
</script>




