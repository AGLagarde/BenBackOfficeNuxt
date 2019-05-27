<!--NAVIGATION-->
<template>
   <div class="navigation">
       <img src="../assets/img/ben.svg" alt="Ben logo">
        <ul>
            <li class="navigation__item"
                v-bind:class="{highlight:selectedTab === 1}"
                v-on:click="toggleTab"
            >
                <router-link :to="{ name: 'users'}">USERS</router-link>
            </li>
            <li class="navigation__item"
                v-bind:class="{highlight:selectedTab === 2}"
                v-on:click="toggleTab"
            >
                <router-link :to="{ name: 'houses'}">HOUSES</router-link>
            </li>
        </ul>
    </div> 
</template>

<script>
export default {
    data() {
        return {
            selectedTab: this.$store.state.selectedTab,
        }
    },
    methods: {
        toggleTab(){
            if (this.selectedTab === 1) {
                this.selectedTab = 2
            } else {
                this.selectedTab = 1
            }
            this.$store.commit('setTab', this.selectedTab)
        }
    }
}
</script>

<style lang="scss">
    @import '../assets/scss/styles.scss';

</style>