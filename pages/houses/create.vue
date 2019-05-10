<template>
    <div class="wrapper">
        <form action="" class="form item__form">
            <h2 class="h2">Add a house</h2>
            <div>
                <label for="housename" class="item__form-label" >Name</label>
                <input type="text" class="item__form-input" placeholder="Nom de la colocation"
                name="housename" v-model:value="newHouse.name">
            </div>
            <div>
                <input v-on:click="goback" type="submit" name="action" value="Annuler" class="item__form-submit" />
                <input v-on:click="createHouse" type="submit" name="action" value="Créer" class="item__form-submit" />
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
            // POST METHOD CREATE
            createHouse(event) {
                event.preventDefault();
                console.log(this.token)
                axios({
                    method: 'post',
                    url: 'http://ulysse.idequanet.com/ben/web/api/house/create',
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
                    console.log(this.token)
                    this.houses.push(response.data.data.house)
                    console.log(response.data)
                    this.goback()
                }).catch(error => {
                    console.log(error)
                });
            },
            goback() {
                console.log('go back')
                this.$router.push({ path: '/houses' })
            },
            updateForm(input) {
                document.querySelectorAll('.listUsers__add__form input').forEach(function(input) {
                    input.value = ''
                })
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
</style>