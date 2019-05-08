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
                        src="~assets/searchbar.png"
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

            </table>
            <!-- end liste -->
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import login from '../Login'
import Navigation from '~/components/Navigation'
// import SearchBar from '~/SearchBar'
import UserOneRow from '~/components/UserOneRow'

export default {
    components: {
        login,
        Navigation,
        // SearchBar,
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
                this.$store.commit('setUsers', response.data.data.users)
                console.log('affiche ', this.$store.state.users)

                this.$store.state.users.forEach(user => {
                    console.log('mon user ', user);
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
            console.log(this.$store.state.users)
            return this.$store.state.users.filter(user => {
                return user.firstname.toLowerCase().indexOf(this.search.toLowerCase()) > -1
            })
        }
    }
}
</script>

<style lang="scss">
@import '../../assets/scss/common/mixins.scss';
@import '../../assets/scss/common/variables.scss';
@import '../../assets/scss/components/listItems.scss';
@import '../../assets/scss/components/searchbar.scss';


</style>


