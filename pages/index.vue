<template>
  <div class="login">
    <!-- admin@hetic.net / admin -->
    <!-- DYNAMIQUE -->
    <picture>
      <img src="../assets/img/red_ben.png" alt="logo ben">
    </picture>

    <div class="login__line">
      <label for="email" class="login__label" >Login</label>
      <input class="login__input"
             type="email" name="email"
             placeholder="email"
             v-model:value="connexion.email"
      >
    </div>
    <div class="login__line">
      <label for="password" class="login__label" >Password</label>
      <input class="login__input"
             type="password" name="password"
             placeholder="password"
             v-model:value="connexion.password"
      >
    </div>
    <button class="login__button"
            v-on:click.prevent="login(connexion.email, connexion.password)"
    >CONNECT</button>

    <!-- EN DUR  -->
    <!--<div class="login__line">-->
        <!--<label for="email" class="login__label" >Login</label>-->
        <!--<input class="login__input" type="email" placeholder="email" name="email"  value="admin@hetic.net">-->
    <!--</div>-->
    <!--<div class="login__line">-->
        <!--<label for="password" class="login__label" >Password</label>-->
        <!--<input class="login__input" type="password" name="password" placeholder="mot de passe" value="admin">-->
    <!--</div>-->
    <!--<button class="login__button" v-on:click.prevent="login('admin@hetic.net', 'admin')">CONNECT</button>-->
  </div>
</template>

<script>
    import axios from 'axios'

    export default {
        layout: 'partials/emptyNav',

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
            /**
             * Call api to login and access DB that transmits token data to the store
             * @param {string} email - Email of user
             * @param {string} password - Password of user
             */
            login(email, pwd) {
                axios({
                    method: 'post',
                    url: '//ulysse.idequanet.com/ben/web/api/user/login',
                    data: {
                        user: {
                            email: email,
                            password: pwd
                        }
                    },
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                }).then(response => {
                    this.$store.commit('setToken', response.data.data.token)
                    localStorage.setItem('token', response.data.data.token)
                    this.$router.push({ path: 'users' })
                }).catch(error => {
                        console.log(error)
                })
            }
        },

        /**
         * Token is stocked in Store and LocalStorage 
         */
        mounted() {
            this.$store.commit('setToken', localStorage.getItem('token'))
            if (localStorage.getItem('token')){
                this.$router.push({ path: 'users' })
            }
        }
    }
</script>




