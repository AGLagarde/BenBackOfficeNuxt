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
                    v-for="user in filteredUsers"
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
            currentPage: this.$store.state.currentPage,
            numberPerPage: this.$store.state.numberPerPage,
            begin: this.$store.state.beginPortion,
            end: this.$store.state.endPortion,
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
                // update users in store after call api
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
        
        portion() {
            this.begin = ((this.currentPage - 1) * this.numberPerPage)
            this.end = this.begin + this.numberPerPage
            this.$store.commit('setPortion', this.begin, this.end)
            return  this.begin, this.end
        },
        // filter search locally - show users depending on slice obtain by pagination component
        // return --> the portion of users corresponding to the search
        filteredUsers() {
            return this.$store.state.users.filter(user => {
                return user.firstname.toLowerCase().indexOf(this.search.toLowerCase()) > -1
            }).slice(this.begin, this.end)
        },
        // total items are linked to data from the DB
        totalItems() {
            return this.items;
        },
        // total pages are obtained depending on total items and number per page
        totalPages () {
            return Math.ceil(this.totalItems.length / this.numberPerPage)
        },
        // update the page based on pagination transmitted data
        currentPageUpdated() {
            return this.currentPage
        }
    },

    watch: {
        totalPages(newValue, oldValue) {
            this.portion
        },
        currentPageUpdated(newValue, oldValue) {
            console.log('old ', oldValue)
            console.log('new ', newValue)
            this.portion
        }
    }
}
</script>




