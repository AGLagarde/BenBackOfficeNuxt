<template>
    <tr class="listItems__table__body">
        <th class="listItems__table__body-entries">{{ user.id }}</th>
        <th class="listItems__table__body-entries">{{ user.firstname }}</th>
        <th class="listItems__table__body-entries">{{ user.lastname }}</th>
        <th class="listItems__table__body-entries">{{ user.email }}</th>
        <th class="listItems__table__body-entries">{{ user.house }}</th>
        <th class="listItems__table__body-actions">
            <UserDelete
                :user="user" 
                v-on:delete-user="transmitToParent"
            />
            <button class="buttonRow"
                v-on:click="goEdit"
            >Edit</button>
            <!-- v-on:modified-user="receiveModifiedUser" -->
        </th>
    </tr>
</template>


<script>
import store from '../store/index'
import UserDelete from './UserDelete'
import UserEdit from './UserEdit'

export default {
    components: {
        UserDelete, 
        UserEdit
    },
    props: {
        user: Object
    },
    data() {
        return {
            token: store.token,
            users: store.users
        }
    },
    methods: {
        goEdit() {
            this.isActive = true
            this.isEditable = true
            this.$router.push({ path: 'users/edit' })
        },
        // API PUT request transmission --> parent ListUser
        receiveModifiedUser(userUpdated) { 
            this.user.firstname = userUpdated.firstname 
            this.user.lastname = userUpdated.lastname 
            this.user.email = userUpdated.email
            this.user.house = userUpdated.house
        }, 
        // API DELETE request transmission --> parent ListUser
        transmitToParent(id) {
            this.$emit('delete-user-suite', id)
        }
    }
}
 
</script>