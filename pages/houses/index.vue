<!--HOUSES-->
<template>
    <div class="container">
        <Disconnect />
        <div class="listItems">
            <Navigation/>
            <div class="listItems__actions">
                <!-- searchbar-->
                <div class="searchbar">
                    <input
                        type="text"
                        placeholder="Search"
                        maxlength= "12"
                        class="searchbar__input"
                        v-model="search"
                        v-on:keyup="isFiltered = true"
                    >
                    <img src="../../assets/img/searchbar.png" alt="search button" class="searchbar__button">
                </div><!-- end searchbar  -->
                <Pagination
                    v-on:pageChange="portion"
                />
                <!-- add house -->
                <nuxt-link class="listItems__actions-addButton"
                    v-if="isCreating === false" to="houses/create">Add house</nuxt-link><!-- end add house -->
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

                <!-- row -->
                <HouseOneRow
                    v-for="house in filteredHouses"
                    v-bind:key="house.id"
                    :house="house"
                ></HouseOneRow><!-- end row -->
            </table>
            <!-- end liste -->
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import Login from '../Login'
    import Disconnect from '~/components/Disconnect'
    import Pagination from '~/components/Pagination'
    import Navigation from '~/components/Navigation'
    import HouseOneRow from '~/components/HouseOneRow'

    export default {
        components: {
            Login,
            Disconnect,
            Pagination,
            Navigation,
            HouseOneRow
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
        // when component mounted, call api to get all the houses from the DB 
        mounted() {
            this.getAllHouses()
        },
        methods: {
            // call api to get all houses from DB
            getAllHouses() {
                axios({
                    method: 'get',
                    url: 'http://ulysse.idequanet.com/ben/web/api/houses',
                    headers: {
                        Authorization: `BEARER ${this.token}`
                    }
                })
                .then(response => {
                    this.$store.commit('setHouses', response.data.data.houses)
                })
                .catch(err => {
                    console.log(err)
                })
            },
            // get the numbers to proceed to the slice
            portion(payload) {
                this.begin = payload.begin
                this.end = payload.end
            }
        },
        computed: {
            // filter search locally - show users depending on slice obtain by pagination component
            filteredHouses() {
                return this.$store.state.houses.filter(house => {
                    return house.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
                }).slice(this.begin, this.end)
            }
        }
    }
</script>


<style lang="scss">
    @import '../../assets/scss/styles.scss';

</style>
