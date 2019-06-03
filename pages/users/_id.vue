<template>
     <div>
        <div class="wrapper">
            <form action="#" class="form item__form">
                <h2 class="h2">Edit a user</h2>
                <div> <!-- firstname -->
                    <label for="firstname" class="item__form-label" >Firstname</label>
                    <input type="text" name="firstname"
                        class="item__form-input"
                        v-model="currentUser.firstname"
                    />
                </div>
                <div> <!-- lastname -->
                    <label for="lastname" class="item__form-label" >Lastname</label>
                    <input type="text" name="lastname"
                        class="item__form-input" placeholder="Lastname"
                        v-model="currentUser.lastname"
                    />
                </div>
                <div> <!-- email -->
                    <label for="email" class="item__form-label" >Email</label>
                    <input type="email" name="email"
                        class="item__form-input" placeholder="Email"
                        v-model="currentUser.email"
                    />
                </div>
                <div> <!-- buttons -->
                    <input @click.prevent="updateUser()" type="submit" name="action" value="OK" class="item__form-submit validate" />
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    asyncData(context) {
        console.log(context.params.id)
        return {
            id: context.params.id
        }
    },
    data() {
        return {
            id: null,
            token: this.$store.state.token,
            currentUser: {}
        }
    }, 

    mounted() {
        this.getUser(this.id)
    },

    methods: {
        /**
        * Call api to get data from a specific user in DB --token required--
        * @returns {object} currentUser
        */
        getUser(id) {
            axios({
                method: 'get',
                url: 'http://ulysse.idequanet.com/ben/web/api/user/' + this.id,
                headers: {
                    Authorization: `BEARER ${this.token}`
                }
            })
            .then(response => {
                this.currentUser = response.data.data.user
            })
            .catch(err => {
                console.log(err)
            })
        },
        /**
        * Call api to update a specific user in DB --token required--
        * @params {object} user
        */
        updateUser() {
            axios({
                method: 'PUT',
                url: 'http://ulysse.idequanet.com/ben/web/api/user/edit/' + this.currentUser.id,
                data: { 
                    user : {
                        firstname : this.currentUser.firstname,
                        lastname : this.currentUser.lastname,
                        email : this.currentUser.email
                    }
                },
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    Authorization: `BEARER ${this.token}`
                },
            }).then(response => {
                this.$router.push({ path: '/users' })
            }).catch(error => {
                console.log(error)
            })
        }
    }
}

</script>

