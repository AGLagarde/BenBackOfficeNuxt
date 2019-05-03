<!--USERS-->
<template>
    <div class="container">
        <div class="listItems">
            <Navigation/>
            
            <div class="listItems__actions">

                <!-- <SearchBar 
                    v-bind:users="users"
                    v-on:filter-users="filteredUsersResults"
                ></SearchBar> -->
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
                        src="../assets/searchbar.png"
                        alt="search button"
                        class="searchbar__button"
                    >
                </div><!-- end search  -->
               
               <!-- add user -->
                <span 
                    class="listItems__actions-addButton"
                    v-if="isCreating === false"
                    v-on:click="goCreate"
                >Add User</span>
            </div>

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
                
                <UserOneRow
                    v-for="user in filteredUsers"
                    v-bind:key="user.id"
                    :user="user"
                ></UserOneRow>

                <!-- une ligne -->
                <!-- with composant : <UserOneRow
                    v-for="user in filteredUsersResults" 
                    v-bind:key="user.id"
                    :user="user"
                ></UserOneRow> -->
                <!-- end une ligne -->
            </table>
            <!-- end liste -->
        </div>
    </div>
</template>

<script>
import store from '../store/index'
import axios from 'axios'
import login from './Login'
import Navigation from '../components/Navigation'
// import SearchBar from './SearchBar'
import UserOneRow from '../components/UserOneRow'
import UserAdd from '../components/UserAdd'

export default {
    components: {
        login,
        Navigation,
        // SearchBar,
        UserAdd,
        UserOneRow
    },
    data() {
        return {
            token: store.token,
            users: store.token,
            isCreating: false,
            search: '',
            isFiltered: true
        }
    },
    mounted() {
        if (!store.token) {
            this.$router.push({ path: 'login' })
        } else {
            this.getAllUsers()
        }
    },
    methods: {
        // API: GET request
        getAllUsers() {
            axios({
                method: 'get',
                url: 'http://ulysse.idequanet.com/ben/web/api/users',
                headers: {
                    Authorization: `BEARER ${this.token}`
                }
            })
            .then(response => {
                store.users = response.data.data.users
                console.log('affiche ', store.users)

                store.users.forEach(user => {
                    if (user.house) {
                        user.house = user.house.name
                    } else {
                        user.house = 'oooo'
                    }
                });
            })
            .catch(err => {
                console.log(err)
            })
        },
        goCreate() {
            console.log('ty go');
            this.$router.push({ path: 'users/create' })
        }
        // component Searchbar
        // filteredUsersResults(results) {
        //     console.log('mes results :', results)
        //     this.users = results;
        // }
    },
    computed: {
        filteredUsers() {
            console.log(store.users)
            return store.users.filter(user => {
                return user.firstname.toLowerCase().indexOf(this.search.toLowerCase()) > -1
            })
        }
    }
}
</script>

<style lang="scss">
@import '../assets/scss/common/mixins.scss';
@import '../assets/scss/common/variables.scss';
@import '../assets/scss/components/listItems.scss';
@import '../assets/scss/components/searchbar.scss';


</style>


