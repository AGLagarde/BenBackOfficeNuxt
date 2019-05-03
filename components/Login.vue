<template>
    <div class="login">
        <!-- admin@hetic.net / admin -->
        <!-- DYNAMIQUE -->
        <!-- <input type="email" placeholder="email" v-model:value="connexion.email">
        <input type="password" placeholder="mot de passe" v-model:value="connexion.password">
        <button v-on:click.prevent="login(connexion.email, connexion.password)">ME CONNECTER</button> -->

        <!-- EN DUR  -->
        <div>
            <label for="email" class="login__label" >Login</label>
            <input class="login__input" type="email" placeholder="email" name="email"  value="admin@hetic.net">
        </div>
        
        <div>
            <label for="password" class="login__label" >Password</label>
            <input class="login__input" type="password" name="password" placeholder="mot de passe" value="admin">
        </div>
        
        <button class="login__button" v-on:click.prevent="login('admin@hetic.net', 'admin')">CONNECT</button>
    </div>
</template>

<script>
import axios from 'axios'
import store from '../store/index'

export default {
    props: {
        token: String
    }, 
    data() {
        return {
            getUsers: [],
            generatedToken: '',
            connexion: {
                email: '',
                password: ''
            }, 
            isConnected: false
        }
    }, 
    methods: {
        // API: IDENTIFICATION LOGIN
        login(email, pwd) {
            axios({
                method: 'post',
                url: 'http://ulysse.idequanet.com/ben/web/api/user/login',
                data: {
                    user: {
                        email: email,
                        password: pwd
                    }
                },
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
            }).then(response => {
                console.log('Authenticated')
                store.token = response.data.data.token
                console.log(store.token) // stocke store
                this.$router.push({ path: 'users' })
            }).catch(error => {
                console.log(error)
            });
        }
    }
}
</script>

