<template>
  <div class="login">
    <!-- admin@hetic.net / admin -->
    <!-- eric.priou@hetic.net / unebonnenote -->
    <!-- DYNAMIQUE -->
    <picture>
      <img src="../assets/img/ben.png" alt="logo ben">
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
    <!-- <div class="login__line">
        <label for="email" class="login__label" >Login</label>
        <input class="login__input" type="email" placeholder="email" name="email"  value="admin@hetic.net">
    </div>
    <div class="login__line">
        <label for="password" class="login__label" >Password</label>
        <input class="login__input" type="password" name="password" placeholder="mot de passe" value="admin">
    </div>
    <button class="login__button" v-on:click.prevent="login('admin@hetic.net', 'admin')">CONNECT</button> -->
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
            // call api to login and obtain token to access DB
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
            // put token in the localstorage and redirect to users page
            this.$store.commit('setToken', localStorage.getItem('token'))
            if (localStorage.getItem('token')){
                this.$router.push({ path: 'users' })
            }

        }
    }
</script>

<style lang="scss">
  @import '../assets/scss/styles.scss';

  input:-internal-autofill-selected,
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus {
    background-color: $white !important;
  }

</style>


