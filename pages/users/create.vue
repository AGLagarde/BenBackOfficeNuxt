<!-- create user -->
 <template>
     <div class="wrapper">
        <form action="#" class="form item__form">
            <h2 class="h2">Add a user</h2>
            <div> <!-- firstname -->
                <label for="firstname" class="item__form-label" >Firstname</label>
                <input type="text" name="firstname" class="item__form-input" placeholder="Ben" v-model:value="newUser.firstname"/>
            </div>
            <div> <!-- lastname -->
                <label for="lastname" class="item__form-label" >Lastname</label>
                <input type="text" name="lastname" class="item__form-input" placeholder="L'assistant" v-model:value="newUser.lastname"/>
            </div>
            <div> <!-- email -->
                <label for="email" class="item__form-label" >Email</label>
                <input type="email" name="email" class="item__form-input" placeholder="ben_assistant@gmail.com" v-model:value="newUser.email"/>
            </div>
            <div> <!-- password -->
                <label for="password" class="item__form-label">Password</label>
                <input type="password" name="password" class="item__form-input" placeholder="Password" v-model:value="newUser.password"/>
            </div>
            <div> <!-- buttons -->
                <nuxt-link class="item__form-submit" to="/users">Annuler</nuxt-link>
                <input @click="createUser" type="submit" name="action" value="Créer" class="item__form-submit validate"/>
            </div>
        </form>
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
            users: this.$store.state.users,
            newUser: {
                firstname: '',
                lastname: '',
                email: '',
                password: ''
            }
        }
    }, 

    methods: {
        /**
        * Asynchronous call api to add a new user 
        * provided that the keys firstname/lastname/email/password are filled
        */
        async createUser(event) {
            event.preventDefault();
            const user = await axios({
                method: 'post',
                url: '//ulysse.idequanet.com/ben/web/api/user/create',
                data: {
                    user : {
                        firstname : this.newUser.firstname,
                        lastname : this.newUser.lastname,
                        email : this.newUser.email,
                        password : this.newUser.password
                    }
                },
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
            }).then(response => {
                this.$store.commit('addUser', response.data.data.user)
                alert('Your user has been well added')
                this.goback()
            }).catch(error => {
                console.log(error)
            })
        },
        goback() {
            this.$router.push({ path: '/users' })
        }
    }
}
</script>

<style lang="scss">
 @import '../../assets/scss/styles.scss';
    .validate {
        margin-left: 20px;
    }
</style>