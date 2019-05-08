<template>
    <tr class="listItems__table__body">
        <th class="listItems__table__body-entries">{{ house.id }}</th>
        <th class="listItems__table__body-entries">{{ house.name }}</th>
        <th class="listItems__table__body-entries">{{ house.created }}</th>
        <th class="listItems__table__body-entries">
            <span>{{ names.join() }}</span>
        </th>
        <th class="listItems__table__body-actions">
            <HouseButton
                title="Editer"
                :house="house"
                v-on:modified-house="receiveModifiedHouse"
                v-on:delete-house="transmitToParent"
            >
            </HouseButton>
        </th>
    </tr>
</template>


<script>
import HouseButton from './HouseButton'

export default {
    components: {
        HouseButton
    },
    props: {
        house: Object
    },
    data() {
        return {
            token: this.$store.state.token
        }
    },
    methods: {
        // API PUT request transmission --> parent ListUser
        receiveModifiedHouse(houseUpdated) {
            this.house.name = houseUpdated.name
            this.house.created = houseUpdated.created
            this.house.users = houseUpdated.users
        }, 
        // API DELETE request transmission --> parent ListHouse
        transmitToParent(id) {
            this.$emit('delete-house-suite', id)
        }
    },
    computed: {
        // get names of users in the house
        names() {
            return this.house.users.map(user => {
                return `${user.firstname} ${user.lastname}`
            });
        }
    }
}
 
</script>