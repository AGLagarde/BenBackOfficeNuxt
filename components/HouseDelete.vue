<template>
    <div>
        <button class="buttonRow" v-on:click="isActive=true">Delete</button>

        <div v-if="isActive" class="popin">
            <h2 class="h2">Delete House</h2>

            <!--step1: confirmation to delete-->
            <div v-if="deletedItem === false" class="popin__step1">
                <p>
                    Are you sure to delete the House <br>
                    <strong> n°{{house.id}}: {{house.name}} </strong>?
                </p>
                <a v-on:click.prevent="deletedItem = true" href="#" class="popin__step1-answer validate">Yes</a>
                <a v-on:click="closePopin" href="#" class="popin__step1-answer cancel">No</a>
            </div>

            <!-- step2: confirmation user is deleted-->
            <div class="popin__step2"
                v-if="deletedItem">
                <div class="popin__step2-validation">
                    <p>La suppression est effective</p>
                    <a v-on:click.prevent="deleteHouse(house.id)">OK</a>
                </div>
            </div>
        </div> <!-- end popin -->
    </div>
</template>

<script>
import axios from 'axios'

export default {
    props: {
        house: Object
    },
    data() {
        return {
            token: this.$store.state.token,
            isActive: false,
            deletedItem: false
        }
    },
    methods: {
        // POPIN BEHAVIOR
        closePopin() {
            this.isActive = false
        },

        // API : DELETE REQUEST
        deleteHouse(id) {
            console.log('je veux delete cet id ', id)

            axios({
                method: 'DELETE',
                url: 'http://ulysse.idequanet.com/ben/web/api/house/delete/' + id,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    Authorization: `BEARER ${this.token}`
                },
            }).then(response => {
                this.$store.commit('removeHouse', id)
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
