<!--NAVIGATION-->
<template>
   <div class="navigation">
       <img src="../assets/img/ben.svg" alt="Ben logo">
        <ul>
            <li class="navigation__item">
                <router-link :to="{ name: 'users'}">USERS</router-link>
            </li>
            <li class="navigation__item">
                <router-link :to="{ name: 'houses'}">HOUSES</router-link>
            </li>
        </ul>
    </div> 
</template>

<script>
export default {

}
</script>

<style lang="scss">
@import '../assets/scss/styles.scss';


</style>