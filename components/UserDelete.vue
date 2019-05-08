<template>
    <div>
        <button
            class="buttonRow"
            v-on:click="isActive=true">
            Delete
        </button>
        <div 
            class="popin"
            v-if="isActive"
        > <!-- popin DELETE -->
            <div 
                class="popin__removable"
                v-if="isEditable === false"
            >
                <h2 class="h2">Delete user</h2>
                <div class="popin__removable__step1"
                    v-if="deletedItem === false">
                    <span class="popin__removable__step1-question">Are you sure to delete the user <strong> n°{{user.id}}: {{user.firstname + ' ' + user.lastname}} </strong>for good ?</span>
                    <a 
                        href="#" class="popin__removable__step1-answer answer-validation" 
                        v-on:click.prevent="deletedItem = true"
                    >Yes</a>
                    <a 
                        href="#" class="popin__removable__step1-answer answer-cancelation"
                        v-on:click="closePopin"
                    >No</a>
                </div>
                
                <div class="popin__removable__step2"
                    v-if="deletedItem">
                    <div class="popin__removable__step2-validation">
                        <p>La suppression est effective</p>
                        <a v-on:click.prevent="deleteUser(user.id)">OK</a>
                    </div>
                    
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
            isEditable: false, 
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
        // POPIN BEHAVIOR
        closePopin() {
            this.isActive = false
            this.isEditable = false
        },

        // API : DELETE REQUEST
        // @todo actualiser la liste au clic
        deleteUser(id) {
            console.log('je delete')
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
                // this.$emit('delete-user', id)

                this.isActive = false
            }).catch(error => {
                console.log(error)
            });
        }
    }
}

</script>

<style lang="scss">
@import '../assets/scss/common/mixins.scss';
@import '../assets/scss/common/variables.scss';
@import '../assets/scss/components/popin.scss';


</style>
