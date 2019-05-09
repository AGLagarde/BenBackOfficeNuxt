<!--SEARCH BAR-->
<template>
    <div class="searchbar">
        <input 
            type="text" 
            placeholder="Search" 
            maxlength= "12" 
            class="searchbar__input"
            v-model="search" 
            v-on:keyup="isFiltered = true"
        >
        <img 
            src="../assets/img/searchbar.png"
            alt="search button" 
            class="searchbar__button"
        >
    </div>
</template>

<script>
export default {
    props: {
        users: Array
    },
    data() {
        return {
            search: '', 
            isFiltered: true, 
            filteredUsers: []
        }
    },
    computed: {
        // user
        filterUsers() {
            this.filteredUsers = this.users.filter(user => {
                return user.firstname.toLowerCase().indexOf(this.search.toLowerCase()) > -1
            })
            console.log('mes filteruser est : ', this.filteredUsers)
            this.$emit('filter-users', this.filteredUsers)
            // return this.filteredUsers

        }

        // house
    }
}
</script>
