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

        /**
        * Before page mounted, verification of token otherwise redirect to login page
        */
        middleware: 'authenticated',

        mounted() {
            this.getAllHouses()
        },

        methods: {
            /**
            * Call api to get all the houses in DB --token required--
            * @returns {array, array} houses, items
            */
            getAllHouses() {
                axios({
                    method: 'get',
                    url: 'https://ulysse.idequanet.com/ben/web/api/houses',
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
            /**
            * Search filters results of houses depending on their name 
            * @returns {array} filteredHouses
            */
            filteredHouses() {
                return this.$store.state.houses.filter(house => {
                    return house.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
                }).slice(this.$store.getters.beginPortion, this.$store.getters.endPortion)
            }, 
            /**
            * Linked to items all got by the getAllHouses method
            * @returns {array} totalItems
            */
            totalItems() {
                return this.items;
            },
            /**
            * Set the number of pages depending on how many items and number items per page
            * @returns {number} totalPages
            */
            totalPages () {
                return Math.ceil(this.totalItems.length / this.numberPerPage)
            },
            /**
            * Dynamically linked to the current page of the store
            * @returns {number} currentPageUpdated
            */
            currentPageUpdated() {
                return this.$store.state.currentPage
            }
        },

        watch: {
            /**
            * Reactive to any change on search 
            * update current page to 1
            * filter re-initialized
            * @params {number, number} newValue, oldValue
            */
            search(newValue, oldValue) {
                this.$store.commit('setCurrentPage', 1)
            }
        }
    }
</script>



