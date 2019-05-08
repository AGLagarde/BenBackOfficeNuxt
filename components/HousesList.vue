<!--HOUSES-->
<template>
    <div class="container">
        <div class="listItems">
           
            <Navigation></Navigation>
            
            <div class="listItems__actions">
                <!-- <SearchBar></SearchBar> -->
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

                <!-- add house ------ not working -->
                <span
                    class="listItems__actions-addButton"
                    v-if="isCreating === false"
                    v-on:click="goCreate"
                >Add House</span>
                <!-- end add house -->
            </div>

            <!-- liste -->
            <table class="listItems__table houses">
                <tr class="listItems__table__head">
                    <th>#</th>
                    <th>Name</th>
                    <th>Created</th>
                    <th>Room-Mates</th>
                    <th>Actions</th>
                </tr>

                <!-- une ligne -->
                <HouseOneRow
                    v-for="house in filteredHouses"
                    v-bind:key="house.id"
                    :house="house"
                ></HouseOneRow>
                <!-- end une ligne -->
            </table>
            <!-- end liste -->
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import Login from './Login'
    import Navigation from './Navigation'
    import SearchBar from './SearchBar'
    import HouseOneRow from './HouseOneRow'

    export default {
        components: {
            Login,
            Navigation,
            SearchBar,
            HouseOneRow
        },
        data() {
            return {
                token: this.$store.state.token,
                houses: this.$store.state.houses,
                isCreating: false,
                search: '',
                isFiltered: true,
                userDataVue: []
            }
        },
        mounted() {
            if (!this.$store.state.token) {
                this.$router.push({ path: 'login' })
            } else {
                this.getAllHouses()
            }
        },
        methods: {
            // API: GET request
            // @todo
            getAllHouses() {
                axios({
                    method: 'get',
                    url: 'http://ulysse.idequanet.com/ben/web/api/houses',
                    headers: {
                        Authorization: `BEARER ${this.token}`
                    }
                })
                .then(response => {
                    this.$store.state.houses = response.data.data.houses
                    this.$store.state.houses.forEach(house => {
                        console.log(house.users)
                        // recup firstname + ID (update)
                    })
                })
                .catch(err => {
                    console.log(err)
                })
            },
            goCreate() {
                console.log('ty go')
            }
        },
        computed: {
            filteredHouses() {
                return this.$store.state.houses.filter(house => {
                    return house.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
                })
            }
        }
    }
</script>


