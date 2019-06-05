<template>
    <div class="invitationForm">
        <h2 class="h2">Send an invitation</h2>
        <p>Enter your new roomate's email so that he can access your organization.<br>He will receive an invitation to connect.</p>
        <form action="#" class="form item__form">
            <label for="email" class="item__form-label" >Email</label>
            <input type="email" name="email" class="item__form-input" placeholder="john.doe@gmail.com" v-model="newEmail">
            <button 
                :disabled="valideEmail" @click.prevent="sendInvitationHouse(newEmail)"
                type="submit" name="action" value="Validate" 
                class="item__form-submit validate"
            >SEND</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    props: {
        currentHouse: Object
    },
    data() {
        return {
            token: this.$store.state.token,
            newEmail: ''
        }
    },
    methods: {
        /**
         * Call api to send an invitation mail via DB --token required--
         * @param {string} email - Email of invited user
         */
        sendInvitationHouse(mail) {
            axios({
                method: 'POST',
                url: '//ulysse.idequanet.com/ben/web/api/house/send-invitation',
                data: {
                    email: mail
                },
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    Authorization: `BEARER ${this.token}`
                },
            }).then(response => {
                this.$router.push({ path: '/houses' })
                alert('The email has been sent');
                this.isActive = false
            }).catch(error => {
                console.log(error)
            });
        }
    },

    computed: {
        /**
         * Verification of a match of valid email format to be able to send 
         * @param {boolean} -- required true to function
         */
        valideEmail() {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return !re.test(this.newEmail);
        }
    }
}

</script>


<style lang="scss">
    @import '../../assets/scss/styles.scss';
    .invitationForm {
        width: 80%;
        margin: 90px auto;
        p {
            width: 80%;
            margin: 90px auto;
            @include font (20px, $grey, 300, 1.5em);
        }
        .form {
            width: 40%;
            margin-left:10%;
        }
        .item__form-label {
            width: 15%;
        }
        .item__form-input {
            width: 70%;
        }
        .item__form-submit {
            display: block;
            width: 50%;
            margin: 50px auto 0;
            background-image: linear-gradient(to right, $pink , $redish);
            color: $white;
            &:disabled {
                opacity: 0.2;
            }
            &:hover {
                opacity: 0.8;
            }
        }
    }
</style>