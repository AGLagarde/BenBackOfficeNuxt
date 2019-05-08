<template>
    <div class="addItem">
        <!-- <img src="../assets/cross-icon.png" alt="close popin" v-on:click="isCreating = false"> -->
        <!--<img src="../assets/cross-icon.png" alt="close popin" v-on:click="isCreated = false">-->
        <form action="" class="item__form">
            <div>
                <label for="housename" class="item__form-label" >Firstname</label>
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
                houses : [],
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
                this.updateForm();
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
