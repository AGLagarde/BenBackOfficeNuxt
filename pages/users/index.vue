<!--USERS-->
<template>
    <div class="container">
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
                <!--<nuxt-child/>-->
                <!-- add user -->
                <span 
                    class="listItems__actions-addButton"
                    v-if="isCreating === false"
                    v-on:click="goCreate"
                >Add User</span>
            </div><!-- end add user -->

            <!-- liste -->
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

            </table><!-- end liste -->
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import login from '../Login'
import Navigation from '~/components/Navigation'
import UserOneRow from '~/components/UserOneRow'

export default {
    components: {
        login,
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
    middleware: 'authenticated',
    mounted() {
        this.getAllUsers()
    },
    methods: {
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
                    console.log('un seul user à la fois ', user);
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
        goCreate() {
            this.$router.push({ path: 'users/create' })
        }
    },
    computed: {
        filteredUsers() {
            console.log(this.$store.state.users)
            return this.$store.state.users.filter(user => {
                return user.firstname.toLowerCase().indexOf(this.search.toLowerCase()) > -1
            })
        }
    }
}
</script>

<style lang="scss">
@import '../../assets/scss/styles.scss';


</style>


