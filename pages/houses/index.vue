<!--HOUSES-->
<template>
    <div class="container">
        <Authentified />
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
    import Authentified from '~/components/Authentified'
    import Navigation from '~/components/Navigation'
    import HouseOneRow from '~/components/HouseOneRow'

    export default {
        components: {
            Login,
            Authentified,
            Navigation,
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
        middleware: 'authenticated',
        mounted() {
            this.getAllHouses()
        },
        methods: {
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
            goCreate() {
                this.$router.push({ path: 'houses/create' })
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


<style lang="scss">
    @import '../../assets/scss/styles.scss';

</style>
