<!--HOUSES-->
<template>
    <div class="container">
        <Disconnect />
        <div class="listItems">
            <!--actions-->
            <div class="listItems__actions">
                <div class="searchbar">
                    <input
                        type="text"
                        placeholder="Search"
                        maxlength= "12"
                        class="searchbar__input"
                        v-model="search"
                        @keyup="isFiltered = true"
                    >
                    <img src="../../assets/img/searchbar.png" alt="search button" class="searchbar__button">
                </div>
                <Pagination
                    :items="$store.state.filteredHouses"
                    :totalPages="totalPages"
                />
                <nuxt-link class="listItems__actions-addButton"
                    v-if="isCreating === false" to="houses/create"
                >Add house</nuxt-link>
            </div> <!--end actions-->

            <!-- liste -->
            <table class="listItems__table houses">
                <tr class="listItems__table__head">
                    <th>#</th>
                    <th>Name</th>
                    <th>Created</th>
                    <th>Room-Mates</th>
                    <th>Actions</th>
                </tr>
                <HouseOneRow
                    v-for="house in filteredHouses"
                    :key="house.id"
                    :house="house"
                ></HouseOneRow>
            </table><!-- end liste -->
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import Disconnect from '~/components/Disconnect'
    import Pagination from '~/components/Pagination'
    import HouseOneRow from '~/components/HouseOneRow'

    export default {
        components: {
            Disconnect,
            Pagination,
            HouseOneRow
        },
        data() {
            return {
                token: this.$store.state.token,
                items: [],
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
                    this.items = response.data.data.houses
                })
                .catch(err => {
                    console.log(err)
                })
            }
        },
        computed: {
            portion() {
                this.begin = ((this.currentPageUpdated - 1) * this.numberPerPage)
                this.end = this.begin + this.numberPerPage
                this.$store.commit('setPortion', this.begin, this.end)
                return  this.begin, this.end
            },
            // filter search locally - show users depending on slice obtain by pagination component
            filteredHouses() {
                return this.$store.state.houses.filter(house => {
                    return house.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
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
                return this.$store.state.currentPage
            }
        },

        watch: {
            totalPages(newValue, oldValue) {
                this.portion
            },
            currentPageUpdated(newValue, oldValue) {
                this.portion
            }
        }
    }
</script>



