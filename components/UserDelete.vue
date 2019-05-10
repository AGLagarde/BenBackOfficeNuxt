<template>
    <div>
        <button class="buttonRow" v-on:click="isActive=true">Delete</button>

        <div v-if="isActive" class="popin">
            <h2 class="h2">Delete user</h2>

            <!--step1: confirmation to delete-->
            <div v-if="deletedItem === false" class="popin__step1">
                <p>
                    Are you sure to delete the user <br>
                    <strong> n°{{user.id}}: {{user.firstname + ' ' + user.lastname}} </strong>?
                </p>
                <a v-on:click.prevent="deletedItem = true" href="#" class="popin__step1-answer validate">Yes</a>
                <a v-on:click="closePopin" href="#" class="popin__step1-answer cancel">No</a>
            </div>

            <!-- step2: confirmation user is deleted-->
            <div class="popin__step2"
                v-if="deletedItem">
                <div class="popin__step2-validation">
                    <p>La suppression est effective</p>
                    <a v-on:click.prevent="deleteUser(user.id)">OK</a>
                </div>
            </div>
        </div> <!-- end popin -->
    </div>
</template>

<script>
import axios from 'axios'

export default {
    props: {
        user: Object
    },
    data() {
        return {
            token: this.$store.state.token,
            isActive: false,
            deletedItem: false,
            currentUser: {     
                id: this.user.id,
                firstName: this.user.firstname,
                lastName: this.user.lastname, 
                email: this.user.email,
                house: this.user.house
            } 
        }
    },
    methods: {
        closePopin() {
            this.isActive = false
        },
        // @todo actualiser la liste au clic
        deleteUser(id) {
            // -- fake delete -- 
            // this.$emit('delete-user', id); 
            // this.isActive = false
            
            // -- vrai delete -- 
            axios({
                method: 'DELETE',
                url: 'http://ulysse.idequanet.com/ben/web/api/user/delete/' + id,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    Authorization: `BEARER ${this.token}`
                },
            }).then(response => {
                this.$store.commit('removeUser', id)
                this.isActive = false
            }).catch(error => {
                console.log(error)
            });
        }
    }
}
</script>

<style lang="scss">
@import '../assets/scss/styles.scss';
    .popin__step1 {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        p {
            width: 90%;
            margin: 0 5%;
            flex: 0 0 1;
            padding-bottom: 40px;
            line-height: 40px;
            @include font (20px, $grey, 300, 1.8em);
        }
        &-answer {
            margin: 5%;
            @include button_gradient();
            text-decoration: none;
        }
    }
    .popin__step2 {
        &-validation {
            padding: 10px 0 50px;
            text-transform: none;
            p {
                margin-bottom: 30px;
                color: $grey;
            }
        }
        a {
            cursor:pointer;
            color: $grey;
            &:hover {
                color: $redish;
            }
        }
    }
</style>
