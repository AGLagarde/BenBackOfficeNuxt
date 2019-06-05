<!-- create house -->
<template>
    <div class="wrapper">
        <form action="#" class="form item__form">
            <h2 class="h2">Add a house</h2>
            <div>
                <label for="housename" class="item__form-label" >Name</label>
                <input type="text" class="item__form-input"
                    placeholder="Nom de la colocation" name="housename"
                    v-model:value="newHouse.name"
                />
            </div>
            <div>
                <nuxt-link class="item__form-submit" to="/houses">Annuler</nuxt-link>
                <input @click="createHouse" type="submit" name="action" value="Créer" class="item__form-submit validate" />
            </div>
        </form>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        props: {
            house: Object
        },
        data() {
            return {
                token: this.$store.state.token,
                houses : this.$store.state.houses,
                newHouse: {
                    name: '',
                    created: '',
                    users: []
                }
            }
        },
        methods: {
            /**
            * Asynchronous call api to add a new house 
            * provided that the key name is filled
            */
            async createHouse(event) {
                event.preventDefault();
                const house = await axios({
                    method: 'post',
                    url: '//ulysse.idequanet.com/ben/web/api/house/create',
                    data: {
                        house : {
                            name : this.newHouse.name,
                            created : this.newHouse.created,
                            users : this.newHouse.users
                        }
                    },
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        Authorization: `BEARER ${this.token}`
                    },
                }).then(response => {
                    alert('Your house has been created')
                    this.$store.commit('addHouse', response.data.data.house)
                    this.goback()
                }).catch(error => {
                    alert('You already belong to a house, you cannot create a new one')
                    console.log(error)
                })
            },
            goback() {
                this.$router.push({ path: '/houses' })
            }
        }
    }
</script>


<style lang="scss">
    @import '../../assets/scss/styles.scss';
    .h2 {
        margin-bottom: 100px;
    }
    .form {
        padding-bottom: 50px;
        > div:last-child {
            width:70%;
            margin: 70px 0 90px 5%;
        }
    }
    .item__form-input {
        width: 40%;
    }
    .validate {
        margin-left: 20px;
    }
</style>