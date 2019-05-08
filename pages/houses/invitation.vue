<template>
    <div>
        <div class="">
            <div class="popin__editable">
                <p>HELLOOOOO</p>
                <form action="">
                    <input type="email" placeholder="john.doe@gmail.com" v-model="newEmail">
                    <!-- recup value input pour fx sendInvitationHouse-->
                    <button v-on:click.prevent="sendInvitationHouse(newEmail)">Validation</button>
                </form>
                <button
                    v-on:click="goback"
                >Annuler</button>
            </div>
        </div><!-- end popin -->
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
            newEmail: '',
            houseInvited: {
                // id: this.currentHouse.id,
                // name: this.currentHouse.name,
                // users: this.currentHouse.users
            }
        }
    },
    mounted() {
        console.log(this.houseInvited)
    },
    methods: {
        goback() {
            console.log('go back')
            // this.updateForm();
            this.$router.push({ path: '/houses' })
        },
        sendInvitationHouse(mail) {
            console.log(mail);
            axios({
                method: 'POST',
                url: 'http://ulysse.idequanet.com/ben/web/api/house/send-invitation',
                data: {
                    email: mail
                },
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    Authorization: `BEARER ${this.token}`
                },
            }).then(response => {
                console.log(response.data)
                console.log('envoye')
                this.$emit('modified-house', response.data)
                this.isActive = false
            }).catch(error => {
                console.log(error)
                console.log(mail)
            });
        }
    }
}

</script>
