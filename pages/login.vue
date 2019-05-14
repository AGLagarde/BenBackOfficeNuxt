<template>
    <div class="login">
        <!-- admin@hetic.net / admin -->
        <!-- DYNAMIQUE -->
        <!-- <input type="email" placeholder="email" v-model:value="connexion.email">
        <input type="password" placeholder="mot de passe" v-model:value="connexion.password">
        <button v-on:click.prevent="login(connexion.email, connexion.password)">ME CONNECTER</button> -->

        <!-- EN DUR  -->
        <div class="login__line"> <!--login-->
            <label for="email" class="login__label" >Login</label>
            <input class="login__input" type="email" placeholder="email" name="email"  value="admin@hetic.net">
        </div>
        <div class="login__line"> <!--password-->
            <label for="password" class="login__label" >Password</label>
            <input class="login__input" type="password" name="password" placeholder="mot de passe" value="admin">
        </div>
        <button class="login__button" v-on:click.prevent="login('admin@hetic.net', 'admin')">CONNECT</button>
    </div>
</template>

<script>
import axios from 'axios'

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
                this.$store.commit('setToken', response.data.data.token)
                localStorage.setItem('token', response.data.data.token)
                this.$router.push({ path: 'users' })
            }).catch(error => {
                console.log(error)
            });
        }
    }, 
    mounted() {
        this.$store.commit('setToken', localStorage.getItem('token'))
        if (localStorage.getItem('token')){
            this.$router.push({ path: 'users' })
        }
        
    }
}
</script>

<style lang="scss">
    @import '../assets/scss/styles.scss';
</style>


