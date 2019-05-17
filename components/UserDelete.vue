<template>
    <div>
        <a class="buttonRow" v-on:click="isActive=true">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                <title>trashcan</title>
                <path d="M21 28c0.553 0 1-0.447 1-1v-14c0-0.553-0.447-1-1-1s-1 0.447-1 1v14c0 0.553 0.447 1 1 1zM11 28c0.552 0 1-0.447 1-1v-14c0-0.553-0.448-1-1-1s-1 0.447-1 1v14c0 0.553 0.448 1 1 1zM29 6h-4v-2c0-2.209-1.791-4-4-4h-10c-2.209 0-4 1.791-4 4v2h-4l-3 3c0 0.553 0.448 1 1 1h3v20c0 1.104 0.896 2 2 2h20c1.104 0 2-0.896 2-2v-20h3c0.553 0 1-0.447 1-1l-3-3zM10 4c0-1.104 0.896-2 2-2h8c1.104 0 2 0.896 2 2v2h-12v-2zM26 29c0 0.553-0.447 1-1 1h-18c-0.552 0-1-0.447-1-1v-19h20v19zM16 28c0.553 0 1-0.447 1-1v-14c0-0.553-0.447-1-1-1s-1 0.447-1 1v14c0 0.553 0.447 1 1 1z"></path>
            </svg>
        </a>
        <div v-if="isActive" class="popin">
            <h2 class="h2">Delete user</h2>
            <!--step1: confirmation to delete-->
            <div v-if="deletedItem === false" class="popin__step1">
                <p>
                    Are you sure to delete the user <br>
                    <strong> n°{{user.id}}: {{user.firstname + ' ' + user.lastname}} </strong>?
                </p>
                <a v-on:click.prevent="deletedItem = true" href="#" class="popin__step1-answer validate">Yes</a>
                <a v-on:click="isActive = false" href="#" class="popin__step1-answer cancel">No</a>
            </div>
            <!-- step2: confirmation user is deleted-->
            <div class="popin__step2"
                v-if="deletedItem">
                <div class="popin__step2-validation">
                    <p>La suppression est effective</p>
                    <a v-on:click.prevent="deleteUser(user.id)">OK</a>
                </div>
            </div>
        </div> 
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
            deletedItem: false
        }
    },
    methods: {
        // call api to delete user with its ID
        deleteUser(id) {
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
