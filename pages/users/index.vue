<!--USERS-->
<template>
    <div class="container">
        <Disconnect />
        <div class="listItems">
            <Navigation/>
            <div class="listItems__actions">
                <div class="searchbar">
                    <input
                        type="text" placeholder="Search"
                        maxlength= "12" class="searchbar__input"
                        v-model="search"
                        v-on:keyup="isFiltered = true"
                    >
                    <img src="~assets/img/searchbar.png" alt="search button" class="searchbar__button">
                </div>
                <Pagination
                    v-on:pageChange="portion"
                />
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
// ancien login
import login from '../Login'
// import login from '../index' --> nouveau ??
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
                // update users in store after call api
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
        // get the numbers from pagination to proceed to the slice
        portion(payload) {
            this.begin = payload.begin
            this.end = payload.end
        }
    },
    computed: {
        // filter search locally - show users depending on slice obtain by pagination component
        // return --> the portion of users corresponding to the search
        filteredUsers() {
            // simuler un clic sur le first avant de filtrer et decouper ????
            return this.$store.state.users.filter(user => {
                return user.firstname.toLowerCase().indexOf(this.search.toLowerCase()) > -1
            }).slice(this.begin, this.end)
        }
    }
}
</script>




