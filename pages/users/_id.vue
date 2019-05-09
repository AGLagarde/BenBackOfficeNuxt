<template>
    <div>
        <h2 class="h2">Edit user</h2>
        <form action="" class="">
            <div>
                <label for="firstname" class="item__form-label" >Firstname</label>
                <input type="text" 
                name="firstname"
                class="item__form-input" v-model="currentUser.firstName" value="">
            </div>
            <div>
                <label for="lastname" class="item__form-label" >Lastname</label>
                <input type="text" 
                name="lastname"
                class="item__form-input" placeholder="Lastname" v-model="currentUser.lastName">
            </div>
            <div>
                <label for="email" class="item__form-label" >Email</label>
                <input type="email" 
                name="email" 
                class="item__form-input" placeholder="Email" v-model="currentUser.email">
            </div>
            <div> <!-- house -->
                <label for="housename" class="item__form-label" >House</label>
                <input type="text" 
                name="housename" readonly
                class="item__form-input" value="user.house" v-model="currentUser.house">
            </div>
            <div> <!-- buttons -->
                <input v-on:click.prevent="updateUser(user.id)" type="submit" name="action" value="OK" class="item__form-submit validate" />
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    validate ({ params }) {
        // Must be a number
        return /^\d+$/.test(params.id)
    },
    props: {
        user: Object
    },
    data() {
        return {
            token: this.$store.state.token,
            currentUser: {     
                id: 'user.id',
                firstName: 'HEY',
                lastName: 'YOU', 
                email: 'eee@ee.fr',
                house: 'eeeee'
            } 
        }
    },
    methods: {
        // API : PUT MODIFICATION REQUEST
        updateUser(id) {
            this.currentUser.id = id
            console.log('laaaaaa: ', this.currentUser)
            axios({
                method: 'PUT',
                url: 'http://ulysse.idequanet.com/ben/web/api/user/edit/' + this.currentUser.id,
                data: { 
                    user : {
                        firstname : this.currentUser.firstName,
                        lastname : this.currentUser.lastName,
                        email : this.currentUser.email
                    }
                },
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    Authorization: `BEARER ${this.token}`
                },
            }).then(response => {
                this.$emit('modified-user', response.data.data.user) 
            }).catch(error => {
                console.log(error)
            });
        }
    }
}

</script>

<style lang="scss">
@import '../../assets/scss/common/mixins.scss';
@import '../../assets/scss/common/variables.scss';
@import '../../assets/scss/components/listItems.scss';
@import '../../assets/scss/components/formItem.scss';


</style>