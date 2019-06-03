<template>
    <tr class="listItems__table__body">
        <th class="listItems__table__body-entries">{{ user.id }}</th>
        <th class="listItems__table__body-entries">{{ user.firstname }}</th>
        <th class="listItems__table__body-entries">{{ user.lastname }}</th>
        <th class="listItems__table__body-entries">{{ user.email }}</th>
        <th class="listItems__table__body-entries">{{ user.house }}</th>
        <th class="listItems__table__body-actions">
             <nuxt-link class="buttonRow" :to="`users/${user.id}`">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
                    <title>pencil</title>
                    <path d="M12 20l4-2 14-14-2-2-14 14-2 4zM9.041 27.097c-0.989-2.085-2.052-3.149-4.137-4.137l3.097-8.525 4-2.435 12-12h-6l-12 12-6 20 20-6 12-12v-6l-12 12-2.435 4z"></path>
                </svg>
             </nuxt-link>
             <UserDelete :user="user" class="buttonRow"/>
        </th>
    </tr>
</template>


<script>
import UserDelete from './UserDelete'

export default {
    components: {
        UserDelete
    },
    props: {
        user: Object
    },
    data() {
        return {
            token: this.$store.state.token,
            users: this.$store.state.users
        }
    }
}
</script>

<style lang="scss">
    @import '../assets/scss/styles.scss';
    .buttonRow {
        color: $grey;
        border: none;
        display: inline-block;
        text-transform: uppercase;
        margin: 0 10px;
        cursor: pointer;
        fill: $grey;
        &:hover {
            fill: $redish;
        }
    }
</style>
